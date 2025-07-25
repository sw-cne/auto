#!/bin/bash

# Cloudtype 배포 스크립트

echo "🚀 Cloudtype 배포 준비 중..."

# 1. 의존성 설치 확인
echo "📦 의존성 설치 확인..."
npm install

# 2. 환경 변수 확인
echo "🔧 환경 변수 확인..."
if [ -z "$NAVER_EMAIL" ]; then
    echo "⚠️  경고: NAVER_EMAIL 환경 변수가 설정되지 않았습니다."
fi

if [ -z "$NAVER_PASSWORD" ]; then
    echo "⚠️  경고: NAVER_PASSWORD 환경 변수가 설정되지 않았습니다."
fi

if [ -z "$RECIPIENT_EMAIL" ]; then
    echo "⚠️  경고: RECIPIENT_EMAIL 환경 변수가 설정되지 않았습니다."
fi

# 3. 서버 테스트
echo "🧪 서버 테스트..."
npm start &
SERVER_PID=$!

# 5초 대기
sleep 5

# 헬스 체크
if curl -f http://localhost:${PORT:-3000}/health > /dev/null 2>&1; then
    echo "✅ 서버가 정상적으로 실행되고 있습니다."
else
    echo "❌ 서버 실행에 문제가 있습니다."
fi

# 서버 종료
kill $SERVER_PID

echo "🎉 배포 준비 완료!"
echo ""
echo "다음 단계:"
echo "1. GitHub에 코드를 푸시하세요"
echo "2. Cloudtype에서 새 프로젝트를 생성하세요"
echo "3. 환경 변수를 설정하세요"
echo "4. 배포를 시작하세요" 