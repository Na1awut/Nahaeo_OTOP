import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images/scene/scene';
const outputDir = './public/images/scene/webp';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));

console.log(`Converting ${files.length} images to WebP...`);

for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFile = file.replace('.png', '.webp');
    const outputPath = path.join(outputDir, outputFile);

    try {
        await sharp(inputPath)
            .webp({ quality: 80 }) // Good quality, smaller size
            .toFile(outputPath);

        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✓ ${file} → ${outputFile} (${reduction}% smaller)`);
    } catch (err) {
        console.error(`✗ Error converting ${file}:`, err.message);
    }
}

console.log('\nDone! WebP images saved to:', outputDir);
