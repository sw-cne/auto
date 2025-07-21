//  DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileNav();
    initScrollAnimations();
    initStatsCounter();
    initContactForm();
    initSmoothScrolling();
    initNavbarScroll();
    startHeroBgSlider();
});

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature, .stat-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Special animations for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.classList.add('animate-fade-in-left');
    }
    if (heroVisual) {
        heroVisual.classList.add('animate-fade-in-right');
    }
}

// Statistics Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                countUp(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('keyup', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            let formattedValue = '';
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }

            if (value.length < 4) {
                formattedValue = value;
            } else if (value.length < 8) {
                formattedValue = `${value.substring(0, 3)}-${value.substring(3)}`;
            } else {
                formattedValue = `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7)}`;
            }
            e.target.value = formattedValue;
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            formStatus.textContent = '';
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    formStatus.textContent = result.message || '견적의뢰가 성공적으로 전송되었습니다.';
                    formStatus.style.color = '#10b981'; // Green
                    this.reset();
                } else {
                    formStatus.textContent = result.message || '전송 중 오류가 발생했습니다.';
                    formStatus.style.color = '#ef4444'; // Red
                }
            } catch (error) {
                console.error('Email submission error:', error);
                formStatus.textContent = '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.';
                formStatus.style.color = '#ef4444'; // Red
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax on larger screens
if (window.innerWidth > 768) {
    initParallax();
}

// Add loading animation to service cards
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-in-up');
    });
}

// Initialize service card animations
setTimeout(initServiceCardAnimations, 500);

// Add hover effects for interactive elements
function initHoverEffects() {
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize hover effects
initHoverEffects();

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
        
        // Enter key to submit form when focused
        if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type === 'email') {
            const form = e.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

// Initialize keyboard navigation
initKeyboardNavigation();

// Add lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based calculations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler); 

// Hero 배경 이미지 자동 전환
const heroBackgrounds = [
    '배경1.jpg',
    '배경2_수정.jpg'
    // 추후 '배경3.확장자' 추가 가능
];

const heroTitles = [
    '기술로 미래를 만든다?',
    '더욱더 안전한 세상이 되도록<br>최선을 다하겠습니다',
    '더욱더 안전한 세상이 되도록<br>최선을 다하겠습니다'
];

const heroSubtitles = [
    '㈜스마트계측은<br>AI를 활용한 자동화계측시스템 기술로<br><span class="no-break">건설공사현장에서 혁신적이며 정밀한 측정을 선두하는 기업입니다.</span>',
    '㈜스마트계측은<br>구조적 위험으로부터 공공의 안전을 지키며<br><span class="no-break">사회에 일조하는 기업이 되겠습니다.</span>',
    '㈜스마트계측은<br>구조적 위험으로부터 공공의 안전을 지키며<br><span class="no-break">사회에 일조하는 기업이 되겠습니다.</span>'
];

let currentHeroBg = 0;

function setHeroBackground(idx) {
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    console.log('배경 변경 시도:', idx, heroBackgrounds[idx]);
    
    if (heroSection) {
        heroSection.style.backgroundImage = `url('${heroBackgrounds[idx]}')`;
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundRepeat = 'no-repeat';
        console.log('배경 변경 완료:', heroBackgrounds[idx]);
    } else {
        console.log('hero 섹션을 찾을 수 없습니다.');
    }
    
    if (heroTitle) {
        heroTitle.innerHTML = heroTitles[idx];
        console.log('제목 변경 완료:', heroTitles[idx]);
    } else {
        console.log('hero-title을 찾을 수 없습니다.');
    }
    
    if (heroSubtitle) {
        heroSubtitle.innerHTML = heroSubtitles[idx];
        console.log('부제목 변경 완료:', heroSubtitles[idx]);
    } else {
        console.log('hero-subtitle을 찾을 수 없습니다.');
    }
}

function startHeroBgSlider() {
    console.log('배경 슬라이더 시작');
    setHeroBackground(currentHeroBg);
    
    // 자동 전환 타이머
    let autoSlideTimer = setInterval(() => {
        currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
        setHeroBackground(currentHeroBg);
    }, 7000); // 7초마다 변경
    
    // 화살표 버튼 이벤트 리스너
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            // 자동 전환 타이머 리셋
            clearInterval(autoSlideTimer);
            currentHeroBg = (currentHeroBg - 1 + heroBackgrounds.length) % heroBackgrounds.length;
            setHeroBackground(currentHeroBg);
            
            // 새로운 타이머 시작
            autoSlideTimer = setInterval(() => {
                currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
                setHeroBackground(currentHeroBg);
            }, 7000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // 자동 전환 타이머 리셋
            clearInterval(autoSlideTimer);
            currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
            setHeroBackground(currentHeroBg);
            
            // 새로운 타이머 시작
            autoSlideTimer = setInterval(() => {
                currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
                setHeroBackground(currentHeroBg);
            }, 7000);
        });
    }
} 