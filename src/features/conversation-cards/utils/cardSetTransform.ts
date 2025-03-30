import type { CardSet as StoreCardSet } from "../../../common/types/card";
import type { UploadCardSet } from "../types";

/**
 * Transformiert ein hochgeladenes Kartenset in das Speicherformat
 */
export function transformUploadedCardSet(
  uploadedSet: UploadCardSet
): StoreCardSet {
  const now = new Date().toISOString();

  return {
    id: uploadedSet.id,
    name: uploadedSet.name,
    description: uploadedSet.description,
    createdAt: now,
    cards: uploadedSet.cards.map((card) => ({
      ...card,
      created: now,
      updated: now,
      status: "unseen",
    })),
  };
}
