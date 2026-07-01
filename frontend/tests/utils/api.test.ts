import { afterEach, describe, expect, it, vi } from "vitest";
import axios from "api/axiosConfig";
import { getProducts, getProductById } from "api/products";
import { getOrders, getOrderById, placeOrder } from "api/order";
import { loginUser, registerUser } from "api/user";
import { getCart, addToCart, removeFromCart, clearCart } from "api/cart";
import { loginAdmin } from "api/admin";
import { Cart, Order, Product, User } from "types";

vi.mock("api/axiosConfig", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("utils", () => ({
  authHeader: vi.fn(() => ({ headers: { Authorization: "Bearer token" } })),
}));

const mockedAxios = vi.mocked(axios);

const product: Product = {
  _id: "product-1",
  name: "Product 1",
  price: 100,
  imageUrl: "http://example.com/image.jpg",
  description: "Description",
  category: "cookies",
};

const order: Order = {
  _id: "order-1",
  totalPrice: 200,
  items: [],
  user: "user-1",
  status: "pending",
  createdAt: "",
  updatedAt: "",
};

const cart: Cart = { _id: "cart-1", user: "user-1", items: [], total: 0 };

const user: User = {
  _id: "user-1",
  name: "User",
  email: "user@test.com",
  token: "token",
  role: "user",
};

describe("API modules", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches products", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [product] });

    await expect(getProducts()).resolves.toEqual([product]);
    expect(mockedAxios.get).toHaveBeenCalledWith("/products");
  });

  it("fetches a product by id", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: product });

    await expect(getProductById(product._id)).resolves.toEqual(product);
    expect(mockedAxios.get).toHaveBeenCalledWith(`/products/${product._id}`);
  });

  it("places and fetches orders with auth headers", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [order] });
    mockedAxios.post.mockResolvedValueOnce({ data: order });
    mockedAxios.get.mockResolvedValueOnce({ data: order });

    await expect(getOrders()).resolves.toEqual([order]);
    await expect(placeOrder()).resolves.toEqual(order);
    await expect(getOrderById(order._id)).resolves.toEqual(order);

    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "/orders", {
      headers: { Authorization: "Bearer token" },
    });
    expect(mockedAxios.post).toHaveBeenCalledWith("/orders", null, {
      headers: { Authorization: "Bearer token" },
    });
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, `/orders/${order._id}`, {
      headers: { Authorization: "Bearer token" },
    });
  });

  it("registers and logs in users", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: user });
    mockedAxios.post.mockResolvedValueOnce({ data: user });

    await expect(
      registerUser(user.name, user.email, "password")
    ).resolves.toEqual(user);
    await expect(loginUser(user.email, "password")).resolves.toEqual(user);

    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      1,
      "/user/signup",
      { name: user.name, email: user.email, password: "password" },
      { headers: { Authorization: "Bearer token" } }
    );
    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      2,
      "/user/login",
      { email: user.email, password: "password" },
      { headers: { Authorization: "Bearer token" } }
    );
  });

  it("reads and mutates the cart with auth headers", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: cart });
    mockedAxios.post.mockResolvedValueOnce({ data: cart });
    mockedAxios.delete.mockResolvedValueOnce({ data: cart });
    mockedAxios.put.mockResolvedValueOnce({ data: cart });

    await expect(getCart()).resolves.toEqual(cart);
    await expect(addToCart(product._id, 2)).resolves.toEqual(cart);
    await expect(removeFromCart(product._id)).resolves.toEqual(cart);
    await expect(clearCart()).resolves.toEqual(cart);

    expect(mockedAxios.get).toHaveBeenCalledWith("/cart", {
      headers: { Authorization: "Bearer token" },
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/cart/items",
      { product: product._id, quantity: 2 },
      { headers: { Authorization: "Bearer token" } }
    );
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `/cart/items/${product._id}`,
      { headers: { Authorization: "Bearer token" } }
    );
    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/cart/items",
      { items: [] },
      { headers: { Authorization: "Bearer token" } }
    );
  });

  it("logs in admins", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: user });

    await expect(loginAdmin("admin@test.com", "password")).resolves.toEqual(
      user
    );
    expect(mockedAxios.post).toHaveBeenCalledWith("/admin/login", {
      email: "admin@test.com",
      password: "password",
    });
  });
});
