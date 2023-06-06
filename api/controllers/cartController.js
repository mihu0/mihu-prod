import { Cart } from "../models/index.js";
export async function addToCart(req, res) {
  try {
    await Cart.create({
      userId: req.body.userId,
      productDetails: req.body.productDetails,
    });

    res.status(201).json({ Message: "Add Cart Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
export async function getCart(req, res) {
    console.log(req.body.userId)
  try {
    let cart = await Cart.findOne({ userId: req.body.userId });
    res.json({ "cart": cart });
  } catch (error) {
    res.json({ error: error.message });
  }
}
export async function deleteCart(req, res) {
  const { userId } = req.body;
  try {
    await Cart.deleteOne({ userId: userId });
    res.json({ Message: `Cart has been removed Successfully` });
  } catch (error) {
    res.json({ error: error.message });
  }
}
export async function updateCart(req, res) {
  let id = req.body.id;
  let updatedData = req.body.data;
  let document;
  try {
    document = await Cart.findOneAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
  res.status(201).json({ Message: "updated Cart Successfully" });
}
