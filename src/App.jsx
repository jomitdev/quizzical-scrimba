import React from "react";
import StartingPage from "./Components/StartingPage";
import Question from "./Components/Question";
import "./index.css";
import background1 from "./assets/background1.svg";
import background2 from "./assets/background2.svg";

function App() {
  const [startedQuiz, setStartedQuiz] = React.useState(false);
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [finishedQuiz, setFinishedQuiz] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [pickQuestions, setPickQuestions] = React.useState([0, 1, 2, 3, 4]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setAllQuestions(data.results);
        data.results.forEach((question) => {
          setAnswers((prevAnswers) => {
            return [
              ...prevAnswers,
              shuffle([
                {
                  name: question.correct_answer,
                  selected: false,
                  correct: true,
                },
                {
                  name: question.incorrect_answers[0],
                  selected: false,
                  correct: false,
                },
                {
                  name: question.incorrect_answers[1],
                  selected: false,
                  correct: false,
                },
                {
                  name: question.incorrect_answers[2],
                  selected: false,
                  correct: false,
                },
              ]),
            ];
          });
        });
      });
  }, []);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  function startQuiz() {
    setStartedQuiz(true);
  }

  function checkAnswers() {
    if (!finishedQuiz) {
      const selected_answers = [];
      for (let i = 0; i < answers.length; i++) {
        for (let j = 0; j < 4; j++) {
          if (answers[i][j].selected) {
            selected_answers.push(answers[i][j]);
          }
        }
      }
      console.log(selected_answers);
      if (selected_answers.length < 5) {
        console.log("You have not selected an answer to a question");
      } else {
        document.querySelectorAll(`.correct`).forEach((answer) => {
          answer.classList.remove("bg-[#D6DBF5]");
          answer.classList.remove("border-purple");
          answer.classList.add("border-green");
          answer.classList.add("bg-green");
        });
        document.querySelectorAll(`.selected`).forEach((answer) => {
          if (answer.classList.contains("incorrect")) {
            answer.classList.remove("bg-[#D6DBF5]");
            answer.classList.remove("border-purple");
            answer.classList.add("border-red");
            answer.classList.add("bg-red");
          }
        });
        document.querySelectorAll(".incorrect").forEach((incorrect) => {
          incorrect.classList.add("opacity-50");
        });
        for (let i = 0; i < 5; i++) {
          if (selected_answers[i].correct) {
            setCorrectAnswers((prevAnswers) => prevAnswers + 1);
          }
        }
        setFinishedQuiz(true);
      }
    } else {
      setAnswers((prevAnswers) => {
        const newAnswers = prevAnswers;
        for (let i = 0; i < prevAnswers.length; i++) {
          for (let j = 0; j < 4; j++) {
            newAnswers[i][j].selected = false;
          }
        }
        return newAnswers;
      });
      setCorrectAnswers(0);
      setFinishedQuiz(false);
      setPickQuestions((prevPicks) => prevPicks.map((el) => el + 5));
      console.log(pickQuestions);
      document.querySelectorAll(".correct").forEach((div) => {
        div.classList.remove("border-green");
        div.classList.remove("bg-green");
      });
      document.querySelectorAll(".incorrect").forEach((div) => {
        div.classList.remove("border-red");
        div.classList.remove("bg-red");
        div.classList.remove("opacity-50");
      });
    }
  }

  const answersEls = [];
  for (let i = 0; i < 5; i++) {
    answersEls.push(
      <Question
        key={i}
        questions={allQuestions[pickQuestions[i]]}
        answers={answers[answers.length + pickQuestions[i] - 50]}
        question={i + 1}
        hasFinished={finishedQuiz}
      />
    );
  }

  return (
    <div className="h-screen bg-lightGray">
      <img className="absolute top-0 right-0 z-0" src={background1} alt="" />
      <img className="absolute bottom-0 left-0 z-0" src={background2} alt="" />
      {!startedQuiz && <StartingPage startQuiz={startQuiz} />}
      {startedQuiz && allQuestions.length > 0 && answers.length > 0 && (
        <div>
          <div className="h-screen flex flex-col justify-around py-24">
            {answersEls}
            <div className="text-purple flex justify-center items-center space-x-10 font-bold">
              {finishedQuiz && (
                <p className="text-lg">
                  You scored {correctAnswers}/5 correct answers
                </p>
              )}
              <button
                className="bg-lightPurple text-lightGray text-lg px-8 py-3 rounded-2xl hover:bg-purple transition-all duration-300 ease-in-out"
                onClick={checkAnswers}
              >
                {finishedQuiz ? "Reset game" : "Check answers"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
