import productServices from "../services/product.services.js";

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productServices.createProduct();

    res.json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { createProduct };
