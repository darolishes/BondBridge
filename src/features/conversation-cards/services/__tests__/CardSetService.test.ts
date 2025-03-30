import { BaseCardSetService, CardSetValidationError } from "../CardSetService";
import type { UploadCardSet } from "../../types";

class MockCardSetService extends BaseCardSetService {
  async uploadSet(): Promise<UploadCardSet> {
    return Promise.resolve({
      id: "test-set",
      name: "Test Set",
      description: "A test card set",
      cards: [
        {
          id: "card-1",
          question: "Test Question",
          category: "test",
          difficulty: 1,
        },
      ],
    });
  }
}

describe("CardSetService", () => {
  let service: MockCardSetService;

  beforeEach(() => {
    service = new MockCardSetService();
  });

  describe("validateSet", () => {
    it("sollte ein gültiges Kartenset akzeptieren", () => {
      const validSet: UploadCardSet = {
        id: "test-set",
        name: "Test Set",
        description: "A test card set",
        cards: [
          {
            id: "card-1",
            question: "Test Question",
            category: "test",
            difficulty: 1,
          },
        ],
      };

      expect(() => service.validateSet(validSet)).not.toThrow();
    });

    it("sollte bei fehlendem Namen einen Fehler werfen", () => {
      const invalidSet = {
        id: "test-set",
        description: "A test card set",
        cards: [],
      };

      expect(() => service.validateSet(invalidSet)).toThrow(
        CardSetValidationError
      );
    });

    it("sollte bei leeren Karten einen Fehler werfen", () => {
      const invalidSet = {
        id: "test-set",
        name: "Test Set",
        description: "A test card set",
        cards: [],
      };

      expect(() => service.validateSet(invalidSet)).toThrow(
        CardSetValidationError
      );
    });
  });

  describe("processUpload", () => {
    it("sollte den Upload-Status korrekt aktualisieren", async () => {
      const validSet: UploadCardSet = {
        id: "test-set",
        name: "Test Set",
        description: "A test card set",
        cards: [
          {
            id: "card-1",
            question: "Test Question",
            category: "test",
            difficulty: 1,
          },
        ],
      };

      await service.processUpload(validSet);
      const state = service.getUploadState();

      expect(state.status).toBe("success");
      expect(state.progress).toBe(100);
      expect(state.error).toBeNull();
    });

    it("sollte bei einem Fehler den Status korrekt setzen", async () => {
      const invalidSet = {} as UploadCardSet;

      try {
        await service.processUpload(invalidSet);
      } catch (error) {
        const state = service.getUploadState();
        expect(state.status).toBe("error");
        expect(state.error).toBeTruthy();
      }
    });
  });
});
