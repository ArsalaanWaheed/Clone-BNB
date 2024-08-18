const initdata=require("./data.js");
const mongoose=require("mongoose");
const Listing=require("../models/Schema.js");



async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust");
};
main().then((res)=>console.log("connected"))
.catch((err)=>console.log(err));


const initDB=async ()=>{
    await Listing.deleteMany({});
   initdata.data= initdata.data.map((obj)=>({...obj,owner:"66ba3195e5ad87cef6bff087"}));
    await Listing.insertMany(initdata.data)
    .then((res)=>console.log(res));

    console.log("data inserted");
};

initDB();  