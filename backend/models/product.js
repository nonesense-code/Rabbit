const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    price: {
      default: function () {
        return this.originalPrice;
      },
      // if the price is given it value is assigned and if not given the price value will be same as the originalPrice
      type: Number,
    },
    color: {
      type: [],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    size: {
      type: [],
      required: true,
    },
    material: {
      type: [],
      required: true,
    },
    brand: {
      type: [],
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: String,
    },
    images: {
      type: [],
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
