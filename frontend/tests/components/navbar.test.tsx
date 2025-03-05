import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, Mock } from 'vitest';
import Navbar from 'components/Navbar';
import { useUserStore } from 'store/userStore';

vi.mock('store/userStore');

const mockedUseUserStore = useUserStore as unknown as Mock;

describe('Navbar', () => {
  it('renders correctly for logged-out users', () => {
    mockedUseUserStore.mockReturnValue({ user: null, logout: vi.fn() });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders correctly for logged-in users', () => {
    mockedUseUserStore.mockReturnValue({ user: { name: 'Test User' }, logout: vi.fn() });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/orders/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('shows logout confirmation dialog when logout button is clicked', () => {
    const mockLogout = vi.fn();
    mockedUseUserStore.mockReturnValue({ user: { name: 'Test User' }, logout: mockLogout });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/logout/i));
    expect(screen.getByText(/are you sure you want to log out/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/yes/i));
    expect(mockLogout).toHaveBeenCalled();
  });
});