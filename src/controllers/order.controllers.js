import orderServices from "../services/order.services.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderServices.getAllOrders();

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const orders = await orderServices.getAllOrdersByUser(req.user._id);

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderServices.getOrderById(req.params.id, req.user);

    res.json(order);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const data = await orderServices.createOrder(req.body, req.user);

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await orderServices.cancelOrder(req.params.id, req.user);

    res.json(order);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const order = await orderServices.confirmOrder(req.params.id, req.user);

    res.json(order);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderServices.updateOrderStatus(
      req.params.id,
      req.body,
    );

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await orderServices.deleteOrder(req.params.id);

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
