(function () {
    var $loginbtn = $("#login");
    var $email = $("#email");
    var $password = $("#password");   
    $loginbtn.click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        $.post("/login",{
            "email":email,
            "password":password
        },function (data) {
            console.log(data)
            if(data.result == 1){
               window.location="/"
            }else{
                alert("账号或密码错误")
            }
        })
    }) 
})()