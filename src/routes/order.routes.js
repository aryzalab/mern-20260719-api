import express from "express";
import orderControllers from "../controllers/order.controllers.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import {
  orderSchema,
  orderStatusSchema,
} from "../libs/schemas/order.schema.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), orderControllers.getAllOrders);

router.get(
  "/users",
  auth,
  roleBasedAuth(ROLE_CUSTOMER),
  orderControllers.getAllOrdersByUser,
);

router.get("/:id", auth, orderControllers.getOrderById);

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_CUSTOMER),
  validate(orderSchema),
  orderControllers.createOrder,
);

router.patch("/:id/cancel", auth, orderControllers.cancelOrder);

router.patch("/:id/confirm", auth, orderControllers.confirmOrder);

router.put(
  "/:id/status",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  validate(orderStatusSchema),
  orderControllers.updateOrderStatus,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  orderControllers.deleteOrder,
);

router.put(
  "/:id/payment/cash",
  auth,
  roleBasedAuth(ROLE_CUSTOMER),
  orderControllers.orderPaymentViaCash,
);

router.put(
  "/:id/payment/khalti",
  auth,
  roleBasedAuth(ROLE_CUSTOMER),
  orderControllers.orderPaymentViaKhalti,
);

export default router;
