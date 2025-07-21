# Cloudtype 배포 가이드

## 1. 사전 준비

### 1.1 Cloudtype 계정 생성
- [Cloudtype](https://cloudtype.io)에서 계정을 생성합니다.
- GitHub 계정으로 로그인할 수 있습니다.

### 1.2 GitHub 저장소 준비
- 이 프로젝트를 GitHub 저장소에 푸시합니다.
- 저장소는 public이어야 합니다.

## 2. 환경 변수 설정

Cloudtype 대시보드에서 다음 환경 변수들을 설정해야 합니다:

### 필수 환경 변수
```
NAVER_EMAIL=your-naver-email@naver.com
NAVER_PASSWORD=your-naver-app-password
RECIPIENT_EMAIL=recipient@example.com
NODE_ENV=production
PORT=8080
```

### 선택적 환경 변수
```
CORS_ORIGIN=https://your-domain.cloudtype.app
```

## 3. 배포 단계

### 3.1 새 프로젝트 생성
1. Cloudtype 대시보드에서 "새 프로젝트" 클릭
2. GitHub 저장소 선택
3. 브랜치 선택 (보통 `main` 또는 `master`)

### 3.2 빌드 설정
- **런타임**: Node.js
- **버전**: 18.x
- **빌드 명령어**: `npm install`
- **실행 명령어**: `npm start`

### 3.3 환경 변수 추가
1. 프로젝트 설정 → 환경 변수
2. 위의 환경 변수들을 추가
3. **중요**: `NAVER_PASSWORD`는 네이버 앱 비밀번호여야 합니다

## 4. 네이버 앱 비밀번호 설정

### 4.1 네이버 계정 설정
1. [네이버](https://naver.com) 로그인
2. 설정 → 보안 → 2단계 인증 설정
3. 앱 비밀번호 생성

### 4.2 앱 비밀번호 생성
1. "앱 비밀번호" 메뉴 클릭
2. "앱 비밀번호 생성" 클릭
3. 앱 이름: "스마트계측 웹사이트"
4. 생성된 16자리 비밀번호를 `NAVER_PASSWORD`로 설정

## 5. 배포 확인

### 5.1 배포 상태 확인
- Cloudtype 대시보드에서 배포 상태 확인
- 로그를 통해 오류 확인

### 5.2 웹사이트 테스트
- 배포된 URL로 접속
- 견적의뢰 폼 테스트
- 이메일 전송 확인

## 6. 도메인 설정 (선택사항)

### 6.1 커스텀 도메인
1. 프로젝트 설정 → 도메인
2. 커스텀 도메인 추가
3. DNS 설정 업데이트

### 6.2 SSL 인증서
- Cloudtype에서 자동으로 SSL 인증서 제공
- 별도 설정 불필요

## 7. 모니터링

### 7.1 헬스 체크
- `/health` 엔드포인트로 서버 상태 확인
- Cloudtype에서 자동 모니터링

### 7.2 로그 확인
- Cloudtype 대시보드에서 실시간 로그 확인
- 오류 발생 시 즉시 확인 가능

## 8. 문제 해결

### 8.1 배포 실패
- 로그 확인
- 환경 변수 설정 확인
- Node.js 버전 확인

### 8.2 이메일 전송 실패
- 네이버 앱 비밀번호 확인
- 이메일 주소 형식 확인
- 네이버 SMTP 설정 확인

### 8.3 정적 파일 로딩 실패
- 파일 경로 확인
- 파일 권한 확인

## 9. 업데이트

### 9.1 코드 업데이트
1. GitHub에 코드 푸시
2. Cloudtype에서 자동 배포
3. 배포 상태 확인

### 9.2 환경 변수 업데이트
1. Cloudtype 대시보드에서 환경 변수 수정
2. 프로젝트 재배포

## 10. 비용

- Cloudtype 무료 플랜: 월 100시간
- 추가 사용량에 따른 과금
- 상세한 가격은 [Cloudtype 가격 정책](https://cloudtype.io/pricing) 참조 