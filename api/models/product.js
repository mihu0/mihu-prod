import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
      name: { type: String, required: true, unique: true },
      sku:{type: String, required: true, unique: true},
      desc: { type: String},
      price: { type: Number, required: true },
      imageLinks: { type : Array , "default" : [] },
      category: { type: String,required: true,},
      vendor: { type: String,required: true},
      isOnSale:{type:Boolean,default:false},
      discountPercentage: { type: Number},
      discountPrice: { type: Number},
      sales: { type: Number, required: true },
      stock: { type: Number, required: true },
      colorsAll: { type: Array, default:[]},
      colorsAvailable: { type: Array, default:[]},
    }
);
export default mongoose.model('Product', productSchema, 'products');



