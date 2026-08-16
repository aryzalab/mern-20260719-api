import Product from "../models/Product.js";

const createProduct = async () => {
  return await Product.create({
    name: "Iph",
    brand: "Apple",
    category: "Mobiles",
    price: 20000,
    stock: 20,
  });
};

export default { createProduct };
