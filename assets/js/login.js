let users = "";
let loggedInStatus = JSON.parse(localStorage.getItem('isUserLoggedIn'));

if (loggedInStatus === true) {
    window.location.href = 'http://localhost:63342/best-dealz/homepage.html';
}

$(document).ready(function () {
    const handleLogin = (users) => {
        $('.login-btn').on('click', function () {
            $('.error-alert-banner').css({'display': 'none'});

            let email = $('#email-input').val();
            let password = $('#password-input').val();
            let status = checkCredentials(users, email,password);

            if (isNullOrUndefinedOrEmpty(email) || isNullOrUndefinedOrEmpty(password)) {
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('Please provide both email and password.');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            } else if(status > -1){
                localStorage.setItem('loggedUser', JSON.stringify(users[status]));
                localStorage.setItem('isUserLoggedIn', JSON.stringify(true));
                $(location).attr('href', './homepage.html');

            } else{
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('Email or password is incorrect.');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            }
        });
    };

    if (isNullOrUndefinedOrEmpty(localStorage.getItem('users'))) {
        $.getJSON('assets/json/user-credentials.json', function (users) {
            localStorage.setItem('users', JSON.stringify(users.items));
            handleLogin(users.items);
        });
    } else {
        users = JSON.parse(localStorage.getItem('users'));
        handleLogin(users);
    }
});

const checkCredentials = (users, email, password) => {
    for (let i in users) {
        if (users[i].email === email) {
            if (users[i].password === password) {
                return parseInt(i);
            }
        }
    }
    return -1;
};
