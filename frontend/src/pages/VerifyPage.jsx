import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { verifyProduct } from '../lib/firebase';

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id');

    const [status, setStatus] = useState('loading'); // loading, success, error, no-id, scanning
    const [productData, setProductData] = useState(null);
    const [manualId, setManualId] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [scannerError, setScannerError] = useState('');
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        if (productId) {
            verify(productId);
        } else {
            setStatus('no-id');
        }
    }, [productId]);

    // Cleanup scanner on unmount
    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, []);

    const verify = async (id) => {
        setStatus('loading');
        try {
            const result = await verifyProduct(id);
            if (result.valid) {
                setProductData(result.data);
                setStatus('success');
                // Save verified status to localStorage for access control
                localStorage.setItem('nahaeo_verified', 'true');
                localStorage.setItem('nahaeo_verified_time', Date.now().toString());
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('error');
        }
    };

    const handleManualVerify = () => {
        if (manualId.trim()) {
            verify(manualId.trim());
        }
    };

    const startScanner = async () => {
        setShowScanner(true);
        setScannerError('');

        // Wait for DOM to render
        setTimeout(async () => {
            try {
                const html5QrCode = new Html5Qrcode("qr-reader");
                html5QrCodeRef.current = html5QrCode;

                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    (decodedText) => {
                        // Handle successful scan
                        handleScanSuccess(decodedText);
                    },
                    (errorMessage) => {
                        // Ignore scan errors (no QR found in frame)
                    }
                );
            } catch (err) {
                console.error("Scanner error:", err);
                setScannerError('ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตการใช้งานกล้อง');
            }
        }, 100);
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current = null;
            } catch (err) {
                console.error("Error stopping scanner:", err);
            }
        }
        setShowScanner(false);
    };

    const handleScanSuccess = (decodedText) => {
        // Stop scanner first
        stopScanner();

        // Extract product ID from URL or plain text
        let extractedId = decodedText;

        // If it's a URL, extract the ID parameter
        try {
            if (decodedText.includes('verify?id=')) {
                const url = new URL(decodedText);
                extractedId = url.searchParams.get('id') || decodedText;
            } else if (decodedText.includes('id=')) {
                const params = new URLSearchParams(decodedText.split('?')[1]);
                extractedId = params.get('id') || decodedText;
            }
        } catch (e) {
            // If URL parsing fails, use the raw text
            extractedId = decodedText;
        }

        // Set the ID and verify
        setManualId(extractedId);
        verify(extractedId);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-pattern">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FFE5B4]/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* QR Scanner Modal */}
            {showScanner && (
                <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold text-lg text-gray-800">สแกน QR Code</h3>
                            <button
                                onClick={stopScanner}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-gray-600">close</span>
                            </button>
                        </div>

                        {scannerError ? (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                                <p className="text-red-600 text-sm">{scannerError}</p>
                                <button
                                    onClick={startScanner}
                                    className="mt-3 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium"
                                >
                                    ลองอีกครั้ง
                                </button>
                            </div>
                        ) : (
                            <>
                                <div
                                    id="qr-reader"
                                    ref={scannerRef}
                                    className="rounded-2xl overflow-hidden bg-gray-100"
                                    style={{ width: '100%', minHeight: '300px' }}
                                ></div>
                                <p className="text-center text-sm text-[#6B6B6B] mt-4">
                                    วาง QR Code ให้อยู่ในกรอบ
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="relative z-50 px-6 py-5">
                <div className="max-w-md mx-auto flex items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm shadow-pink-glow">NH</div>
                    <span className="text-xl font-display font-medium tracking-tight text-gray-800">
                        Na Haeo <span className="text-[#FFB6C1] font-light">Glow</span>
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
                <div className="w-full max-w-md">

                    {/* Loading State */}
                    {status === 'loading' && (
                        <div className="text-center">
                            <div className="glass-strong rounded-[2rem] p-8 shadow-soft">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFD1DC]/50 to-[#FFE5B4]/50 flex items-center justify-center animate-pulse">
                                    <span className="material-symbols-outlined text-4xl text-[#FFB6C1]">search</span>
                                </div>
                                <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">กำลังตรวจสอบ...</h1>
                                <p className="text-[#6B6B6B] font-light">กรุณารอสักครู่</p>
                            </div>
                        </div>
                    )}

                    {/* Success State */}
                    {status === 'success' && productData && (
                        <div className="glass-strong rounded-[2rem] p-8 shadow-soft text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#98FF98] to-[#7AE47A] flex items-center justify-center shadow-mint-glow">
                                <span className="material-symbols-outlined text-5xl text-white">verified</span>
                            </div>

                            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">✅ สินค้าแท้!</h1>
                            <p className="text-[#6B6B6B] font-light mb-6">ยืนยันแล้วว่าเป็นสินค้าแท้จากนาแห้ว โบทานิกส์</p>

                            <div className="bg-white/50 rounded-2xl p-5 mb-6 text-left">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center">
                                        <span className="text-xs -rotate-90 text-white font-bold">NH</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-gray-800">{productData.name || 'นาแห้ว โบทานิกส์'}</h3>
                                        <p className="text-xs text-[#6B6B6B]">{productData.variant || '-'}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-[#6B6B6B] space-y-1">
                                    <p>🏭 Batch: {productData.batchNumber || '-'}</p>
                                    <p>📅 ผลิตเมื่อ: {formatDate(productData.createdAt)}</p>
                                    <p>👁️ สแกนครั้งที่: {(productData.scanCount || 0) + 1}</p>
                                </div>
                            </div>

                            <Link
                                to="/#ar"
                                className="w-full py-4 rounded-2xl btn-gradient text-gray-800 font-semibold flex items-center justify-center gap-2 shadow-pink-glow animate-glow"
                            >
                                <span className="material-symbols-outlined">view_in_ar</span>
                                เข้าสู่โลก AR
                            </Link>

                            <Link to="/" className="inline-block mt-4 text-sm text-[#FFB6C1] font-medium hover:underline">
                                ← กลับหน้าหลัก
                            </Link>
                        </div>
                    )}

                    {/* Error State */}
                    {status === 'error' && (
                        <div className="glass-strong rounded-[2rem] p-8 shadow-soft text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-200 to-red-400 flex items-center justify-center">
                                <span className="material-symbols-outlined text-5xl text-white">error</span>
                            </div>

                            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">⚠️ ไม่พบสินค้า</h1>
                            <p className="text-[#6B6B6B] font-light mb-6">ไม่พบรหัสสินค้านี้ในระบบ</p>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
                                <p className="text-sm text-red-600 font-medium mb-2">⚠️ คำเตือน</p>
                                <p className="text-xs text-red-500">หากท่านซื้อสินค้านี้มา กรุณาติดต่อร้านค้าเพื่อตรวจสอบ</p>
                            </div>

                            <button
                                onClick={() => setStatus('no-id')}
                                className="inline-block py-3 px-6 rounded-xl glass-strong text-gray-600 font-semibold hover:bg-white transition-colors"
                            >
                                ลองสแกนใหม่
                            </button>
                        </div>
                    )}

                    {/* No ID State */}
                    {status === 'no-id' && (
                        <div className="glass-strong rounded-[2rem] p-8 shadow-soft text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFE5B4]/50 to-[#FFD1DC]/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-5xl text-[#FFB6C1]">contactless</span>
                            </div>

                            <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">ยืนยันสินค้าแท้</h1>
                            <p className="text-[#6B6B6B] font-light mb-6">
                                แตะ NFC หรือสแกน QR Code บนกล่องผลิตภัณฑ์<br />
                                เพื่อยืนยันว่าเป็นสินค้าแท้จาก Na Haeo Glow
                            </p>

                            {/* NFC/QR Buttons */}
                            <div className="bg-white/50 rounded-2xl p-5 mb-6">
                                <div className="flex items-center justify-center gap-6">
                                    <div className="text-center">
                                        <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center cursor-not-allowed opacity-60">
                                            <span className="material-symbols-outlined text-2xl text-white">nfc</span>
                                        </div>
                                        <p className="text-xs text-[#6B6B6B]">แตะ NFC</p>
                                    </div>
                                    <div className="text-[#6B6B6B] text-sm">หรือ</div>
                                    <button
                                        onClick={startScanner}
                                        className="text-center group"
                                    >
                                        <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-[#98FF98] to-[#7AE47A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                                            <span className="material-symbols-outlined text-2xl text-white">qr_code_scanner</span>
                                        </div>
                                        <p className="text-xs text-[#6B6B6B] group-hover:text-[#7AE47A] transition-colors">สแกน QR</p>
                                    </button>
                                </div>
                            </div>

                            {/* Manual Input Option */}
                            <div className="mb-8">
                                <p className="text-sm text-[#6B6B6B] mb-3">หรือกรอกรหัสสินค้าด้วยตนเอง:</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={manualId}
                                        onChange={(e) => setManualId(e.target.value)}
                                        placeholder="NH-XXXX-XXXX"
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB6C1] focus:ring-2 focus:ring-[#FFB6C1]/20 outline-none transition-all"
                                    />
                                    <button
                                        onClick={handleManualVerify}
                                        className="px-5 py-3 rounded-xl btn-gradient text-gray-800 font-semibold"
                                    >
                                        ตรวจสอบ
                                    </button>
                                </div>
                            </div>

                            {/* How to Use Guide - Compact Version */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="font-display font-semibold text-sm text-gray-700 mb-4">
                                    📖 วิธีใช้งาน 3 ขั้นตอนง่ายๆ
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {/* Step 1 */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD1DC]/40 to-[#FFB6C1]/40 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xl text-gray-600">phonelink_ring</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-medium text-gray-700">แตะ NFC</p>
                                            <p className="text-[10px] text-[#6B6B6B]">นำโทรศัพท์ใกล้กล่อง</p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFE5B4]/40 to-[#FFDAB9]/40 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xl text-gray-600">verified</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-medium text-gray-700">ยืนยันสินค้า</p>
                                            <p className="text-[10px] text-[#6B6B6B]">ตรวจสอบความแท้</p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#98FF98]/40 to-[#7AE47A]/40 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xl text-[#FFB6C1]">view_in_ar</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-medium text-gray-700">เข้าสู่ AR</p>
                                            <p className="text-[10px] text-[#6B6B6B]">สัมผัสประสบการณ์ใหม่</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center">
                <p className="text-xs text-[#6B6B6B] font-light">© 2026 Na Haeo Glow • ระบบยืนยันสินค้าแท้</p>
            </footer>
        </div>
    );
}
