function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("teamname");
    if (user != "" && user == $('#teamName').val()) {
        window.location.href = "/nicetry.html";
        return true;
    } else {
        setCookie("teamname", localStorage.getItem("teamName"), 365);
        return false;
    }
}

$("#loadPage").click(function() {

    if ($('#teamName').val() != null && $('#teamName').val() != "") {
        data = { 'name': $('#teamName').val() };
        console.log(data);
        if (checkCookie() == false) {

            $.post("/php/register.php", data, function(response, status) {
                    //alert(status);
                })
                .done(function() {
                    localStorage.setItem("teamName", data.name);
                    window.location.href = '/first.html';
                });
        }
    }
});

$('input[type="submit"]').mousedown(function() {
    $(this).css('background', '#2ecc71');
});
$('input[type="submit"]').mouseup(function() {
    $(this).css('background', '#1abc9c');
});

$('#loginform').click(function() {
    $('.login').fadeToggle('slow');
    $(this).toggleClass('green');
});



$(document).mouseup(function(e) {
    var container = $(".login");

    if (!container.is(e.target) && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
        $('#loginform').removeClass('green');
    }
});