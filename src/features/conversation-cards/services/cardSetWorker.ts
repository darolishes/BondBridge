import { CardSetValidator } from "./CardSetValidator";
import type { CardSet, CardSetImportProgress } from "@common/types/card";

interface WorkerMessage {
  type: "import";
  file: string | ArrayBuffer;
}

interface WorkerResponse {
  type: "progress" | "complete" | "error";
  data: CardSet | CardSetImportProgress | Error;
}

const validator = new CardSetValidator();

const sendProgress = (
  progress: number,
  total: number,
  status: CardSetImportProgress["status"]
) => {
  self.postMessage({
    type: "progress",
    data: {
      current: progress,
      total,
      status,
    },
  } as WorkerResponse);
};

const importCardSet = async (file: string | ArrayBuffer) => {
  try {
    // Parse JSON
    sendProgress(0, 100, "parsing");
    const content =
      typeof file === "string" ? file : new TextDecoder().decode(file);
    const data = JSON.parse(content);

    // Validate structure
    sendProgress(30, 100, "validating");
    const validationResult = validator.validate(data);

    if (!validationResult.isValid) {
      throw new Error(validator.summarizeErrors(validationResult));
    }

    // Process cards
    sendProgress(60, 100, "importing");
    const cardSet = data as CardSet;

    // Add timestamps if missing
    const now = new Date().toISOString();
    if (!cardSet.created) cardSet.created = now;
    if (!cardSet.lastModified) cardSet.lastModified = now;

    cardSet.cards = cardSet.cards.map((card) => ({
      ...card,
      created: card.created || now,
      lastModified: card.lastModified || now,
    }));

    // Calculate metadata
    const categories = new Set<string>();
    let minDifficulty = 5;
    let maxDifficulty = 1;
    const tags = new Set<string>();

    cardSet.cards.forEach((card) => {
      categories.add(card.category);
      minDifficulty = Math.min(minDifficulty, card.difficulty);
      maxDifficulty = Math.max(maxDifficulty, card.difficulty);
      card.tags?.forEach((tag) => tags.add(tag));
    });

    cardSet.metadata = {
      totalCards: cardSet.cards.length,
      categories: Array.from(categories),
      difficultyRange: {
        min: minDifficulty,
        max: maxDifficulty,
      },
      tags: Array.from(tags),
    };

    // Import complete
    sendProgress(100, 100, "complete");
    self.postMessage({
      type: "complete",
      data: cardSet,
    } as WorkerResponse);
  } catch (error) {
    self.postMessage({
      type: "error",
      data:
        error instanceof Error
          ? error
          : new Error("Unknown error during import"),
    } as WorkerResponse);
  }
};

self.addEventListener("message", (event: MessageEvent<WorkerMessage>) => {
  if (event.data.type === "import") {
    importCardSet(event.data.file);
  }
});
