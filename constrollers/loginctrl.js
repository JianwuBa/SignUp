//引入数据库
var User = require("../models/User.js")
//引入 formidable
var formidable = require("formidable")
//显示登录 页面
exports.login = function (req,res) {
    res.render("login")
}
//执行 登录
exports.doLogin = function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        // console.log(fields)
        var email = fields.email;
        var password = fields.password;
        User.find({"email":email,"password":password},function (err,countArr) {
            if(countArr.length > 0){
                // 设置session
                // console.log(req.session)
                req.session.login = true;
                req.session.email = email;
                res.json({"result":1})
            }else{
                // console.log("没有内容")
                 res.json({"result":-1})
            }
        })
    })
}