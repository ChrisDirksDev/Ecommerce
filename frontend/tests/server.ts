import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Define API request mocks
export const handlers = [
  http.get("/api/products", async () => {
    return HttpResponse.json([
      { id: 1, name: "Product A", price: 19.99 },
      { id: 2, name: "Product B", price: 29.99 },
    ]);
  }),
];

export const server = setupServer(...handlers);
