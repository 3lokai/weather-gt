// scripts/download-meteocons.js
// Script to download Meteocons icons from the GitHub repository

const fs = require('fs');
const path = require('path');
const https = require('https');

const ICONS_TO_DOWNLOAD = [
  'clear-day', 'clear-night',
  'partly-cloudy-day', 'partly-cloudy-night',
  'cloudy', 'overcast', 'overcast-day', 'overcast-night',
  'fog', 'fog-day', 'fog-night',
  'haze', 'haze-day', 'haze-night',
  'smoke', 'drizzle', 'rain', 'sleet', 'snow', 'hail',
  'wind', 'tornado', 'hurricane',
  'thunderstorms', 'thunderstorms-day', 'thunderstorms-night',
  'thunderstorms-rain', 'thunderstorms-day-rain', 'thunderstorms-night-rain'
];

const VARIANTS = ['fill', 'line'];
const BASE_URL = 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production';

async function downloadIcon(iconName, variant) {
  const url = `${BASE_URL}/${variant}/${iconName}.svg`;
  const dir = path.join(__dirname, '..', 'public', 'icons', 'meteocons', variant);
  const filePath = path.join(dir, `${iconName}.svg`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${variant}/${iconName}.svg`);
          resolve();
        });
      } else {
        console.log(`❌ Failed to download: ${variant}/${iconName}.svg (${response.statusCode})`);
        resolve(); // Don't fail the whole process for missing icons
      }
    }).on('error', (err) => {
      console.log(`❌ Error downloading ${variant}/${iconName}.svg:`, err.message);
      resolve(); // Don't fail the whole process
    });
  });
}

async function downloadAllIcons() {
  console.log('🚀 Starting Meteocons icon download...');
  
  for (const variant of VARIANTS) {
    console.log(`\n📁 Downloading ${variant} variant...`);
    
    for (const iconName of ICONS_TO_DOWNLOAD) {
      await downloadIcon(iconName, variant);
      // Small delay to be nice to the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log('\n✨ Download complete!');
  console.log('📁 Icons saved to: public/icons/meteocons/');
}

downloadAllIcons().catch(console.error);
