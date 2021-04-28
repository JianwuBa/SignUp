exports.home = function (req,res) {
    console.log(req.session)
    if(req.session.login){
        res.render("index",{
            "email":req.session.email
        })
    }else{
        res.render("login")
    }
   
}