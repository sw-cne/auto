# (주)스마트계측 홈페이지

정밀한 측정 기술과 스마트한 솔루션을 제공하는 (주)스마트계측의 공식 홈페이지입니다.

## 🚀 특징

- **모던한 디자인**: 최신 디자인 트렌드를 반영한 깔끔하고 전문적인 UI
- **반응형 웹**: 모든 디바이스에서 최적화된 사용자 경험
- **인터랙티브 요소**: 부드러운 애니메이션과 사용자 상호작용
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원
- **성능 최적화**: 빠른 로딩 속도와 부드러운 스크롤

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - CSS Grid & Flexbox
  - CSS Variables (Custom Properties)
  - CSS Animations & Transitions
  - Media Queries
- **JavaScript (ES6+)**:
  - Intersection Observer API
  - Event Handling
  - Form Validation
  - Smooth Scrolling

## 📁 프로젝트 구조

```
P5/
├── index.html              # 메인 HTML 파일
├── styles.css              # CSS 스타일시트
├── script.js               # JavaScript 기능
├── server.js               # Express 서버 (이메일 기능)
├── config.js               # 이메일 설정
├── package.json            # Node.js 의존성 및 스크립트
├── cloudtype.yaml          # Cloudtype 배포 설정
├── CLOUDTYPE_DEPLOYMENT.md # 배포 가이드
├── deploy.sh               # 배포 스크립트
├── uploads/                # 파일 업로드 디렉토리
└── README.md               # 프로젝트 설명서
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #2563eb (파란색)
- **Secondary**: #64748b (회색)
- **Accent**: #06b6d4 (청록색)
- **Background**: #ffffff (흰색)
- **Dark**: #0f172a (어두운 회색)

### 타이포그래피
- **폰트**: Noto Sans KR (Google Fonts)
- **가중치**: 300, 400, 500, 700

### 그라데이션
- **Primary Gradient**: 파란색에서 보라색
- **Secondary Gradient**: 핑크색에서 빨간색
- **Accent Gradient**: 하늘색에서 청록색

## 📱 반응형 브레이크포인트

- **Desktop**: 1200px 이상
- **Tablet**: 768px - 1199px
- **Mobile**: 767px 이하

## 🚀 시작하기

### 로컬 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 또는 프로덕션 서버 실행
npm start
```

### 배포 방법

이 프로젝트는 Cloudtype에 배포할 수 있습니다. 자세한 배포 가이드는 [CLOUDTYPE_DEPLOYMENT.md](./CLOUDTYPE_DEPLOYMENT.md)를 참조하세요.

#### 빠른 배포 단계:
1. GitHub에 코드 푸시
2. [Cloudtype](https://cloudtype.io)에서 새 프로젝트 생성
3. 환경 변수 설정 (네이버 이메일, 앱 비밀번호 등)
4. 배포 완료

## ✨ 주요 기능

### 1. 네비게이션
- 고정된 상단 네비게이션 바
- 모바일 햄버거 메뉴
- 부드러운 스크롤 이동

### 2. 히어로 섹션
- 그라데이션 배경
- 애니메이션 효과
- 스크롤 인디케이터

### 3. 회사 소개
- 회사 비전 및 특징
- 통계 카운터 애니메이션
- 인터랙티브 카드

### 4. 서비스 소개
- 4가지 주요 서비스 카드
- 호버 효과
- 아이콘과 설명

### 5. 연락처
- 회사 정보 표시
- 문의 폼
- 실시간 유효성 검사

### 6. 푸터
- 회사 정보 요약
- 서비스 목록
- 저작권 정보

## 🎯 사용자 경험 (UX) 특징

- **직관적인 네비게이션**: 명확한 메뉴 구조
- **시각적 피드백**: 호버 효과와 애니메이션
- **접근성**: 키보드 네비게이션 지원
- **성능**: 최적화된 애니메이션과 로딩
- **모바일 친화적**: 터치 친화적인 인터페이스

## 🔧 커스터마이징

### 색상 변경
`styles.css` 파일의 `:root` 섹션에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다.

### 콘텐츠 수정
`index.html` 파일에서 텍스트와 이미지를 수정할 수 있습니다.

### 애니메이션 조정
`script.js` 파일에서 애니메이션 타이밍과 효과를 조정할 수 있습니다.

## 📞 연락처 정보

- **주소**: 서울특별시 서초구 마방로10길 18-28, 삼우빌딩 4층
- **전화번호**: 02-6409-7192
- **영업시간**: 평일 09:00 - 18:00

## 📄 라이선스

이 프로젝트는 (주)스마트계측의 공식 홈페이지입니다.

## 🤝 기여

프로젝트 개선을 위한 제안사항이 있으시면 언제든지 연락주세요.

---

**© 2024 (주)스마트계측. All rights reserved.** 

---

### 정리
- **public/automation.html** 파일에서  
- `<div class="solution-image-bar" ...>` 안에  
  - `솔루션_0716-1.jpg` 이미지와  
  - 그 위에 "Solution" 글씨가  
    ```html
    <span style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); ...">Solution</span>
    ```
    이렇게 **이미지의 정가운데**에 위치하고 있습니다.

---

## "Solution" 글씨를 3cm(113.4px) 아래로 내리는 방법

- 현재 `top:50%`이므로,  
- `top:calc(50% + 113.4px)`로 바꿔주면  
- **정확히 3cm 아래**로 이동합니다.

---

### 수정 예시

```html
<span style="position:absolute; left:50%; top:calc(50% + 113.4px); transform:translate(-50%,-50%); font-size:2.8rem; color:#FFD700; font-weight:900; font-family:Arial,sans-serif; letter-spacing:0.08em; text-shadow:2px 2px 8px rgba(0,0,0,0.18); pointer-events:none; user-select:none;">Solution</span>
```

---

### 적용 방법

1. **public/automation.html** 파일에서  
   위 `<span ...>Solution</span>` 부분의  firebase deploy --only hosting

   `top:50%` → `top:calc(50% + 113.4px)`  
   으로 변경하세요.

2. 저장 후,  
   `firebase deploy --only hosting`  
   명령어로 배포하세요.

3. 웹에서 새로고침(캐시 무시: Ctrl+F5) 후  
   "Solution" 글씨가 3cm 아래로 내려갔는지 확인하세요.

---

#### 중앙 정렬 유지 여부
- 이 방식은 **가로 중앙**은 그대로 유지되고  
- **세로만 3cm(113.4px) 아래**로 이동합니다.

---

**적용 후에도 궁금한 점이 있으면 언제든 말씀해 주세요!**  
(원하시면 직접 코드 수정도 바로 도와드릴 수 있습니다.) 