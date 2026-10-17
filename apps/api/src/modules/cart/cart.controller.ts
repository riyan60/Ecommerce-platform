import { Request, Response } from "express";

import {
  getCartService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
  clearCartService,
} from "./cart.service";

import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

type CartItemParams = {
  id: string;
};

type AuthRequest = Request & {
  user?: {
    userId: string;
    role: string;
  };
};

export const getCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const cart = await getCartService(req.user!.userId);

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch cart",
    });
  }
};

export const addToCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const validatedData = AddCartItemDto.parse(req.body);

    const cartItem = await addToCartService(
      req.user!.userId,
      validatedData
    );

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add product to cart",
    });
  }
};

export const updateCartItem = async (
  req: AuthRequest & Request<CartItemParams>,
  res: Response
) => {
  try {
    const validatedData = UpdateCartItemDto.parse(req.body);

    const cartItem = await updateCartItemService(
      req.user!.userId,
      req.params.id,
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update cart item",
    });
  }
};

export const removeCartItem = async (
  req: AuthRequest & Request<CartItemParams>,
  res: Response
) => {
  try {
    await removeCartItemService(
      req.user!.userId,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Cart item not found",
    });
  }
};

export const clearCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await clearCartService(req.user!.userId);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Cart not found",
    });
  }
};