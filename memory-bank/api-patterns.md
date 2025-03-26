# API & Data Handling Patterns

Version: 1.1.0
Last Updated: 2025-03-26 10:34:25
Status: 🟢 Active
Related Files: systemPatterns.md, decisionLog.md, technical-debt.md

## Local Data Management 📝

### JSON Data Structure

```typescript
// Card schema
interface Card {
  id: string;
  category: string;
  text: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Category schema
interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

// User progress schema
interface UserProgress {
  cardId: string;
  status: "unseen" | "seen" | "favorited" | "completed";
  lastSeenAt: string;
}
```

### Data Loading Strategy

- Load JSON data on app initialization
- Store in Redux with AsyncStorage persistence
- Normalize data for efficient access
- Batch updates for performance

## Offline-First Approach 🌐

### Implementation

- Local-first data operations
- Optimistic UI updates
- Background synchronization (future)
- Conflict resolution strategies (future)

### Storage Strategy

- Redux Persist for app state
- AsyncStorage for user preferences
- FileSystem for larger assets (future)
- Selective persistence for performance

## Future API Integration 🔄

### RTK Query Implementation

```typescript
// Example RTK Query service
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Cards", "Categories"],
  endpoints: (builder) => ({
    getCards: builder.query<Card[], void>({
      query: () => "cards",
      providesTags: ["Cards"],
    }),
    addCard: builder.mutation<Card, Partial<Card>>({
      query: (card) => ({
        url: "cards",
        method: "POST",
        body: card,
      }),
      invalidatesTags: ["Cards"],
    }),
  }),
});

export const { useGetCardsQuery, useAddCardMutation } = cardsApi;
```

### Data Synchronization

- Periodic background syncing
- Differential updates
- Merge strategies for conflicts
- Queue for offline operations

## JSON Import/Export 📤 📥

### Import Implementation

- File picker integration
- Schema validation with Zod
- Data migration for version differences
- Merge options for existing data

```typescript
// Example import validation
import { z } from "zod";

const CardSchema = z.object({
  id: z.string().uuid(),
  category: z.string(),
  text: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const CardsImportSchema = z.array(CardSchema);

function validateImport(data: unknown) {
  return CardsImportSchema.safeParse(data);
}
```

### Export Implementation

- Full data export
- Selective category export
- Format options (JSON, CSV)
- Share functionality

## Performance Considerations 🚀

### Strategies

- Data normalization in Redux store
- Selective persistence
- Batch updates for multiple changes
- Memoized selectors for derived data

### Optimization Techniques

- Virtualized lists for large datasets
- Lazy loading for card content
- Progressive loading for images
- Incremental updates to storage
