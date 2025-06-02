require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnection = require("./models/db");
const cors = require("cors");

const Home = require("./routes/Home");
const userRouter = require("./routes/UserRouter");
const productRouter = require("./routes/ProductRouter");
const cartRouter = require("./routes/CartRouter");
const adminRouter = require("./routes/AdminRouter");

const frontendURL = process.env.FRONTEND_URL;

app.use(cors(frontendURL));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

databaseConnection();


app.use("/", Home);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
