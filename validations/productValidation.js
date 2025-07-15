const { z } = require('zod');

const imageSchema = z.object({
    public_id: z.string().min(1, 'Public ID is required'),
    url: z.string().url('Invalid URL format').min(1, 'Image URL is required')
});

const brandLogoSchema = z.object({
    public_id: z.string().min(1, 'Brand logo public ID is required'),
    url: z.string().url('Invalid URL format').min(1, 'Brand logo URL is required')
});

const brandSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
    logo: brandLogoSchema
});

const specificationSchema = z.object({
    title: z.string().min(1, 'Specification title is required'),
    description: z.string().min(1, 'Specification description is required')
});

const reviewSchema = z.object({
    user: z.string().min(1, 'User ID is required'),
    name: z.string().min(1, 'Reviewer name is required'),
    rating: z.number().min(0).max(5, 'Rating must be between 0-5'),
    comment: z.string().min(1, 'Comment is required')
});

const productSchema = z.object({
    name: z.string().min(1, 'Product name is required').trim(),
    description: z.string().min(1, 'Description is required'),
    highlights: z.array(z.string().min(1, 'Highlight cannot be empty')).nonempty('At least one highlight is required'),
    specifications: z.array(specificationSchema).nonempty('At least one specification is required'),
    price: z.number().positive('Price must be positive'),
    cuttedPrice: z.number().positive('Cutted price must be positive'),
    images: z.array(imageSchema).nonempty('At least one image is required'),
    brand: brandSchema,
    category: z.string().min(1, 'Category is required'),
    stock: z.number().int().nonnegative('Stock must be non-negative').max(9999, 'Stock cannot exceed 9999'),
    warranty: z.number().int().nonnegative('Warranty must be non-negative').optional(),
    ratings: z.number().min(0).max(5, 'Rating must be between 0-5').optional(),
    numOfReviews: z.number().int().nonnegative('Review count must be non-negative').optional(),
    reviews: z.array(reviewSchema).optional(),
});

module.exports = {
    createProductSchema: productSchema.strict(),
};