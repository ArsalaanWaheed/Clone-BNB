const express=require("express");

const router=express.Router({mergeParams:true});
const mongoose = require("mongoose");
const path = require("path");
const reviewSchema=require("../reviewSchema.js");
const asyncwrap = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Reviews=require("../models/reviews.js");
const Listing = require("../models/Schema.js");
const {isAuthenticate}=require("../middleware.js");
const {isAuthor}=require("../middleware.js");
const reviewController=require("../controller/review.js");


router.post("/",
    isAuthenticate,
    asyncwrap(reviewController.new_review))
  
  router.delete("/:reviewId",
    isAuthenticate,
    isAuthor,
    asyncwrap(reviewController.delete_review));


  module.exports=router;