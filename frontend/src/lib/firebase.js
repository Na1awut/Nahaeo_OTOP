// Firebase Configuration for Na Haeo Botanics
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, addDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFBLN8G3Kth0d17EDOT0qbW1sT2YUywAE",
    authDomain: "nahaeo-otop.firebaseapp.com",
    projectId: "nahaeo-otop",
    storageBucket: "nahaeo-otop.firebasestorage.app",
    messagingSenderId: "320486858826",
    appId: "1:320486858826:web:00060a4bbd5cf86230c6b3",
    measurementId: "G-786CHKVTF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

/**
 * Verify if a product ID is authentic
 * @param {string} productId - The product ID from QR/NFC
 * @returns {Promise<Object>} - Verification result
 */
export async function verifyProduct(productId) {
    try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            const productData = productSnap.data();

            // Check if product is active
            if (!productData.isActive) {
                return { valid: false, reason: "inactive", data: productData };
            }

            // Update scan count
            await updateDoc(productRef, {
                scanCount: increment(1),
                lastScanAt: serverTimestamp()
            });

            // Log the scan
            await logScan(productId);

            return { valid: true, data: productData };
        } else {
            return { valid: false, reason: "not_found" };
        }
    } catch (error) {
        console.error("Error verifying product:", error);
        return { valid: false, reason: "error", error: error.message };
    }
}

/**
 * Log a scan event
 * @param {string} productId - The product ID that was scanned
 */
async function logScan(productId) {
    try {
        await addDoc(collection(db, "scans"), {
            productId: productId,
            scannedAt: serverTimestamp(),
            userAgent: navigator.userAgent,
            language: navigator.language
        });
    } catch (error) {
        console.error("Error logging scan:", error);
    }
}

/**
 * Get product details from Firestore
 * @param {string} productId - The product ID
 * @returns {Promise<Object|null>} - Product data or null
 */
export async function getProduct(productId) {
    try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            return { id: productSnap.id, ...productSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting product:", error);
        return null;
    }
}

export { db, app, analytics };
