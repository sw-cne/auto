import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9c6h79d1I0xKvB-WGbQjPZ_FlgzdTUz0",
  authDomain: "smart-measure-bc396.firebaseapp.com",
  projectId: "smart-measure-bc396",
  storageBucket: "smart-measure-bc396.firebasestorage.app",
  messagingSenderId: "670911173254",
  appId: "1:670911173254:web:6dc9a67a050dec9646b707",
  databasseURL:"https://smart-measure-bc396-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
    initMapAnimation();
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
    
    if (contactForm) {
        // EmailJS 초기화
        emailjs.init("DfMKRupYDk-dCNkPH");
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            const attachment = formData.get('attachment');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('모든 필수 항목을 입력해주세요.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            try {
                console.log('폼 데이터:', { name, email, phone, message });
                
                // EmailJS를 사용하여 이메일 전송
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    phone: phone || '입력하지 않음',
                    message: message,
                    to_name: '스마트계측'
                };
                
                // EmailJS 서비스 ID와 템플릿 ID 설정
                const serviceId = 'service_91vo0zv';
                const templateId = 'template_bvo70io';
                
                // EmailJS를 사용하여 이메일 전송
                const response = await emailjs.send(serviceId, templateId, templateParams);
                
                console.log('EmailJS 응답:', response);
                
                if (response.status === 200) {
                    showNotification('견적의뢰가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
                    this.reset();
                } else {
                    showNotification('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
                }
                
            } catch (error) {
                console.error('EmailJS 전송 오류:', error);
                showNotification('이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
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

// Phone number formatting
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
            
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 7) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }
        });
    }
}

// Initialize phone formatting
document.addEventListener('DOMContentLoaded', function() {
    initPhoneFormatting();
});

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

// 새로운 지도 애니메이션 함수들
let animationInterval;

function startMapAnimation() {
    console.log('새로운 지도 애니메이션 시작');
    
    const mapAnimation = document.getElementById('mapAnimation');
    const mapButton = document.getElementById('mapButton');
    const resetButton = document.getElementById('resetButton');
    
    if (!mapAnimation || !mapButton || !resetButton) {
        console.error('필요한 요소를 찾을 수 없습니다');
        return;
    }
    
    // 애니메이션 컨테이너 표시
    mapAnimation.style.display = 'block';
    mapButton.style.display = 'none';
    
    // 모든 지도 요소 숨기기
    hideAllMapElements();
    
    // 지구본부터 시작
    const earth = document.getElementById('earth');
    if (earth) {
        earth.style.display = 'block';
        console.log('지구본 표시됨');
    }
    
    // 단계별 애니메이션 실행
    let step = 1;
    animationInterval = setInterval(() => {
        step++;
        console.log('애니메이션 단계:', step);
        
        if (step === 2) {
            // 아시아 지도로 전환
            hideAllMapElements();
            const asiaMap = document.getElementById('asiaMap');
            if (asiaMap) {
                asiaMap.style.display = 'block';
                console.log('아시아 지도 표시됨');
            }
        } else if (step === 3) {
            // 동아시아 지도로 전환
            hideAllMapElements();
            const eastAsiaMap = document.getElementById('eastAsiaMap');
            if (eastAsiaMap) {
                eastAsiaMap.style.display = 'block';
                console.log('동아시아 지도 표시됨');
            }
        } else if (step === 4) {
            // 한국 지도로 전환
            hideAllMapElements();
            const koreaMap = document.getElementById('koreaMap');
            if (koreaMap) {
                koreaMap.style.display = 'block';
                console.log('한국 지도 표시됨');
            }
        } else if (step === 5) {
            // 서울 지도로 전환
            hideAllMapElements();
            const seoulMap = document.getElementById('seoulMap');
            if (seoulMap) {
                seoulMap.style.display = 'block';
                console.log('서울 지도 표시됨');
            }
        } else if (step === 6) {
            // 최종 주소로 전환
            hideAllMapElements();
            const finalAddress = document.getElementById('finalAddress');
            if (finalAddress) {
                finalAddress.style.display = 'block';
                console.log('최종 주소 표시됨');
            }
            
            clearInterval(animationInterval);
            resetButton.style.display = 'inline-block';
            console.log('애니메이션 완료');
        }
    }, 2000);
}

function hideAllMapElements() {
    const elements = ['earth', 'asiaMap', 'eastAsiaMap', 'koreaMap', 'seoulMap', 'finalAddress'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
}

function resetMapAnimation() {
    console.log('지도 애니메이션 리셋');
    
    const mapAnimation = document.getElementById('mapAnimation');
    const mapButton = document.getElementById('mapButton');
    const resetButton = document.getElementById('resetButton');
    
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    if (mapAnimation) mapAnimation.style.display = 'none';
    if (mapButton) mapButton.style.display = 'inline-block';
    if (resetButton) resetButton.style.display = 'none';
    
    hideAllMapElements();
}

function initMapAnimation() {
    console.log('지도 애니메이션 초기화');
    
    // 전역 함수로 등록
    window.startMapAnimation = startMapAnimation;
    window.resetMapAnimation = resetMapAnimation;
    
    console.log('지도 애니메이션 함수들이 전역으로 등록됨');
}