import express from 'express';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

const reviewValidation = [
  body('product').notEmpty().withMessage('Product ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').trim().notEmpty().withMessage('Review title is required'),
  body('comment').trim().notEmpty().withMessage('Review comment is required'),
];

// Public routes
router.get('/product/:productId', getProductReviews);

// Private routes
router.post('/', protect, reviewValidation, validate, createReview);
router.get('/my-reviews', protect, getMyReviews);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
