import React from "react";
import Quiz from "./quiz";
import { jsQuizz } from "../constants";
import  "../../styles/index.css"






//create your first component
const Home = () => {

	
	return (
		<Quiz questions = {jsQuizz.questions}/>
	);
};

export default Home;
