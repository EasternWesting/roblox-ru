const btnAnswer = document.getElementById('btn-answer');
const answer = document.getElementById('answer');

btnAnswer.addEventListener('click', () => {
  if (answer.style.height != 'auto') {
    btnAnswer.textContent = 'Скрыть ответ'
    answer.style.height = 'auto';
    answer.style.marginTop = '15px';
    answer.style.padding = '15px';
    answer.style.opacity = '0.9';
  } else {
    btnAnswer.textContent = 'Показать ответ'
    answer.style.height = '0';
    answer.style.marginTop = '0';
    answer.style.padding = '0';
    answer.style.opacity = '0';
  }
});