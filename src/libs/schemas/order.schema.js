import * as z from "zod";
import { addressSchema } from "./user.schema.js";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../../constants/orderStatuses.js";

const orderStatusSchema = z.object({
  status: z.enum([
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_PENDING,
    ORDER_STATUS_SHIPPED,
  ]),
});

const orderItemSchema = z.object({
  product: z.string(),
  quantity: z.number().min(1).optional(),
});

const orderSchema = z.object({
  orderItems: z.array(orderItemSchema).min(1),
  totalPrice: z.number(),
  shippingAddress: addressSchema.optional(),
});

export { orderSchema, orderStatusSchema };
