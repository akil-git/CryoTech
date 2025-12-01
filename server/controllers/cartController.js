import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { ErrorResponse } from '../middleware/errorMiddleware.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price discountPrice images inStock stockQuantity');

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, selectedVariant } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorResponse('Product not found', 404));
    }

    // Check stock
    if (!product.inStock || product.stockQuantity < quantity) {
      return next(new ErrorResponse('Product out of stock or insufficient quantity', 400));
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (newQuantity > product.stockQuantity) {
        return next(new ErrorResponse('Exceeds available stock', 400));
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      const price = product.discountPrice || product.price;
      cart.items.push({
        product: productId,
        name: product.name,
        price,
        image: product.images[0],
        quantity,
        selectedVariant: selectedVariant || {},
        maxStock: product.stockQuantity,
      });
    }

    await cart.save();
    await cart.populate('items.product', 'name price discountPrice images inStock stockQuantity');

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:itemId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new ErrorResponse('Cart not found', 404));
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return next(new ErrorResponse('Item not found in cart', 404));
    }

    // Check stock
    const product = await Product.findById(item.product);
    if (quantity > product.stockQuantity) {
      return next(new ErrorResponse('Exceeds available stock', 400));
    }

    if (quantity <= 0) {
      return next(new ErrorResponse('Quantity must be at least 1', 400));
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product', 'name price discountPrice images inStock stockQuantity');

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:itemId
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new ErrorResponse('Cart not found', 404));
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    await cart.populate('items.product', 'name price discountPrice images inStock stockQuantity');

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new ErrorResponse('Cart not found', 404));
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
