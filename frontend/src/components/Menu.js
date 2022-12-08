import React, { useEffect } from "react";
import adventure from "../undraw_adventure_4hum 1.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserName } from "../state/AuthSlice";

export default function Menu() {
	const userName = useSelector(getUserName);
  useEffect(() => {
    console.log(userName);
  
   
  }, [userName])
  
	return (
		<div id="menu">
			<Link to="/">
				<img src={adventure} alt="" />
			</Link>
			<div className="links">
				{userName ? (
					userName
				) : (
					<>
						{" "}
						<Link to={"/login"}>Login</Link> |
						<Link to={"/register"}>Sign up</Link>
					</>
				)}
			</div>
		</div>
	);
}
