const canvas = document.getElementById("captchaCanvas");
const ctx = canvas.getContext("2d");

const input = document.getElementById("textInput");

const buttons = document.querySelectorAll("[data-style]");

const refreshStyleBtn = document.getElementById("refreshStyle");

const refreshTextBtn = document.getElementById("refreshText");

let currentStyle = 0;
let currentText = "";

// 캡차 문구들
const captchaTexts = [
  "Paige Embry",
  "Julia Ash",
  "Pauline Ketch",
  "Daisy Green",
  "Samantha Dane",
];

// 스타일 함수들
const styles = [
  renderStyle01,
  renderStyle02,
  renderStyle03,
  renderStyle04,
  renderStyle05,
  renderStyle06,
  renderStyle07,
  renderStyle08,
  renderStyle09,
  renderStyle10,
];

// 랜덤 텍스트
function getRandomText() {
  return captchaTexts[Math.floor(Math.random() * captchaTexts.length)];
}

// 랜덤 스타일
function getRandomStyle() {
  return Math.floor(Math.random() * styles.length);
}

// 렌더
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 글자 수 기반 스케일 계산
  const len = currentText.length;

  let scale = 1;

  if (len > 10) scale = 0.85;
  if (len > 14) scale = 0.72;
  if (len > 18) scale = 0.58;

  ctx.save();

  // 중앙 기준 축소
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  styles[currentStyle](ctx, canvas, currentText);

  ctx.restore();
}

// 새 캡차 생성
function createCaptcha() {
  currentText = getRandomText();
  currentStyle = getRandomStyle();

  input.value = "";
  input.placeholder = "Answer";

  render();
}

// 스타일만 변경
function refreshStyle() {
  currentStyle = getRandomStyle();

  render();
}

// 텍스트 + 스타일 변경
function refreshText() {
  currentText = getRandomText();

  input.value = "";

  render();
}

// 정답 확인
function checkAnswer() {
  const userAnswer = input.value.trim();

  if (userAnswer.toLowerCase() === currentText.toLowerCase()) {
    alert("정답입니다");

    createCaptcha();
  } else {
    alert("틀렸습니다");

    input.value = "";
  }
}

// 엔터 입력
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// 버튼 이벤트
refreshStyleBtn.addEventListener("click", refreshStyle);

refreshTextBtn.addEventListener("click", refreshText);

// 시작
createCaptcha();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    currentStyle = Number(button.dataset.style);

    render();
  });
});

const textInput = document.getElementById("textInput");

const curveTextPath = document.getElementById("curveTextPath");

/* 어디 클릭해도 입력 가능 */
document.body.addEventListener("click", () => {
  textInput.focus();
});

/* 입력 → 곡선 반영 */

/* 자동 포커스 */
window.addEventListener("load", () => {
  textInput.focus();
});

let cursorVisible = true;

/* 커서 업데이트 */
function updateCurveText() {
  const value = textInput.value;

  /* 아무것도 없을 때만 커서 */
  if (value.length === 0) {
    curveTextPath.textContent = cursorVisible ? "|" : "";
  } else {
    /* 입력 시작하면 커서 제거 */
    curveTextPath.textContent = value;
  }
}
/* 입력 시 */
textInput.addEventListener("input", () => {
    /* 영문 + 공백만 허용 */
    textInput.value = textInput.value
    .replace(/[^a-zA-Z\s]/g, "");

  updateCurveText();

});

/* 커서 깜빡임 */
setInterval(() => {
  cursorVisible = !cursorVisible;

  updateCurveText();
}, 500);

/* 최초 실행 */
updateCurveText();
