# Product Requirements Document

_BondBridge: Communication App for Couples_

Last Updated: 2025-03-31

## Project Goal

Mobile application designed to promote meaningful communication between couples through conversation cards with offline functionality.

## Target Timeline

| Phase       | Timeline    | Focus                              | Status            |
| ----------- | ----------- | ---------------------------------- | ----------------- |
| MVP         | Q2 2025     | Core card functionality            | 🟡 In Development |
| Extension   | Mid Q3 2025 | UX improvements, extended features | 📋 Planned        |
| Release 1.0 | End Q3 2025 | Performance, stability             | 📋 Planned        |
| Future      | Q4 2025+    | User feedback-based features       | 💡 Concept        |

## Core Features (MVP)

- **Conversation Cards**: Simple card interface with swipe functionality
- **Categories**: Filtering by 6 card categories
- **External Card Sets**: Integration of JSON-formatted card collections
- **Offline Mode**: Full functionality without internet connection

## Post-MVP Features

| Feature             | Priority | Description                                   |
| ------------------- | -------- | --------------------------------------------- |
| Difficulty Levels   | Medium   | 5-level progressive intimacy scale            |
| Follow-up Questions | Medium   | Additional questions for deeper conversations |
| Favorites           | Low      | Save particularly valuable cards              |
| Dark Mode           | Low      | Optimized interface for evening use           |
| Enhanced Animations | Low      | Improved visual effects and feedback          |

## Data Model

```typescript
type CardCategory =
  | 'icebreakers'
  | 'confessions'
  | 'personality'
  | 'deep-thoughts'
  | 'intimacy'
  | 'growth';

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

## User Flows

1. **Card Browsing**: Users swipe through cards to discover conversation topics
2. **Category Filtering**: Users select categories to focus conversation
3. **External Card Sets**: Users import custom card sets in JSON format

## Technical Requirements

- Cross-platform compatibility (iOS/Android)
- Simple, intuitive interface prioritizing readability
- Reliable offline functionality
- Minimal storage requirements
- Support for external content integration

---

_Document History:_

- 2025-03-31: Initial document created
