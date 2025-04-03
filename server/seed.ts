import { db } from './db';
import { cardThemes, cards, users, type InsertCardTheme, type InsertCard } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Seed function to populate the database with initial data
export async function seed() {
  try {
    console.log('Starting database seeding...');
    
    // Check if we already have card themes
    const existingThemes = await db.select().from(cardThemes);
    
    if (existingThemes.length === 0) {
      console.log('Seeding card themes...');
      await seedCardThemes();
    } else {
      console.log(`Found ${existingThemes.length} existing card themes, skipping theme seeding.`);
    }

    // Check if we already have cards
    const existingCards = await db.select().from(cards);
    
    if (existingCards.length === 0) {
      console.log('Seeding cards...');
      await seedCards();
    } else {
      console.log(`Found ${existingCards.length} existing cards, skipping card seeding.`);
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

async function seedCardThemes() {
  const sampleThemes: InsertCardTheme[] = [
    {
      name: "Connection",
      description: "Deepen relationships with meaningful conversations",
      color: "#ddbcea", // lavender
      order: 1
    },
    {
      name: "Reflection",
      description: "Explore your inner world and personal growth",
      color: "#D1E7FF", // light blue
      order: 2
    },
    {
      name: "Adventure",
      description: "Playful questions for fun and exploration",
      color: "#FFEEB3", // light yellow
      order: 3
    },
    {
      name: "Development",
      description: "Discover opportunities for personal development",
      color: "#a5e5d0", // mint green
      order: 4
    },
    {
      name: "Family",
      description: "Strengthen family bonds through conversation",
      color: "#FFCDD2", // light red
      order: 5
    },
    {
      name: "Work Life",
      description: "Professional and career-oriented questions",
      color: "#BBDEFB", // light blue
      order: 6
    },
    {
      name: "Intimacy",
      description: "Build deeper connections with loved ones",
      color: "#F8BBD0", // light pink
      order: 7
    },
    {
      name: "Childhood",
      description: "Revisit and share formative memories",
      color: "#DCEDC8", // light green
      order: 8
    },
    {
      name: "Future Dreams",
      description: "Explore aspirations and plans for tomorrow",
      color: "#B3E5FC", // sky blue
      order: 9
    },
    {
      name: "Values & Beliefs",
      description: "Discover what matters most to you",
      color: "#C8E6C9", // pale green
      order: 10
    }
  ];

  // Insert the themes in sequence
  for (const theme of sampleThemes) {
    await db.insert(cardThemes).values(theme);
  }

  console.log(`Inserted ${sampleThemes.length} card themes`);
}

async function seedCards() {
  // Get theme IDs first
  const themes = await db.select().from(cardThemes);
  const themeMap = new Map(themes.map(theme => [theme.name, theme.id]));

  const sampleCards: InsertCard[] = [
    // Original cards
    {
      content: "What would you change about yourself if you could change just one thing?",
      category: "Self-reflection",
      tag: "Personal Growth",
      difficulty: "Deep",
      themeId: themeMap.get("Reflection"),
      popularity: 5
    },
    {
      content: "Describe a moment when you felt truly understood by someone.",
      category: "Relationships",
      tag: "Relationships",
      difficulty: "Connecting",
      themeId: themeMap.get("Connection"),
      popularity: 7
    },
    {
      content: "If you could have dinner with anyone, living or dead, who would it be and why?",
      category: "Fun",
      tag: "Ice Breaker",
      difficulty: "Fun",
      themeId: themeMap.get("Adventure"),
      popularity: 8
    },
    {
      content: "What is your biggest regret, and how has it shaped who you are today?",
      category: "Self-reflection",
      tag: "Personal Growth",
      difficulty: "Deep",
      themeId: themeMap.get("Reflection"),
      popularity: 6
    },
    {
      content: "Tell me about someone who changed your perspective on life.",
      category: "Relationships",
      tag: "Relationships",
      difficulty: "Connecting",
      themeId: themeMap.get("Connection"),
      popularity: 6
    },
    {
      content: "What's a skill you wish you had mastered by now?",
      category: "Growth",
      tag: "Personal Growth",
      difficulty: "Deep",
      themeId: themeMap.get("Development"),
      popularity: 7
    },
    {
      content: "What is the kindest thing someone has ever done for you?",
      category: "Relationships",
      tag: "Gratitude",
      difficulty: "Connecting",
      themeId: themeMap.get("Connection"),
      popularity: 8
    },
    {
      content: "If you could live anywhere in the world for a year, where would you go?",
      category: "Fun",
      tag: "Dreams",
      difficulty: "Fun",
      themeId: themeMap.get("Adventure"),
      popularity: 9
    },
    
    // New cards for expanded categories
    {
      content: "What family tradition do you cherish the most?",
      category: "Family",
      tag: "Traditions",
      difficulty: "Medium",
      themeId: themeMap.get("Family"),
      popularity: 7
    },
    {
      content: "How has a family member shaped your values?",
      category: "Family",
      tag: "Values",
      difficulty: "Deep",
      themeId: themeMap.get("Family"),
      popularity: 6
    },
    {
      content: "What's a lesson you learned from work that changed your perspective?",
      category: "Work",
      tag: "Career Growth",
      difficulty: "Medium",
      themeId: themeMap.get("Work Life"),
      popularity: 7
    },
    {
      content: "How do you maintain work-life balance?",
      category: "Work",
      tag: "Balance",
      difficulty: "Medium",
      themeId: themeMap.get("Work Life"),
      popularity: 8
    },
    {
      content: "When did you feel most emotionally connected to someone?",
      category: "Intimacy",
      tag: "Connection",
      difficulty: "Deep",
      themeId: themeMap.get("Intimacy"),
      popularity: 6
    },
    {
      content: "What makes you feel safe in relationships?",
      category: "Intimacy",
      tag: "Safety",
      difficulty: "Deep",
      themeId: themeMap.get("Intimacy"),
      popularity: 7
    },
    {
      content: "What's your earliest childhood memory?",
      category: "Childhood",
      tag: "Memories",
      difficulty: "Medium",
      themeId: themeMap.get("Childhood"),
      popularity: 8
    },
    {
      content: "What toy or game from your childhood had the biggest impact on you?",
      category: "Childhood",
      tag: "Toys",
      difficulty: "Light",
      themeId: themeMap.get("Childhood"),
      popularity: 9
    },
    {
      content: "What does your ideal future look like in 10 years?",
      category: "Future",
      tag: "Dreams",
      difficulty: "Medium",
      themeId: themeMap.get("Future Dreams"),
      popularity: 7
    },
    {
      content: "What's one thing you want to accomplish before you die?",
      category: "Future",
      tag: "Bucket List",
      difficulty: "Medium",
      themeId: themeMap.get("Future Dreams"),
      popularity: 8
    },
    {
      content: "What's one desire you've never told anyone about?",
      category: "Desires",
      tag: "Secret Wishes",
      difficulty: "Deep",
      themeId: themeMap.get("Future Dreams"),
      popularity: 6
    },
    {
      content: "What values are most important to you and why?",
      category: "Values",
      tag: "Personal Values",
      difficulty: "Deep",
      themeId: themeMap.get("Values & Beliefs"),
      popularity: 7
    }
  ];

  // Filter out cards with undefined themeId
  const validCards = sampleCards.filter(card => card.themeId !== undefined);

  // Insert the cards in sequence
  for (const card of validCards) {
    await db.insert(cards).values(card);
  }

  console.log(`Inserted ${validCards.length} cards`);
}

// Export the seed function for importing elsewhere
export default seed;