const express=require('express');
const UserModel=require('../modles/userModel');
const router=express.Router();
const bcrypt=require('bcrypt');
// 处理注册的路由 http://localhost:3000/user/register
router.post('/register',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    bcrypt.hash(password,10).then(saltPassword=>{
        let user=new UserModel({
        username:username,
        password:saltPassword
    })
    user.save()
        .then(()=>{
            console.log('注册成功');
            res.redirect('/login.html');
        })
        .catch(error=>{
            console.log('写入失败');
            res.send('注册失败');
        });
    })
})
// 处理登录的路由 http://localhost:3000/user/login 
router.post('/login',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    UserModel.findOne({
        username
    }).then(data=>{
        if(!data){
            res.send({
                code:-1,
                msg:'用户名不存在'
            })
        }else{
            bcrypt.compare(password,data.password,(err,isOk)=>{
                if(isOk){
                    req.session.nickName=data.nickName;
                    req.session.isAdmin=data.is_admin;
                    res.redirect('/')
                }else{
                    res.send({
                        code:-2,
                        msg:'密码错误'
                    })
                }
            })
        }
    })
})
// 退出登录 http://localhost:3000/user/logout
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login.html');
})    
    


module.exports=router;