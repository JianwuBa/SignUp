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

  //密码失去焦点
  $password.blur(function () {
    
    console.log(checkPssword())
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
  //校验密码
  function checkPssword() {
      var flag = true;
      var password = $password.val()
      //console.log(password.length)
      if(password.length < 8 || password.length > 20){
        flag = false;
        wranFun($password,"密码长度必须8-20位")
        //alert("密码长度必须8-20位")
      }
      //密码强度判断
      var password = $password.val()
      // [^  表示非的意思 
      var reg = /[^0-9a-zA-Z\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\.\,\;\:]/g
      console.log(reg.test(password))
      if(reg.test(password)){
        flag = false;
        console.log("错误")
        wranFun($password,"密码仅限数字、字母、特殊符号")
      }
      return flag;
  }
  $password.bind("input",function () {
    checkPasswordLength();
  })
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
    var password = $password.val()
    console.log(password)
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
    console.log(leval)  
    $(".password-strong").remove();  
    var dom = null;
    switch (leval) {
      case 5:
        dom  = "<p class='password-strong bg-primary'>很强</p>"
        break;
      case 4:
        dom  = "<p class='password-strong bg-success'>强</p>"
        break;
      case 3:
        dom  = "<p class='password-strong bg-info'>一般</p>"
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
  }
})()