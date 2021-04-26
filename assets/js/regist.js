(function () {
  //获取元素
  var $inputEmail = $("#email");
  var $password = $("#password");
  var $repeatPassword = $("#repeatPassword");
  var $repeatPassword = $("#btn");
  //失去焦点
  $inputEmail.blur(function () {
    checkEmail()
  })
  //获取焦点
  $inputEmail.focus(function () {
    removeWran($(this))
  })

  
  //密码获取焦点
  $password.focus(function () {
    removeWran($(this))
  })
  //校验邮箱
  function checkEmail() {
    var email = $inputEmail.val();
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5})$/ 
    if(!reg.test(email)){
      //alert("请输入合法邮箱")
      wranFun($inputEmail,"请输入合法邮箱")
    }
  }
  //密码失去焦点
  $password.blur(function () {
    
    //先校验密码合法性在进行安全等级判断
    if(checkPssword()){
      if(checkPasswordLength() < 3){
        //密码强度必须大于2
        wranFun($password,"密码必须包含数字字母特殊符号中的三种")
        //$(".password-strong").remove();
      }
      $(".password-strong").remove();
    }
  })
  //校验密码
  function checkPssword() {
      var password = $password.val()
      var flag = true;
      //console.log(password.length)
      if(password.length < 8 || password.length > 20){
        flag = false;
        wranFun($password,"密码长度必须8-20位")
        //alert("密码长度必须8-20位")
      }
      // [^  表示非的意思 
      //var reg = /[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\.\,\;\:]/g
      //console.log(reg.test(password))
      if(/[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\.\,\;\:]/g.test(password)){
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
  $password.bind("input",function () {
    checkPasswordLength();
  })
  function checkPasswordLength() {
    //先移除
    $(".password-strong").remove();
    //先校验密码是否合法
    if(!checkPssword()){
      console.log("进来了")
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
})()