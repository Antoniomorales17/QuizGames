import React from "react";
import { useState } from "react";
import "./quiz.css";
import { resultInitalState } from "../constants";
import AnswerTimer from "./AnswerTimer/AnswerTimer";
import Result from "./Result/Result";


const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true)
  const [inputAnswer, setInputAnswer] = useState (" ")

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (selectedAnswer, index) => {
    setAnswerIdx(index);
    if (selectedAnswer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  // Función para mezclar un arreglo en un orden aleatorio
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false)
    setInputAnswer("");
    setResult((prev) =>
      finalAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);

    })
  };

  const onTryAgain = () => {
    setResult(resultInitalState)
    setShowResult(false)
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false)
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && <AnswerTimer duration={5} onTimeUp={handleTimeUp} />}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="footer">
          <button
              onClick={() => onClickNext(answer)}
              disabled={answerIdx === null}
              className="supermario-character" // Agrega la clase CSS aquí
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>

          </div>
        </>
      ) : (
       <Result result={result} onTryAgain={onTryAgain} totalquestions={questions.length} />
      )}
    </div>
  );
};

export default Quiz;
