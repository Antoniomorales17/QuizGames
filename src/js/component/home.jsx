import React from "react";
import Quiz from "./quiz";
import { jsQuizz } from "../constants";
import  "../../styles/index.css"


//include images into your bundle



//create your first component
const Home = () => {

	
	return (
		<Quiz questions = {jsQuizz.questions}/>
	);
};

export default Home;
