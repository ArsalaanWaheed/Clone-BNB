const mongoose=require("mongoose");
const Reviews=require("./reviews.js");

const listSchema= new mongoose.Schema({
 title:{
    type:String,
    
 
 },
 description:{
    type:String,

 },
 image:{
   
    filename:String,
    url:String,
        
    
}

 ,
 price:{
    type:Number,
 },
 location:{
   type:String,
 },
 country:{
type:String,
 },
 reviews:[
   {type: mongoose.Schema.Types.ObjectId,
     ref:"Reviews",
   }
],
   owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
   }



});

listSchema.post("findOneAndDelete",async(list)=>{

   if(list)
   {
      await Reviews.deleteMany({_id:{$in:list.reviews}});
   }
});

const Listing=mongoose.model("Listing",listSchema);



module.exports=Listing;