// 홈 배경 및 메시지 슬라이드
const heroBackgrounds = [
  'hero1.jpg',
  'hero2.jpg'
];
const heroTitles = [
  '기술로 미래를 만든다?',
  '더욱더 안전한 세상이 되도록<br>최선을 다하겠습니다'
];
const heroSubtitles = [
  '㈜스마트계측은<br>AI를 활용한 자동화계측시스템 기술로<br><span class="no-break">건설공사현장에서 안정적이며 정밀한 측정을 선두하는 기업입니다.</span>',
  '㈜스마트계측은<br>구조적 위험으로부터 공공의 안전을 지키며<br>사회에 일조하는 기업이 되겠습니다.'
];

let heroIndex = 0;
function updateHero() {
  const hero = document.querySelector('.hero');
  const title = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  if (hero && title && subtitle) {
    hero.style.backgroundImage = `url('${heroBackgrounds[heroIndex]}')`;
    title.innerHTML = heroTitles[heroIndex] || '';
    subtitle.innerHTML = heroSubtitles[heroIndex];
  }
}

// 페이지 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
  // 홈 배경 슬라이드 시작
  updateHero();
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroBackgrounds.length;
    updateHero();
  }, 7000);

  // 모든 기능 초기화
  initMobileNav();
  initSmoothScrolling();
  initContactForm();
  initPhoneFormatting();
});

// 견적의뢰 폼 처리 (서버 API 사용)
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  // version: 1.1
  if (!form || !formStatus) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    // 폼 데이터 수집
    const formData = new FormData(form);

    try {
      // 서버로 POST 요청 전송
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      // 결과 메시지 표시
      if (result.success) {
        formStatus.innerHTML = '<div style="color: green; font-weight: bold;">✅ 견적의뢰가 성공적으로 전송되었습니다!</div>';
        form.reset(); // 폼 초기화
      } else {
        formStatus.innerHTML = '<div style="color: red; font-weight: bold;">❌ 전송 중 오류가 발생했습니다: ' + (result.message || '알 수 없는 오류') + '</div>';
      }
    } catch (error) {
      console.error('폼 전송 오류:', error);
      formStatus.innerHTML = '<div style="color: red; font-weight: bold;">❌ 네트워크 오류가 발생했습니다. 다시 시도해주세요.</div>';
    } finally {
      // 버튼 복원
      submitBtn.disabled = false;
      submitBtn.textContent = '제출하기';
    }
  });
}

// 네비게이션 메뉴 토글
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
}

// 부드러운 스크롤
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

// 전화번호 자동 포맷팅 (000-0000-0000)
function initPhoneFormatting() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 추출

    if (value.length <= 11) {
      // 000-0000-0000 형식으로 포맷팅
      if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{4})/, '$1-$2');
      }
    } else {
      value = value.substring(0, 11);
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }

    e.target.value = value;
  });
}

// 지도는 HTML iframe으로 처리됨