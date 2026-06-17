import RestaurantCard from "../RestaurantCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Restaurant Card Test Cases", () => {
  it("should load restaurant card component", () => {
    render(<RestaurantCard />);

    const heading = screen.getByText("heading");
    // Assertion
    expect(heading).toBeInTheDocument();
  });
});
