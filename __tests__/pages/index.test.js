/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "@pages/index";

describe("Index", () => {
  it("should render the welcome message", () => {
    render(<Index />);

    const welcome = screen.getByText(/Welcome Home/i);
    expect(welcome).toBeInTheDocument();
  });

  it("should render the aside nav bar", () => {
    render(<Index />);

    const welcome = screen.getByText(/Welcome Home/i);
    expect(welcome).toBeInTheDocument();
  });
});
