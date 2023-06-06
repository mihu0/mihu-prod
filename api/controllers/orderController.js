import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/config.js";
const stripe = Stripe(STRIPE_SECRET_KEY);
const items = new Map([
  [1, { name: "A Chair", price: 400 }],
  [2, { name: "Another Chair", price: 480 }],
  [3, { name: "One More Chair", price: 430 }],
  [4, { name: "Guess what? A Chairfoielriojgiopefjeiojrpfj", price: 900 }],
  [5, { name: "A Bed", price: 400 }],
  [6, { name: "Another Bed", price: 480 }],
  [7, { name: "One More Bed", price: 430 }],
  [8, { name: "Guess what? A Bed", price: 900 }],
]);


export async function stripePayment(req, res) {

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.products.map((item) => {
          const storeItem = item.item[1]
  
          return {
              price_data:{
                  currency:'pkr',
                  product_data:{
                      name: storeItem.name,
                  },
                  unit_amount:storeItem.price*100
              },
              quantity:item.quantity
          }
        }),
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000/checkout/error",
      });
      console.log("first",session)
      res.json({url:session.url})
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
