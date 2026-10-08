import axios from "axios";
import config from "../config/config.js";
import Stripe from "stripe";

export const payViaKhalti = async (input) => {
  const data = {
    return_url: `${config.khalti.returnUrl}/${input.orderId}/confirm`,
    website_url: config.apiUrl,
    amount: Math.ceil(input.amount),
    purchase_order_id: input.orderNumber,
    purchase_order_name: input.orderName,
    customer_info: input.customerInfo,
  };

  try {
    const response = await axios.post(config.khalti.apiUrl, data, {
      headers: {
        Authorization: `Key ${config.khalti.secretKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const payViaStripe = async (input) => {
  const stripe = new Stripe(config.stripeSecretKey);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(input.amount),
    currency: input.currency || "npr",
    metadata: {
      customer_name: input.customerInfo.name,
      customer_email: input.customerInfo.email,
      customer_phone: input.customerInfo.phone,
      order_id: input.orderNumber,
    },
  });

  return paymentIntent;
};
