const joi=require("joi");

const reviewSchema=joi.object({
    comment:joi.string().required(),
    rating:joi.string().required().min(1).max(5),
})

module.exports=reviewSchema