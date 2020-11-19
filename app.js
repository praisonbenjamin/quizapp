/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What county in Pennsylvania is Dunder Mifflin Scranton branch located?',
      answers: [
        'Beaver',
        'Lackawanna',
        'Bedford',
        'Dallas'
      ],
      correctAnswer: 'Lackawanna'
    },
    {
      question: 'In almost every meeting, Stanley is seen doing what?',
      answers: [
        'A crossword puzzle',
        'A Rubik\'s cube',
        'A magic trick',
        'Coding'
      ],
      correctAnswer: 'A crossword puzzle'
    },
    {
      question: 'Who is the Human Resources representative at Dunder Mifflin?',
      answers: [
        'Michael Scott',
        'Kelly',
        'Pam',
        'Toby'
      ],
      correctAnswer: 'Toby'
    },
    {
      question: 'After the Fun Run to beat Rabies, to whom is the oversized check made out?',
      answers: [
        'Jim',
        'Science',
        'Rabies society',
        'Geology'
      ],
      correctAnswer: 'Science'
    },
    {
      question: 'Who was sent to anger management?',
      answers: [
        'Angela',
        'Dwight',
        'Andy',
        'Stanley'
      ],
      correctAnswer: 'Andy'
    },
  ],
  giveFeedback: true,
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  answerChoice: '',
  incorrect: 0
};

/**
* 
* Technical requirements:
* 
* Your app should include a render() function, that regenerates the view each time the store is updated. 
* See your course material and access support for more details.
*
* NO additional HTML elements should be added to the index.html file.
*
* You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
*
* SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
* 
*/

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates



// Render start page
function generateStartPage(){
  return `<div class="displayPage">
  <h2>The Office</h2>
  <p>For all of The Office fans out there...</p>
  <button id="startQuiz">Start Quiz</button>
</div>`
}


//Handle start page

function generateQuestionsPage(){
  console.log(`Generate questions ran`);
  let question = store.questions[store.questionNumber];
  console.log(question);

  let answers = question.answers.map((answer,idx)=>{
    if (idx === 0){
      return `<input type="radio" id="answer${idx}" name="answer" value="${answer}"required>
      <label for="answer${idx}">${answer}</label><br>`
    }
    return `<input type="radio" id="answer${idx}" name="answer" value="${answer}">
    <label for="answer${idx}">${answer}</label><br>`
  });


  return `<div class="displayPage">
  <form id="question">
  <div class = "keepScore"> Correct: ${store.score} Incorrect: ${store.incorrect}</div>
      <h2>${store.questionNumber +1} of 5: ${question.question}</h2>
     ${answers.join("")}
      <button type="submit">Submit</button>
  </form>
</div>`
}

function generateRightWrong(){
  let feedback = '';
  if (store.answerChoice===store.questions[store.questionNumber].correctAnswer){
    feedback = `Correct answer! You knew that about The Office!`;
  } else {
    feedback = `Not quite, try after again after rewatching!`
  }
  return `<div class="displayPage">
  <h4>${feedback}</h2>
    <p>The correct answer is: ${store.questions[store.questionNumber].correctAnswer}</p>
  <h5>Score</h5>
  <ul>
      <li>Correct: ${store.score}</li>
      <li>Wrong: ${store.incorrect}</li>
  </ul>
  <button id="next">Next</button>
</div>`
}

function generateLastPage(){
  let feedback = '';
  if (store.answerChoice===store.questions[store.questionNumber].correctAnswer){
    feedback = `Correct answer! You knew that about The Office!`;
  } else {
    feedback = `Not quite, try after again after rewatching!`
  }
  return `<div class="displayPage">
  <h4>${feedback}</h2>
    <p>The correct answer is: ${store.questions[store.questionNumber].correctAnswer}</p>
  <h4> But you are done!</h2>
  <h5>Score</h5>
  <ul>
      <li>Correct: ${store.score}</li>
      <li>Wrong: ${store.incorrect}</li>
  </ul>
  <button id="restart">Restart</button>
</div>`
  
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartPage(){
  $('main').on ('click','#startQuiz', function(event){
    store.quizStarted = true;
    render();
  });
}

function handleSubmitAnswer(){
  $('main').on('submit','#question',(event)=>{
  event.preventDefault();
  store.answerChoice = $("input[name='answer']:checked").val();
  store.giveFeedback = false;
  let rightAnswer = store.questions[store.questionNumber].correctAnswer;
  if (store.answerChoice === rightAnswer){
    store.score++;
  } else {
    store.incorrect ++;
  }
  render();
});
}

function handleNext(){
  $('main').on('click', '#next',(event)=>{
    store.giveFeedback = true;
    store.answerChoicer= '';
    store.questionNumber++;
    render();
  });
}

function handleRestart(){
  $('main').on('click', '#restart', (event) =>{
    store.answerChoice = '';
    store.score = 0;
    store.incorrect = 0;
    store.questionNumber= 0;
    store.giveFeedback = true;
    store.quizStarted = false;
    render();
  })
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store


function render(){
  let html='';
  if (store.quizStarted === false){
    html = generateStartPage();
  }else if (store.giveFeedback === true){
    html = generateQuestionsPage();
  } else if (store.giveFeedback === false && store.questionNumber === store.questions.length -1){
    html = generateLastPage();
  }
   else {
     html= generateRightWrong();
   }
  
  $('main').html(html);
}

function main(){
  render();
  handleStartPage();
  handleSubmitAnswer();
  handleNext();
  handleRestart();
}

$(main);