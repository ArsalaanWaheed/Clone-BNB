const express=require("express");
const router=express.Router();
const mongoose = require("mongoose");
const path = require("path");
const asyncwrap = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../listingSchema.js");
const reviewSchema=require("../reviewSchema.js");
const Listing = require("../models/Schema.js");
const Reviews=require("../models/reviews.js");
const {isAuthenticate}=require("../middleware.js");
const {isOwner}=require("../middleware.js");
const {validatelisting}=require("../middleware.js");
const User=require("../models/user.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js")
const upload=multer({storage});
const listingController=require("../controller/listing.js");

router.route(
    "/")
   .get( asyncwrap(listingController.index)
  )
  .post(    isAuthenticate,
    upload.single("image"),
    validatelisting,
  asyncwrap(listingController.new_listing)
  );


  router.get(
    "/new",
    isAuthenticate,
    listingController.render_new_form
  );
  router.get("/search",listingController.listing_search);

  router.route(
    "/:id")

    .get(asyncwrap(listingController.view_listing)
  )
  .patch(isAuthenticate,
    isOwner,
    upload.single("image"),
    validatelisting,
    asyncwrap(listingController.edit_listing))

    .delete(
      isAuthenticate,
      isOwner,
      asyncwrap(listingController.delete_listing)
    );
  

  
  


  router.get(
    "/:id/edit",
    isAuthenticate,
    isOwner,
    asyncwrap(listingController.edit_listing_form)
  );


  module.exports=router;



  