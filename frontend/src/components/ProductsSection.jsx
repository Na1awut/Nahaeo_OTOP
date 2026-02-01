import { useState } from 'react';

const products = [
    {
        id: 'macadamia-original',
        name: 'Na Haeo Glow',
        variant: 'ลิปบาล์ม แมคคาเดเมีย ออริจินัล',
        price: 199,
        colors: { from: '#FFD1DC', to: '#FFB6C1' },
        textColor: 'text-pink-700',
        glowClass: 'hover:shadow-pink-glow',
        description: 'สูตรดั้งเดิม กักเก็บความชุ่มชื้น 95%'
    },
    {
        id: 'macadamia-honey',
        name: 'Na Haeo Glow',
        variant: 'ลิปบาล์ม แมคคาเดเมีย น้ำผึ้ง',
        price: 249,
        colors: { from: '#FFE5B4', to: '#FFDAB9' },
        textColor: 'text-amber-700',
        glowClass: 'hover:shadow-peach-glow',
        description: 'ผสมน้ำผึ้งแท้ บำรุงริมฝีปากลึก'
    },
    {
        id: 'macadamia-mint',
        name: 'Na Haeo Glow',
        variant: 'ลิปบาล์ม แมคคาเดเมีย มิ้นต์',
        price: 199,
        colors: { from: '#98FF98', to: '#7AE47A' },
        textColor: 'text-green-700',
        glowClass: 'hover:shadow-mint-glow',
        description: 'เย็นสดชื่น จากมิ้นต์ธรรมชาติ'
    }
];


export default function ProductsSection() {
    const [favorites, setFavorites] = useState([]);
    const [activeProduct, setActiveProduct] = useState(null);

    const toggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <>
            <section id="story" className="py-24 glass relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Story Card */}
                        <div className="lg:w-2/5 flex flex-col">
                            <div className="bg-white rounded-[2rem] p-4 shadow-soft border border-white h-full flex flex-col group hover:shadow-pink-glow transition-all duration-500">
                                <div className="relative h-80 lg:h-96 rounded-[1.5rem] overflow-hidden">
                                    <img
                                        alt="Local community building the traditional Ton Dok Mai flower tower"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfV-hmUn3a8rdpLVFT2ziXOkJVzik4XhH6NaGtsrVuQqrceKsI1_ok4nFlf3hha426CYJ7w0Xb-bc2tiG_tdLIrpdAsLFftkCh70K_igc8WgXVbTB-33b8Qfo5R2gAndNYD25M-g0uMoyqVV3alFvdP-EUHrsohkcnSYhh8t3dC6aqmx2xgzdZ72T3iTNc1tGcE9_eJLojXJLBFDH4SGuO92jPuxXJ1VL7qQFfkvsJEQv02LH-Qix344cohxADQoRIm_d_-S37fN2I"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <span className="glass px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4 inline-block">มรดกชุมชน</span>
                                        <h3 className="font-display text-2xl font-bold">โมเสคแห่งศรัทธา</h3>
                                    </div>
                                </div>
                                <div className="p-7 flex-grow flex flex-col justify-between">
                                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6 font-light">
                                        ได้รับแรงบันดาลใจจากประเพณีต้นดอกไม้ 400 ปี ที่ชุมชนและศรัทธาผลิบานพร้อมกัน
                                        ทุกการซื้อสนับสนุนช่างฝีมือท้องถิ่นในอำเภอนาแห้วโดยตรง
                                        สืบสานงานฝีมือศักดิ์สิทธิ์นี้สู่คนรุ่นต่อไป
                                    </p>
                                    <a className="inline-flex items-center text-[#FFB6C1] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300" href="#">
                                        อ่านเรื่องราวเต็ม <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div id="collection" className="lg:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`bg-white rounded-[2rem] p-5 shadow-soft border border-white ${product.glowClass} hover:-translate-y-2 transition-all duration-400`}
                                >
                                    <div
                                        className="relative aspect-[2/3] rounded-2xl mb-5 overflow-hidden flex items-center justify-center"
                                        style={{
                                            background: `linear-gradient(to bottom, ${product.colors.from}40, white)`
                                        }}
                                    >
                                        <div
                                            className="w-14 h-36 rounded-lg shadow-lg flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500"
                                            style={{
                                                background: `linear-gradient(to bottom, ${product.colors.from}, ${product.colors.to})`
                                            }}
                                        >
                                            <span className="text-[9px] -rotate-90 text-white font-bold tracking-widest whitespace-nowrap">NA HAEO</span>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <button
                                                onClick={() => toggleFavorite(product.id)}
                                                className={`w-9 h-9 rounded-full glass flex items-center justify-center transition-colors duration-300 ${favorites.includes(product.id) ? 'text-[#FFB6C1]' : 'text-gray-400 hover:text-[#FFB6C1]'
                                                    }`}
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    {favorites.includes(product.id) ? 'favorite' : 'favorite_border'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <h4 className="font-display font-bold text-gray-800">{product.name}</h4>
                                    <p className="text-xs text-[#6B6B6B] mb-4">{product.variant}</p>
                                    <div className="flex flex-col gap-3">
                                        <span className="font-bold text-gray-900 text-lg">฿{product.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => setActiveProduct(product)}
                                            className="w-full py-2.5 rounded-xl bg-[#98FF98] text-gray-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#7AE47A] transition-colors duration-300 shadow-sm"
                                        >
                                            ดู 3D
                                            <span className="material-symbols-outlined text-sm">view_in_ar</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product 3D Modal */}
            {activeProduct && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 modal-overlay modal-enter" onClick={() => setActiveProduct(null)}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="glass-strong rounded-[2rem] w-full max-w-md shadow-2xl modal-content-enter overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-display text-xl font-bold text-gray-900">{activeProduct.variant}</h3>
                                    <button
                                        onClick={() => setActiveProduct(null)}
                                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] transition-colors"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>

                                <div className="aspect-square rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center mb-6 overflow-hidden">
                                    <div className="text-center">
                                        <div
                                            className="w-24 h-48 rounded-xl shadow-2xl mx-auto mb-4 animate-float-slow flex items-center justify-center"
                                            style={{
                                                background: `linear-gradient(to bottom, ${activeProduct.colors.from}, ${activeProduct.colors.to})`
                                            }}
                                        >
                                            <span className="text-xs -rotate-90 text-white font-bold tracking-widest">NA HAEO</span>
                                        </div>
                                        <p className="text-sm text-[#6B6B6B]">ลากเพื่อหมุน • บีบเพื่อซูม</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 rounded-xl btn-gradient text-gray-800 font-semibold flex items-center justify-center gap-2 shadow-pink-glow">
                                        <span className="material-symbols-outlined">view_in_ar</span>
                                        ดูใน AR
                                    </button>
                                    <button
                                        onClick={() => setActiveProduct(null)}
                                        className="py-3 px-6 rounded-xl glass-strong text-gray-600 font-semibold hover:bg-white transition-colors"
                                    >
                                        ปิด
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
