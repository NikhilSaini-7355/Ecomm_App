
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// await mongoose.connect("url");

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const User = mongoose.model('User',userSchema);

const cartSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : User
    },
    products : [{

    }]
})

const transationsSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : User
    }, 
    transactions : [{

    }]
})


const Cart = mongoose.model('Cart',cartSchema);
const Transactions = mongoose.model('Transactions',transationsSchema);

module.exports ={
    User,
    Cart,
    Transactions
}