const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();


const connectMongo = require('./config/mongodb');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://manesh3107-full-stack-exam-manesh-p.vercel.app"
  ], // Allow listed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

connectMongo();

// Routes

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const auth = require('./middleware/auth');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', auth, cartRoutes);
app.use('/api/v1/orders', auth, orderRoutes);
app.use('/api/v1/reports', reportRoutes);


app.get('/', (req, res) => res.send('API running'));

module.exports = app;
