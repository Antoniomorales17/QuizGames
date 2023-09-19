import React, { useEffect, useState, useRef } from "react";
import "./AnswerTimer.css";

function AnswerTimer () {
    const [counter, setCounter] = useState (0);
    cont [progressLoader, setProgressLoader] = useState (0)
    const intervalRef = useRef ();

    useEffect (()=> {
        intervalRef.current = setInterval(() => {
            setCounter ((cur) => cur +1)

        }, 1000);

        return () => clearInterval(intervalRef.current);
    },[]);

    useEffect (()=> {

    }, [counter])


    return <div className="answer-timer-container">
        <div className="progress"> 

        </div>
    </div>

}

export default AnswerTimer;