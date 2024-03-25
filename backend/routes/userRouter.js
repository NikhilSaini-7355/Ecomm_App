const express = require('express');

const userRouter = express.Router();

const { accountRouter } =  require('./accountRouter');
const z = require('zod');

const { User, Cart, Transactions } = require("../db");

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const { authMiddleware } = require('../middleware');

const signupSchema = z.object(
    {
        username : z.string().email(),
        firstname : z.string().min(2),
        lastname : z.string().min(2),
        password : z.string().min(8)
    }
);

const signinSchema = z.object({
    username : z.string().email(),
    password : z.string().min(8)
})

const updateSchema = z.object({
    firstname : z.string().min(2).optional(),
    lastname : z.string().min(2).optional(),
    password : z.string().min(8).optional()
})

const addSchema = z.object({
    productname : z.string(),
    productprice : z.number()
})
userRouter.post("/signup",async (req,res)=>{
     const body = req.body;
     const {success} = signupSchema.safeParse(body);
     if(!success)
     {  
        return res.status(411).json({
            message : "incorrect credentials"
        })
     }

     const user = await User.findOne({ username : body.username });
     if(user)
     {
        return res.status(411).json({
            message : "user already registered"
        })
     }
     else
     {
        const user2 = await User.create(body);
        const cart2 = await Cart.create({
            userId : user2._id,
            products : []
        })

        const transaction = await Transactions.create({
            userId : user2._id,
            transations : []
        })

        const token = jwt.sign({ userId : user2._id },JWT_SECRET);

        res.status(200).json({
            message : "signup successful",
            token : token
        })


     }

});

userRouter.post("/signin",async (req,res)=>{
    const body = req.body;
    const {success}  = signinSchema.safeParse(body);
    if(!success)
    {
        return res.status(411).json({
            message : "incorrect credentials"
        })
    }

    const user = await User.findOne({ username : body.username , password : user.password });
    if(user)
    {
        const token = jwt.sign({ userId : user._id },JWT_SECRET);
        return res.status(200).json({
            message : "signin sucessful",
            token : token
        })
    }
    else
    {
        return res.status(411).json({
            message : "not registered user"
        })
    }
})

userRouter.put("/update",authMiddleware, async (req,res)=>{
    const userId = req.userId;
    const {success} = updateSchema.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json(
            {
                message : "invalid credentials"
            }
        )
    }
      try {
       await User.findOneAndUpdate({ _id : userId }, req.body );
       return res.status(200).json({
        message : "user information updated successfully"
       })
      }
      catch(e)
      {
         return res.status(411).json({
            message : "some error occurred"
         })
      }
})

userRouter.get("/add",authMiddleware,async (req,res)=>{
     const userId = req.userId;
     const {success} = addSchema.safeParse(req.body);
     if(!success)
     {
        return res.status(411).json({
            message : "wrong input on addition"
        })
     }
     
     try{
     const cart = await Cart.findOne({ userId : userId});
     cart.products.push(req.body);
     await cart.save().then(()=>{
        return res.status(200).json({
            message : "product added successfully"
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

userRouter.use("/account",accountRouter);

module.exports = {
    userRouter,
}