import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { it, expect, describe } from "vitest"; 
import CompsButton from "../../../src/shared/components/custom/_btn";
import React from "react";

describe("CompsButton", () => {
  
  // Test 1: Renders the button with provided children
  it("renders the button with provided children", () => {
    render(<CompsButton>Click Me</CompsButton>);
    const button = screen.getByText("Click Me"); 
    expect(button).toBeInTheDocument();
  });

  // Test 2: Calls onClick handler when clicked
  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn(); // Mock function
    render(<CompsButton onClick={handleClick}>Click Me</CompsButton>);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1); // Expect handler to be called once
  });

  // Test 3: Applies disabled state to the button
  it("renders the button as disabled when 'disabled' prop is passed", () => {
    render(<CompsButton disabled>Click Me</CompsButton>);
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled(); // Expect button to be disabled
  });

  // Test 4: Handles different types of button styles via className prop
  it("applies the correct class when className is provided", () => {
    render(<CompsButton className="btn-primary">Click Me</CompsButton>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("btn-primary"); // Expect the class to be present
  });

  // Test 5: Ensures no onClick call when button is disabled
  it("does not call onClick when the button is disabled", () => {
    const handleClick = vi.fn(); // Mock function
    render(<CompsButton onClick={handleClick} disabled>Click Me</CompsButton>);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled(); // Expect handler not to be called
  });

  // Test 6: Renders button with custom content (e.g., icons)
  it("renders the button with custom content", () => {
    render(
      <CompsButton>
        <span className="custom-icon" /> Click Me
      </CompsButton>
    );
    const button = screen.getByText("Click Me");
    const icon = button.querySelector(".custom-icon");
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument(); // Expect custom content to be rendered
  });
});
