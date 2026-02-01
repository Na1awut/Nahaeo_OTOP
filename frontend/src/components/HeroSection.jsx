import { useState } from 'react';

export default function HeroSection() {
    const [isARModalOpen, setIsARModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    return (
        <>
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center min-h-[88vh]">
                {/* Left Content */}
                <div className="space-y-8 relative">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-[#FFD1DC]/30 text-xs font-semibold text-[#FFB6C1] shadow-soft">
                        <span className="material-symbols-outlined text-sm">eco</span>
                        Organic Macadamia Lip Balm x WebAR
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.08] text-gray-900">
                        Na Haeo Glow:
                        <span className="block mt-3 text-4xl md:text-5xl lg:text-6xl font-light bg-gradient-to-r from-[#FFD1DC] via-[#FFB6C1] to-[#FFE5B4] bg-clip-text text-transparent">
                            ลิปบาล์มแมคคาเดเมียออร์แกนิก
                        </span>
                    </h1>

                    <p className="text-lg text-[#6B6B6B] max-w-lg font-light leading-relaxed">
                        กักเก็บความชุ่มชื้นได้ถึง 95% ด้วยน้ำมันแมคคาเดเมียจากนาแห้ว จ.เลย
                        ปลอดสารเคมี 100% สนับสนุนเกษตรกรในชุมชน
                    </p>

                    <div className="flex items-center gap-5 pt-4">
                        <button
                            onClick={() => setIsARModalOpen(true)}
                            className="group relative px-10 py-4 btn-gradient rounded-full text-gray-800 font-semibold shadow-pink-glow overflow-hidden animate-glow"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="material-symbols-outlined text-xl">view_in_ar</span>
                                สำรวจโลก AR
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                        </button>
                        <button
                            onClick={() => setIsVideoModalOpen(true)}
                            className="w-14 h-14 rounded-full glass-strong shadow-soft hover:shadow-pink-glow flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] transition-all duration-300 hover:scale-105"
                        >
                            <span className="material-symbols-outlined text-2xl">play_arrow</span>
                        </button>
                        <span className="text-sm font-medium text-[#6B6B6B]">ดูวิดีโอ</span>
                    </div>
                </div>

                {/* Right Content - Phone Mockup */}
                <div className="relative h-[620px] w-full flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#FFD1DC]/40 via-[#FFE5B4]/30 to-[#98FF98]/30 blur-3xl rounded-full animate-pulse-soft"></div>

                    {/* Phone Mockup */}
                    <div className="relative z-20 w-[280px] h-[560px] bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-[5px] border-gray-800 animate-float-medium">
                        <div className="relative w-full h-full bg-gradient-to-b from-gray-100 to-white overflow-hidden rounded-[2.5rem]">
                            <img
                                alt="AR Interface showing Ton Dok Mai hologram"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAIy7tFeUh_EroqsSKBXrEts592DxUK0OhJbfppl7xZqRl6S2XId0vP4PVVLTuHUNGIqTdOAjcmwNAaBMcH5oyCK4kXdx0-k5g4AeFe7B-cqa_h6PKRROOGbyvgwtrd4DUapaKQWhziqyVQO7u4d_T56fUg1_xkHHMCwxwP9Bu21F7DToFLLze-r_Qv448L0nenxgOKKpAS4qjcf-RZ1RDKBKyJ3jPzucgjwY1A5HFlw6yxSfpKpRunTJ6_xtPgUu3iuzFn341rN3_"
                            />
                            <div className="absolute top-14 left-0 right-0 flex justify-center">
                                <div className="glass px-5 py-1.5 rounded-full text-white text-[11px] font-semibold tracking-wide">
                                    🌸 AR View Active
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <img
                                    alt="Holographic Ton Dok Mai Flower Tower"
                                    className="w-52 h-52 object-contain mix-blend-screen drop-shadow-[0_0_25px_rgba(255,182,193,0.7)] animate-float-slow"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0U842_x9UPqPdXPdSCHJhogRJ11xDHdF6xHXXi1MSSv_7a42tAmk19UqE8e_i-qC_TPSftn4-VHZMqi5qiUAnko-U3pPqiWrVGl7QzqSRkfE63MgVD-D4gFJ5DOxOUpaGtd9fDYmhwIBPM-esfi3gYj1m844WoFMr5RG6ijYQHyhFYuv8q_yHvqdjN8J1junbrbGWm0P-vXUPtoY3zzZ7YLlkq6CNW-sMyP-rYdBI2o17vFnP_5MGQo3bdovE3Y8O66ir2pPQJyTZ"
                                    style={{ filter: 'hue-rotate(320deg) brightness(1.1)' }}
                                />
                            </div>
                        </div>
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full"></div>
                    </div>

                    {/* Floating Product Boxes - Hidden on Mobile */}
                    <div className="hidden lg:block absolute left-0 lg:-left-8 top-20 z-30 animate-float-slow">
                        <div className="w-52 h-[68px] rounded-2xl flex items-center justify-center border border-white/50 backdrop-blur-sm bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1]">
                            <div className="flex items-center gap-4 px-4">
                                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-pink-700 text-sm font-display font-bold">NH</div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Na Haeo</span>
                                    <span className="text-xs text-gray-600 font-light italic">Rose Petal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block absolute left-12 lg:left-8 top-52 z-10 animate-float-medium">
                        <div className="w-52 h-[68px] rounded-2xl flex items-center justify-center border border-white/50 backdrop-blur-sm bg-gradient-to-br from-[#FFE5B4] to-[#FFDAB9]">
                            <div className="flex items-center gap-4 px-4">
                                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-amber-700 text-sm font-display font-bold">NH</div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Na Haeo</span>
                                    <span className="text-xs text-gray-600 font-light italic">พีชน้ำผึ้ง</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block absolute -left-4 lg:-left-12 top-80 z-30 animate-float-fast">
                        <div className="w-52 h-[68px] rounded-2xl flex items-center justify-center border border-white/50 backdrop-blur-sm bg-gradient-to-br from-[#98FF98] to-[#7AE47A]">
                            <div className="flex items-center gap-4 px-4">
                                <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-green-700 text-sm font-display font-bold">NH</div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">Na Haeo</span>
                                    <span className="text-xs text-gray-600 font-light italic">มิ้นต์สดชื่น</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AR Modal */}
            {isARModalOpen && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 modal-overlay modal-enter" onClick={() => setIsARModalOpen(false)}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="glass-strong rounded-[2rem] w-full max-w-lg shadow-2xl modal-content-enter overflow-hidden">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">🌸 ประสบการณ์ AR</h3>
                                        <p className="text-sm text-[#6B6B6B] font-light">นำนาแห้วมาสู่พื้นที่ของคุณ</p>
                                    </div>
                                    <button
                                        onClick={() => setIsARModalOpen(false)}
                                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] transition-colors"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <button className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#FFD1DC]/50 to-[#FFE5B4]/50 hover:from-[#FFD1DC]/70 hover:to-[#FFE5B4]/70 transition-all duration-300 flex items-center gap-4 group">
                                        <div className="w-14 h-14 rounded-xl bg-white/60 flex items-center justify-center text-[#FFB6C1] group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-2xl">photo_camera</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-800">กล้อง AR</div>
                                            <div className="text-xs text-[#6B6B6B]">ใช้กล้องเพื่อดูวัตถุ AR</div>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400 ml-auto">arrow_forward</span>
                                    </button>

                                    <button className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#98FF98]/50 to-[#FFE5B4]/50 hover:from-[#98FF98]/70 hover:to-[#FFE5B4]/70 transition-all duration-300 flex items-center gap-4 group">
                                        <div className="w-14 h-14 rounded-xl bg-white/60 flex items-center justify-center text-[#7AE47A] group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-800">สแกน QR Code</div>
                                            <div className="text-xs text-[#6B6B6B]">เปิด AR บนอุปกรณ์อื่น</div>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400 ml-auto">arrow_forward</span>
                                    </button>

                                    <div className="p-5 rounded-2xl border-2 border-dashed border-[#FFD1DC]/50 bg-[#FFD1DC]/10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-white/60 flex items-center justify-center text-[#FFB6C1] animate-pulse-soft">
                                                <span className="material-symbols-outlined text-2xl">nfc</span>
                                            </div>
                                            <div className="text-left">
                                                <div className="font-semibold text-gray-800">แตะ NFC</div>
                                                <div className="text-xs text-[#6B6B6B]">นำโทรศัพท์มาแตะที่กล่องสินค้า</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center text-xs text-[#6B6B6B] mt-6 font-light">
                                    WebAR ทำงานได้ดีที่สุดบน iOS Safari หรือ Android Chrome
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 modal-overlay modal-enter" onClick={() => setIsVideoModalOpen(false)}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="glass-strong rounded-[2rem] w-full max-w-3xl shadow-2xl modal-content-enter overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display text-xl font-bold text-gray-900">🎬 ดูวิดีโอตัวอย่าง</h3>
                                    <button
                                        onClick={() => setIsVideoModalOpen(false)}
                                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] transition-colors"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-6xl mb-4 text-[#FFD1DC]">play_circle</span>
                                    <p className="text-lg font-display font-semibold">นาแห้ว โบทานิกส์ AR Demo</p>
                                    <p className="text-sm text-gray-400 mt-2">สัมผัสความมหัศจรรย์ของเทคโนโลยี WebAR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
