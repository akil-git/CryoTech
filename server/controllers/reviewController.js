import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Review.countDocuments({ product: productId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { product, rating, title, comment, images } = req.body;

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ product, user: req.user.id });
    if (existingReview) {
      return next(new ErrorResponse('You have already reviewed this product', 400));
    }

    // Check if user purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user.id,
      'items.product': product,
      status: 'delivered',
    });

    const review = await Review.create({
      product,
      user: req.user.id,
      rating,
      title,
      comment,
      images: images || [],
      isVerifiedPurchase: !!hasPurchased,
    });

    // Update product rating
    await updateProductRating(product);

    await review.populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ErrorResponse('You have already reviewed this product', 400));
    }
    next(error);
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return next(new ErrorResponse('Review not found', 404));
    }

    // Make sure user is review owner
    if (review.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to update this review', 403));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'name avatar');

    // Update product rating
    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new ErrorResponse('Review not found', 404));
    }

    // Make sure user is review owner or admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to delete this review', 403));
    }

    const productId = review.product;
    await review.deleteOne();

    // Update product rating
    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
export const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('product', 'name slug images')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to update product rating
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  
  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      reviewCount: 0,
    });
    return;
  }

  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
    reviewCount: reviews.length,
  });
};
