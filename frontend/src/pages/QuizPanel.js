import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { generateQuestion } from "../helper/functions";
import Option from "../components/Option";
import { getAllCountry } from "../state/CountrySlice";
import { FLAG_TYPE } from "../state/questionConstants";
import adventure from "../undraw_adventure_4hum 1.svg";
import { getId, setCurrentPoint } from "../state/AuthSlice";
import { useLazyPointsChangeQuery } from "../state/GameApiSlice";
import { setMaxPoint } from "../state/GameSlice";

export default function QuizPanel({
	questionData,
	setQuestionCountries,
	answerCount,
	correctAnswerCount,
	setCorrectAnswerCount,
	setAnswerCount,
	setIsEnd,
	isSurvival,
	setIsSurvival
}) {
	useEffect(() => {
		if(isSurvival){
			setIsSurvival(true);
		} 
	})
	
	const [isAnswered, setIsAnswered] = useState(false);
	const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
	const [clickedCountry, setClickedCountry] = useState(null);
	const countries = useSelector(getAllCountry);
	const navigate = useNavigate();
	const dispatch=useDispatch();
	const [pointsChange]=useLazyPointsChangeQuery();
	const id=useSelector(getId);
	const onAnswerClick = (e, name) => {
		if (!isAnswered) {
			setClickedCountry(name);
			setIsAnswered(true);
			setAnswerCount(answerCount + 1);
			if (name === questionData.answer.name.common) {
				console.log("helyes");
				setCorrectAnswerCount(correctAnswerCount + 1);
				setAnswerIsCorrect(true);
			} else {
				console.log("helytelen");
				setAnswerIsCorrect(false);
			}
		}
	};
	const onNextClick = () => {
		const question = generateQuestion(countries);
		setQuestionCountries(question);
		setIsAnswered(false);
		setClickedCountry(null);
		setAnswerIsCorrect(false);
	};
	const onEndClick = () => {
		setIsEnd(true);
		pointsChange({id:id,point:correctAnswerCount}).unwrap().then((data) => {
			const {current,maxPoint}=data;
			if(maxPoint){
				dispatch(setCurrentPoint(current));
				dispatch(setMaxPoint(maxPoint));
			}
			else{
				dispatch(setMaxPoint(current));
				dispatch(setCurrentPoint(current));
			}
			
			
		})

		dispatch(setCurrentPoint(answerCount));

		navigate("/end");
	};

	return (
		<div className="quiz-container">
			{questionData && questionData.options ? (
				<>
					<div className="quiz-header">
						<h1>Country quiz</h1>
						<img src={adventure} alt="" />
					</div>
					<div className="quiz-body">
						{questionData.type === FLAG_TYPE ? (
							<img
								style={{ width: "80px", border: "1px solid black" }}
								src={questionData.answer.flags.png}
								alt=""
							/>
						) : (
							""
						)}
						<h3>{questionData.question}</h3>
						{questionData.options.map((option, index) => {
							return (
								<Option
									key={index}
									onClick={onAnswerClick}
									answerIsCorrect={answerIsCorrect}
									isAnswered={isAnswered}
									clickedCountry={clickedCountry}
									text={option}
									answer={questionData.answer}
								></Option>
							);
						})}
						{isAnswered ? (
							<>
								<button className="end-button" onClick={onEndClick}>
									End
								</button>
								{(answerIsCorrect && isSurvival) || !isSurvival ? (
									<button onClick={onNextClick}>Next</button>
								) : (
									""
								)}
							</>
						) : (
							""
						)}
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
}
