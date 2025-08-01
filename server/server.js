const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const { swaggerUi, swaggerSpec } = require('./swagger');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const PORT = process.env.PORT || 3050;
const MONGO_URI = process.env.MONGODB_URI;

const app = express();

const cloudinary = require("cloudinary");
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "./.env",
  });
}

const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

// app.use(cors());
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/addorder', orderRoutes);

// Health Check for deployment
app.get('/', (req, res) => {
  res.send('API is running...');
});

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(' Connected to MongoDB Atlas successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(` Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error(' Failed to connect to MongoDB Atlas:', error.message);
  });


// for deployment
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
