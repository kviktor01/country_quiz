const express = require("express");
const { createServer } = require("http");
const cors= require('cors');



const app = express();

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
//const httpServer = createServer(app);
const auth = require("./routers/auth.js");

app.use("/auth",auth);
app.get('/', (req, res) => {
	res.send('Hello World!')
  })
app.get('/score');
app.listen(5000,()=>{
	console.log("App fut az 5000-es porton");
});
/*
httpServer.listen(5000, () => {
	console.log(`A szerver fut ezen a porton: 5000`);
});*/