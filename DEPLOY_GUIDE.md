# 🚀 체크인 시스템 배포 가이드

외부 방문자가 모바일에서 안전하게 접근할 수 있도록 GitHub Pages에 배포하는 전체 과정입니다.

---

## 📋 준비물

- [ ] Google Sheets 접근 권한
- [ ] GitHub 계정
- [ ] `CheckIn_WebAPI.js` 파일
- [ ] `index.html` 파일

---

## 1️⃣ Google Apps Script Web App 배포

### 1-1. Apps Script 에디터 열기

1. Google Sheets 파일 열기
2. 상단 메뉴: **확장 프로그램 > Apps Script**
3. 새 창이 열림

### 1-2. Web API 코드 추가

1. 기존 `CheckIn.js` 옆에 **새 파일** 추가 (파일명: `WebAPI`)
2. `CheckIn_WebAPI.js` 파일의 **전체 내용**을 복사
3. Apps Script 에디터에 붙여넣기
4. **저장** (Ctrl+S 또는 💾 아이콘)

### 1-3. Web App 배포

1. 우측 상단 **배포** 버튼 클릭
2. **새 배포** 선택
3. 배포 설정:
   - **유형 선택**: ⚙️ 톱니바퀴 아이콘 > **웹 앱**
   - **설명**: `외부 체크인 API v1` (선택사항)
   - **다음 계정으로 실행**: **나**
   - **액세스 권한**: **모든 사용자** ⚠️ (중요!)
4. **배포** 버튼 클릭
5. 권한 승인:
   - "액세스 권한 부여" 클릭
   - Google 계정 선택
   - "고급" > "안전하지 않은 페이지로 이동" (내부 스크립트이므로 안전)
   - "허용" 클릭

### 1-4. Web App URL 복사

배포 완료 후 나타나는 **웹 앱 URL**을 복사합니다.

```
https://script.google.com/macros/s/AKfycby...../exec
```

⚠️ **이 URL은 나중에 사용하니 메모장에 저장해두세요!**

---

## 2️⃣ HTML 파일 수정

### 2-1. API URL 설정

1. `index.html` 파일을 텍스트 에디터로 열기
2. **11번째 줄** 근처 찾기:

```javascript
const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

3. 1단계에서 복사한 URL로 교체:

```javascript
const API_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
```

4. 파일 저장

---

## 3️⃣ GitHub Pages 배포

### 방법 A: GitHub 웹사이트 사용 (초보자 추천)

#### A-1. GitHub 저장소 생성

1. https://github.com 로그인
2. 우측 상단 **+** 버튼 > **New repository**
3. 저장소 설정:
   - **Repository name**: `visitor-checkin` (원하는 이름)
   - **Public** 선택 (필수)
   - **Add a README file** 체크 ✅
4. **Create repository** 클릭

#### A-2. 파일 업로드

1. 생성된 저장소 페이지에서 **Add file** > **Upload files** 클릭
2. `index.html` 파일을 드래그 앤 드롭
3. 하단 **Commit changes** 버튼 클릭

#### A-3. GitHub Pages 활성화

1. 저장소 상단 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션:
   - **Branch**: `main` 선택
   - 폴더: `/ (root)` 선택
4. **Save** 버튼 클릭
5. 페이지 상단에 생성된 URL 확인:
   ```
   https://YOUR_USERNAME.github.io/visitor-checkin/
   ```

### 방법 B: Git 명령어 사용 (개발자용)

```bash
# 1. 현재 폴더로 이동
cd "c:\Users\Jaecheol Kim\Desktop\A PJ 대량접수"

# 2. Git 초기화
git init

# 3. 파일 추가 (index.html만)
git add index.html README.md

# 4. 커밋
git commit -m "Initial commit: 방문자 체크인 시스템"

# 5. GitHub 저장소와 연결 (YOUR_USERNAME과 YOUR_REPO 수정!)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 6. 푸시
git branch -M main
git push -u origin main
```

그 다음 **방법 A의 A-3단계**(GitHub Pages 활성화)를 진행하세요.

---

## 4️⃣ 테스트

### 4-1. 데스크톱 테스트

1. GitHub Pages URL을 브라우저에서 열기
2. 개발자 도구 열기 (F12)
3. 모바일 모드로 전환 (Ctrl+Shift+M)
4. 테스트 시나리오:
   - ✅ 예약 확인 기능
   - ✅ 당일 방문 접수 기능
   - ✅ 서명 입력
   - ✅ 체크인 완료

### 4-2. 모바일 테스트

1. 모바일 기기에서 GitHub Pages URL 접속
2. 실제 방문자처럼 전체 플로우 테스트
3. Google Sheets에서 데이터 확인
4. Slack 알림 확인

---

## 5️⃣ URL 공유

### QR 코드 생성 (선택사항)

1. https://www.qr-code-generator.com/ 접속
2. GitHub Pages URL 입력
3. QR 코드 다운로드
4. 오피스 입구에 QR 코드 부착

### 단축 URL 생성 (선택사항)

1. https://bitly.com/ 접속
2. GitHub Pages URL을 짧은 URL로 변경
   ```
   https://bit.ly/remembervisitor
   ```

---

## 🔧 문제 해결

### 문제 1: "API 호출 오류" 메시지

**원인**: `index.html`의 API_URL이 잘못 설정됨

**해결**:
1. `index.html` 11번째 줄 확인
2. Google Apps Script Web App URL이 정확한지 확인
3. URL 끝이 `/exec`로 끝나는지 확인

### 문제 2: "권한이 없습니다" 오류

**원인**: Apps Script 배포 시 "액세스 권한"을 잘못 설정

**해결**:
1. Apps Script 편집기 > **배포 > 배포 관리**
2. 현재 배포 옆 ✏️ 편집 아이콘 클릭
3. **액세스 권한**: **모든 사용자** 로 변경
4. **버전** > **새 버전** 선택
5. **배포** 클릭

### 문제 3: GitHub Pages가 작동하지 않음

**원인**: 저장소가 Private으로 설정됨

**해결**:
1. 저장소 **Settings** > **General**
2. 하단 **Danger Zone** > **Change visibility**
3. **Make public** 선택

### 문제 4: CORS 오류

**원인**: Apps Script에서 CORS 설정 누락

**해결**: `CheckIn_WebAPI.js`의 `doPost` 함수에 CORS 헤더가 포함되어 있는지 확인

---

## 📊 배포 후 확인 사항

- [ ] GitHub Pages URL이 정상 작동
- [ ] 모바일에서 접근 가능
- [ ] 예약자 검색 기능 정상
- [ ] 당일 방문 접수 기능 정상
- [ ] 서명 입력 가능
- [ ] Google Sheets에 데이터 기록됨
- [ ] Slack 알림 전송됨
- [ ] PDF가 Google Drive에 저장됨

---

## 🎉 완료!

이제 외부 방문자가 모바일에서 안전하게 체크인할 수 있습니다.

**배포된 URL**: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

질문이나 문제가 있으면 개발팀에 문의하세요.
