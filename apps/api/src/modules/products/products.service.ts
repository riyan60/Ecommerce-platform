import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./products.repository";

import { getCategoryById } from "../categories/categories.repository";

import { CreateProductDtoType } from "./dto/create-product.dto";
import { UpdateProductDtoType } from "./dto/update-product.dto";

export const createProductService = async (
  data: CreateProductDtoType
) => {
  const category = await getCategoryById(data.categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return createProduct(
    data.name,
    data.description,
    data.price,
    data.categoryId
  );
};

export const getAllProductsService = async () => {
  return getAllProducts();
};

export const getProductByIdService = async (id: string) => {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProductService = async (
  id: string,
  data: UpdateProductDtoType
) => {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (data.categoryId) {
    const category = await getCategoryById(data.categoryId);

    if (!category) {
      throw new Error("Category not found");
    }
  }

  return updateProduct(id, data);
};

export const deleteProductService = async (id: string) => {
  const product = await getProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return deleteProduct(id);
};