const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    cartData:Array,
    wishlistData:Array,
    favouriteData:Array
});

module.exports =mongoose.model("user",userSchema);