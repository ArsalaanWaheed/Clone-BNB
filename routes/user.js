const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=require("../models/user.js");
const asyncwrap = require("../utils/wrapasync.js");
const passport=require("passport");
const userController=require("../controller/user.js")


router.get("/user/signUp",userController.user_signup_form);

router.post("/user/signUp",userController.user_signup
);

router.get("/user/login",(req,res)=>{
    res.render("./user/loginuser.ejs");
});

router.post("/user/login",
    passport.authenticate("local",{
        failureRedirect:"/user/login",
        failureFlash:true}

    ),
 userController.user_login
);

router.get("/user/logout",userController.user_logout)


module.exports=router;