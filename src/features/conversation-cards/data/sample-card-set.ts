import { CardSet } from "../types";

/**
 * Sample card set for testing integration of external card sets
 */
export const sampleCardSet: CardSet = {
  id: "sample-love-cards",
  name: "Liebevolle Gespräche",
  description:
    "Eine Sammlung von Fragen, um die Liebe und Beziehung zu vertiefen",
  cards: [
    {
      id: "love-1",
      question: "Was war der Moment, in dem du dich in mich verliebt hast?",
      category: "intimacy",
      difficulty: 3,
      created: new Date(),
    },
    {
      id: "love-2",
      question: "Wie fühlst du dich am meisten geliebt von mir?",
      category: "intimacy",
      difficulty: 4,
      followUpQuestions: [
        "Was kann ich tun, um dir noch mehr das Gefühl zu geben, geliebt zu werden?",
      ],
      created: new Date(),
    },
    {
      id: "love-3",
      question:
        "Welche kleinen Gesten schätzt du am meisten in unserer Beziehung?",
      category: "intimacy",
      difficulty: 2,
      created: new Date(),
    },
    {
      id: "love-4",
      question:
        "Was würdest du gerne gemeinsam mit mir erleben oder erreichen?",
      category: "growth",
      difficulty: 3,
      followUpQuestions: [
        "Wie können wir uns gegenseitig unterstützen, um dieses Ziel zu erreichen?",
      ],
      created: new Date(),
    },
    {
      id: "love-5",
      question:
        "Wann hast du dich in unserer Beziehung am verletzlichsten gefühlt?",
      category: "deepThoughts",
      difficulty: 5,
      followUpQuestions: [
        "Wie habe ich in diesem Moment reagiert?",
        "Was hätte ich anders machen können?",
      ],
      created: new Date(),
    },
  ],
  version: "1.0.0",
  author: "BondBridge Team",
  created: new Date(2025, 0, 1),
  modified: new Date(),
};

/**
 * Sample friendship card set
 */
export const friendshipCardSet: CardSet = {
  id: "sample-friendship-cards",
  name: "Freundschaftsfragen",
  description:
    "Fragen, um Freundschaften zu vertiefen und neue Seiten zu entdecken",
  cards: [
    {
      id: "friend-1",
      question: "Was schätzt du am meisten an unserer Freundschaft?",
      category: "personality",
      difficulty: 2,
      created: new Date(),
    },
    {
      id: "friend-2",
      question: "Welches gemeinsame Erlebnis hat dich am meisten geprägt?",
      category: "icebreakers",
      difficulty: 1,
      created: new Date(),
    },
    {
      id: "friend-3",
      question:
        "Was würdest du gerne mit mir unternehmen, was wir noch nie gemacht haben?",
      category: "growth",
      difficulty: 2,
      created: new Date(),
    },
    {
      id: "friend-4",
      question: "In welchen Situationen kannst du am besten auf mich zählen?",
      category: "personality",
      difficulty: 3,
      created: new Date(),
    },
    {
      id: "friend-5",
      question: "Was denkst du, ist der größte Unterschied zwischen uns?",
      category: "personality",
      difficulty: 3,
      followUpQuestions: ["Wie ergänzen wir uns durch diese Unterschiede?"],
      created: new Date(),
    },
  ],
  version: "1.0.0",
  author: "BondBridge Team",
  created: new Date(2025, 0, 15),
  modified: new Date(),
};

/**
 * Sample self-reflection card set
 */
export const selfReflectionCardSet: CardSet = {
  id: "sample-self-reflection",
  name: "Selbstreflexion",
  description: "Fragen zur persönlichen Entwicklung und Selbsterkenntnis",
  cards: [
    {
      id: "self-1",
      question: "Was sind drei Stärken, die du an dir selbst schätzt?",
      category: "personality",
      difficulty: 3,
      created: new Date(),
    },
    {
      id: "self-2",
      question: "Welche persönliche Eigenschaft würdest du gerne verbessern?",
      category: "growth",
      difficulty: 4,
      followUpQuestions: [
        "Welche konkreten Schritte könntest du unternehmen, um daran zu arbeiten?",
      ],
      created: new Date(),
    },
    {
      id: "self-3",
      question:
        "Was ist ein Ziel, das du in den nächsten 5 Jahren erreichen möchtest?",
      category: "growth",
      difficulty: 3,
      created: new Date(),
    },
    {
      id: "self-4",
      question:
        "Wann hast du zuletzt etwas getan, das dich aus deiner Komfortzone gebracht hat?",
      category: "growth",
      difficulty: 2,
      created: new Date(),
    },
    {
      id: "self-5",
      question:
        "Wovor hast du am meisten Angst, wenn du an deine Zukunft denkst?",
      category: "deepThoughts",
      difficulty: 5,
      followUpQuestions: ["Wie könntest du mit dieser Angst umgehen?"],
      created: new Date(),
    },
  ],
  version: "1.0.0",
  author: "BondBridge Team",
  created: new Date(2025, 1, 10),
  modified: new Date(),
};

export default {
  sampleCardSet,
  friendshipCardSet,
  selfReflectionCardSet,
};
