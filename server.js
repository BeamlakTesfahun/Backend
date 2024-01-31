const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT;
connectDB();
// Express setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
