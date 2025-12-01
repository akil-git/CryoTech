import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// All routes are protected (require authentication)

const addToCartValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const updateCartValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

router.get('/', protect, getCart);
router.post('/items', protect, addToCartValidation, validate, addToCart);
router.put('/items/:itemId', protect, updateCartValidation, validate, updateCartItem);
router.delete('/items/:itemId', protect, removeFromCart);
router.delete('/', protect, clearCart);

export default router;
