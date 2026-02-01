import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyProduct } from '../lib/firebase';

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id');

    const [status, setStatus] = useState('loading'); // loading, success, error, no-id
    const [productData, setProductData] = useState(null);
    const [manualId, setManualId] = useState('');

    useEffect(() => {
        if (productId) {
            verify(productId);
        } else {
            setStatus('no-id');
        }
    }, [productId]);

    const verify = async (id) => {
        setStatus('loading');
        try {
            const result = await verifyProduct(id);
            if (result.valid) {
                setProductData(result.data);
                setStatus('success');
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

            {/* Header */}
            <header className="relative z-50 px-6 py-5">
                <div className="max-w-md mx-auto flex items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm shadow-pink-glow">NH</div>
                    <span className="text-xl font-display font-medium tracking-tight text-gray-800">
                        Na Haeo <span className="text-[#FFB6C1] font-light">Botanics</span>
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

                            <Link to="/" className="inline-block py-3 px-6 rounded-xl glass-strong text-gray-600 font-semibold hover:bg-white transition-colors">
                                กลับหน้าหลัก
                            </Link>
                        </div>
                    )}

                    {/* No ID State */}
                    {status === 'no-id' && (
                        <div className="glass-strong rounded-[2rem] p-8 shadow-soft text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFE5B4]/50 to-[#FFD1DC]/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-[#FFB6C1]">qr_code_scanner</span>
                            </div>

                            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">ยืนยันสินค้าแท้</h1>
                            <p className="text-[#6B6B6B] font-light mb-6">สแกน QR Code หรือแตะ NFC บนกล่องสินค้าเพื่อยืนยัน</p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">หรือกรอกรหัสสินค้า:</label>
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

                            <Link to="/" className="inline-block text-sm text-[#FFB6C1] font-medium hover:underline">
                                ← กลับหน้าหลัก
                            </Link>
                        </div>
                    )}

                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center">
                <p className="text-xs text-[#6B6B6B] font-light">© 2026 นาแห้ว โบทานิกส์ • ระบบยืนยันสินค้าแท้</p>
            </footer>
        </div>
    );
}
