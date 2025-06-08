const questions = document.querySelectorAll('.question');
let current = 0;
let score = 0;
let answered = false;
let totalQuestions = questions.length;
let answerTimeout, showTimeout;

function showQuestion(index) {
  questions.forEach((q, i) => {
    q.classList.toggle('active', i === index);
  });

  const options = questions[index].querySelectorAll('.ab, .cd');
  options.forEach(opt => {
    opt.classList.remove('correct', 'incorrect');
    opt.style.pointerEvents = 'auto';
    opt.onclick = () => selectAnswer(opt, index);
  });

  answered = false;

  // Timer de 30 segundos para mostrar a resposta automática
  answerTimeout = setTimeout(() => {
    showCorrectAnswer(index, false); // não respondeu = false (sem ponto)
  }, 10000);
}

function selectAnswer(selected, index) {
  if (answered) return;
  answered = true;
  clearTimeout(answerTimeout); // Cancela o timer automático

  const correctIndex = parseInt(questions[index].dataset.answer);
  const options = questions[index].querySelectorAll('.ab, .cd');

  options.forEach((opt, i) => {
    opt.classList.add(i === correctIndex ? 'correct' : 'incorrect');
    opt.style.pointerEvents = 'none';
  });

  if ([...options].indexOf(selected) === correctIndex) {
    score += 10;
  }

  // Espera 10s e vai para próxima
  showTimeout = setTimeout(() => nextQuestion(), 5000);
}

function showCorrectAnswer(index, pontua) {
  if (answered) return;
  answered = true;

  const correctIndex = parseInt(questions[index].dataset.answer);
  const options = questions[index].querySelectorAll('.ab, .cd');

  options.forEach((opt, i) => {
    opt.classList.add(i === correctIndex ? 'correct' : 'incorrect');
    opt.style.pointerEvents = 'none';
  });

  // Só pontua se veio da função de clique, nunca da automática
  if (pontua) score += 10;

  showTimeout = setTimeout(() => nextQuestion(), 5000);
}

function nextQuestion() {
  questions[current].classList.remove('active');
  current++;
  if (current < totalQuestions) {
    showQuestion(current);
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-container').innerHTML = `
    <section class="perguntas active">
      <div class="questionario">
        <h2>Fim do Quiz!</h2>
        <p>Sua pontuação foi: ${score} de ${totalQuestions * 10}</p>
        <a href="quiz.html" class="menu-button">Voltar ao menu</a>

      </div>
    </section>
  `;
}

showQuestion(0);
 