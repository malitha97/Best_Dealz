let isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'));

$(document).ready(function () {

    if(isUserLoggedIn === true){
        $('.accounts-icon').on('click', function () {
            $('.accounts-popup').css("display", "grid");
            $('.accounts-popup-after-login').css("display", "grid");
            $('.accounts-popup-before-login').css("display", "none");
        });
    }else{
        $('.accounts-icon').on('click', function () {
            $('.accounts-popup').css("display", "grid");
            $('.accounts-popup-after-login').css("display", "none");
            $('.accounts-popup-before-login').css("display", "grid");
        });
    }

    $('.login-option').on('click', function () {
        window.location.href = 'http://localhost:63342/best-dealz/login.html';
    });

    $('.register-option').on('click', function () {
        window.location.href = 'http://localhost:63342/best-dealz/register.html';
    });

    $('.logout-option').on('click', function () {
        logOut();
        window.location.href = 'http://localhost:63342/best-dealz/login.html';
    });
});

$(document).mouseup(function (e) {
    var container = $(".accounts-popup");
    if(!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});