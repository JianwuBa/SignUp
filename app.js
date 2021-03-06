var express = require("express")
var app = express()
//设置模板引擎
app.set("view engine","ejs")
//使用session
var session = require('express-session');
//引入 注册constrollers
var registctrl = require("./constrollers/registctrl")
// 登录 constrollers
var loginctrl = require("./constrollers/loginctrl")
//引入首頁
var indexctrl = require("./constrollers/indexctrl")
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    name:"xiaobai",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:86400 },
    rolling:86400
}))
//静态化文件夹
app.use(express.static("assets"))
//引入 MongoDB   mongoose
var mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://localhost:27017/signup",{useNewUrlParser: true,useUnifiedTopology: true})

//链接需要的 model 
// var Account = require("./models/User")

//开辟路径  注册 regist
app.get("/regist",registctrl.ShowRegist)
//执行注册
app.post("/regist",registctrl.doRegist)
//查询
app.checkout("/regist",registctrl.checkRegist)
//显示登录  模板引擎
app.get("/login",loginctrl.login)
//登录 执行
app.post("/login",loginctrl.doLogin)
//首頁 渲染
app.get("/",indexctrl.home)
app.listen(3000,function () {
    console.log("监听3000端口")    
})