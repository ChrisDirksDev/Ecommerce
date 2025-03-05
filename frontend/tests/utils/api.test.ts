import axios from "axios";
import { describe, it, expect, afterEach, vi } from "vitest";
import {
  fetchProducts,
  fetchProductById,
  fetchOrders,
  placeOrder,
  getOrderById,
  registerUser,
  loginUser,
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  loginAdmin,
} from "api/api";
import { Product, Order, User, Cart } from "types";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API functions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetchProducts should fetch products", async () => {
    const products: Product[] = [
      {
        _id: "1",
        name: "Product 1",
        price: 100,
        imageUrl: "http://example.com/image1.jpg",
        description: "Description 1",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: products });

    const result = await fetchProducts();
    expect(mockedAxios.get).toHaveBeenCalledWith("/products");
    expect(result).toEqual(products);
  });

  it("fetchProductById should fetch a product by ID", async () => {
    const product: Product = {
      _id: "1",
      name: "Product 1",
      price: 100,
      imageUrl: "http://example.com/image1.jpg",
      description: "Description 1",
    };
    mockedAxios.get.mockResolvedValue({ data: product });

    const result = await fetchProductById("1");
    expect(mockedAxios.get).toHaveBeenCalledWith("/products/1");
    expect(result).toEqual(product);
  });

  it("fetchOrders should fetch orders", async () => {
    const orders: Order[] = [
      {
        _id: "1",
        totalPrice: 200,
        items: [],
        user: "",
        status: "pending",
        createdAt: "",
        updatedAt: "",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: orders });

    const result = await fetchOrders("token");
    expect(mockedAxios.get).toHaveBeenCalledWith("/orders", {
      headers: { Authorization: "Bearer token" },
    });
    expect(result).toEqual(orders);
  });

  it("placeOrder should place an order", async () => {
    const order: Order = {
      _id: "1",
      totalPrice: 200,
      items: [],
      user: "",
      status: "pending",
      createdAt: "",
      updatedAt: "",
    };
    mockedAxios.post.mockResolvedValue({ data: order });

    const result = await placeOrder("token");
    expect(mockedAxios.post).toHaveBeenCalledWith("/orders", null, {
      headers: { Authorization: "Bearer token" },
    });
    expect(result).toEqual(order);
  });

  it("getOrderById should fetch an order by ID", async () => {
    const order: Order = {
      _id: "1",
      totalPrice: 200,
      items: [],
      user: "",
      status: "pending",
      createdAt: "",
      updatedAt: "",
    };
    mockedAxios.get.mockResolvedValue({ data: order });

    const result = await getOrderById("1");
    expect(mockedAxios.get).toHaveBeenCalledWith("/orders/1");
    expect(result).toEqual(order);
  });

  it("registerUser should register a user", async () => {
    mockedAxios.post.mockResolvedValue({});

    await registerUser({
      name: "User",
      email: "user@test.com",
      password: "password",
    });
    expect(mockedAxios.post).toHaveBeenCalledWith("/user/signup", {
      name: "User",
      email: "user@test.com",
      password: "password",
    });
  });

  it("loginUser should login a user", async () => {
    const user: User = {
      _id: "1",
      name: "User",
      email: "user@test.com",
      token: "token",
      role: "user",
    };
    mockedAxios.post.mockResolvedValue({ data: user });

    const result = await loginUser("user@test.com", "password");
    expect(mockedAxios.post).toHaveBeenCalledWith("/user/login", {
      email: "user@test.com",
      password: "password",
    });
    expect(result).toEqual(user);
  });

  it("getCart should fetch the cart", async () => {
    const cart: Cart = { _id: "1", user: "1", items: [], total: 0 };
    mockedAxios.get.mockResolvedValue({ data: cart });

    const result = await getCart("token");
    expect(mockedAxios.get).toHaveBeenCalledWith("/cart", {
      headers: { Authorization: "Bearer token" },
    });
    expect(result).toEqual(cart);
  });

  it("addToCart should add a product to the cart", async () => {
    const cart: Cart = { _id: "1", user: "1", items: [], total: 0 };
    mockedAxios.post.mockResolvedValue({ data: cart });

    const result = await addToCart("1", "token");
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/cart/items",
      { product: "1", quantity: 1 },
      { headers: { Authorization: "Bearer token" } }
    );
    expect(result).toEqual(cart);
  });

  it("removeFromCart should remove a product from the cart", async () => {
    const cart: Cart = { _id: "1", user: "1", items: [], total: 0 };
    mockedAxios.delete.mockResolvedValue({ data: cart });

    const result = await removeFromCart("1", "token");
    expect(mockedAxios.delete).toHaveBeenCalledWith("/cart/items/1", {
      headers: { Authorization: "Bearer token" },
    });
    expect(result).toEqual(cart);
  });

  it("clearCart should clear the cart", async () => {
    const cart: Cart = { _id: "1", user: "1", items: [], total: 0 };
    mockedAxios.put.mockResolvedValue({ data: cart });

    const result = await clearCart("token");
    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/cart/items",
      { items: [] },
      { headers: { Authorization: "Bearer token" } }
    );
    expect(result).toEqual(cart);
  });

  it("loginAdmin should login an admin", async () => {
    const user: User = {
      _id: "1",
      name: "Admin",
      email: "admin@test.com",
      token: "token",
      role: "admin",
    };
    mockedAxios.post.mockResolvedValue({ data: user });

    const result = await loginAdmin("admin@test.com", "password");
    expect(mockedAxios.post).toHaveBeenCalledWith("/admin/login", {
      email: "admin@test.com",
      password: "password",
    });
    expect(result).toEqual(user);
  });
});
