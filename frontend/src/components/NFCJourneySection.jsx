export default function NFCJourneySection() {
    return (
        <section className="relative z-10 py-24 bg-pattern">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-gray-900">เส้นทาง NFC อันแสนมหัศจรรย์</h2>
                <p className="text-[#6B6B6B] font-light max-w-xl mx-auto mb-16">สัมผัสความมหัศจรรย์ใน 3 ขั้นตอนง่ายๆ</p>

                <div className="grid md:grid-cols-3 gap-12 lg:gap-20 relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#FFD1DC] via-[#FFE5B4] to-[#98FF98] opacity-60"></div>

                    {/* Step 1 */}
                    <div className="flex flex-col items-center gap-6 group cursor-pointer">
                        <div className="w-36 h-36 rounded-full glass-bubble flex items-center justify-center relative transition-all duration-500 group-hover:scale-110 shadow-pink-glow">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD1DC]/40 to-transparent"></div>
                            <span className="material-symbols-outlined text-5xl text-gray-700 relative z-10">phonelink_ring</span>
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">แตะจุด NFC</h3>
                            <p className="text-sm text-[#6B6B6B] font-light max-w-[200px]">นำโทรศัพท์มาใกล้กล่องผลิตภัณฑ์</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center gap-6 group cursor-pointer">
                        <div className="w-36 h-36 rounded-full glass-bubble flex items-center justify-center relative transition-all duration-500 group-hover:scale-110 shadow-peach-glow">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFE5B4]/40 to-transparent"></div>
                            <span className="material-symbols-outlined text-5xl text-gray-700 relative z-10">qr_code_scanner</span>
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">สแกนพื้นที่</h3>
                            <p className="text-sm text-[#6B6B6B] font-light max-w-[200px]">หาพื้นผิวเรียบเพื่อวางประสบการณ์ AR</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center gap-6 group cursor-pointer">
                        <div className="w-36 h-36 rounded-full glass-bubble flex items-center justify-center relative transition-all duration-500 group-hover:scale-110 shadow-mint-glow">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#98FF98]/40 to-transparent"></div>
                            <span className="material-symbols-outlined text-5xl text-[#FFB6C1] relative z-10">local_florist</span>
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">ชมดอกไม้บาน</h3>
                            <p className="text-sm text-[#6B6B6B] font-light max-w-[200px]">ชมต้นดอกไม้คลี่บานผ่าน AR อันเป็นตำนาน</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
