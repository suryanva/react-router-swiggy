import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

describe("Header Component Test Cases", () => {
  it("should load the header with a login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    //Assertion
    const loginButton = screen.getByRole("button", {
      name: "Login",
    });

    // const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  it("should load the header with a cart items Zero", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    //Assertion
    const cartItem = screen.getByText(/Cart/);

    // const loginButton = screen.getByText("Login");
    expect(cartItem).toBeInTheDocument();
  });

  it("should change Login Button to Logout on Click", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Click on Login Button
    const loginButton = screen.getByRole("button", {
      name: "Login",
    });

    fireEvent.click(loginButton);

    // Assertion
    const logoutButton = screen.getByRole("button", {
      name: "Logout",
    });

    expect(logoutButton).toBeInTheDocument();
  });


  
});
