import { Default404Page } from "@repo/ui/layouts/404/not-found";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; 

describe('Default404Page', () => {
  it('renders the 404 heading', () => {
    render(<Default404Page />);
    expect(screen.getByRole('heading', { level: 1, name: /404/i })).toBeInTheDocument();
  });

  it('renders the "Something`s missing." paragraph', () => {
    render(<Default404Page />);
    expect(screen.getByText(/Something`s missing\./i)).toBeInTheDocument();
  });

  it('renders the "Sorry, we can`t find that page." paragraph', () => {
    render(<Default404Page />);
    expect(
      screen.getByText(
        /Sorry, we can`t find that page\. You`ll find lots to explore on the home page\./i
      )
    ).toBeInTheDocument();
  });

  it('renders a "Back to Homepage" button with the correct link', () => {
    render(<Default404Page />);
    const linkElement = screen.getByRole('link', { name: /Back to Homepage/i });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');

    // You can also check if the button itself is rendered within the link
    expect(screen.getByRole('button', { name: /Back to Homepage/i })).toBeInTheDocument();
  });
});