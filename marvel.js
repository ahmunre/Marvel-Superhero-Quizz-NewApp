const STORE = [
  {
    question: 'Who is the richest Superhero in the Marvel Universe?',
    answers: [
      'Tony Stark', 'King T Challa', 'Thor', 'Daniel Rand'],
    correctAnswer: 'Thor'
  },
  {
    question: 'What is Captiain Americas shield made of',
    answers: [
      'Adamantium', 'Vibranium', 'Carbonite', 'Diamond'
    ],
    correctAnswer: 'Vibranium'
  },
  {
    question: 'What was Dr Stranges professeion before becoming the Sorceror Supreme?',
    answers: ['Dentist', 'Plastic Surgeon', 'Neurosurgeon', 'Physicist'],
    correctAnswer: 'Neurosurgeon'
  },
  {
    question: 'What is the name of Peter Quills alter-ego in Guardians of the Galaxy?',
    answers: [
      'Drax', 'Star Lord', 'Ego', 'Terrax'],
    correctAnswer: 'Star Lord'
  },
  {
    question: 'What actor plays the role of Ant-man in the Movie Avengers Endgame?',
    answers: [
      'Sean Williams Scott', 'Tom Hiddleston', 'Jake Gyllenhall', 'Paul Rudd'
    ],
    correctAnswer: 'Paul Rudd'
  },
  {
    question: 'The Character War Machine is played by which actor?',
    answers: [
      'Chance the Rapper', 'Childish Gambino', 'Don Cheadle', 'Chadwick Boseman'
    ],
    correctAnswer: 'Don Cheadle'
  },
  {
    question: 'In the Pantheon of Gods in the Marvel Universe, Who rules the nine realms?',
    answers: [
      'Zeus', 'Ammon Ra', 'Odin', 'Vishnu'
    ],
    correctAnswer: 'Odin'
  },
  {
    question: 'What is Thors mothers name?',
    answers: [
      'Sif', 'Gemora', 'Freya', 'Amora'
    ],
    correctAnswer: 'Freya'
  },
  {
    question: 'Which cosmic entity is know as "The devourer of worlds"?',
    answers: [
      'The Silver Surfer', 'The Inbetweener', 'Galactus', 'The Collector'
    ],
    correctAnswer: 'Galactus'
  },
  {
    question: 'Who is considered the most powerful mutant in the universe?',
    answers: [
      'Jean Gray', 'Professor Xavier', 'Scarlet Witch', 'Franklin Richards'
    ],
    correctAnswer: 'Franklin Richards'
  }
];

let questionNumber = 0;
let score = 0;

//generate question function (html)
function questionGenerator() {

  console.log('generate question');


  if (questionNumber < STORE.length) {
    return `<div class="questionZero ${questionNumber}">
          
        <h2>${STORE[questionNumber].question}</h2>
      <form>
        <fieldset>
        <label class="answerOptions">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span></label>
        <label class="answerOptions">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span></label>
        <label class="answerOptions">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span></label>
        <label class="answerOptions">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span></label>
        <button class="submitButton">
          Submit
        </button>
        </fieldset>
      </form>
      </div>`
  } else {
    showResults();
    restartPage();
    $('questionNumber').text(10)
  }
}


// increase question by 1
function updateQuestionNumber() {
  console.log('current question number' + questionNumber);
  if (questionNumber == 9) {
    myquestionNumber = questionNumber + 1;
    questionNumber++;
  } else {
    questionNumber++;
    myquestionNumber = questionNumber + 1;
  }
  console.log('newquestion number' + myquestionNumber);
  $('.questionNumber').text(myquestionNumber);

}

// update the score as well
function scorechange() {
  score++;
}

// startQuizz fucntionality
// on clicking the good luck button the start div should be Hiddleston
function startQuiz() {
  $('.questionNumber').text(1);
  console.log('quize start')
}

// show questions in the Dom 
function domRenderedQuestion() {

  console.log('show question');
  //console.log(questionGenerator());
  $('.quizQuestions').html(questionGenerator());

}


//increment score
function changeScore() {
  score++;
}


//user selects answer on submit run user feedback
function userSelectAnswer() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    console.log(answer);
    if (answer === correctAnswer) {
      console.log('answer correct');
      selected.parent().addClass('correct');
      caseAnswerCorrect();
    } else {
      selected.parent().addClass('wrong');
      caseAnswerIncorrect();
    }
  });
}


function caseAnswerCorrect() {
  userCorrectFeedback();
  updateScore();
}

function caseAnswerIncorrect() {
  userIncorrectFeedback();
}
// Postive feedback for correct answer
function userCorrectFeedback() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.quizQuestions').html(`<div class="correctFeedback"><div class="icon"><img src="images/correct.png"></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}
// Negative feedback for incorrect answer
function caseAnswerIncorrect() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.quizQuestions').html(`<div class="incorrectFeedback"><div class="icon"><img src="images/wrong.png"></div><p><b>Wrong Answer!</b> correct answer is ` + correctAnswer + `</p><button type=button class="nextButton">Next</button></div>`);

}
//update score text
function updateScore() {
  changeScore();
  $('.scoreTally').text(score);
}



//when quiz is over this is the html for the page
function showResults() {
  console.log('final result' + score);
  $('.quizQuestions').html(`<div class="correctFeedback"><div class="icon"><img src="images/result.png"></div><p><b>Final Result: ` + score + ` out of 10 </b></p><button class="restartButton">Restart Quiz</button></div>`);
}

// event when user clicks Next
function showNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    updateQuestionNumber();
    domRenderedQuestion();
    userSelectAnswer();
  });
}


//restart quizz function
function restartPage() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//keep all necessary functions that need to execute by default
function createQuiz() {
  startQuiz();
  domRenderedQuestion();
  userSelectAnswer();
  showNextQuestion();
}

//execute the createQuiz after page load
$(createQuiz);