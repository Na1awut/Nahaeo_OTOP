// Script สำหรับเพิ่มข้อมูลสินค้าตัวอย่างใน Firestore
// รัน: node scripts/seed-products.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFBLN8G3Kth0d17EDOT0qbW1sT2YUywAE",
    authDomain: "nahaeo-otop.firebaseapp.com",
    projectId: "nahaeo-otop",
    storageBucket: "nahaeo-otop.firebasestorage.app",
    messagingSenderId: "320486858826",
    appId: "1:320486858826:web:00060a4bbd5cf86230c6b3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample products data
const products = [
    {
        id: "NH-2026-0001",
        name: "นาแห้ว โบทานิกส์",
        variant: "ลิปบาล์ม กลีบกุหลาบ",
        price: 690,
        batchNumber: "BATCH-2026-01",
        isActive: true,
        scanCount: 0,
        createdAt: Timestamp.now(),
        description: "ลิปบาล์มสูตรพิเศษจากกลีบกุหลาบออร์แกนิค จากอำเภอนาแห้ว จังหวัดเลย"
    },
    {
        id: "NH-2026-0002",
        name: "นาแห้ว ครีมี่",
        variant: "ลิปบาล์ม พีชน้ำผึ้ง",
        price: 870,
        batchNumber: "BATCH-2026-01",
        isActive: true,
        scanCount: 0,
        createdAt: Timestamp.now(),
        description: "ลิปบาล์มสูตรครีมมี่จากพีชและน้ำผึ้งป่า จากอำเภอนาแห้ว จังหวัดเลย"
    },
    {
        id: "NH-2026-0003",
        name: "นาแห้ว มิ้นต์",
        variant: "ลิปบาล์ม มิ้นต์สดชื่น",
        price: 570,
        batchNumber: "BATCH-2026-01",
        isActive: true,
        scanCount: 0,
        createdAt: Timestamp.now(),
        description: "ลิปบาล์มสูตรเย็นสดชื่นจากมิ้นต์ธรรมชาติ จากอำเภอนาแห้ว จังหวัดเลย"
    }
];

async function seedProducts() {
    console.log("🌱 Starting to seed products...\n");

    for (const product of products) {
        try {
            const { id, ...data } = product;
            await setDoc(doc(db, "products", id), data);
            console.log(`✅ Added: ${id} - ${product.name} (${product.variant})`);
        } catch (error) {
            console.error(`❌ Error adding ${product.id}:`, error.message);
        }
    }

    console.log("\n🎉 Seeding completed!");
    console.log("\n📋 Product IDs for testing:");
    products.forEach(p => console.log(`   - ${p.id}`));

    process.exit(0);
}

seedProducts();
