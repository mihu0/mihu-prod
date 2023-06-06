import express from "express";
import { APP_PORT,MONGO_URL } from "./config/config.js";
import cors from "cors";
import bodyParser from "body-parser";
import productsRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/user.js';
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { connectDb } from "./config/dbConnection.js";

connectDb();
const app = express();
app.use(cors());
app.use(express.json());

//increasing the limit
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/', userRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);



app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

if (APP_PORT) {
    
    app.listen(APP_PORT, () => console.log(`Listening  on port ${APP_PORT}.`));
}

// This is to prevent the server from crashing and showinfg large error message and it shows just the error accurately
// process.on("unhandledRejection",(err,promise)=>{
//     console.log(`Logged Error: ${err}`);
//     server.close(()=>process.exit(1));
// })

export default app