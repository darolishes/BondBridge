const https = require('https');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Unsplash URLs for our categories (carefully selected free-to-use images)
const STOCK_IMAGES = {
  default: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80', // Cards on table
  basic: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=800&q=80', // People talking
  intimate: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80', // Couple silhouette
  deep: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80', // Sunset reflection
  growth: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80', // Growing plant
};

const SOURCE_DIR = path.join(__dirname, '../assets/images/source');

async function downloadImage(url, filename) {
  const filepath = path.join(SOURCE_DIR, filename);

  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });

        fileStream.on('error', err => {
          fs.unlink(filepath, () => {
            reject(err);
          });
        });
      })
      .on('error', reject);
  });
}

async function downloadAllImages() {
  try {
    // Ensure source directory exists
    await fsPromises.mkdir(SOURCE_DIR, { recursive: true });

    // Download all images
    const downloads = Object.entries(STOCK_IMAGES).map(([category, url]) =>
      downloadImage(url, `${category}-set.jpg`)
    );

    await Promise.all(downloads);
    console.log('\nAll images downloaded successfully!');
    console.log('Now run: yarn optimize-images');
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

downloadAllImages();
