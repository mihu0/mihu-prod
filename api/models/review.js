import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewTxt: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId,required: true},
    prodId: { type: mongoose.Schema.Types.ObjectId,required: true},
    stars: { type: Number, required: true },
  },
  { timestamps: true }
);
export default  mongoose.model("Review",reviewSchema);