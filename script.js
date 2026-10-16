const form = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const errorMessage = document.getElementById("error-message");
const result = document.getElementById("result");
const resultName = document.getElementById("result-name");
const resetButton = document.getElementById("reset-button");
const resultMessage = document.getElementById("result-message");
const resultTitle = result.querySelector(".result-title");

// 결과 문구 목록이에요. 여기에 문장을 추가하면 랜덤으로 함께 나와요
const MESSAGES = [
  "님도 이제 Dentlink 개발자!",
  "님은 천재 개발자!",
];

const MAX_FONT_SIZE = 20;

// 결과 문구가 한 줄에 다 들어갈 때까지 글자 크기를 줄여요
function fitResultTitle() {
  let fontSize = MAX_FONT_SIZE;
  resultTitle.style.fontSize = `${fontSize}px`;

  while (resultTitle.scrollWidth > resultTitle.clientWidth && fontSize > 1) {
    fontSize -= 0.5;
    resultTitle.style.fontSize = `${fontSize}px`;
  }
}

// 화면 크기가 바뀌면 다시 맞춰요
window.addEventListener("resize", () => {
  if (!result.hidden) fitResultTitle();
});

const MAX_NAME_LENGTH = 5;

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  nameInput.focus();
}

// '확인' 버튼을 누르거나 Enter 를 치면 실행돼요
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (name === "") {
    showError("이름을 입력해주세요.");
    return;
  }

  if (name.length > MAX_NAME_LENGTH) {
    showError(`이름은 최대 ${MAX_NAME_LENGTH}자까지 입력할 수 있어요.`);
    return;
  }

  errorMessage.hidden = true;
  resultName.textContent = name;
  resultMessage.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  form.hidden = true;
  result.hidden = false;
  fitResultTitle();
});

// '처음으로' 버튼을 누르면 입력 화면으로 돌아가요
resetButton.addEventListener("click", () => {
  nameInput.value = "";
  result.hidden = true;
  form.hidden = false;
  nameInput.focus();
});
