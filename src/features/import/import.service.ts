import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import type { CardSet, ImportResult, ImportedCardSet } from '@types';
import { validateCardSet } from './validation';

const CARD_SETS_DIR = `${RNFS.DocumentDirectoryPath}/card-sets`;

// Ensure the card sets directory exists
const ensureDirectory = async (): Promise<void> => {
  const exists = await RNFS.exists(CARD_SETS_DIR);
  if (!exists) {
    await RNFS.mkdir(CARD_SETS_DIR);
  }
};

// Generate a unique filename for the imported set
const generateUniqueFilename = (packageName: string): string => {
  const timestamp = new Date().getTime();
  return `${packageName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
};

export const importCardSet = async (): Promise<ImportResult> => {
  try {
    // Pick a JSON file
    const result: DocumentPickerResponse[] = await DocumentPicker.pick({
      type: ['application/json'],
      copyTo: 'cachesDirectory',
    });

    const file = result[0];
    if (!file.fileCopyUri) {
      throw new Error('Failed to copy file');
    }

    // Read and parse the JSON file
    const content = await RNFS.readFile(file.fileCopyUri, 'utf8');
    const data = JSON.parse(content);

    // Validate the card set
    const validation = validateCardSet(data);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const cardSet = data as CardSet;

    // Ensure directory exists
    await ensureDirectory();

    // Generate unique filename and save
    const filename = generateUniqueFilename(cardSet.packageName);
    const destinationPath = `${CARD_SETS_DIR}/${filename}`;

    await RNFS.copyFile(file.fileCopyUri, destinationPath);

    // Create imported card set with metadata
    const importedSet: ImportedCardSet = {
      ...cardSet,
      importedAt: new Date().toISOString(),
      path: destinationPath,
    };

    return {
      success: true,
      data: importedSet,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FILE_ERROR',
        message: 'Failed to import card set',
        details: error,
      },
    };
  }
};

export const listImportedSets = async (): Promise<ImportedCardSet[]> => {
  try {
    await ensureDirectory();
    const files = await RNFS.readDir(CARD_SETS_DIR);
    const jsonFiles = files.filter(file => file.name.endsWith('.json'));

    const sets = await Promise.all(
      jsonFiles.map(async file => {
        const content = await RNFS.readFile(file.path, 'utf8');
        const data = JSON.parse(content) as CardSet;
        return {
          ...data,
          importedAt: file.mtime?.toISOString() ?? new Date().toISOString(),
          path: file.path,
        };
      })
    );

    return sets;
  } catch (error) {
    console.error('Failed to list imported sets:', error);
    return [];
  }
};
