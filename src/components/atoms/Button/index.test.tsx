import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("deve chamar a função onClick no primeiro clique", () => {
    const handleClick = jest.fn();
    render(<Button type="default" label="Clique Aqui" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /clique aqui/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
