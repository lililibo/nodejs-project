const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const app=express();

//引入路由
const userRouter=require('./routes/userRouter');
const bannerRouter=require('./routes/bannerRouter');
const indexRouter=require('./routes/indexRouter');

//设置静态文件托管
app.use(express.static(path.resolve(__dirname,'./public')));

//设置cookie中间件
app.use(cookieParser());

// 设置能够使用 req.body 的中间件
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//设置模板页面的存放路径与使用的何种模板引擎
app.set('views',path.resolve(__dirname,'./views'));
app.set('view engine','ejs');

// 设置session相关的内容
// 1. 当用户登录验证成功，我们将用户需要用到的信息比如nickName、isAdmin给写入到session对象中
// 2. 别的地方我们需要验证用户是否登录的话，就只需要判断 req.session.nickName 是否存在。
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: 'lihaila'
}));

app.use('/user',userRouter);
app.use('/banner',bannerRouter);
app.use('/',indexRouter);

app.listen(3000);