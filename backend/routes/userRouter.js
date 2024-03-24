const express = require('express');

const userRouter = express.Router();

const { accountRouter } =  require('./accountRouter');


userRouter.post("/signin",(req,res)=>{
    res.send("signin");
});

userRouter.post("/signup",(req,res)=>{
    res.send("signup");
})

userRouter.put("/update",(req,res)=>{
    res.send("update");
})

userRouter.get("/",(req,res)=>{
    res.send("dashboard")
})

userRouter.use("/account",accountRouter);

module.exports = {
    userRouter,
}