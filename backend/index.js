// this one with  js and mongoose
// tw clone with TS and prisma
// chat app with websocket
// recoil for state management should also be used if required 
const express = require('express');
const app = express();
const port = 3000;
const {userRouter} = require("./routes/userRouter");
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());
app.use("/user",userRouter);

app.post("/hello",(req,res)=>{
    res.send(req.body);
})

app.listen(port,()=>{
    console.log(`example app listening on port ${port}`);
})