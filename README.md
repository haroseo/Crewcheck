# Crewcheck (크루체크)

Crewcheck는 동아리 및 소규모 조직의 체계적인 오프라인 출결 관리와 구성원 간의 자발적인 학습 및 네트워킹을 독려하기 위해 설계된 올인원 PWA(Progressive Web App) 플랫폼입니다. 기존의 단순 명부 형태의 출석부에서 탈피하여 구성원의 참여도와 만족도를 동시에 높이는 것을 목표로 기획되었습니다.

## 핵심 가치 및 주요 기능

1. **하이브리드 출결 시스템**
   - 하이웍스(Hiworks) 방식의 정확한 출퇴근 타임 트래킹과 깃허브(GitHub) 방식의 잔디(Heatmap) 표기 시스템을 결합하였습니다.
   - 구성원이 일정 시간 이상 활동 시 출석 인정 지표로 활용할 수 있도록 누적 활동 시간과 잔디 통계를 제공합니다.
   - 연속 출석 일수(Streak)를 직관적으로 표기하여 구성원의 지속적인 참여를 독려합니다.

2. **사내망 수준의 종단간 암호화(E2EE) 커뮤니케이션**
   - 사적인 네트워킹 환경을 완벽히 보호하기 위해 푸셔(Pusher) 웹소켓과 WebCrypto API를 도입하였습니다.
   - 사용자가 전송하는 모든 메시지는 기기 자체에서 AES-GCM 알고리즘으로 암호화된 후 서버를 경유하므로, 관리자조차 메시지 원문을 열람할 수 없는 최고 수준의 기밀성을 보장합니다.

3. **에듀테크 기반의 게이미피케이션(Gamification)**
   - 듀올링고(Duolingo)의 스킬트리를 차용한 개발 커리큘럼 화면을 내장하였습니다.
   - 챕터를 완료할 때마다 경험치(EXP)와 보조 출석 보상을 지급하여 자발적인 지식 습득 환경을 구축합니다.
   - 매일 무작위로 변경되는 '1분 개발 상식' 패널을 대시보드 전면에 배치하여 접속 시마다 유의미한 정보를 얻어갈 수 있도록 설계하였습니다.

4. **직관적인 모바일 네이티브 UX/UI**
   - 토스(Toss)와 유사한 부드럽고 매끄러운 폼 전환과 컴포넌트 인터랙션을 구현하였습니다.
   - PWA 환경으로 빌드되어 브라우저에서 즉시 스마트폰 홈 화면에 설치(앱화)가 가능하며, 데스크톱과 모바일 양쪽 화면 크기에 완벽히 대응하는 반응형 위젯 레이아웃을 제공합니다.

5. **관리자 전용 대시보드 (Admin Control)**
   - 동아리 운영진(Owner)만이 접근 가능한 별도의 통제실 페이지를 제공합니다.
   - 출석 미달 위험군을 실시간으로 식별하고, 결석계(Pull Request 형태) 사유서를 비동기적으로 승인(Approve) 또는 반려(Reject) 처리를 할 수 있는 체계적인 근태 관리 워크플로우를 갖추고 있습니다.

## 기술 스택 (Tech Stack)

- **프론트엔드:** Next.js 15 (App Router), React, TypeScript, Framer Motion
- **스타일링:** Vanilla CSS (CSS Modules), Lucide React (Icons)
- **백엔드/API:** Next.js Server Actions
- **데이터베이스:** Prisma ORM, SQLite
- **인증(Auth):** NextAuth.js (버전 4, OAuth 연동 지원)
- **실시간 데이터 통신:** Pusher-js, WebCrypto API (AES-GCM 암호화/복호화)
- **배포 인프라:** Vercel (PWA 최적화 지원 포함)

## 개발 및 실행 방법

1. 환경 변수 설정
   프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래의 변수를 할당합니다.

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_key_here"

# (옵션) 인증 및 암호화 설정
GITHUB_ID="oauth_github_client_id"
GITHUB_SECRET="oauth_github_client_secret"
NEXT_PUBLIC_PUSHER_KEY="pusher_app_key"
NEXT_PUBLIC_PUSHER_CLUSTER="pusher_cluster_region"
PUSHER_APP_ID="pusher_app_id"
PUSHER_SECRET="pusher_app_secret"
```

2. 의존성 패키지 설치

```bash
npm install
```

3. 데이터베이스 초기화 및 동기화

```bash
npx prisma generate
npx prisma db push
```

4. 로컬 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 주소로 접속하여 결과를 확인합니다. 모바일 해상도(디버깅 모드)로 크기를 조정하면 PWA 설치 팝업 및 최적화된 앱 UI를 경험하실 수 있습니다.

## 라이선스

이 프로젝트는 MIT License에 따라 라이선스가 부여되고 배포됩니다.
