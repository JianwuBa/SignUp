var mongoose = require("mongoose");
//创建表头   schema
var UserSchema = new mongoose.Schema({
    "email": String,
    "password":String
});

//创建 model，底层创建构造函数
var User = mongoose.model("User",UserSchema);
//暴露
module.exports = User