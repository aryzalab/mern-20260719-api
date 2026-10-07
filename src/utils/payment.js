import axios from "axios";
import config from "../config/config.js";

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
