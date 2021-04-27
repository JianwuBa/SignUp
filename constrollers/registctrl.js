// 引入formidable
var formidable = require("formidable")
//链接需要的 model 
var User = require("../models/User.js")
exports.ShowRegist = function (req,res) {
    res.render("regist")
}
//执行
exports.doRegist = function (req,res) { 
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {  
        console.log(fields)
        var email = fields.email;
        var password = fields.password;
        User.count({"email":email},function(err,count){
            // console.log(count)
            if(count == 0){
                User.create({
                    "email":email,
                    "password":password
                },function(err){
                    res.json({"result" : !err ? 1 : -1})
                })
            }else{
                res.json({"result":-2})
            }
        })
    })
}
//查询
exports.checkRegist = function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {  
        //console.log(fields)
        var email = fields.email;
        User.count({"email":email},function(err,count){
            // console.log(count)
            res.json({"result":count})
        })
    })
}