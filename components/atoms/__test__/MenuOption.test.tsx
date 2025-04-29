import { MenuOption } from "../MenuOption";
import { fireEvent, render } from "@testing-library/react-native";

test("MenuOption renders correctly", () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
        <MenuOption onSelect={mockOnSelect}>Option</MenuOption>
    );

    expect(getByText("Option")).toBeTruthy();

    fireEvent.press(getByText("Option"));

});

test("MenuOption calls onSelect when pressed", () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
        <MenuOption onSelect={mockOnSelect}>Option</MenuOption>
    );

    fireEvent.press(getByText("Option"));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
});

test("MenuOption renders children correctly", () => {
    const { getByText } = render(
        <MenuOption onSelect={() => { }}>Test Child</MenuOption>
    );

    expect(getByText("Test Child")).toBeTruthy();
});