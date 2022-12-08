import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EndScreen from "./pages/EndScreen";
import { generateQuestion, selectCountries } from "./helper/functions";
import QuizPanel from "./pages/QuizPanel";
import { useLazyGetCountriesQuery } from "./state/countryApiSlice";
import {
	getAllCountry,
	getCountries,
	setAllCountry,
} from "./state/CountrySlice";
import ModePage from "./pages/ModePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/Menu";


function App() {
	const [getApiCountries] = useLazyGetCountriesQuery();
	const dispatch = useDispatch();
	const countries = useSelector(getAllCountry);
	const [answerCount, setAnswerCount] = useState(0);
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
	const [isEnd, setIsEnd] = useState(false);
	const [isSurvival,setIsSurvival] = useState(false);
	useEffect(() => {
		if (!countries) {
			getApiCountries()
				.unwrap()
				.then((data) => {
					console.log(data);
					//let countries = JSON.parse(JSON.stringify(data));
					//countries = sortCountries(countries);
					dispatch(setAllCountry(data));
					//dispatch(setCountries(countries));
				});
		}
	}, []);

	const [questionCountries, setQuestionCountries] = useState(null);
	useEffect(() => {
		if (countries) {
			//console.log(countries);
			const question = generateQuestion(countries);
			console.log(question);
			setQuestionCountries(question);
		}
	}, [countries]);
	/*
	const questionData = {
		question: "Melyik ország zászlója ez?",
		options: questionCountries,
	};*/
	return (
		<div className="App">
			<BrowserRouter>
			<Menu></Menu>
				<Routes>
					<Route path="/" element={<ModePage
					setIsSurvival={setIsSurvival}
					></ModePage>}></Route>
					<Route exact
						path="/game/normal"
						element={
							<QuizPanel
								questionData={questionCountries}
								setQuestionCountries={setQuestionCountries}
								setIsEnd={setIsEnd}
								correctAnswerCount={correctAnswerCount}
								answerCount={answerCount}
								setAnswerCount={setAnswerCount}
								setCorrectAnswerCount={setCorrectAnswerCount}
								isSurvival={isSurvival}
								setIsSurvival={setIsSurvival}
							></QuizPanel>
						}
					></Route>
					<Route exact
						path="/game/survival"
						element={
							<QuizPanel
								questionData={questionCountries}
								setQuestionCountries={setQuestionCountries}
								setIsEnd={setIsEnd}
								correctAnswerCount={correctAnswerCount}
								answerCount={answerCount}
								setAnswerCount={setAnswerCount}
								setCorrectAnswerCount={setCorrectAnswerCount}
								isSurvival={true}
								setIsSurvival={setIsSurvival}
							></QuizPanel>
						}
					></Route>
					<Route
						path="/end"
						element={
							<EndScreen
								answerCount={answerCount}
								correctAnswerCount={correctAnswerCount}
								isEnd={isEnd}
								isSurvival={isSurvival}
							></EndScreen>
						}
					></Route>
					<Route path="/login" element={<Login></Login>} />
					<Route path="/register" element={<Register></Register>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
