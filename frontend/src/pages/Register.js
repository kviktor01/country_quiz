import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLazySignUpQuery } from "../state/AuthApiSlice";
import adventure from "../undraw_adventure_4hum 1.svg";

export default function Register() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [signUpApi] = useLazySignUpQuery();
	const navigate = useNavigate();
	const [haveError, setHaveError] = useState(false);
	const [error, setError] = useState("");
	const onSignUp = (e) => {
		e.preventDefault();
		try {
			signUpApi({
				userName: userName,
				password: password,
				comfirmPassword: password2,
			}).then((data) => {
				if (!data.error) {
					navigate("/login");
				} else {
                    setHaveError(true);
                    setError(data.error.data);
                    console.log(data);
				}
			});
		} catch (e) {
			console.log(e.message);
		}
	};
	return (
		<div className="login-container">
			<div className="login-header">
				<h1>Sign up</h1>
				<img src={adventure} alt="" />
			</div>
			<div className="login-body">
				<form onSubmit={(e) => onSignUp(e)}>
					<label htmlFor="userName">Enter the username</label>
					<input
						onChange={(e) => setUserName(e.target.value)}
						name="userName"
						type="text"
					></input>
					<label htmlFor="password">Enter the password</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						type="password"
					></input>
					<label htmlFor="password2">Enter the password</label>
					<input
						onChange={(e) => setPassword2(e.target.value)}
						name="password2"
						type="password"
					></input>
					{haveError ? <div>{error}</div> : ""}
					<button>Sign up</button>
				</form>
			</div>
		</div>
	);
}
