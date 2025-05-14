const mongoose = require('mongoose')
require('dotenv').config(); // this is to can read the .env file content and use the information inside it 

const mongoAtlasURLaccess  = process.env.MONGODB_URI;




// const User=require('./user')
// const Item=require('./models/item.JS')
// const Order=require('./models/order.JS')
// const Admin =require('./models/Admin.JS')
// const Menu=require('./models/Menu.JS')

const express = require("express")
const cors = require("cors")

const authRoutes = require('./routes/authentication')
const userRoutes = require('./routes/user')
console.log("Registering Product routes at /api/product");
const Product = require('./routes/product');
const useraddproduct = require('./routes/order');


// const adminRoutes = require('./routes/admin')


const PORT = 3000;
//const MONGO_URI = "mongodb+srv://esraa:esraa@pulseandplasedb.veodylk.mongodb.net/pulseandplateDB?retryWrites=true&w=majority";
const JWT_SECRET = "your_jwt_secret"


const app = express()

// Middleware
app.use(cors()); // Enable CORS if using a frontend like React
app.use(express.json());

mongoose.connect(mongoAtlasURLaccess)

.then (() =>{
  console.log("connected to the mongo atlas server is successful ");

   app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((error) =>{
console.log("connected to the mongo atlas server is failed ");
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', Product);
app.use('/api/addorder',useraddproduct);

