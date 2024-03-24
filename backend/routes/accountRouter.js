
const express = require('express');

const accountRouter = express.Router();

accountRouter.get("/cart",(req,res)=>{
    res.send("display cart");
})

accountRouter.get("/transactions",(req,res)=>{
    res.send("give prev transations");
});

accountRouter.post("/purchase",(req,res)=>{
    res.send("purchase product");
})

module.exports = {
    accountRouter,
}