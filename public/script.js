document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileNav();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initNavbarScroll();
    initLocationMap(); 
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

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

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
                const offsetTop = targetSection.offsetTop - 80;
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

    const animateElements = document.querySelectorAll('.service-card, .feature, .request-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-fade-in-left');
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('keyup', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            let formattedValue = '';
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
                    formStatus.style.color = '#10b981';
                    this.reset();
                } else {
                    formStatus.textContent = result.message || '전송 중 오류가 발생했습니다.';
                    formStatus.style.color = '#ef4444';
                }
            } catch (error) {
                console.error('Email submission error:', error);
                formStatus.textContent = '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.';
                formStatus.style.color = '#ef4444';
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Kakao Map Initialization
function initLocationMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || typeof kakao === 'undefined' || !kakao.maps) return;

    const options = {
        center: new kakao.maps.LatLng(37.4725, 127.0428),
        level: 3
    };

    const map = new kakao.maps.Map(mapContainer, options);

    const markerPosition  = new kakao.maps.LatLng(37.4725, 127.0428); 
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
} 