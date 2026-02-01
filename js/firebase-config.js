// ================================================
// Firebase Configuration
// ================================================
// TODO: Replace with your Firebase project config from Firebase Console
// Go to: Firebase Console > Project Settings > Your apps > Web app > Config

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, updateDoc, increment, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================================================
// Product Verification Functions
// ================================================

/**
 * Verify if a product ID is authentic
 * @param {string} productId - The product ID from QR/NFC
 * @returns {Promise<Object>} - Product data if valid, null if not found
 */
async function verifyProduct(productId) {
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
async function getProduct(productId) {
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

// Export for use in other files
export { db, verifyProduct, getProduct, logScan };
