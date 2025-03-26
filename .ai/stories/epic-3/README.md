# Epic-3: Conversation Progress Tracking

## Description

This epic focuses on helping users track their conversation progress and history within BondBridge. It includes features for recording conversation history, marking favorite cards, visualizing progress across different categories, and setting reminders for regular conversations.

## Business Value

Tracking conversation progress provides users with a sense of accomplishment and helps them see the value they're getting from the app over time. It encourages continued use by showing tangible progress in their relationship communication. Features like favorites and history make the app more useful as a long-term relationship tool rather than a one-time novelty.

## User Stories

|        Story ID         | Title                  | Status      | Story Points | Priority |
| :---------------------: | :--------------------- | :---------- | :----------: | :------: |
|         Story-1         | Conversation History   | Not Started |      3       |  Medium  |
| [Story-2](./story-2.md) | Favorite Cards         | Planned     |      2       |  Medium  |
|         Story-3         | Progress Visualization | Not Started |      3       |   Low    |
|         Story-4         | Conversation Reminders | Not Started |      2       |   Low    |

## Goals

- Create a system for tracking which cards have been viewed/discussed
- Implement a favorites system for marking and finding preferred cards
- Develop visualizations that show progress across different conversation categories
- Build a reminder system to encourage regular conversation sessions

## Technical Considerations

- Must work offline for core functionality
- Should use AsyncStorage for local data persistence
- Should leverage the theme system for consistent styling
- Visualizations should be performant and not overly complex
- Reminders should respect system permissions and user preferences

## Definition of Done

- All user stories are completed and tested
- Conversation history is accurately recorded and displayed
- Favorite cards can be marked, stored, and accessed
- Progress visualizations are informative and visually appealing
- Reminders function correctly and respect user settings
- All components follow established design guidelines

## Timeline

- Estimated Start: Week 21
- Estimated Completion: Week 24
