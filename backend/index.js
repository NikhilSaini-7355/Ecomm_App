// this one with  js and mongoose
// tw clone with TS and prisma
// chat app with websocket
// recoil for state management should also be used if required 
const express = require('express');
const app = express();
const port = 3000;
const {userRouter} = require("./routes/userRouter");
app.use("/user",userRouter);
app.listen(port,()=>{
    console.log(`example app listening on port ${port}`);
})