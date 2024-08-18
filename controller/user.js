
const User=require("../models/user.js");

module.exports.user_signup_form=(req,res)=>{
    res.render("./user/userform.ejs");
}

module.exports.user_signup=async(req,res)=>{
    try{
     let {email,username,password}=req.body;
 
     let user1=new User({
         email,
         username,
     });
 
  let newuser=await User.register(user1,password);
 req.login(newuser,(err)=>{
     if(err){
         return next(err)
     }
     req.flash("success",`Welcome ${username}`);
  
  res.redirect("/listings");
  
 });
 
 
    }catch(err){
     req.flash("error",err.message)
     res.redirect("/user/signUp");
    }
 
 }


 module.exports.user_login=   (req,res,next)=>{
    req.flash("success","You Logged In!!")
    
    if(res.locals.redirectUrl){
      res.redirect(res.locals.redirectUrl);
    }else{
      res.redirect("/listings");
    }
   
  }

  module.exports.user_logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
       req.flash("success","LoggedOut Successfully");
       res.redirect("/listings"); 
    });
    

}