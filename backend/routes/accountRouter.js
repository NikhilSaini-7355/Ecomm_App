
const express = require('express');
const { authMiddleware } = require('../middleware');
const { User, Cart, Transactions } = require("../db");
const z = require('zod')

const accountRouter = express.Router();

accountRouter.get("/cart",authMiddleware,async (req,res)=>{
    userId = req.userId;
    try{
    const filter = req.query.filter;
    const cart = await Cart.findOne({ userId : userId });
    const products =  cart.products;
    return res.status(200).json({
        products : products.filter((val)=>{
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
        transactions : purchases.filter((val)=>{
              if(val.productname.indexOf(filter)!=-1 )
              {
                return true;
              }
              else
              {
                return false;
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

const PurchaseSchema = z.object({
    productname : z.string(),
    productprice : z.number()
})
accountRouter.post("/cartPurchase",authMiddleware,async (req,res)=>{
     const body = req.body;
     const userId = req.userId;
     const {success} = PurchaseSchema.safeParse(body);
     if(!success)
     {
        return res.status(411).json({
            message : "some error occuurred"
        })
     }
    
     try{
     const cart = await Cart.findOne({ userId : userId });
     const products = cart.products;
     let flag =0;
     products = products.filter((val)=>{
         if(val.productname == body.productname && val.productprice == body.productprice && flag==0)
         {
            flag = 1;
            return false;
         }
         else{
            return true;
         }
     })

     await cart.save().then(()=>{
        console.log("product removed from cart")
     });
     
     const transactions = await Transactions.findOne({ userId : userId });
     const purchases = transactions.transactions;
     purchases.push(body);
     await transactions.save().then(()=>{
        return res.status(200).json({
            message : "purchase successfully"
        })
     })
    }
    catch(e)
    {
        return res.status(411).json({
            message : "some error occurred  just while purchasing"
        })
    }


})

accountRouter.post("/directPurchase",authMiddleware, async (req,res)=>{
   const  body = req.body;
   const userId = req.userId;
   const {success} = PurchaseSchema.safeParse(body);
   if(!success)
   {
     return res.status(411).json({
        message : "some issue occurred in purchased body"
     })
   }

  try {
   const transactions = await Transactions.findOne({ userId : userId });
   const purchases = transactions.transactions;
   purchases.push(body);
   await transactions.save().then(()=>{
     return res.status(200).json({
        message : "purchased successfully"
     })

   })
    }
    catch(e)
   {
    return res.status(411).json({
        message : "some error occurred"
    })
   }

})

module.exports = {
    accountRouter,
}