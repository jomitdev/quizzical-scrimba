import React from "react";

function Question(props) {
  function selectAnswer(answer1, name) {
    if (!props.hasFinished) {
      document
        .querySelectorAll(`#question${props.question} > div > div`)
        .forEach((div) => {
          div.classList.remove("bg-[#D6DBF5]");
          div.classList.remove("selected");
        });
      props.answers.forEach((answer) => {
        answer.selected = false;
      });
      props.answers.forEach((answerInner) => {
        if (answerInner.name == name) {
          answerInner.selected = true;
          answer1.classList.toggle("bg-[#D6DBF5]");
          answer1.classList.toggle("selected");
        }
      });
    }
  }

  const answersEls = props.answers.map((answer, index) => {
    return (
      <div key={index}>
        <div
          className={`${
            answer.correct ? "correct" : "incorrect"
          } border border-purple text-purple text-sm my-3 rounded-lg px-3 min-w-[65px] cursor-pointer`}
          dangerouslySetInnerHTML={{ __html: answer.name }}
          onClick={(event) => selectAnswer(event.target, answer.name)}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-auto w-[512px] relative">
      <p
        id="question"
        className="font-bold text-purple text-lg"
        dangerouslySetInnerHTML={{
          __html: props.questions.question,
        }}
      ></p>
      <div
        id={`question${props.question}`}
        className="flex justify-start space-x-3"
      >
        {answersEls}
      </div>
      <hr className="text-[#DBDEF0]" />
    </div>
  );
}

export default Question;
