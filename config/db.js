const mongoose=require('mongoose');
const url="mongodb://localhost:27017/haha";

mongoose.connect(url,{useNewUrlParser:true})
    .then(()=>{
        console.log('链接数据库成功')
    })
    .catch(()=>{
        console.log('链接数据库失败',error)
    });
module.exports=mongoose;