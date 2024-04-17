const express = require("express");
const jwt = require("jsonwebtoken");
require("./db/config");
const secretKey = "JayShankar";

const User = require("./db/user");
const Dish= require("./db/dish");
const Order=require("./db/order");

const app = express();
const cors=require('cors');

app.use(express.json());
app.use(cors());


function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // req.body = decoded;
      next();
    }
  });
}

app.get("/", async (req, res) => {
  res.send("App is working!");
});

app.post("/signup", async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    res.send({ error: "User already exists!" });
  } else {
    let user = new User(req.body);
    let result = await user.save();
    if (result) {
      res.send({ success: "User Added Successfully!" });
    } else {
      res.send({ error: "Something went wrong, please try again !" });
    }
  }
});

app.post("/login", async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    if (foundUser.password === req.body.password) {
      //success
      const token = jwt.sign({ foundUser }, secretKey, { expiresIn: "1d" });
      res.send({ success: "Login Successful", jwt: token });
    } else {
      res.send({ error: "Invalid credentials!" });
    }
  } else {
    res.send({ error: "No user found!" });
  }
});

app.get("/get-dishes-data", verifyToken, async(req,res)=>{
    let dishesData=await Dish.find();
    if(dishesData)
    {
        res.send(dishesData);
    }
    else
    {
        res.send({error:"Error in fetching dishes!"});
    }
}); 

app.post("/update-cart/:id", verifyToken, async(req,res)=>{
    let result= await User.updateOne({_id:req.params.id},
      {
        $set: {cartData: req.body.addToCartList}
      }
      );
      if(result)
      {
        res.send(result);
      }
      else
      {
        res.send({error:"Something went wrong!"});
      }
});

app.post("/update-wishlist/:id", verifyToken, async(req,res)=>{
  let result= await User.updateOne({_id:req.params.id},
    {
      $set: {wishlistData: req.body.wishlist}
    }
    );
    if(result)
    {
      res.send(result);
    }
    else
    {
      res.send({error:"Something went wrong!"});
    }
});

app.post("/update-favourites/:id", verifyToken, async(req,res)=>{
  let result= await User.updateOne({_id:req.params.id},
    {
      $set: {favouriteData: req.body.favouritesList}
    }
    );
    if(result)
    {
      res.send(result);
    }
    else
    {
      res.send({error:"Something went wrong!"});
    }
});

app.post("/search-dish", verifyToken, async(req,res)=>{
    let searchResult= await Dish.find({
      "$or":[
        {name:{$regex:req.body.searchString}},
        {category:{$regex:req.body.searchString}}
      ]
    });
    res.send(searchResult);
});

app.post("/place-order-via-checkout", verifyToken, async(req,res)=>{
  if(req.body.name!=="" && 
  req.body.phone!=="" && 
  req.body.email!=="" && 
  req.body.address!=="" && 
  req.body.city!=="" && 
  req.body.country!=="" && 
  req.body.cardHolderName!=="" && 
  req.body.cardNumber!=="" && 
  req.body.expiryMonthYear!=="" && 
  req.body.orderItems.length!==0 && 
  req.body.cvv!=="")  
  {
    let newOrder=new Order(req.body);
    let result=await newOrder.save();
    if(result)
    {
      res.send({success:"Order Placed Successfully!"});
    }
    else
    {
      res.send({error:"Something went wrong!"});
    }
  }

});
app.listen(5002);   
