const express=require('express');
const UserModel=require('../modles/userModel');
const router=express.Router();

router.get('/',(req,res)=>{
    if(req.session.nickName){
        console.log(req.session.nickName);
        UserModel.find()
            .then(data=>{
                res.render('index',{
                    nickName:req.session.nickName,
                    isAdmin:req.session.isAdmin,
                    userList:data
                });
            })
    }else{
        res.redirect('/login.html');
    }
    
})
router.get('/login.html',(req,res)=>{
    // res.session.abc='张三';
    res.render('login');
})
router.get('/register.html',(req,res)=>{
    res.render('register');
})
module.exports=router;