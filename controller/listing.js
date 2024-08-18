const Listing = require("../models/Schema.js");



//index
module.exports.index=async (req, res, next) => {
    let alllistings = await Listing.find();

    res.render("./listings/Home.ejs", { alllistings });
  };

module.exports.render_new_form=  (req, res, next) => {
    res.render("./listings/new.ejs");
      
  }

module.exports.new_listing=async (req, res, next) => {
      
    let url=req.file.path;
    let filename=req.file.filename;
     let newlisting = new Listing(req.body);
     newlisting.owner=req.user._id;
     newlisting.image={filename,url};
   req.flash("success","New Listing Added");
    await newlisting.save()
     
     res.redirect("/listings");
   }

   module.exports.view_listing=async (req, res, next) => {
    let { id } = req.params;

    let sltlist = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    res.render("./listings/View.ejs", { sltlist });
  }

  module.exports.edit_listing_form=async (req, res, next) => {
    let { id } = req.params;
    let editlist = await Listing.findById(id);
    let previewImageUrl=editlist.image.url.replace("/upload","/upload/h_300,w_250");
    res.render("./listings/Edit.ejs", { editlist,previewImageUrl });
  }

  module.exports.edit_listing=async (req, res, next) => {
    let { id } = req.params;
    let { title, description, price, location, country } = req.body;
  
   
     let result= await Listing.findByIdAndUpdate(
          id,
          {
            title,
            description,
            price,
            location,
            country,
          },
          { runvalidators: true }
        );
        if(req.file){
          let filename=req.file.filename;
          let url=req.file.path;
          result.image={filename,url};
         await result.save();
        }
      req.flash("success","Successfully Updated");
    res.redirect(`/listings/${id}`);
  }

  module.exports.delete_listing=async (req, res, next) => {
    let { id } = req.params;
   
    await Listing.findByIdAndDelete(id);
    req.flash("success","Successfully Deleted");
    res.redirect("/listings");
   
    
  }

  module.exports.listing_search=async(req,res,next)=>{
    let{search}=req.query;
    let result=await Listing.find({$or:[{title:search},{country:search},{location:search}]});
    res.render("./listings/search.ejs",{result});
  }