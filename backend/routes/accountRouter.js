
const express = require('express');
const { authMiddleware } = require('../middleware');
const { User, Cart, Transactions } = require("../db");

const accountRouter = express.Router();

accountRouter.get("/cart",authMiddleware,async (req,res)=>{
    userId = req.userId;
    try{
    const filter = req.query.filter;
    const cart = await Cart.findOne({ userId : userId });
    const products =  cart.products;
    return res.status(200).json({
        products : products.map((val)=>{
              if(val.productname.indexOf(filter)!=-1 )
              {
                return val;
              }
        })
    })
    }
    catch(e)
    {
        return res.status(411).json({
            message : "some error occurred in finding your cart"
        })
    }

})

accountRouter.get("/transactions",authMiddleware,async (req,res)=>{
    userId = req.userId;
    try{
    const filter = req.query.filter;
    const transactions = await Transactions.findOne({ userId : userId });
    const purchases =  transactions.transactions;
    return res.status(200).json({
        transactions : purchases.map((val)=>{
              if(val.productname.indexOf(filter)!=-1 )
              {
                return val;
              }
        })
    })
    }
    catch(e)
    {
        return res.status(411).json({
            message : "some error occurred in finding your transactions"
        })
    }

});

accountRouter.post("/purchase",authMiddleware,(req,res)=>{
    
})

module.exports = {
    accountRouter,
}