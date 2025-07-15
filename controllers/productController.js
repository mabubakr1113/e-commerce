const Product = require('../models/Product');
const { notFound, validationError } = require('../utils/errorResponse');
const { createProductSchema } = require('../validations/productValidation');

// Get all products with category filter
exports.getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;

        if (page < 1 || limit < 1) {
            throw badRequest('Invalid pagination parameters');
        }

        const filter = {};
        if (category) filter.category = category;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const [totalProducts, products] = await Promise.all([
            Product.countDocuments(filter),
            Product.find(filter)
                .skip(startIndex)
                .limit(limit)
        ]);

        const totalPages = Math.ceil(totalProducts / limit);

        const pagination = {
            currentPage: page,
            limit,
            totalItems: totalProducts,
            totalPages
        };

        if (endIndex < totalProducts) {
            pagination.nextPage = page + 1;
        }

        if (startIndex > 0) {
            pagination.prevPage = page - 1;
        }

        res.json({
            success: true,
            pagination,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// Get single product by ID
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw notFound('Product not found');
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// Create new product with validation
exports.createProduct = async (req, res, next) => {
    try {
        const validationResult = await createProductSchema.safeParseAsync(req.body);

        if (!validationResult.success) {
            const formattedErrors = validationResult.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));
            return next(validationError(formattedErrors));
        }

        const product = await Product.create(validationResult.data);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};