const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    name:{required:true, type:String},
    email:{required:true, type:String},
    phone:{required:true, type:String},
    address:{required:true, type:String},
    city:{required:true, type:String},
    country:{required:true, type:String},
    cardHolderName:{required:true, type:String},
    cardNumber:{required:true, type:String},
    expiryMonthYear:{required:true, type:String},
    cvv:{required:true, type:String},
    orderItems:{required:true, type:Array},
    additionalComments:String
});

module.exports =mongoose.model("order",orderSchema);