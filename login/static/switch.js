/**
 * Created by mehrdad on 8/19/16.
 */
$('#switchtologin').click(function(){
        $('form').animate({
            height: "toggle", opacity: "toggle"
        }, "slow");
    });
    
    $('#switchtoregister').click(function () {
        $('form').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
    });