// 홈 배경 및 메시지 슬라이드
const heroBackgrounds = [
  'hero1.jpg',
  'hero2.jpg'
];
const heroTitles = [
    '<span class="title-pc">기술로 미래를 만든다?</span><span class="title-mobile">기술로 미래를 만든다?</span>',
    '<span class="title-pc">더욱더 안전한 세상이 되도록<br>최선을 다하겠습니다</span><span class="title-mobile">더룩더 안전한 세상이 되도록<br>최선을 다하겠습니다</span>'
];
const heroSubtitles = [
    '<span class="subtitle-pc">㈜스마트계측은<br>AI를 활용한 자동화계측시스템 기술로<br>건설공사현장에서 안정적이며 정밀한 측정을 선두하는 기업입니다.</span><span class="subtitle-mobile">㈜스마트계측은<br>AI를 활용한 자동화계측시스템 기술로<br>건설공사현장에서 안정적이며<br>정밀한 측정을 선두하는<br>기업입니다.</span>',
    '<span class="subtitle-pc">㈜스마트계측은<br>구조적 위험으로부터 공공의 안전을 지키며<br>사회에 일조하는 기업이 되겠습니다.</span><span class="subtitle-mobile">㈜스마트계측은<br>구조적 위험으로부터 공공의<br>안전을 지키며 사회에 일조하는<br>기업이 되겠습니다</span>'
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
  initFileInputHandler(); // 파일 입력 핸들러 추가
});

// 파일 입력 핸들러
function initFileInputHandler() {
  const attachmentInput = document.getElementById('attachment');
  const fileNameDisplay = document.getElementById('file-name-display');
  const removeBtn = document.getElementById('remove-attachment-btn');

  if (!attachmentInput || !fileNameDisplay || !removeBtn) return;

  attachmentInput.addEventListener('change', () => {
    if (attachmentInput.files.length > 0) {
      const file = attachmentInput.files[0];
      fileNameDisplay.textContent = file.name;
      removeBtn.style.display = 'inline-block';
    } else {
      fileNameDisplay.textContent = '';
      removeBtn.style.display = 'none';
    }
  });

  removeBtn.addEventListener('click', () => {
    attachmentInput.value = ''; // 파일 선택 초기화
    fileNameDisplay.textContent = '';
    removeBtn.style.display = 'none';
    // 파일 크기 오류 메시지도 지워주는 것이 좋음
    const formStatus = document.getElementById('form-status');
    if (formStatus.textContent.includes('파일 크기가 너무 큽니다')) {
        formStatus.innerHTML = '';
    }
  });
}

// 견적의뢰 폼 초기화 중복 실행을 방지하기 위한 전역 플래그
let isContactFormInitialized = false;

// 견적의뢰 폼 처리 (서버 API 사용)
function initContactForm() {
  // 만약 이 함수가 이미 한번 실행되었다면, 중복으로 이벤트 리스너가 등록되는 것을 막기 위해 즉시 중단
  if (isContactFormInitialized) {
    return;
  }
  isContactFormInitialized = true; // 최초 실행 시 플래그 설정

  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  if (!form || !formStatus) return;

  let isSubmitting = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      console.log('중복 제출이 감지되어 차단되었습니다.');
      return;
    }

    isSubmitting = true;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    const attachmentInput = document.getElementById('attachment');
    const maxFileSize = 4.5 * 1024 * 1024;

    if (attachmentInput.files.length > 0) {
      const file = attachmentInput.files[0];
      if (file.size > maxFileSize) {
        formStatus.innerHTML = `<div style="color: red; font-weight: bold;">❌ 파일 크기가 너무 큽니다. (최대 4.5MB)</div>`;

        submitBtn.disabled = false;
        submitBtn.textContent = '제출하기';
        isSubmitting = false;
        return;
      }
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        formStatus.innerHTML = '<div style="color: green; font-weight: bold;">✅ 견적의뢰가 성공적으로 전송되었습니다!</div>';
        form.reset();
        document.getElementById('file-name-display').textContent = '';
        document.getElementById('remove-attachment-btn').style.display = 'none';
      } else {
        formStatus.innerHTML = '<div style="color: red; font-weight: bold;">❌ 전송 중 오류가 발생했습니다: ' + (result.message || '알 수 없는 오류') + '</div>';
      }
    } catch (error) {
      console.error('폼 전송 오류:', error);
      formStatus.innerHTML = '<div style="color: red; font-weight: bold;">❌ 네트워크 오류가 발생했습니다. 다시 시도해주세요.</div>';
    } finally {
      isSubmitting = false;
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
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // 모바일 메뉴가 활성화 상태이면 닫아준다.
        if (navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }

        const offsetTop = targetSection.offsetTop - 70; // 네비게이션바 높이를 고려
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 전화번호 자동 포맷팅
function initPhoneFormatting() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    // 서울 지역번호(02) 처리
    if (value.startsWith('02')) {
      if (value.length < 3) {
        result = value;
      } else if (value.length < 6) {
        result = `${value.substring(0, 2)}-${value.substring(2)}`;
      } else if (value.length < 10) {
        result = `${value.substring(0, 2)}-${value.substring(2, 5)}-${value.substring(5)}`;
      } else {
        result = `${value.substring(0, 2)}-${value.substring(2, 6)}-${value.substring(6, 10)}`;
      }
    } else { // 그 외 번호 (휴대폰 등)
      if (value.length < 4) {
        result = value;
      } else if (value.length < 8) {
        result = `${value.substring(0, 3)}-${value.substring(3)}`;
      } else if (value.length < 11) {
        result = `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7)}`;
      } else {
        result = `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7, 11)}`;
      }
    }
    e.target.value = result;
  });
}

// 지도는 HTML iframe으로 처리됨