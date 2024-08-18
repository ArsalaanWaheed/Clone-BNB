const Listing = require("../models/Schema.js");
const reviewSchema=require("../reviewSchema.js");
const Reviews=require("../models/reviews.js");


module.exports.new_review=async(req,res,next)=>{
    let{id}=req.params;
    
  let result=reviewSchema.validate(req.body);
  if(result.error){
    throw new ExpressError(401,result.error);
  }
    let list=await Listing.findById(id);
    let review1=new Reviews({...req.body,author:req.user._id});
    //review1.author=req.user._id;
    list.reviews.push(review1);
    await review1.save();
    await list.save();
    req.flash("success","Review Posted");
   
   res.redirect(`/listings/${id}`);
  };

  module.exports.delete_review=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{"reviews":reviewId}});
    await Reviews.findByIdAndDelete(id);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
  }