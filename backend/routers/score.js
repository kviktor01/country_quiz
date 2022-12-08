const express = require("express");
const models = require("../models");

const router = express.Router();
const { User } = models;

router.post("/set",async (req,res)=>{
    const {id,point}=req.body;
    const user=await User.findByPk(id);
    if(user.maxPoint<point){
        let point=user.maxPoint;
        user.maxPoint=point;
        await user.save();
        const users=await User.findAll();
        users.sort(function(a,b){
            a.maxPoint-b.maxPoint;
        })
        let index=users.findIndex((user)=>user.id===id);
        let beginIndex;
        if(index-5>0){
            beginIndex=index-5;
        }
        else{
            beginIndex=index;
        }
        return res.send({current:user.maxPoint});    
    }
    return res.send({maxPoint:user.maxPoint,current:point});
}
)
