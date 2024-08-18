const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const reviewSchema=Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    date:{
        type:Date,
        default:new Date(Date.now()).toString()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

});

const Reviews=mongoose.model("Reviews",reviewSchema);

module.exports=Reviews;