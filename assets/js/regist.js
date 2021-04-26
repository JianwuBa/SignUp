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
    $inputEmail.parent().removeClass("has-error");
    $inputEmail.siblings(".help-block").remove();
  })
  //校验邮箱
  function checkEmail() {
    var email = $inputEmail.val();
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5})$/ 
    if(!reg.test(email)){
      //alert("请输入合法邮箱")
      $inputEmail.parent().addClass("has-error");
      $inputEmail.siblings(".help-block").remove();
      $inputEmail.after("<p class='help-block'>请输入合法邮箱</p>")
    }
  }
})()