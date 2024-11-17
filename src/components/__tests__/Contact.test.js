import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Cases", () => {
  test("Should load contact us Component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");
    //Assertion
    expect(heading).toBeInTheDocument();
  });

  test("Should load button inside Contact Component", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");
    //Assertion
    expect(button).toBeInTheDocument();
  });

  test("Should load input field inside Contact Component", () => {
    render(<Contact />);

    const input = screen.getByText("Name:");
    //Assertion
    expect(input).toBeInTheDocument();
  });

  it("Should load input field inside Contact Component", () => {
    render(<Contact />);

    const input = screen.getByText("Email:");
    //Assertion
    expect(input).toBeInTheDocument();
  });

  it("Should load two input fields inside Contact Component", () => {
    render(<Contact />);
    //Querying
    const inputs = screen.getAllByRole("textbox");
    //Assertion
    expect(inputs).toHaveLength(3);
  });
});
