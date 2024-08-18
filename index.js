if(process.env.NODE_ENV!="production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/Schema.js");
const Reviews=require("./models/reviews.js");
const ejsMate = require("ejs-mate");
const asyncwrap = require("./utils/wrapasync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./listingSchema.js");
const reviewSchema=require("./reviewSchema.js");
const listingRoutes=require("./routes/listing.js");
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport =require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const MongoStore=require("connect-mongo")

const port = 8080;

app.listen(port, () => console.log("Server Started"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(path.join("_method")));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

let mongoshellUrl="mongodb://127.0.0.1:27017/Wanderlust";
async function main() {
  mongoose.connect(process.env.MONGOATLAS_URL);
}
main()
  .then((result) => console.log("connected"))
  .catch((err) => console.log(err));

  const store=new MongoStore({
    mongoUrl:process.env.MONGOATLAS_url,
    crypto:{
      secret:"supersecret"
    },
    touchAfter:24*3600
  })

  app.use(session({
    store,
    secret:"supersecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+3*24*60*60*1000,
      maxAge:3*24*60*60*1000,
      httpOnly:true,

    }
  }));

  app.use(flash());




app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.loginstatus=req.isAuthenticated();
  res.locals.sessionuser=req.user;
  res.locals.redirectUrl=req.session.currurl;
  next();
});


app.get("/demo",async(req,res)=>{
  let user1=new User({
    email:"arsalaan@gmail.com",
    username:"arsalaan",
  });

 let newuser=await User.register(user1,"helloworld");

 res.send(newuser);
})





app.use("/listings",listingRoutes)

app.use("/listings/:id/reviews",reviewRouter);

app.use("/",userRouter);






app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
  
});
app.use((err, req, res, next) => {
  let { status = 400, message } = err;


  res.status(status).render("./listings/error.ejs", { err });
});
 

