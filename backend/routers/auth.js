const sha256 = require("crypto-js/sha256");
const express = require("express");
const { createToken } = require("../middlewares/auth");

const models = require("../models");

const { User } = models;
const router = express.Router();
router
//bejelentkezés routja
	.post("/login", async (req, res) => {
		console.log("login");
		//bejelentkezés rout-ja
		const { userName, password } = req.body;
		if(!userName || !password) {
			return res.status(406).send("Nem megfelelő paraméterek");
		}
		console.log(userName,password);
		//felhasználó megkeresése
		const user = await User.findOne({ where: { userName: userName } });
		console.log(user);
		if (user != null) {
			//jelszó ellenőrzése
			if (sha256(password).toString() === user.password) {
				let token;
				token = createToken(user.userName);
				user.save();

				return res.status(200).send({
					userId: user.id,
					userName: user.userName,
					token,
					maxPoint:user.maxpoint
				});
			} else {
				return res.sendStatus(401);
			}
		} else {
			return res.sendStatus(404);
		}
	})
	
	.post("/logout", async (req, res) => {
		const {userName}=req.body;
		if(!userName) {
			return res.status(400);
		}
		const user = await User.findOne({ where: { userName: userName } });
		if(!user){
			return res.status(400);
		}
		user.status="INACTIVE";
		user.save();
		return res.status(200);
	})

	// regisztráció rout-ja
	.post("/signup", async (req, res) => {
		console.log("signup");
		const { userName, password, comfirmPassword } = req.body;
		//kötelező adatok ellenőrzése
		if (!userName || !password || !comfirmPassword) return res.status(400).send("You mustn't send empty field");
		
		
		//a megerősítő jelszó ellenőrzése
		if (password !== comfirmPassword) return res.status(400).send("The comfirm password is not equal with the password");
		try {
			console.log(userName,password,comfirmPassword);
			//user létrehozása
			const user = await User.create({
				userName:userName,
				password:password,
				maxpoints:0,	
			});
			console.log("hello");
			
		} catch (e) {
			return res.status(400).send("Failed registration");
		}

		return res.status(200).send();
	});

module.exports = router;
