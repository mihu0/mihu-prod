import mongoose from "mongoose";
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    userId: { type: Number, required: true },
    productDetails: [{
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }],
  },

  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  { timestamps: true }
);
export default mongoose.model("Cart", cartSchema, "cart");
