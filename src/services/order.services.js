import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_PENDING,
} from "../constants/orderStatuses.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import crypto from "crypto";

const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getAllOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async (id, user) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  if (order.user.toString() != user._id && !user.roles.includes(ROLE_ADMIN)) {
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

const confirmOrder = async (id, user) => {
  const order = await getOrderById(id, user);

  if (order.status !== ORDER_STATUS_PENDING) {
    throw {
      message: "Order cannot be confirmed.",
    };
  }

  // payment pending

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

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getAllOrdersByUser,
  cancelOrder,
  confirmOrder,
};
