import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images/real_image';

async function convertToWebP() {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));

    console.log(`Found ${imageFiles.length} images to convert`);

    let converted = 0;
    let totalOriginalSize = 0;
    let totalNewSize = 0;

    for (const file of imageFiles) {
        const inputPath = path.join(inputDir, file);
        const outputName = file.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
        const outputPath = path.join(inputDir, outputName);

        try {
            const originalStats = fs.statSync(inputPath);
            totalOriginalSize += originalStats.size;

            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);

            const newStats = fs.statSync(outputPath);
            totalNewSize += newStats.size;

            // Delete original file
            fs.unlinkSync(inputPath);

            converted++;
            console.log(`${converted}/${imageFiles.length} - ${file} -> ${outputName}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err.message);
        }
    }

    console.log('\n=== Conversion Complete ===');
    console.log(`Converted: ${converted}/${imageFiles.length} files`);
    console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Saved: ${((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1)}%`);
}

convertToWebP();
