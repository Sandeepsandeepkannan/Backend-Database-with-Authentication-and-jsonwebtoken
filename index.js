const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose")
const {usermodel,todomodel}=require("./db")
const bcrypt=require("bcrypt")
const z=require("zod")
const jwt_secret="asbcdhskakas"

mongoose.connect("mongodb+srv://admin:QFs3IMhmG5CK7eSr@cluster0.thihukh.mongodb.net/sandeeptodo?retryWrites=true&w=majority&appName=Cluster0/")

const app=express()
app.use(express.json())

app.post("/signup", async function(req,res){

   const designstructure=z.object({
     email:z.string().min(3).max(20).email(),
     password:z.string().min(5).max(10),
     username:z.string().min(5).max(10)
   })
   const parseddatasuccess=designstructure.safeParse(req.body);

   const username=req.body.username;
   const password=req.body.password;
   const email=req.body.email;

    if(parseddatasuccess.success){
    const hashedpassword= await bcrypt.hash(password,5)
    await usermodel.create({
        username:username,
        hashedpassword:hashedpassword,
        email:email
    })
      res.json({message:"successfully signed up"})  
    }
     else{
      res.json({message:"Enter the valid input"})  
           } 
})

app.post("/signin", async function(req,res){
   const password=req.body.password;
   const email=req.body.email;
   
   const userlist= await usermodel.findOne({
      email:email
   })
   if (!userlist) {
    return res.status(403).json({ message: "User not found" });
}
   const  ismatch= await bcrypt.compare(password,userlist.hashedpassword)
   if(ismatch){
        const token=jwt.sign({
            id:userlist._id
        },jwt_secret)
        res.json({token:token})
    }
    else{
        res.status(403).json({message:"Wrong credentials or signup first"})
    }
})

app.listen(3000,()=>{
    "server is runnning on port 3000"
})