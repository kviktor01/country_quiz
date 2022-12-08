import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLazyLoginQuery } from "../state/AuthApiSlice";
import { setUserData,setIsLogin } from "../state/AuthSlice";
import adventure from "../undraw_adventure_4hum 1.svg";

export default function Login() {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [haveError, setHaveError] = useState(false);
	const [error, setError] = useState("");
	const [loginApi] = useLazyLoginQuery();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onLogin = (e) => {
		e.preventDefault();
		console.log("hello, you login");

		loginApi({ userName: username, password: password }).then((data) => {
			console.log(data);
			if (data.isError) {
                setHaveError(true);
                setError(data.error)
			}else{
			const { userId, userName, token, maxPoint } = data.data;
			dispatch(setUserData({ userId, userName, token, maxPoint }));
			navigate("/");
			dispatch(setIsLogin(true));
			}
		});
	};
	return (
		<div className="login-container">
			<div className="login-header">
				<h1>Login</h1>
				<img src={adventure} alt="" />
			</div>
			<div className="login-body">
				<form onSubmit={(e) => onLogin(e)}>
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
					<button type="submit"> Sign in</button>
				</form>
			</div>
		</div>
	);
}
