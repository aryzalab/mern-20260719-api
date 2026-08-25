import mongoose from "mongoose";
import Product from "../models/Product.js";
import uploadFiles from "../utils/fileUploader.js";

const getProducts = async (query) => {
  const limit = query?.limit;
  const sort = query?.sort ? JSON.parse(query.sort) : null;
  const offset = query?.offset;

  //filters
  const filters = {};

  if (query?.category) filters.category = query?.category;
  if (query?.createdBy) filters.createdBy = query?.createdBy;
  if (query?.brands) filters.brand = { $in: query?.brands.split(",") };
  if (query?.name) filters.name = { $regex: query?.name, $options: "i" }; // case-insensitive
  if (query?.min) filters.price = { $gte: query?.min };
  if (query?.max) filters.price = { ...filters.price, $lte: query?.max };

  return await Product.find(filters).limit(limit).sort(sort).skip(offset);
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found.",
    };
  }

  return product;
};

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFiles(files);

  return await Product.create({
    ...data,
    createdBy: userId,
    imageUrls: uploadedFiles.map((item) => item.url),
  });
};

const updateProduct = async (id, data, userId, files) => {
  const product = await Product.findById(id);

  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found.",
    };
  }

  if (product.createdBy.toString() !== userId) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const updateData = data;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFiles(files);

    updateData.imageUrls = uploadedFiles.map((item) => item.url);
  }

  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProduct = async (id, userId) => {
  const product = await Product.findById(id);

  if (!product) {
    throw {
      statusCode: 404,
      message: "Product not found.",
    };
  }

  if (product.createdBy.toString() !== userId) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  await Product.findByIdAndDelete(id);

  return { message: "Product deleted successfully." };
};

const getBrands = async () => {
  return await Product.distinct("brand");
};

const getCategories = async () => {
  return await Product.distinct("category");
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  getBrands,
  deleteProduct,
  getCategories,
};
