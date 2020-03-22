//question database
const STORE = [
  {
    question: 'IN MUSIC, THIS CONTRAPUNTAL COMPOSITIONAL TECHNIQUE THAT EMPLOYS A MELODY WITH ONE OR MORE IMITATIONS OF THE MELODY PLAYED AFTER A GIVEN DURATION.',
    answers: [
      'WHAT IS A CANON?',
      'WHAT IS A IMITATION?',
      'WHAT IS A STRETTO?',
      'WHAT IS A FUGUE?'
    ],
    correctAnswer:
      'WHAT IS A CANON?'
  },
  {
    question:
      'IN THIS CANON ALSO KNOWN AS A PROPORTION OR PROLATION CANON, THE FOLLOWER IMITATES THE LEADER BY SOME RHYTHMIC PROPORTION. THE FOLLOWER MAY DOUBLE THE RHYTHMIC VALUES OF THE LEADER (AUGMENTATION OR SLOTH CANON) OR IT MAY CUT THE RHYTHMIC PROPORTIONS IN HALF (DIMINUTION CANON)',
    answers: [
      'WHAT IS A HALFTON CANON?',
      'WHAT IS A RATION CANON?',
      'WHAT IS A CIRCLE CANON?',
      'WHAT IS A MENSURATION CANON?'
    ],
    correctAnswer:
      'WHAT IS A MENSURATION CANON?'
  },
  {
    question:
      'IN THIS CANON, THE MUSIC IS BOTH A RETROGRADE AND INVERSE CANON MEANT TO BE PLACED ON A TABLE IN BETWEEN TWO MUSICIANS, WHO BOTH READ THE SAME LINE OF MUSIC IN OPPOSITE DIRECTIONS. AS BOTH PARTS ARE INCLUDED IN EACH SINGLE LINE, A SECOND LINE IS NOT NEEDED. BACH WROTE A FEW TABLE CANONS.',
    answers: [
      'WHAT IS A MUSICUM CANON?',
      'WHAT IS A ILLUSION CANON?',
      'WHAT IS A TABLE CANON?',
      'WHAT IS A TRICK CANON?'
    ],
    correctAnswer: 'WHAT IS A TABLE CANON?'
  },
  {
    question: 'IN THIS CANON, ALSO KNOWN AS A RETROGRADE CANON, OR THE LATIN DERIVED CANON CANCRIZANS, THE FOLLOWER ACCOMPANIES THE LEADER BACKWARD (IN RETROGRADE). ALTERNATIVE NAMES FOR THIS TYPE ARE CANON PER RECTE ET RETRO OR CANON PER RECTUS ET INVERSUS.',
    answers: [
      'WHAT IS A LIEDER CANON?',
      'WHAT IS A CRAB CANON?',
      'WHAT IS A CRAFT CANON?',
      'WHAT IS AN OPFER CANON?'
    ],
    correctAnswer: 'WHAT IS A CRAB CANON?'
  },
  {
    question:
      'IN THIS CANON, ALSO KNOWN AS A RIDDLE CANON, OR ENIGMA CANON ONLY ONE VOICE IS NOTATED AND THE RULES FOR DETERMINING THE REMAINING PARTS AND THE TIME INTERVALS OF THEIR ENTRANCES MUST BE GUESSED.',
    answers: [
      'WHAT IS A PUZZLE CANON?',
      'WHAT IS A QUIZ CANON?',
      'WHAT IS A CLAIM CANON?',
      'WHAT IS A WEB CANON?'
    ],
    correctAnswer:
      'WHAT IS A PUZZLE CANON?'
  }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.gargoyleBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
    <img src="images/correct.jpg" alt="illuminated angel" class="images" width="200px">
      <p class="sizeMe">You have chosen wisely!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>You have chosen poorly!</h3>
    <img src="images/wrong.jpg" alt="illuminated bird" class="images" width="200px">
    <p class="sizeMe">The correct question:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.gargoyleBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Aye, a musician you are!',
    'images/win.jpg',
    'gargoyle',
    'Continue on your journey!'
  ];

  const good = [
    'Aye, a musician you are!',
    'images/win.jpg',
    'gargoyle',
    'Continue on your journey!'
  ];

  const bad = [
    'Methinks you are not a musician',
    'images/end.jpg',
    'illuminated gargoyle',
    'Study and patience will reward you!'
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >= 5) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${score} / 5</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.gargoyleBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);