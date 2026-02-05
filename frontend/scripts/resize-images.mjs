import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images/scene/scene';
const outputDir = './public/images/scene/scene';

// Target width (height will be proportional)
const TARGET_WIDTH = 1920;

// Get all WebP files
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp'));

console.log(`Resizing ${files.length} images to ${TARGET_WIDTH}px width...`);

for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const tempPath = path.join(inputDir, `temp_${file}`);

    try {
        // Get original dimensions
        const metadata = await sharp(inputPath).metadata();
        console.log(`\n${file}: ${metadata.width}x${metadata.height}`);

        // Skip if already smaller than target
        if (metadata.width <= TARGET_WIDTH) {
            console.log(`  ↳ Already ${metadata.width}px, skipping`);
            continue;
        }

        // Resize
        await sharp(inputPath)
            .resize(TARGET_WIDTH, null, { fit: 'inside' })
            .webp({ quality: 85 })
            .toFile(tempPath);

        // Get new size
        const oldSize = fs.statSync(inputPath).size;
        const newSize = fs.statSync(tempPath).size;

        // Replace original with resized
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);

        const reduction = ((1 - newSize / oldSize) * 100).toFixed(1);
        console.log(`  ↳ Resized to ${TARGET_WIDTH}px (${reduction}% smaller)`);

    } catch (err) {
        console.error(`  ✗ Error: ${err.message}`);
        // Clean up temp file if exists
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
}

console.log('\n✓ Done!');
