import React, { useEffect, useState } from "react";
import "./Result.css";


const Result = ({totalquestions, result, onTryAgain}) => {
    const [name, setName] = useState ("")
    const [highScores, setHighScores] = useState ([])
    const [showScores, setShowScores] = useState (false)

    useEffect(()=> {
        setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);

    }, [])

    const handleSave = () => {
        const score = {
            name,
            score: result.score
        }

        const newHighScores = [...highScores, score].sort ((a,b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem("highScores", JSON.stringify(newHighScores))

    }

    const handleTryAgain = () => {
        setShowScores(false);
        setHighScores([]);
        onTryAgain()

    }


    return (
    <div className="result">
    <h3>Resultado</h3>
    <p>
      Total de preguntas: <span>{totalquestions}</span>
    </p>
    <p>
      Puntuación: <span>{result.score}</span>
    </p>
    <p>
      Preguntas correctas: <span>{result.correctAnswers}</span>
    </p>
    <p>
      Preguntas falladas: <span>{result.wrongAnswers}</span>
    </p>
    <button onClick={handleTryAgain}>Volver a jugar</button>
    {!showScores ? <>
    <h3>Pon tu nombre <br /> para guardar la puntuación</h3>
    <input 
    placeholder="Tu nombre"
    value={name} onChange={(evt) => setName(evt.target.value) } />
    <button onClick={handleSave}>Guardar</button>
    </> : <>
    <table>
        <thead>
            <tr>
                <th>Ranking</th>
                <th>Nombre </th>
                <th>Puntuación</th>
                
            </tr>
            </thead>
            
            <tbody>
             {highScores.map((highScores, i)=> {
                return (
                    <tr key={`${highScores.score}${highScores.score}${i}`}>
                    <td>{i + 1}</td>
                    <td>{highScores.name}</td>
                    <td>{highScores.score} </td>
                </tr>

                )
             })
            }
            </tbody>
        
    </table>
    
    </>}
  </div>

    )
}

export default Result;