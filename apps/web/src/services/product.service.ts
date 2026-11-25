
import api from "./api";
import type { Product, ProductsResponse } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/products");

  return response.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);

  return response.data.data;
}