/**
 * Created by mehrdad on 8/19/16.
 */
var switch_field_color = function (id, color) {
     id.animate({
          color: color,
     }, "fast");
     id.animate({
          color: "black",
     }, "fast");
};

$('#registerform').submit(function (event) {
     event.preventDefault();
     var form = $('#registerform');

});
$('#register_username').focusout(function () { // check if username already exists
     var username = $('#register_username');
     $.ajax({
          type: "get",
          url: "aj_username_check",
          data: username.serialize(),
          success: function (data) {
               var available = data['available'];
               var error = $('#register_error_message');
               var username = $('#register_username');
               if(!available) {
                    switch_error_note(error, "user already exists", "red");
                    switch_field_color(username, "red")
               }
               else{
                    error.animate({
                         height: "hide",
                         opacity: "hide",
                    },"slow");
                    error.empty();
                    switch_field_color(username,"green");
               }

          }
     });
});

$('#registerform').submit(function (event) {
     var username = $('#register_username'),
         password = $('#register_password'),
         confirm = $('#register_confirm'),
         error = $('#register_error_message'),
         form = $('#registerform'),
         button = $('#register');
     if(username.val()=='' || password.val()=='' || confirm.val()==''){
          switch_error_note(error, "you should fill all fields", "red");
     }
     else if(password.val() != confirm.val()){
          switch_error_note(error, "passwords don't match", "red");
          switch_field_color(confirm, "red");
     }
     else if(password.val().length <=6){
          switch_error_note(error, "password should contain at least 7 chars", "red");
          switch_field_color(password, "red");
     }else {
          $.ajax({
               type: 'post',
               data: form.serialize(),
               url: 'aj_register/',
               success: function (data) {
                    var error = data['error'];
                    if(error){
                         switch_error_note($('#register_error_message'), "you changed the js please refresh the page", "red");
                    }
               }
          });
     }
});
$('#register_password').focusout(function () {
     password = $('#register_password');
     if(password.val().length <= 6){
          switch_error_note($('#register_error_message'), "password should contain at least 7 chars", "red");
          switch_field_color(password, "red");
     }
});

$('#registerform').keydown(function () {
     setTimeout(function () {
          $('#register_error_message').animate({
               height: "hide",
               opacity: "hide",
          },"slow");
     },1000);
});