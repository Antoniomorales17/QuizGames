import React, { useState } from "react";
import mario from "./mario.mp3";
import "./Inicio.css";

const Inicio = ({ onStartClick }) => {
  const [audio] = useState(new Audio(mario)); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);


  const handlePlayClick = () => {
    audio.play();
    setIsMusicPlaying(true);
  };
  
  const handleStopClick = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsMusicPlaying(false);
  };
  

  return (
    <div className="inicio">
      <h1 className="titulo">Bienvenido al Quizz de Videojuegos Estilo Retro</h1>
      <p className="descripcion">Demuestra tus conocimientos sobre los videojuegos clásicos y diviértete.</p>
      <button className="boton-jugar" onClick={onStartClick}>Jugar</button>
      <button onClick={isMusicPlaying ? handleStopClick : handlePlayClick}>
  {isMusicPlaying ? "Detener Audio" : "Reproducir Audio"}
</button>

    </div>
  );
};

export default Inicio;
