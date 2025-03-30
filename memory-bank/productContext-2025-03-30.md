# Product Context - 2025-03-30

Version: 2.0.0
Last Update: 2025-03-30 19:59:05
Status: 🟢 Active

## Goal 🎯

Mobile app to promote communication between couples through conversation cards with offline functionality.

## Core Features (MVP) ⭐

| Feature                | Status | Description                               |
| ---------------------- | ------ | ----------------------------------------- |
| **Conversation Cards** | 🟡     | Simple card view with swipe functionality |
| **Categories**         | 🟡     | Basic filtering by 6 categories           |
| **External Card Sets** | 🟡     | Simple integration of JSON files          |
| **Offline Mode**       | 🟡     | Basic functionality without internet      |

## Future Features (Post-MVP) 🔮

| Feature                 | Priority  | Description                                   |
| ----------------------- | --------- | --------------------------------------------- |
| **Difficulty Levels**   | 🔆 Medium | 5-level Progressive Intimacy                  |
| **Follow-up Questions** | 🔆 Medium | Additional questions for deeper conversations |
| **Favorites**           | 🔽 Low    | Save particularly valuable cards              |
| **Dark Mode**           | 🔽 Low    | Optimized mode for evening use                |
| **Complex Animation**   | 🔽 Low    | Enhanced visual effects and feedback          |

## Development Phases 🔄

| Phase           | Timeline    | Core Focus                          | Status            |
| --------------- | ----------- | ----------------------------------- | ----------------- |
| **MVP**         | Q2 2025     | Simple Cards, Basic Navigation      | 🟡 In Development |
| **Extension**   | Mid Q3 2025 | Improved UX, Extended Functions     | 📋 Planned        |
| **1.0 Release** | End Q3 2025 | Performance, Stability              | 📋 Planned        |
| **Future**      | Q4 2025+    | New Features based on User Feedback | 💡 Concept        |

## MVP Milestones ⚡

| Feature                | Status            | Deadline   |
| ---------------------- | ----------------- | ---------- |
| **Project Setup**      | ✅ Completed      | -          |
| **Simple Card View**   | 🟡 In Development | Week 19    |
| **Basic Navigation**   | 🟡 In Development | Week 19    |
| **Category Filter**    | 🟡 In Development | Week 20    |
| **External Card Sets** | 📅 Pending        | Week 21-22 |

## Feature Roadmap 📊

### Phase 1: MVP (Q2 2025)

- **Minimal, Functional App**

  - Simple card view with basic navigation
  - Simple category filtering
  - Basic offline functionality
  - External card set integration (base version)

### Phase 2: Extensions (Mid Q3 2025)

- **Improved Functionality**

  - Enhanced swipe functions and animations
  - Difficulty filters
  - Follow-up questions for cards

- **Improved User Experience**
  - More intuitive user interface
  - Better feedback for user actions

### Phase 3: Release (End Q3 2025)

- **Stability and Performance**
  - Comprehensive testing
  - Performance optimization
  - Bug fixing

## Technology (MVP) 🔧

- **Framework**: React Native with Expo
- **State**: Simple State Management
- **Validation**: Basic Type Definitions
- **File System**: react-native-fs for Card Sets

## Data Model (Central Definition) 📊

```typescript
// Base model for the entire app
type CardCategory =
  | "icebreakers"
  | "confessions"
  | "personality"
  | "deep-thoughts"
  | "intimacy"
  | "growth";

type ConversationCard = {
  id: string;
  question: string;
  followUpQuestions?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: CardCategory;
};

type ExternalCardSet = {
  id: string;
  name: string;
  description: string;
  version: string;
  cards: ConversationCard[];
};
```

## User Flows (MVP) 👤

1. **Card Interaction**: Simple browsing through conversation cards
2. **Filtering**: Basic filtering by category
3. **Card Sets**: Simple integration of external card sets

## External Card Set Integration (MVP) 🔄

- Simple import mechanism for JSON files
- Basic format validation
- Integration into the card collection

## Technical Requirements (MVP) 📋

- Simple, functional UI without complex animations
- Basic offline functionality
- Minimalistic, user-friendly interface
- Focus on stability and core functions
