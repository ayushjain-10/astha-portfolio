// ============================================
// ASTHA PORTFOLIO - INTERACTIVE JAVASCRIPT
// With GSAP, Three.js, Splitting.js
// ============================================

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// GLOBAL VARIABLES
// ============================================

let isLoaded = false;
let isMobile = window.innerWidth <= 768;
let mouseX = 0, mouseY = 0;

// ============================================
// LOADER
// ============================================

const loader = document.querySelector('.loader');
const loaderProgress = document.querySelector('.loader-progress');
const loaderText = document.querySelector('.loader-text');

function initLoader() {
    if (!loader) return;

    // Animate loader text
    const loaderSpans = loaderText?.querySelectorAll('span');
    if (loaderSpans) {
        gsap.fromTo(loaderSpans,
            { y: 50, opacity: 0, rotateX: -90 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }
        );
    }

    // Animate progress bar
    gsap.to(loaderProgress, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: hideLoader
    });
}

function hideLoader() {
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        onComplete: () => {
            loader.style.display = 'none';
            document.body.classList.add('loaded');
            isLoaded = true;
            initPageAnimations();
        }
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

function initCursor() {
    if (!cursor || isMobile) {
        if (cursor) cursor.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows cursor exactly
        gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: 'none'
        });

        // Outline follows with delay
        gsap.to(cursorOutline, {
            x: mouseX,
            y: mouseY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Cursor hover states
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .mobile-link, .work-card, .question-card, .value-card, .highlight-card, .timeline-item, .skill-category, .area-item, .video-wrapper, .play-btn');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
    });
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
    });
}

// ============================================
// NAVIGATION
// ============================================

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuBg = document.querySelector('.mobile-menu-bg');
const mobileLinks = document.querySelectorAll('.mobile-link');

function initNavigation() {
    if (!nav) return;

    let lastScroll = 0;

    // Scroll behavior
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;

        // Add scrolled class
        if (scroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll direction
        if (scroll > lastScroll && scroll > 500) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }

        lastScroll = scroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    navToggle.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animate menu
    gsap.fromTo(mobileMenuBg,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5, ease: 'power3.inOut' }
    );

    gsap.fromTo(mobileLinks,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power3.out'
        }
    );
}

function closeMobileMenu() {
    navToggle.classList.remove('active');

    gsap.to(mobileLinks, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power3.in',
        onComplete: () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SPLITTING.JS INITIALIZATION
// ============================================

function initSplitting() {
    if (typeof Splitting === 'undefined') return;

    Splitting();

    // Animate split text on scroll
    const splitElements = document.querySelectorAll('[data-splitting]');

    splitElements.forEach(el => {
        const chars = el.querySelectorAll('.char');

        gsap.fromTo(chars,
            {
                y: 100,
                opacity: 0,
                rotateX: -90
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.02,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ============================================
// THREE.JS CANVAS BACKGROUNDS
// ============================================

function initThreeJS() {
    // Hero Canvas
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        initHeroCanvas(heroCanvas);
    }

    // Curiosity Canvas
    const curiosityCanvas = document.getElementById('curiosity-canvas');
    if (curiosityCanvas) {
        initCuriosityCanvas(curiosityCanvas);
    }
}

function initHeroCanvas(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile ? 500 : 1500;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
        new THREE.Color('#ff6b35'),
        new THREE.Color('#f7c59f'),
        new THREE.Color('#ffffff'),
        new THREE.Color('#2ec4b6')
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Mouse movement effect
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetX - particles.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initCuriosityCanvas(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create floating question marks with geometry
    const questionMarks = [];
    const questionCount = isMobile ? 20 : 50;

    for (let i = 0; i < questionCount; i++) {
        const geometry = new THREE.TorusGeometry(0.1, 0.03, 8, 16);
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xff6b35 : 0x2ec4b6,
            transparent: true,
            opacity: Math.random() * 0.5 + 0.3
        });
        const torus = new THREE.Mesh(geometry, material);

        torus.position.x = (Math.random() - 0.5) * 15;
        torus.position.y = (Math.random() - 0.5) * 15;
        torus.position.z = (Math.random() - 0.5) * 10;

        torus.userData = {
            originalY: torus.position.y,
            speed: Math.random() * 0.02 + 0.01,
            amplitude: Math.random() * 0.5 + 0.5
        };

        scene.add(torus);
        questionMarks.push(torus);
    }

    camera.position.z = 8;

    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        questionMarks.forEach((mark, i) => {
            mark.rotation.x += 0.01;
            mark.rotation.y += 0.02;
            mark.position.y = mark.userData.originalY + Math.sin(time + i) * mark.userData.amplitude;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// VIDEO PLAYERS
// ============================================

function initVideoPlayers() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');

        if (!video) return;

        const playBtn = wrapper.querySelector('.play-btn');

        if (!playBtn) return;

        // Custom Play Button Click
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop propagation so it doesn't trigger other clicks if potential conflicts arise
            video.play();
        });

        // Note: We do NOT add a generic click listener to the wrapper or video here.
        // We rely on the native 'controls' attribute for user interaction (seeking, pausing, playing via control bar).
        // Clicking the video area itself is handled natively by the browser when 'controls' is present.

        // State management driven by video events
        video.addEventListener('play', () => {
            wrapper.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            wrapper.classList.remove('playing');
        });

        video.addEventListener('ended', () => {
            wrapper.classList.remove('playing');
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    // Fade in up animations
    const fadeElements = document.querySelectorAll('.fade-in-up, .section-tag, .section-header, .story-text p, .details-text');

    fadeElements.forEach(el => {
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach(el => {
        gsap.fromTo(el,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Stagger cards
    const cardGrids = document.querySelectorAll('.questions-grid, .values-grid, .highlights-grid, .exploration-areas');

    cardGrids.forEach(grid => {
        const cards = grid.children;

        gsap.fromTo(cards,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ============================================
// SKILL BARS ANIMATION (About Page)
// ============================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar span');

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';

        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.2,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });
}

// ============================================
// TIMELINE ANIMATION (About Page)
// ============================================

function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ============================================
// WORK CARDS ANIMATION (Choreography/Performance)
// ============================================

function initWorkCards() {
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(card,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Hover parallax effect
        const image = card.querySelector('.work-image img, .work-video video');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(image, {
                x: x * 20,
                y: y * 20,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

function initCarousel() {
    const carousel = document.querySelector('.quick-links-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.carousel-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        // Calculate card width including gap
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const offset = currentIndex * (cardWidth + gap);

        gsap.to(track, {
            x: -offset,
            duration: 0.5,
            ease: 'power2.out'
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.3' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
    });

    // Initialize
    updateCarousel();

    // Handle resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}

// ============================================
// MARQUEE ANIMATION
// ============================================

function initMarquee() {
    const marquees = document.querySelectorAll('.marquee-content');

    marquees.forEach(marquee => {
        const speed = marquee.dataset.speed || 20;

        gsap.to(marquee, {
            xPercent: -50,
            duration: parseFloat(speed),
            ease: 'none',
            repeat: -1
        });
    });
}

// ============================================
// FLOATING ELEMENTS (Curiosity Page)
// ============================================

function initFloatingElements() {
    const floatingShapes = document.querySelectorAll('.floating-shape');

    floatingShapes.forEach((shape, i) => {
        gsap.to(shape, {
            y: 'random(-30, 30)',
            x: 'random(-20, 20)',
            rotation: 'random(-15, 15)',
            duration: 'random(3, 6)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.5
        });
    });
}

// ============================================
// INFINITY SYMBOL ANIMATION
// ============================================

function initInfinitySymbol() {
    const infinityPath = document.querySelector('.infinity-symbol path');

    if (!infinityPath) return;

    const length = infinityPath.getTotalLength();

    gsap.set(infinityPath, {
        strokeDasharray: length,
        strokeDashoffset: length
    });

    ScrollTrigger.create({
        trigger: '.philosophy-section',
        start: 'top 60%',
        onEnter: () => {
            gsap.to(infinityPath, {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power2.inOut'
            });
        },
        once: true
    });
}

// ============================================
// HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content, .about-hero-content, .curiosity-hero-content, .page-header-content');

    if (!heroContent) return;

    const elements = heroContent.children;

    gsap.fromTo(elements,
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power4.out'
        }
    );
}

// ============================================
// IMAGE DECORATIONS
// ============================================

function initImageDecorations() {
    const imageContainer = document.querySelector('.about-hero-image .image-container');
    const decoration1 = document.querySelector('.image-decoration-1');
    const decoration2 = document.querySelector('.image-decoration-2');

    if (!imageContainer) return;

    // Parallax on scroll
    gsap.to(decoration1, {
        y: -50,
        scrollTrigger: {
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to(decoration2, {
        y: 50,
        scrollTrigger: {
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// ============================================
// STAT CARDS ANIMATION
// ============================================

function initStatCards() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach((card, index) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ============================================
// QUOTE SECTION
// ============================================

function initQuoteSection() {
    const quoteWrapper = document.querySelector('.quote-wrapper, .quote-interactive');

    if (!quoteWrapper) return;

    gsap.fromTo(quoteWrapper,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: quoteWrapper,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// RESUME PAGE SPECIFIC
// ============================================

function initResumePage() {
    const resumePreview = document.querySelector('.resume-preview');
    const downloadBtn = document.querySelector('.resume-download-section');

    if (resumePreview) {
        gsap.fromTo(resumePreview,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: resumePreview,
                    start: 'top 80%'
                }
            }
        );
    }

    if (downloadBtn) {
        gsap.fromTo(downloadBtn,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: downloadBtn,
                    start: 'top 90%'
                }
            }
        );
    }
}

// ============================================
// TECH PAGE SPECIFIC
// ============================================

function initTechPage() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(card,
            { y: 80, opacity: 0, rotateY: -10 },
            {
                y: 0,
                opacity: 1,
                rotateY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // 3D tilt on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotateY: x * 10,
                rotateX: -y * 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function handleResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            isMobile = window.innerWidth <= 768;
            ScrollTrigger.refresh();
        }, 250);
    });
}

// ============================================
// PAGE ANIMATIONS INIT
// ============================================

function initPageAnimations() {
    initHeroAnimations();
    initScrollAnimations();
    initWorkCards();
    initSkillBars();
    initTimeline();
    initStatCards();
    initQuoteSection();
    initImageDecorations();
    initFloatingElements();
    initInfinitySymbol();
    initMarquee();
    initResumePage();
    initTechPage();
}

// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    initLoader();
    initCursor();
    initNavigation();
    initSplitting();
    initThreeJS();
    initVideoPlayers();
    initCarousel();
    initSmoothScroll();
    setCurrentYear();
    handleResize();

    // If no loader, init page animations immediately
    if (!loader) {
        initPageAnimations();
    }
});

// Handle page load complete
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    console.log('Portfolio loaded successfully');
});

// ============================================
// SCROLL INDICATOR CLICK
// ============================================

document.querySelectorAll('.scroll-indicator, .header-scroll-indicator').forEach(indicator => {
    indicator.addEventListener('click', () => {
        const nextSection = indicator.closest('section').nextElementSibling;
        if (nextSection) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: nextSection,
                    offsetY: 0
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECTS
// ============================================

gsap.utils.toArray('.parallax').forEach(element => {
    gsap.to(element, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// ============================================
// MAGNETIC BUTTONS
// ============================================

document.querySelectorAll('.btn-primary, .btn-large').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});
