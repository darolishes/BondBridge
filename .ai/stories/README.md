# BondBridge User Stories

This directory contains the user stories for the BondBridge application. Each story is organized by Epic and follows the Agile methodology for tracking implementation progress.

## Current Epics

|       Epic ID       | Title                                 | Status     | Stories |
| :-----------------: | :------------------------------------ | :--------- | :-----: |
| [Epic-1](./epic-1/) | User Onboarding & Profile             | Planned    |   1/4   |
| [Epic-2](./epic-2/) | Core Conversation Cards Functionality | InProgress |   3/4   |
| [Epic-3](./epic-3/) | Conversation Progress Tracking        | Planned    |   1/4   |
| [Epic-4](./epic-4/) | External Card Set Integration         | Planned    |   1/4   |

## Current Stories

|               Story ID                | Title              | Epic                |   Status   | Story Points |
| :-----------------------------------: | :----------------- | :------------------ | :--------: | :----------: |
| [Epic-1 Story-1](./epic-1/story-1.md) | Welcome Experience | [Epic-1](./epic-1/) |  Planned   |      2       |
| [Epic-2 Story-1](./epic-2/story-1.md) | Card Component     | [Epic-2](./epic-2/) | InProgress |      3       |
| [Epic-2 Story-2](./epic-2/story-2.md) | Card Navigation    | [Epic-2](./epic-2/) |   Draft    |      2       |
| [Epic-2 Story-3](./epic-2/story-3.md) | Category Filtering | [Epic-2](./epic-2/) |  Planned   |      2       |
| [Epic-3 Story-2](./epic-3/story-2.md) | Favorite Cards     | [Epic-3](./epic-3/) |  Planned   |      2       |
| [Epic-4 Story-1](./epic-4/story-1.md) | Card Set Import    | [Epic-4](./epic-4/) |  Planned   |      3       |

## Story Structure

Each story follows a consistent format:

- **User Story**: As a [user], I want [feature] so that [benefit]
- **Context**: Background information about the story
- **Tasks**: Detailed implementation tasks with checkboxes
- **Constraints**: Requirements and limitations
- **Data Models**: Relevant data structures
- **Structure**: File organization
- **Diagrams**: Visual representations where applicable
- **Dev Notes**: Technical guidance for implementation
- **Implementation Updates**: Progress notes

## Epic Overview

### [Epic-1: User Onboarding & Profile](./epic-1/)

This epic focuses on creating a smooth and engaging user onboarding experience and profile management. It includes:

- Creating an engaging welcome experience
- Implementing user profile creation and management
- Setting up user preferences
- Providing an interactive tutorial

### [Epic-2: Core Conversation Cards Functionality](./epic-2/)

This epic focuses on implementing the core feature of the application: the conversation cards. It includes:

- Creating the card component with proper styling
- Implementing navigation between cards
- Adding category filtering
- Supporting swipe interactions

### [Epic-3: Conversation Progress Tracking](./epic-3/)

This epic focuses on helping users track their conversation progress and history. It includes:

- Recording conversation history
- Implementing a favorites system
- Creating progress visualizations
- Setting up conversation reminders

### [Epic-4: External Card Set Integration](./epic-4/)

This epic focuses on allowing users to expand their conversation experience by importing external card sets. It includes:

- Implementing card set import functionality
- Creating card set export capabilities
- Designing a marketplace UI for discovering sets
- Ensuring proper validation of imported card sets

## Directory Structure

```
stories/
  ├── README.md (this file)
  ├── epic-1/
  │   ├── README.md (epic details)
  │   └── story-1.md (Welcome Experience)
  ├── epic-2/
  │   ├── README.md (epic details)
  │   ├── story-1.md (Card Component)
  │   ├── story-2.md (Card Navigation)
  │   └── story-3.md (Category Filtering)
  ├── epic-3/
  │   ├── README.md (epic details)
  │   └── story-2.md (Favorite Cards)
  └── epic-4/
      ├── README.md (epic details)
      └── story-1.md (Card Set Import)
```

## Adding New Stories

To add a new story, create a Markdown file in the appropriate epic directory following the established pattern:

```
# Epic-X - Story-Y: Title

**As a** [user]
**I want** [feature]
**so that** [benefit]

[... remaining sections ...]
```

Ensure you update:

1. The epic's README.md to include the new story in its table
2. This main README.md file to include the new story in the "Current Stories" table
