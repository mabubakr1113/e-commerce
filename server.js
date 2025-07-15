const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const createHttpError = require('http-errors');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/products', productRoutes);

app.use((req, res, next) => {
    next(createHttpError.NotFound());
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        success: false,
        error: {
            status: err.status || 500,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
            ...(err.errors && { errors: err.errors })
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});