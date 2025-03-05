import { Product } from "models";

export const fetchProducts = async (skip: number, limit: number) => {
  const products = await Product.find({})
    .sort({ createdAt: 1, name: 1 })
    .skip(skip)
    .limit(limit);

  return products;
};

export const createProduct = async (
  name: string,
  price: number,
  description: string,
  imageUrl: string
) => {
  const product = await Product.create({
    name,
    price,
    description,
    imageUrl,
  });

  return product;
};

export const updateProduct = async (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { name, price, description, imageUrl },
    { new: true }
  );

  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
