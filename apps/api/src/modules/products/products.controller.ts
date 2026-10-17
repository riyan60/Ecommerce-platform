import { Request, Response } from "express";

import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "./products.service";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

type ProductParams = {
  id: string;
};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = CreateProductDto.parse(req.body);

    const product = await createProductService(validatedData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create product",
    });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await getAllProductsService();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch products",
    });
  }
};

export const getProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    const product = await getProductByIdService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Product not found",
    });
  }
};

export const updateProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    const validatedData = UpdateProductDto.parse(req.body);

    const product = await updateProductService(
      req.params.id,
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update product",
    });
  }
};

export const deleteProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    await deleteProductService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Product not found",
    });
  }
};