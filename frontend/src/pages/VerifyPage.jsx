import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyProduct } from '../lib/firebase';

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const productId = searchParams.get('id');
    const [status, setStatus] = useState('idle'); // idle, loading, error

    useEffect(() => {
        if (productId) {
            // Auto-verify when ID is provided (from NFC/QR scan)
            verifyAndRedirect(productId);
        }
    }, [productId]);

    const verifyAndRedirect = async (id) => {
        setStatus('loading');
        try {
            const result = await verifyProduct(id);
            if (result.valid) {
                // Save verified status
                localStorage.setItem('nahaeo_verified', 'true');
                localStorage.setItem('nahaeo_verified_time', Date.now().toString());
                localStorage.setItem('nahaeo_product_data', JSON.stringify(result.data));
                // Go to homepage
                navigate('/', { replace: true });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setStatus('error');
        }
    };

    // Show loading when verifying from NFC/QR
    if (status === 'loading') {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#FFF9F5] to-[#F5F0E8] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center animate-pulse shadow-lg">
                        <span className="material-symbols-outlined text-3xl text-white">verified</span>
                    </div>
                    <p className="text-gray-700 font-medium">กำลังยืนยันสินค้า...</p>
                    <p className="text-sm text-[#6B6B6B] mt-1">กรุณารอสักครู่</p>
                </div>
            </div>
        );
    }

    // Main scan page (no ID yet or error)
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#FFF9F5] to-[#F5F0E8] flex flex-col items-center justify-center p-6">
            {/* Logo */}
            <div className="mb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    NH
                </div>
                <h1 className="font-display text-2xl font-bold text-gray-800">
                    Na Haeo <span className="text-[#FFB6C1]">Glow</span>
                </h1>
                <p className="text-sm text-[#6B6B6B] mt-1">The Essence of Altitude</p>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                {status === 'error' ? (
                    // Error state
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl text-red-500">error</span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">ไม่พบสินค้า</h2>
                        <p className="text-sm text-[#6B6B6B] mb-6">รหัสสินค้าไม่ถูกต้องหรือหมดอายุ กรุณาลองใหม่อีกครั้ง</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD1DC] to-[#FFB6C1] text-gray-800 font-semibold shadow-lg"
                        >
                            ลองใหม่
                        </button>
                    </div>
                ) : (
                    // Idle state - waiting for NFC scan
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFE5B4]/50 to-[#FFDAB9]/50 flex items-center justify-center animate-pulse">
                            <span className="material-symbols-outlined text-4xl text-[#FFB6C1]">contactless</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">แตะเพื่อเข้าใช้งาน</h2>
                        <p className="text-sm text-[#6B6B6B] mb-6">
                            นำโทรศัพท์ไปแตะที่ NFC Tag บนกล่องสินค้า<br />
                            เพื่อยืนยันและเข้าสู่ประสบการณ์พิเศษ
                        </p>

                        {/* NFC Animation */}
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full border-4 border-[#FFD1DC] animate-ping opacity-20"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-[#FFD1DC] animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
                            <div className="absolute inset-4 rounded-full border-4 border-[#FFD1DC] animate-ping opacity-40" style={{ animationDelay: '0.4s' }}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center shadow-lg">
                                    <span className="material-symbols-outlined text-2xl text-white">smartphone</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-[#6B6B6B]">
                            📱 ใช้ NFC Tag บนกล่องสินค้าแท้
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <p className="mt-8 text-xs text-[#6B6B6B]">
                © 2026 Na Haeo Glow • ระบบยืนยันสินค้าแท้
            </p>
        </div>
    );
}
