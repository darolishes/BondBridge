const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CATEGORIES = ['default', 'basic', 'intimate', 'deep', 'growth'];
const SOURCE_DIR = path.join(__dirname, '../assets/images/source');
const OUTPUT_DIR = path.join(__dirname, '../assets/images');

const SIZES = {
  original: { width: 800, height: 600 },
  thumbnail: { width: 400, height: 300 },
};

async function ensureDirectories() {
  try {
    await fs.mkdir(SOURCE_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
    throw error;
  }
}

async function optimizeImage(inputPath, outputPath, size) {
  try {
    await sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
    throw error;
  }
}

async function processImages() {
  try {
    await ensureDirectories();

    // Check if source images exist
    const sourceFiles = await fs.readdir(SOURCE_DIR);
    if (sourceFiles.length === 0) {
      console.log('No source images found. Please add images to assets/images/source/');
      console.log('Required images:');
      CATEGORIES.forEach(category => {
        console.log(`- ${category}-set.png`);
      });
      return;
    }

    // Process each category
    for (const category of CATEGORIES) {
      const sourceFile = sourceFiles.find(file =>
        file.toLowerCase().startsWith(category.toLowerCase())
      );

      if (!sourceFile) {
        console.warn(`Warning: No source image found for category: ${category}`);
        continue;
      }

      const inputPath = path.join(SOURCE_DIR, sourceFile);

      // Generate original size
      await optimizeImage(inputPath, path.join(OUTPUT_DIR, `${category}-set.webp`), SIZES.original);

      // Generate thumbnail
      await optimizeImage(
        inputPath,
        path.join(OUTPUT_DIR, `${category}-set-thumb.webp`),
        SIZES.thumbnail
      );
    }

    console.log('\nImage optimization complete!');
  } catch (error) {
    console.error('Error processing images:', error);
    process.exit(1);
  }
}

processImages();
