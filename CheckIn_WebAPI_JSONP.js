// =====================================================
// JSONP 방식 CORS 우회 버전
// GitHub Pages에서 사용 가능
// =====================================================
var PDF_FOLDER_ID = '1M42UHIq2FBG6WgA3kis7aMlI3nKgMih_';
var SECRET_TOKEN = 'RMB_CHECK_2026_7d8f9a2b4c6e1f3g';

/**
 * 🌐 GET 요청 처리 (JSONP 지원)
 */
function doGet(e) {
  var page = e.parameter.page;
  var callback = e.parameter.callback; // JSONP 콜백
  var action = e.parameter.action;

  // HTML 페이지 요청
  if (page === 'checkin') {
    return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('리멤버 방문자 체크인')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  if (page === 'upload') {
    return HtmlService.createHtmlOutputFromFile('UploadPage')
      .setTitle('리멤버 방문 예약 업로드')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  // JSONP API 요청
  if (callback && action) {
    return handleJsonpRequest(e, callback);
  }

  // 기본: 체크인 페이지
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('리멤버 방문자 체크인')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 🔧 JSONP 요청 처리
 */
function handleJsonpRequest(e, callback) {
  try {
    var action = e.parameter.action;
    var token = e.parameter.token;

    // 토큰 검증
    if (!token || token !== SECRET_TOKEN) {
      return buildJsonpResponse(callback, {
        success: false,
        error: '인증 실패'
      });
    }

    var result;

    switch(action) {
      case 'searchVisitor':
        result = searchVisitorForCheckIn(e.parameter.name, e.parameter.last4Digits);
        break;
      default:
        result = { error: 'GET 방식은 검색만 지원합니다' };
    }

    return buildJsonpResponse(callback, { success: true, data: result });

  } catch(error) {
    return buildJsonpResponse(callback, {
      success: false,
      error: error.toString()
    });
  }
}

/**
 * 🌐 POST 요청 처리
 */
function doPost(e) {
  try {
    var params = JSON.parse(e.postData.contents);

    if (!params.token || params.token !== SECRET_TOKEN) {
      return buildCorsResponse({
        success: false,
        error: '인증 실패'
      });
    }

    var action = params.action;
    var result;

    switch(action) {
      case 'searchVisitor':
        result = searchVisitorForCheckIn(params.name, params.last4Digits);
        break;
      case 'processCheckIn':
        result = processCheckIn(params.checkInData, params.signatureDataUrl);
        break;
      case 'submitWalkIn':
        result = submitWalkIn(params.formData);
        break;
      default:
        result = { error: '알 수 없는 액션' };
    }

    return buildCorsResponse({ success: true, data: result });

  } catch(error) {
    return buildCorsResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * 🔧 JSONP 응답 생성
 */
function buildJsonpResponse(callback, data) {
  var json = JSON.stringify(data);
  var output = ContentService.createTextOutput(callback + '(' + json + ')');
  output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  return output;
}

/**
 * 🔧 일반 JSON 응답
 */
function buildCorsResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// 나머지 함수들 (searchVisitorForCheckIn, processCheckIn 등)은 동일
