import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Navbar from "components/navbar";
import useCartStore from "store/cartStore";
import useUserStore from "store/userStore";
import { logoutUser } from "services/userService";

vi.mock("services/userService", () => ({
  logoutUser: vi.fn(),
}));

vi.mock("components/cartIcon", () => ({
  default: () => <a href="/cart">Cart (0)</a>,
}));

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe("Navbar", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
    useUserStore.setState({ user: null });
    useCartStore.setState({ cart: { _id: "", user: "", items: [], total: 0 } });
  });

  it("renders the logged-out navigation", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /sweet bites home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute(
      "href",
      "/login"
    );
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute(
      "href",
      "/cart"
    );
  });

  it("renders the logged-in navigation", () => {
    useUserStore.setState({
      user: {
        _id: "user-1",
        name: "Test User",
        email: "test@example.com",
        token: "token",
        role: "user",
      },
    });

    renderNavbar();

    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute(
      "href",
      "/dashboard"
    );
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("confirms logout before signing out", () => {
    useUserStore.setState({
      user: {
        _id: "user-1",
        name: "Test User",
        email: "test@example.com",
        token: "token",
        role: "user",
      },
    });

    renderNavbar();

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(
      screen.getByText(/are you sure you want to log out/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /yes/i }));
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
});
