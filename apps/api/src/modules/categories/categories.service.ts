import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory,
} from "./categories.repository";

import { CreateCategoryDtoType } from "./dto/create-category.dto";
import { UpdateCategoryDtoType } from "./dto/update-category.dto";

export const createCategoryService = async (
  data: CreateCategoryDtoType
) => {
  const existingCategory = await getCategoryByName(data.name);

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return createCategory(data.name, data.description);
};

export const getAllCategoriesService = async () => {
  return getAllCategories();
};

export const getCategoryByIdService = async (id: string) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategoryService = async (
  id: string,
  data: UpdateCategoryDtoType
) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return updateCategory(id, data);
};

export const deleteCategoryService = async (id: string) => {
  const category = await getCategoryById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return deleteCategory(id);
};