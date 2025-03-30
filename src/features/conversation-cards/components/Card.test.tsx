import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "@theme/ThemeProvider";
import { Card } from "./Card";

const testCard = {
  id: "test1",
  question: "Testfrage",
  category: "icebreakers",
  difficulty: 3,
  created: new Date().toISOString(),
};

describe("Card Component", () => {
  it("should render basic card", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Card card={testCard} isActive={true} />
      </ThemeProvider>
    );

    expect(getByText("Testfrage")).toBeTruthy();
  });
});
