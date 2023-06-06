import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  { versionKey: false, _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderDetails: [
      {
        type: orderDetailSchema,
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    totalAmount: {
      type: Number,
    },
    paymentId:{
      type:String
    }
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
const OrderDetails = mongoose.model("orderDetails",orderDetailSchema);
export {Order,OrderDetails};
