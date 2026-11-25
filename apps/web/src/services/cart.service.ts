
import api from "./api";
import type { Cart, CartResponse } from "../types/cart";

export const getCart = async (): Promise<Cart> => {
  const response = await api.get<CartResponse>("/cart");
  return response.data.data;
};

export const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<Cart> => {
  const response = await api.post<CartResponse>("/cart/items", {
    productId,
    quantity,
  });

  return response.data.data;
};

export const updateCartItem = async (
  itemId: string,
  quantity: number
): Promise<Cart> => {
  const response = await api.patch<CartResponse>(`/cart/items/${itemId}`, {
    quantity,
  });

  return response.data.data;
};

export const removeCartItem = async (itemId: string): Promise<Cart> => {
  const response = await api.delete<CartResponse>(`/cart/items/${itemId}`);
  return response.data.data;
};

export const clearCart = async (): Promise<void> => {
  await api.delete("/cart");
};
