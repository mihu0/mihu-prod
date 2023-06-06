import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    query: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId,required: true},
  },
  { timestamps: true }
);
export default mongoose.model("Search",searchSchema);