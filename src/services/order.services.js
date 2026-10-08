import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
} from "../constants/orderStatuses.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import crypto from "crypto";
import { payViaKhalti, payViaStripe } from "../utils/payment.js";

const getAllOrders = async () => {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getAllOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async (id, user) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls")
    .populate("payment", "transactionId amount method status");

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  if (
    order.user._id.toString() != user._id &&
    !user.roles.includes(ROLE_ADMIN)
  ) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  return order;
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id, user);

  if (order.status !== ORDER_STATUS_PENDING) {
    throw {
      message: "Order cannot be cancelled.",
    };
  }

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { returnDocument: "after" },
  );
};

const confirmOrder = async (id, status, user) => {
  const order = await getOrderById(id, user);

  if (order.status !== ORDER_STATUS_PENDING) {
    throw {
      message: "Order cannot be confirmed.",
    };
  }

  // payment pending
  if (status?.toUpperCase() !== "SUCCESS") {
    await Payment.findByIdAndUpdate(order.payment, {
      status: "FAILED",
    });

    throw {
      message: "Payment failed",
    };
  }

  await Payment.findByIdAndUpdate(order.payment, {
    status: "SUCCESS",
  });

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { returnDocument: "after" },
  );
};

const createOrder = async (data, user) => {
  const orderNumber = crypto.randomUUID();

  let shippingAddress = user.address;

  if (data?.shippingAddress) {
    shippingAddress = data.shippingAddress;
  }

  return await Order.create({
    ...data,
    user: user._id,
    orderNumber,
    shippingAddress,
  });
};

const updateOrderStatus = async (id, data) => {
  return await Order.findByIdAndUpdate(
    id,
    { status: data.status },
    { returnDocument: "after" },
  );
};

const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);

  return { message: "Order deleted." };
};

const orderPaymentViaCash = async (id, user) => {
  const order = await getOrderById(id, user);

  const orderPayment = await Payment.create({
    method: "CASH",
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
      payment: orderPayment._id,
    },
    { new: true },
  );
};

const orderPaymentViaKhalti = async (id, user) => {
  const order = await getOrderById(id, user);

  const orderPayment = await Payment.create({
    method: "ONLINE",
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment._id,
  });

  return await payViaKhalti({
    amount: order.totalPrice,
    orderNumber: order.orderNumber,
    orderId: order._id,
    orderName: order.orderItems[0].product.name,
    customerInfo: {
      name: order.user.name,
      email: order.user.email,
      phone: order.user.phone,
    },
  });
};

const orderPaymentViaStripe = async (id, user) => {
  const order = await getOrderById(id, user);

  const orderPayment = await Payment.create({
    method: "CARD",
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment._id,
  });

  return await payViaStripe({
    amount: order.totalPrice,
    orderId: order.orderNumber,
    customerInfo: {
      name: order.user.name,
      email: order.user.email,
      phone: order.user.phone,
    },
  });
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getAllOrdersByUser,
  cancelOrder,
  confirmOrder,
  orderPaymentViaCash,
  orderPaymentViaKhalti,
  orderPaymentViaStripe,
};
