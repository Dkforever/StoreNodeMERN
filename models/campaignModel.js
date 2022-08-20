const mongoose = require("mongoose");
const Admin = require("../models/admin");

const campaignSchema = mongoose.Schema({
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: true,
  },
  title: {
    type: String,
  },

  // which admin created this Campaign

  description: {
    type: String,
  },

  requirements: [
    {
      type: String,
    },
  ],

  discount: {
    type: Number,
  },

  status: {
    type: String,
    default: "pending",
  },

  images: [
    {
      public_id: String,
      required: false,
      url: String,
    },
  ],

  // productitems: [{
  //   product: {
  //     type: String,
  //     ref: "Product",
  //     required: false,
  //   },
  // }],

  productitems: [String],

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
        required: false,
      },
      firstname: {
        type: String,
        required: false,
      },
      rating: {
        type: Number,
        required: false,
      },
      comment: {
        type: String,
        required: false,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);