# 리멤버 방문자 체크인 시스템

외부 방문자를 위한 보안 체크인 시스템입니다.

## 🚀 배포 방법

### 1단계: Google Apps Script Web App 배포

1. Google Sheets에서 **확장 프로그램 > Apps Script** 열기
2. `CheckIn_WebAPI.js` 파일의 내용을 복사하여 Apps Script 에디터에 붙여넣기
3. **배포 > 새 배포** 클릭
4. 배포 유형: **웹 앱**
5. 설정:
   - **실행 계정**: 나
   - **액세스 권한**: **모든 사용자** (외부 접근 허용)
6. **배포** 버튼 클릭
7. 생성된 **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/AKfy...`)

### 2단계: HTML에 API URL 설정

1. `index.html` 파일 열기
2. 10번째 줄 근처의 다음 부분 찾기:
   ```javascript
   const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`를 1단계에서 복사한 URL로 교체

### 3단계: GitHub Pages 배포

#### 방법 A: GitHub 웹에서 직접 업로드

1. GitHub에서 새 저장소 생성 (예: `visitor-checkin`)
2. 저장소에 `index.html` 파일 업로드
3. **Settings > Pages** 메뉴로 이동
4. **Source**: `main` 브랜치 선택
5. **Save** 클릭
6. 생성된 URL 확인 (예: `https://username.github.io/visitor-checkin/`)

#### 방법 B: Git 명령어 사용

```bash
# 현재 폴더에서 Git 저장소 초기화
git init

# index.html만 추가 (다른 파일은 제외)
git add index.html README.md

# 커밋
git commit -m "Initial commit: 체크인 시스템"

# GitHub 저장소와 연결
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 푸시
git branch -M main
git push -u origin main
```

그 다음 GitHub 웹사이트에서 Settings > Pages 설정

## 📁 파일 설명

- **`CheckIn_WebAPI.js`**: Google Apps Script 백엔드 코드 (GAS에 복사)
- **`index.html`**: 프론트엔드 웹 페이지 (GitHub Pages에 배포)
- **`CheckIn.js`**: 원본 GAS 코드 (참고용)
- **`CheckInPage.html`**: 원본 HTML 코드 (참고용)

## ⚙️ 시스템 구조

```
외부 방문자 (모바일)
    ↓
GitHub Pages (index.html)
    ↓ HTTPS POST
Google Apps Script Web App
    ↓
Google Sheets + Slack + Drive
```

## 🔒 보안 고려사항

- GitHub Pages는 공개 URL입니다
- Google Apps Script는 CORS를 허용하여 외부 도메인에서 호출 가능
- 민감한 정보(슬랙 URL, 드라이브 ID)는 GAS에만 있고 HTML에는 노출되지 않음

## 📱 사용 방법

1. 방문자가 모바일로 GitHub Pages URL 접속
2. 예약자: 이름 + 전화번호 뒷 4자리 입력
3. 당일 방문자: "미리 예약하지 못했습니다" 버튼 클릭 후 정보 입력
4. 약관 확인 및 전자서명
5. 체크인 완료 → 스프레드시트 기록 + 슬랙 알림 + PDF 저장
