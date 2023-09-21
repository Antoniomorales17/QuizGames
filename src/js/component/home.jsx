import React, { useState } from "react";
import Quiz from "./quiz";
import { jsQuizz } from "../constants";
import Inicio from "./Inicio/Inicio";
import "../../styles/index.css";

const Home = () => {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    // Función para mezclar un arreglo en un orden aleatorio
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

  const questionsShuffled = shuffleArray(jsQuizz.questions);

  const handleStartClick = () => {
    setJuegoIniciado(true);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
  
      setIsMusicPlaying(false);
    } else {
     
      setIsMusicPlaying(true);
    }
  };

  return (
    <div>
      {juegoIniciado ? (
       <Quiz questions={questionsShuffled} isMusicPlaying={isMusicPlaying} toggleMusic={toggleMusic} />


      ) : (
        <Inicio onStartClick={handleStartClick} />
      )}
    </div>
  );
};

export default Home;
