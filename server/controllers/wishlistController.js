import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      'items.product',
      'name price discountPrice images inStock slug rating reviewCount'
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, items: [] });
    }

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/items
// @access  Private
export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Get or create wishlist
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, items: [] });
    }

    // Check if item already exists
    const exists = wishlist.items.some(
      item => item.product.toString() === productId
    );

    if (exists) {
      return next(new ErrorResponse('Product already in wishlist', 400));
    }

    wishlist.items.push({ product: productId });
    await wishlist.save();
    await wishlist.populate('items.product', 'name price discountPrice images inStock slug rating reviewCount');

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/items/:productId
// @access  Private
export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return next(new ErrorResponse('Wishlist not found', 404));
    }

    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate('items.product', 'name price discountPrice images inStock slug rating reviewCount');

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private
export const clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return next(new ErrorResponse('Wishlist not found', 404));
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if product is in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
export const checkWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    const inWishlist = wishlist 
      ? wishlist.items.some(item => item.product.toString() === productId)
      : false;

    res.status(200).json({
      success: true,
      inWishlist,
    });
  } catch (error) {
    next(error);
  }
};
