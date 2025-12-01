import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist,
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// All routes are protected (require authentication)

const addToWishlistValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
];

router.get('/', protect, getWishlist);
router.get('/check/:productId', protect, checkWishlist);
router.post('/items', protect, addToWishlistValidation, validate, addToWishlist);
router.delete('/items/:productId', protect, removeFromWishlist);
router.delete('/', protect, clearWishlist);

export default router;
