import React from "react";
import { Card } from "./Card";
import { ThemeProvider } from "@theme/ThemeProvider";

const testCard = {
  id: "test1",
  question: "Testfrage",
  category: "icebreakers" as const,
  difficulty: 3,
  created: new Date().toISOString(),
};

export default {
  title: "Cards/Card",
  component: Card,
  decorators: [
    (Story: React.FC) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const Default = () => <Card card={testCard} isActive={true} />;
export const WithFollowUps = () => (
  <Card
    card={{
      ...testCard,
      followUpQuestions: ["Frage 1", "Frage 2"],
    }}
    isActive={true}
  />
);
