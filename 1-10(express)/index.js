const express = require('express');
const fs= require('fs');
const bodyParse=require('body-parser');
const expressArt=require('express-art-template');
const app=express();

app.engine('art',expressArt);


app.use(express.static('www'));
app.use(bodyParse.urlencoded({extended:true}));

app.get('/login',(req,res)=>{
    const username=req.query.username;
    const password=req.query.password;
    fs.readFile('users.json',(err,data)=>{
    var arr = JSON.parse(data);
    for(let i=0;i<arr.length;i++){
        if(username==arr[i].username){

            if(password==arr[i].password){
                return res.json({success:1,message:"恭喜你登录成功"});
            }
            return res.json({success:1,message:"用户名已存在，密码错误,请重新输入密码"});
        }
    }
    return res.json({success:0,message:"sorry,defeat"});
    })
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    const username=req.body.username;
    const password=req.body.password;
    fs.readFile('users.json',(err,data)=>{
        const arr=JSON.parse(data);
        for(let i=0;i<arr.length;i++){
            if(username==arr[i].username){
                return res.json({success:0,message:"用户名已存在，请重新注册"});
            }
        }
        arr.unshift({username,password});
        fs.writeFile('users.json',JSON.stringify(arr));
        return  res.json({success:1,message:"注册成功"});
    })
    
})

app.get('/match',(req,res)=>{
    console.log(req.query);
    const name=req.query.value;
    fs.readFile('users.json',(err,data)=>{
        var  arr1=JSON.parse(data);
        for(let i=0;i<arr1.length;i++){
            if(name==arr1[i].username){
                return res.json({success:1,message:"用户名存在"});
            }
        }
        return res.json({success:1,message:"用户名bu存在"});
    })
})

app.get('/list',(req,res)=>{
    fs.readFile('users.json',(err,data)=>{
        const arr2=JSON.parse(data);
        var obj={users:arr2};
        res.render('users.art',obj);
    })
   
})


app.listen(3000);