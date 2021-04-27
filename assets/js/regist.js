(function () {
  //获取元素
  var $inputEmail = $("#email");
  var $password = $("#password");
  var $repeatPassword = $("#repeatPassword");
  var $btn = $("#btn");
  //初始化邮箱密码和再次输入密码 的状态都设置为 false
  var emailState = false;
  var passwordState = false;
  var repeadPasswordState = false;
  //邮箱失去焦点
  $inputEmail.blur(function () {
    checkEmail()
  })
  //邮箱获取焦点
  $inputEmail.focus(function () {
    removeWran($(this))
  })

  //密码获取焦点
  $password.focus(function () {
    removeWran($(this))
  })
  //密码失去焦点
  $password.blur(function () {
    
    //先校验密码合法性在进行安全等级判断
    if(checkPssword()){
      if(checkPasswordLength() < 3){
        //密码强度必须大于2
        wranFun($password,"密码必须包含数字字母特殊符号中的三种")
        passwordState = false;
        $(".password-strong").remove();
        return;
      }else{
        passwordState = true;
      }
    }
    $(".password-strong").remove();
    
  })
  //密码输入实时校验
  $password.bind("input",function () {
    checkPasswordLength();
  })
  //再次输入密码 失去焦点时
  $repeatPassword.blur(function () {
    //第一次密码为空
    if(!$password.val()){
      alert("请输入密码");
      $repeatPassword.val("");
      repeadPasswordState = false;
      return;
    }
    //量次密码输入不一致
    if($password.val() !==  $repeatPassword.val()){
      wranFun($repeatPassword,"两次密码不一致，请再次输入密码")
      $repeatPassword.val("");
      repeadPasswordState = false;
      return;
    }
    repeadPasswordState = true;
  })
  // 再次输入密码获取焦点时
  $repeatPassword.focus(function () {
    removeWran($(this))
  })

  //提交按钮
  $btn.click(function () {
    if(!emailState){
      alert("请输入合法邮箱");
      return;
    }
    if(!passwordState){
       alert("请输入正确密码");
      return;
    }
    if(!repeadPasswordState){
      alert("请确认两次密码是否一致");
      return;
    }
    alert(emailState && passwordState && repeadPasswordState)
  })
  //校验邮箱
  function checkEmail() {
    var email = $inputEmail.val();
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5})$/ 
    if(!reg.test(email)){
      //alert("请输入合法邮箱")
      wranFun($inputEmail,"请输入合法邮箱");
      return;
    }
    //ajax请求校验
    checkEmailAjax()
    //emailState = true;
  }
  //校验密码
  function checkPssword() {
      var password = $password.val()
      var flag = true;
      //console.log(password.length)
      if(password.length < 8 || password.length > 20){
        passwordState = false;
        flag = false;
        wranFun($password,"密码长度必须8-20位")
        //alert("密码长度必须8-20位")
      }
      // [^  表示非的意思 
      //var reg = /[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\.\,\;\:]/g
      //console.log(reg.test(password))
      if(/[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\.\,\;\:]/g.test(password)){
        passwordState = false;
        flag = false;
        console.log("错误")
        wranFun($password,"密码仅限数字、字母、特殊符号")
      }
      return flag;
  }
  
  //显示错误信息
  function wranFun(dom,value){
    dom.parent().addClass("has-error");
    dom.siblings(".help-block").remove();
    dom.after("<p class='help-block'>"+value+"</p>")
  }
  //隐藏错误信息
  function removeWran(dom) {
    dom.parent().removeClass("has-error");
    dom.siblings(".help-block").remove();
  }
  
  function checkPasswordLength() {
    //先移除
    $(".password-strong").remove();
    //先校验密码是否合法
    if(!checkPssword()){
      passwordState = false;
      //console.log("进来了")
      return;
    }
     
    removeWran($password)
    var password = $password.val()
    var leval = 0;
    if(/[0-9]/.test(password)){
      leval ++
    }
    if(/[a-z]/.test(password)){
      leval ++
    }
    if(/[A-Z]/.test(password)){
      leval ++
    }
    if(/[\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=]/.test(password)){
      leval ++
    }
    if(/[\{\}\.\,\;\:\/]/.test(password)){
      leval ++
    } 
    var dom = null;
    switch (leval) {
      case 5:
        dom  = "<p class='password-strong bg-primary'>很强</p>"
        break;
      case 4:
        dom  = "<p class='password-strong bg-success'>强</p>"
        break;
      case 3:
        dom  = "<p class='password-strong bg-info'>安全</p>"
        break;
      case 2:
        dom  = "<p class='password-strong bg-warning'>弱</p>"
        break;
      case 1:
        dom  = "<p class='password-strong bg-danger'>很弱</p>"
        break;  
    }
    if(dom){
      $password.after(dom)
    }
    return leval;
  }
  //ajax 请求校验 邮箱
  function checkEmailAjax() { 
    $.ajax({
      "type":"CHECKOUT",
      "url":"/regist",
      "data":{
        "email":$inputEmail.val()
      },
      "success":function (data) {
        console.log(data)
      }
    })
  }
})()