const mongoose=require('mongoose');

const dishSchema=new mongoose.Schema({
    name:String,
    image:String,
    category:String,
    rating:String,
    description:String,
    features:Array,
    deliveryCharges:Number,
    price:Number,
    quantity:Number,
    tag:String,
    addedToCart:Boolean
});

module.exports =mongoose.model("dish",dishSchema);