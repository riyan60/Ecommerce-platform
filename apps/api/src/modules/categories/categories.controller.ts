type CategoryParams = {
  id: string;
};

import { Request, Response } from "express";

import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "./categories.service";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const data = CreateCategoryDto.parse(req.body);

    const category = await createCategoryService(data);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategoriesService();

    return res.json({
      success: true,
      data: categories,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCategory = async (
  req: Request<CategoryParams>,
  res: Response
) => {
  try {
    const category = await getCategoryByIdService(
      req.params.id
    );

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Category not found",
    });
  }
};

export const updateCategory = async (
  req: Request<CategoryParams>,
  res: Response
) => {
  try {
    const data = UpdateCategoryDto.parse(req.body);

    const category =
      await updateCategoryService(
        req.params.id,
        data
      );

    return res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const deleteCategory = async (
  req: Request<CategoryParams>,
  res: Response
) => {
  try {
    await deleteCategoryService(req.params.id);

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Category not found",
    });
  }
};