const Listing=require("./models/Schema.js");
const Review=require("./models/reviews.js");
const { listingSchema } = require("./listingSchema.js");


  //joi wale part ko function me likh diya hai or use abh as a argument pass kr denge//
  module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate( req.body);
    if (error) {
      throw new ExpressError(401, error);
    } else {
      next();
    }
  };

module.exports.isAuthenticate=(req,res,next)=>{
    req.session.currurl=req.originalUrl;
    
    if(!req.isAuthenticated()){
        req.flash("error","Login First");
        return res.redirect("/user/login");
    }
    next();
}


module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let result=await Listing.findById(id);
    if(!result.owner.equals(res.locals.sessionuser._id)){
        req.flash("error","Permission Revoked");
        return res.redirect(`/listings/${id}`)
    }else{
        next();
    }
}
module.exports.isAuthor=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let result=await Review.findById(reviewId);
    if(!result.author.equals(res.locals.sessionuser._id)){
        req.flash("error","Permission Revoked");
        return res.redirect(`/listings/${id}`)
    }else{
        next();
    }
}

