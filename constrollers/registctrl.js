// 引入formidable
var formidable = require("formidable")
//链接需要的 model 
var Account = require("../models/User.js")
exports.ShowRegist = function (req,res) {
    res.render("regist")
}
//执行
exports.doRegist = function (req,res) { 
    console.log(req)
}
//查询
exports.checkRegist = function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse("req",function (err,fields,files) {  
        //console.log(fields.email)
        var email = fields.email;
        Account.count({"email":email},function (err,count) {
            console.log(count)
        })
    })
}