const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register.js");
const login = require("./routes/login.js");
const orders = require("./routes/orders.js");
const productsRoute = require("./routes/products.js");
const users = require("./routes/users.js")
const path = require('path');
const products = require('./products.js')
const cloudinary = require("./utils/cloudinary.js");

const fs = require('fs');
const bodyParser = require('body-parser');
const uploadRouter = require("./routes/uploadRouter.js");


const app = express();


require("dotenv").config();



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('public'));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/products", productsRoute);
app.use("/api/users", users);
app.use("/api/upload", uploadRouter);



app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/upload", (req, res) => {
  res.send(upload);
});




const uri = process.env.DB_URI;
const port = process.env.PORT;


app.listen(port, ()=>{console.log(`Server running on ${port} for localhost `)} ); 
app.on('listening', ()=> {
    console.log(`Express server started on ${port}...`, app.address().port, app.address().address);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connection success..."))
  .catch((error) => console.log("MongoDB connection failed:", error.message));
 