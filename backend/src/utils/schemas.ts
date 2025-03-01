import Joi from "joi";

const objectIdPattern = /^[0-9a-fA-F]{24}$/; // MongoDB ObjectId regex
const productIdValidation = Joi.string()
  .pattern(objectIdPattern)
  .required()
  .messages({
    "string.pattern.base": "Invalid product ID format",
    "any.required": "Product ID is required",
  });
const orderIdValidation = Joi.string()
  .pattern(objectIdPattern)
  .required()
  .messages({
    "string.pattern.base": "Invalid order ID format",
    "any.required": "Order ID is required",
  });

export const cartItemSchema = Joi.object({
  product: productIdValidation,
  quantity: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
  }),
});

export const cartSchema = Joi.object({
  items: Joi.array().items(cartItemSchema).min(1).required().messages({
    "array.base": "Cart items must be an array",
    "array.min": "Cart must contain at least one item",
  }),
});

export const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be at most 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
  }),
  imageUrl: Joi.string().uri().optional().messages({
    "string.uri": "Image URL must be a valid URI",
  }),
});

export const productIdSchema = Joi.object({
  productId: productIdValidation,
});

export const orderIdParamsSchema = Joi.object({
  orderId: orderIdValidation,
});

export const getProductsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
  }),
});

export const addProductSchema = productSchema;

export const updateProductParamsSchema = Joi.object({
  id: productIdValidation,
});

export const updateProductBodySchema = productSchema;

export const deleteProductSchema = Joi.object({ id: productIdValidation });

export const updateOrderBodySchema = Joi.object({
  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered")
    .required()
    .messages({
      "any.only":
        "Status must be one of 'pending', 'processing', 'shipped', 'delivered'",
      "any.required": "Status is required",
    }),
  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed")
    .required()
    .messages({
      "any.only": "Payment status must be one of 'pending', 'paid', 'failed'",
      "any.required": "Payment status is required",
    }),
});
