import {
  getOrCreateCart,
  getCartByUserId,
  getCartItem,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart.repository";

import { getProductById } from "../products/products.repository";

import { AddCartItemDtoType } from "./dto/add-cart-item.dto";
import { UpdateCartItemDtoType } from "./dto/update-cart-item.dto";

export const getCartService = async (userId: string) => {
  return getOrCreateCart(userId);
};

export const addToCartService = async (
  userId: string,
  data: AddCartItemDtoType
) => {
  const product = await getProductById(data.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const cart = await getOrCreateCart(userId);

  return addCartItem(
    cart.id,
    data.productId,
    data.quantity
  );
};

export const updateCartItemService = async (
  userId: string,
  cartItemId: string,
  data: UpdateCartItemDtoType
) => {
  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartItem = cart.items.find(
    (item) => item.id === cartItemId
  );

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  return updateCartItem(
    cartItemId,
    data.quantity
  );
};

export const removeCartItemService = async (
  userId: string,
  cartItemId: string
) => {
  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartItem = cart.items.find(
    (item) => item.id === cartItemId
  );

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  return removeCartItem(cartItemId);
};

export const clearCartService = async (
  userId: string
) => {
  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  return clearCart(cart.id);
};