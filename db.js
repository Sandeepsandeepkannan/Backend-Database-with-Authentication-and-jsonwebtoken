const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Objectid=Schema.ObjectId;

const user=new mongoose.Schema({
    
    username:String,
    hashedpassword:String,
    email:String
})

const todo=new mongoose.Schema({
    title:String,
    userid:Objectid,
    email:String
})

const usermodel = mongoose.model("users",user)
const todomodel=mongoose.model("todo-list",todo)

module.exports={
    usermodel:usermodel,
    todomodel:todomodel
}