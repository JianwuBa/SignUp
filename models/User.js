var mongoose = require("mongoose");
//创建表头   schema
var AccountSchema = new mongoose.Schema({
    "email": String,
    "password":String
});

//创建 model，底层创建构造函数
var Account = mongoose.model("Account",AccountSchema);
//暴露
module.exports = Account