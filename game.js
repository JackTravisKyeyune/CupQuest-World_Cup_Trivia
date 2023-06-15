const question = document.getElementById("question"); 
const choices = Array.from(document.getElementsByClassName("choice-text")); 
const progressText = document.getElementById('progressText'); 
/* const questionCounterText = document.getElementById('questionCounter'); */
const scoreText = document.getElementById('score'); 
const loader = document.getElementById('loader'); 
const game = document.getElementById('game'); 
let currentQuestion = {}; 
let acceptingAnswers = false; 
let score = 0; 
let questionCounter = 0; 
let availableQuestions = []; 

/* empty array to hold quesitons fetched from questions.json */
let questions = [ 
    {
        "question": "Which two teams played in the 2014 Final?",
        "choice1": "Germany vs Argentina",
        "choice2": "Brazil vs Germany",
        "choice3": "Spain vs Holland",
        "choice4": "France vs Croatia",
        "answer": 1
      },
      {
        "question": "Who had the most goals in the 2018 tournament?",
        "choice1": "Miroslav Klose",
        "choice2": "Kylian Mbappe",
        "choice3": "Harry Kane",
        "choice4": "Cristiano Ronaldo",
        "answer": 3
      },
      {
        "question": "The 1998 Final was a shocker with a new country winning it for the first time, beating Brazil 3-0. Who was that country?",
        "choice1": "Spain",
        "choice2": "Denmark",
        "choice3": "Argentina",
        "choice4": "France",
        "answer": 4
      },
      {
        "question": "La Albiceleste were World Cup champions in 1978 and 1986. Their coach for the 2010 World Cup appeared in four consecutive World Cup finals tournaments 1982-86-90-94. Which country was it?",
        "choice1": "Argentina",
        "choice2": "Italy",
        "choice3": "Germany",
        "choice4": "Spain",
        "answer": 1
      },
      {
        "question": "Who had the most goals in the 2014 Fifa world cup tournament?",
        "choice1": "Thomas Muller",
        "choice2": "James Rodriquez",
        "choice3": "Neymar Junior",
        "choice4": "Robin Van Persie",
        "answer": 2
      },
      {
        "question": "What was the final score of Germany vs Brazil in 2014?",
        "choice1": "4 - 0",
        "choice2": "2 - 1",
        "choice3": "3 - 2",
        "choice4": "7 - 1",
        "answer": 4
      },
      {
        "question": "Which Country hosted the 1958 FIFA World cup?",
        "choice1": "Sweden",
        "choice2": "Chile",
        "choice3": "Mexico",
        "choice4": "Switzerland",
        "answer": 1
      },
      {
        "question": "Which Country won the World Cup in 1934?",
        "choice1": "Uruguay",
        "choice2": "Argentina",
        "choice3": "Italy",
        "choice4": "Yugoslavia",
        "answer": 3
      },
      {
        "question": " What was the final score results of the match between Brazil vs Italy in the final of 1970 world cup tournament ?",
        "choice1": "Brazil 2 - 1 Italy",
        "choice2": "Brazil 1 - 3 Italy",
        "choice3": "Brazil 2 - 3 Italy",
        "choice4": "Brazil 4 - 1 Italy",
        "answer": 4
      },
      {
        "question": "Which Country lost to West Germany in the 1990 FIFA world cup Final in Italy?",
        "choice1": "Italy",
        "choice2": "Argentina",
        "choice3": "France",
        "choice4": "England",
        "answer": 2
      },
      {
        "question": "Which Country hosted the FIFA World cup Tournament in 1994?",
        "choice1": "United States of America",
        "choice2": "Mexico",
        "choice3": "Germany",
        "choice4": "Nerthlands",
        "answer": 1
      },
      {
        "question": "Who was voted the Best player of the Tournament(MVP) of 2010 FIFA world cup tournament in South Africa?",
        "choice1": "Thomas Muller",
        "choice2": "Andreas Iniesta",
        "choice3": "Weasley Sneijder",
        "choice4": "Diego Forlan",
        "answer": 4
      },
      {
        "question": "Which Country won the 1966 World cup hosted by England?",
        "choice1": "England",
        "choice2": "Brazil",
        "choice3": "West Germany",
        "choice4": "Italy",
        "answer": 1
      },
      {
        "question": "What was the final score results between Argentina vs West Germany in the 1986 FIFA world cup final in Mexico city?",
        "choice1": "Argentina 4 - 1 West Geramny",
        "choice2": "Argentina 2 - 3 West Germany",
        "choice3": "Argentina 3 - 2 West Germany",
        "choice4": "Argentina 0 - 1 West Germany",
        "answer": 3
      },
      {
        "question": "How many goals did Ronaldo of Brazil score in the entire 2002 FIFA world cup Tournament hosted in Korea-Japan?",
        "choice1": "6",
        "choice2": "5",
        "choice3": "9",
        "choice4": "8",
        "answer": 4
      },
      {
        "question": "Who was the top scorer of the 1998 FIFA World cup Tournament hosted in France?",
        "choice1": "Zinedine Zidane",
        "choice2": "David Suker",
        "choice3": "Ronaldo",
        "choice4": "Michael Owen",
        "answer": 2
      },
      {
        "question": "Which Country hosted the first World Cup Tournament in 1930?",
        "choice1": "Italy",
        "choice2": "Uruguay",
        "choice3": "Argentina",
        "choice4": "England",
        "answer": 2
      },
      {
        "question": "How many teams are going to play in the 2026 FIFA World cup?",
        "choice1": "36",
        "choice2": "32",
        "choice3": "24",
        "choice4": "48",
        "answer": 4
      },
      {
        "question": "Who was the top scorer in the 2022 FIFA world cup in Qatar?",
        "choice1": "Kylian Mbappe",
        "choice2": "Lionel Messi",
        "choice3": "Olivier Giroud",
        "choice4": "Julian Alvarez",
        "answer": 1
      },
      {
        "question": "Which player was voted the best goal keeper(golden glove) of the 2006 FIFA world cup Tournamnet hosted in Germany?",
        "choice1": "Fabian Barthez",
        "choice2": "Olivier Kahn",
        "choice3": "Ricardo",
        "choice4": "Gianluigi Buffon",
        "answer": 4
      }
    ]; 

/*CONSTANTS*/
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    /*go to the end page*/
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  /*Update the progress bar*/
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
