import mongoose from 'mongoose';

const variantOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  priceModifier: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

const productVariantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  options: [variantOptionSchema],
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategoryId: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: 'At least one image is required',
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, 'Stock quantity cannot be negative'],
      default: 0,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    variants: [productVariantSchema],
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', shortDescription: 'text' });
productSchema.index({ categoryId: 1, inStock: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isNew: 1 });

// Virtual for effective price
productSchema.virtual('effectivePrice').get(function() {
  return this.discountPrice || this.price;
});

// Method to increment views
productSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Method to update rating
productSchema.methods.updateRating = async function(newRating, reviewCount) {
  this.rating = newRating;
  this.reviewCount = reviewCount;
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

export default Product;
