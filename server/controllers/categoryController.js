import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('name');

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by ID or slug
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if id is ObjectId or slug
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { slug: id };

    const category = await Category.findOne(query);

    if (!category) {
      return next(new ErrorResponse('Category not found', 404));
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by category
// @route   GET /api/categories/:id/products
// @access  Public
export const getCategoryProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 12, sort = '-createdAt' } = req.query;

    // Check if id is ObjectId or slug
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { slug: id };

    const category = await Category.findOne(query);

    if (!category) {
      return next(new ErrorResponse('Category not found', 404));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find({ categoryId: category._id })
      .populate('categoryId', 'name slug icon')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Product.countDocuments({ categoryId: category._id });

    res.status(200).json({
      success: true,
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category (Admin)
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ErrorResponse('Category with this name or slug already exists', 400));
    }
    next(error);
  }
};

// @desc    Update category (Admin)
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return next(new ErrorResponse('Category not found', 404));
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category (Admin)
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorResponse('Category not found', 404));
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ categoryId: category._id });
    if (productCount > 0) {
      return next(
        new ErrorResponse(
          `Cannot delete category. It has ${productCount} products associated with it`,
          400
        )
      );
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
