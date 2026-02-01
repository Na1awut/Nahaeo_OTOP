// ================================================
// Na Haeo Botanics - Main JavaScript
// ================================================

// ===========================
// Mobile Menu Functions
// ===========================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
}

// ===========================
// Smooth Scroll Navigation
// ===========================
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Shop Now Button
document.getElementById('shopNowBtn')?.addEventListener('click', () => {
    scrollToSection('#collection');
});

function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===========================
// AR Modal Functions
// ===========================
const arModal = document.getElementById('arModal');

function openARModal() {
    arModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeARModal() {
    arModal.classList.add('hidden');
    document.body.style.overflow = '';
}

function launchCameraAR() {
    if (navigator.xr && navigator.xr.isSessionSupported) {
        // WebXR supported
        alert('🌸 Launching Camera AR...\n\nWebXR will open your camera to display AR content in your environment.');
    } else {
        // Fallback for devices without WebXR
        alert('🌸 Camera AR\n\nPlease use a device that supports WebXR (iOS Safari or Chrome on Android) for the best AR experience.');
    }
    closeARModal();
}

function showQRCode() {
    alert('📱 QR Code\n\nA QR code would appear here that you can scan with another device to open the AR experience.');
}

// ===========================
// Video Modal Functions
// ===========================
const videoModal = document.getElementById('videoModal');

function openVideoModal() {
    videoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    videoModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// ===========================
// 3D Model Selector
// ===========================
const modelData = {
    'phu-khao-ngom': {
        image: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepTHFlDPjJOSDVVWbWcyY8NBOfL0WZazLA6lt3Eyis_MOGNXmgYa0uleNGwkDMT5ElUxQF2XFWM4EZ5rcM0BwbOaSStKTuENnQTbTzKWqE3MdDgGK_Ik4oMBwvtfVdQMKtRskwx=s1360-w1360-h1020-rw',
        alt: 'Phu Khao Ngom Viewpoint 3D Model',
        title: 'Phu Khao Ngom'
    },
    'wat-si-pho-chai': {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCE7kfDXau4Ko8Oss4iGSTZhIhoJWRXH6GzJFOOXWfEQUy9Hi-GR67clZiHCqikj-kPCfsn6yjnggE7w8hprFBPuYG1-rjQOlVnhyNR4mUfMXbsBg97Q3G0Umi1GZho81x2ZFEDcix0dbfwghFcb2eiTJYkAlQuXCZMqVty0_oeMf9Un3iBZSpdrrUhvsDwfJh3C8hVpy1cGwzhQ5E06MGpahq7dSJQVdSqIwlA_Ei5SB5A9SKKtMe9Pbe_7JcJkJ-6eP0Y60InDiQ',
        alt: 'Wat Si Pho Chai 3D Model - Lanchang Style Temple',
        title: 'Wat Si Pho Chai'
    },
    'ton-dok-mai': {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRufQItL33eJ3E-xrzx4n6_6GMAm2mau6lIQ74C_dGokNRqPvHXmQ7f_VMBX37qO39F1GiOZLTu6Cz4ARXvSbmClMmem1KxDqdsvvHZYLQAy_l3XD3Gvk2dgWoHAFJKYRaxi3KZiTTrcovusQCW9g5z1OQvARC2-88PfSxHKPJ9Ms9MPIHll5TsxfWlwuyCPneXanGHmH1TFf-o8olUVbvgnqwiB5HrPTQfv5_XGPz_2WYpWYKjWmALq6mFidNYs6mMbkzKiLCIg_7',
        alt: 'Giant Ton Dok Mai Flower Tower 3D Model',
        title: 'Giant Ton Dok Mai'
    }
};

function switchModel(modelId) {
    const data = modelData[modelId];
    if (!data) return;

    // Update main image
    const mainImage = document.getElementById('modelViewerImage');
    mainImage.src = data.image;
    mainImage.alt = data.alt;

    // Update button states
    document.querySelectorAll('.model-btn').forEach(btn => {
        btn.classList.remove('model-btn-active');
        if (btn.dataset.model === modelId) {
            btn.classList.add('model-btn-active');
        }
    });
}

// ===========================
// Fullscreen Toggle
// ===========================
function toggleFullscreen() {
    const container = document.getElementById('modelViewerContainer');
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// ===========================
// Product Favorites
// ===========================
let favorites = JSON.parse(localStorage.getItem('nahaeo-favorites') || '[]');

// Initialize favorites on page load
document.addEventListener('DOMContentLoaded', () => {
    favorites.forEach(productId => {
        const btn = document.querySelector(`[data-product="${productId}"]`);
        if (btn) {
            btn.classList.add('favorite-active');
        }
    });
});

function toggleFavorite(btn, productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('favorite-active');
    } else {
        favorites.push(productId);
        btn.classList.add('favorite-active');
    }
    localStorage.setItem('nahaeo-favorites', JSON.stringify(favorites));
}

// ===========================
// Product 3D Viewer
// ===========================
const product3DModal = document.getElementById('product3DModal');
let currentProductId = null;

const productColors = {
    'rose-petal': { from: 'pastel-pink', to: 'pink-dark' },
    'peach-honey': { from: 'pastel-peach', to: 'peach-dark' },
    'fresh-mint': { from: 'pastel-mint', to: 'mint-dark' }
};

function openProduct3D(productId, productName) {
    currentProductId = productId;
    document.getElementById('product3DTitle').textContent = productName + ' - 3D View';

    // Update product visualization based on ID
    const colors = productColors[productId] || productColors['rose-petal'];
    const viewer = document.getElementById('product3DViewer');
    viewer.innerHTML = `
        <div class="text-center">
            <div class="w-24 h-48 bg-gradient-to-b from-${colors.from} to-${colors.to} rounded-xl shadow-2xl mx-auto mb-4 animate-float-slow flex items-center justify-center">
                <span class="text-xs -rotate-90 text-white font-bold tracking-widest">NA HAEO</span>
            </div>
            <p class="text-sm text-text-soft mt-4">ลากเพื่อหมุน • บีบเพื่อซูม</p>
        </div>
    `;

    product3DModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProduct3DModal() {
    product3DModal.classList.add('hidden');
    document.body.style.overflow = '';
    currentProductId = null;
}

function launchProductAR() {
    if (currentProductId) {
        alert(`🌸 Launching AR View for ${currentProductId}...\n\nPosition your camera at a flat surface to place the product in AR.`);
        closeProduct3DModal();
    }
}

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
        closeARModal();
        closeVideoModal();
        closeProduct3DModal();
    }
});

// ===========================
// Social Links Handler (Footer)
// ===========================
document.querySelectorAll('footer a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = link.querySelector('.material-symbols-outlined').textContent;
        switch (icon) {
            case 'public':
                alert('🌐 Website\n\nThis would open the official Na Haeo Botanics website.');
                break;
            case 'share':
                if (navigator.share) {
                    navigator.share({
                        title: 'Na Haeo Botanics',
                        text: 'Experience Thai OTOP heritage through WebAR technology!',
                        url: window.location.href
                    });
                } else {
                    alert('📤 Share\n\nShare Na Haeo Botanics with your friends!');
                }
                break;
            case 'mail':
                window.location.href = 'mailto:contact@nahaeobotanics.com?subject=Inquiry from Website';
                break;
        }
    });
});
