import Product from '../models/Product.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subCategory,
      minPrice,
      maxPrice,
      inStock,
      isOnSale,
      isFeatured,
      isNew,
      search,
      sort = '-createdAt',
    } = req.query;

    // Build query
    const query = {};

    if (category) query.categoryId = category;
    if (subCategory) query.subCategoryId = subCategory;
    if (inStock === 'true') query.inStock = true;
    if (isOnSale === 'true') query.isOnSale = true;
    if (isFeatured === 'true') query.isFeatured = true;
    if (isNew === 'true') query.isNew = true;

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const products = await Product.find(query)
      .populate('categoryId', 'name slug icon')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
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

// @desc    Get single product by ID or slug
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if id is ObjectId or slug
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { slug: id };

    const product = await Product.findOne(query).populate('categoryId', 'name slug icon');

    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Increment views
    await product.incrementViews();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({ isFeatured: true, inStock: true })
      .populate('categoryId', 'name slug icon')
      .sort('-rating')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
export const getNewArrivals = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({ isNew: true, inStock: true })
      .populate('categoryId', 'name slug icon')
      .sort('-createdAt')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products on sale
// @route   GET /api/products/on-sale
// @access  Public
export const getOnSaleProducts = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.find({ isOnSale: true, inStock: true })
      .populate('categoryId', 'name slug icon')
      .sort('-discountPercentage')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit = 4 } = req.query;

    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    const relatedProducts = await Product.find({
      categoryId: product.categoryId,
      _id: { $ne: id },
      inStock: true,
    })
      .populate('categoryId', 'name slug icon')
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      data: relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ErrorResponse('Product with this SKU or slug already exists', 400));
    }
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
