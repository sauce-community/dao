/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@components/Home";

// jest.mock("next/link", () => {
//   return ({ children }) => {
//     return children;
//   };
// });

describe("Home", () => {
  it("should render the welcome message", async () => {
    render(<Home />);

    const welcome = screen.getByText(/Welcome Home/i);
    expect(welcome).toBeInTheDocument();
  });

  it("should render the aside nav bar", async () => {
    render(<Home />);

    const asideNav = screen.getByTestId("aside-nav-bar");
    const links = await screen.findAllByRole("link");

    expect(asideNav).toBeInTheDocument();
    expect(links).toHaveLength(3);
  });

  it("aside links should redirect to other pages correctly", async () => {
    render(<Home />);

    const [vote, home, propose] = screen.queryAllByRole("link");

    expect(vote).toHaveAttribute("href", "/vote");
    expect(home).toHaveAttribute("href", "/");
    expect(propose).toHaveAttribute("href", "/propose");
  });
});
