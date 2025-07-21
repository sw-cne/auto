document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initSmoothScrolling();
    initNavbarScroll();
    initScrollAnimations();
    initContactForm();
    initLocationMap();
    startHeroBgSlider();
});

function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.service-card, .request-card').forEach(el => observer.observe(el));
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('keyup', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        e.target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: new FormData(form)
            });
            const result = await response.json();
            formStatus.textContent = result.message;
            formStatus.style.color = result.success ? 'green' : 'red';
            if (result.success) form.reset();
        } catch (error) {
            formStatus.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
            formStatus.style.color = 'red';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '제출하기';
        }
    });
}

function initLocationMap() {
    if (typeof kakao === 'undefined') return;
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.4725, 127.0428),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(37.4725, 127.0428) });
    marker.setMap(map);
}

const heroBackgrounds = ['배경1.jpg', '배경2_수정.jpg'];
const heroTitles = [
    '기술로 미래를 만든다?',
    '더욱더 안전한 세상이 되도록<br>최선을 다하겠습니다'
];
const heroSubtitles = [
    '㈜스마트계측은<br>AI를 활용한 자동화계측시스템 기술로<br>건설공사현장에서 안정적이며 정밀한 측정을 선두하는 기업입니다.',
    '㈜스마트계측은<br>구조적 위험으로부터 공공의 안전을 지키며<br>사회에 일조하는 기업이 되겠습니다.'
];
let currentHeroBg = 0;

function setHeroContent(index) {
    const hero = document.getElementById('home');
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    hero.style.backgroundImage = `url('${heroBackgrounds[index]}')`;
    title.innerHTML = heroTitles[index];
    subtitle.innerHTML = heroSubtitles[index];
}

function startHeroBgSlider() {
    setHeroContent(currentHeroBg);
    const nextBtn = document.getElementById('heroNextBtn');
    const prevBtn = document.getElementById('heroPrevBtn');

    let slideInterval = setInterval(() => {
        currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
        setHeroContent(currentHeroBg);
    }, 7000);

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
            setHeroContent(currentHeroBg);
        }, 7000);
    };

    nextBtn.addEventListener('click', () => {
        currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
        setHeroContent(currentHeroBg);
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        currentHeroBg = (currentHeroBg - 1 + heroBackgrounds.length) % heroBackgrounds.length;
        setHeroContent(currentHeroBg);
        resetInterval();
    });
} 