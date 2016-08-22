/**
* Created by mehrdad on 8/19/16.
*/
var switch_error_note = function (id, text, color) {
    id.animate({
        height: "hide",
        opacity: "hide",
        color: "black",
    },"fast");
    setTimeout(function () {
        id.empty();
        id.append("<p>" + text + "</p>");
        id.animate({
            height: "show",
            opacity: "show"
        },"fast");
        id.animate({
            color: color,
        }, "slow");
    }, 300);
};

$('#loginform').submit(function(event){
    event.preventDefault();
    var form = $('#loginform');
    var username = $('#id_username');
    var password = $('#id_password');
    var error = $('#login_error_message');
    var button = $('#login_submit_button');
    button.prop('disabled', true);
    button.prop('value', 'wait');
    setTimeout(function () {
        button.prop('disabled', false);
        button.prop('value', 'submit');
    }, 3000);
    if(username.val() === '' || password.val()==='') {
        switch_error_note(error, "field with * are needed", "gray");
        username.prop('placeholder', "username *");
        password.prop('placeholder', "password *");
        return;
    }
    $.ajax({

        type: 'post',
        url: 'ajaxlogin/',
        data: form.serialize(),
        success: function(data) {
            var error = $('#login_error_message');
            var succes = data['result'];
            if(succes == false){
                switch_error_note(error, "bad username/password combination", 'red');
            }
            else{
                var error = $('#login_error_message');
                switch_error_note(error, "login successful", 'green');
            }
        },
        error: function () {
            console.log("error")
        }
    });
});