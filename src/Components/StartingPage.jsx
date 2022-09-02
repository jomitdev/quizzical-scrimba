import React from "react";

function StartingPage(props) {
  return (
    <div className="flex flex-col justify-center items-center text-center font-karla text-purple h-screen">
      <h1 className="font-bold text-4xl mb-4 tracking-wider">Quizzical</h1>
      <p className="text-lg mb-6">Answer a variety of trivia questions!</p>
      <button
        className="bg-lightPurple text-lightGray text-lg px-24 py-6 rounded-3xl hover:bg-purple transition-all duration-300 ease-in-out"
        onClick={props.startQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartingPage;
