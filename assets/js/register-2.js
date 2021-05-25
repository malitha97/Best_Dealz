let users = "";
let loggedInStatus = JSON.parse(localStorage.getItem('isUserLoggedIn'));

if (loggedInStatus === true) {
    window.location.href = 'http://localhost:63342/best-dealz/homepage.html';
}

//localStorage.setItem('loggedUser','1003')

$(document).ready(function () {


    if (isNullOrUndefinedOrEmpty(localStorage.getItem('users'))) {
        $.getJSON('assets/json/user-credentials.json', function (users) {
            localStorage.setItem('users', JSON.stringify(users.items));
        });
    }
    users = JSON.parse(localStorage.getItem('users'));


    $('.login-btn').on('click', function () {
        $('.error-alert-banner').css({'display': 'none'});

        let password_1 = $('#password-1-input').val();
        let password_2 = $('#password-2-input').val();

        // let status =checkCredentials(email,password);

        if (isNullOrUndefinedOrEmpty(password_1) || isNullOrUndefinedOrEmpty(password_2)) {
            displayMessage('Please enter both password and confirmed password.');
        } else if (!isValidPassword(password_1)) {
            displayMessage('Password must have at least 8 characters including a capital letter and a number.');
        } else {
            if (password_1 === password_2) {
                localStorage.setItem('temp_registered_password',password_1);
                addEntryToLocal(password_1);
                $(location).attr('href', './homepage.html');

            } else{
                displayMessage('Passwords do not match.')
            }

        }
    });

    $('.next-btn').on('click', function () {
        localStorage.removeItem('temp_registered_email');
        localStorage.removeItem('temp_registered_address');
        localStorage.removeItem('temp_registered_tel');
        $(location).attr('href', './register.html');
    });


});

const addEntryToLocal = (password) => {
    let temp_id = getLatestId().toString();
    users.push({"email": localStorage.getItem('temp_registered_email'),"user_id":temp_id,"name":localStorage.getItem('temp_registered_name'),"password":password,"image":"https://i.ibb.co/vjxSMPr/furniture-img-1.png","address":localStorage.getItem('temp_registered_address'),"telephone":localStorage.getItem('temp_registered_tel')})

    let temp_logged_user = ({"email": localStorage.getItem('temp_registered_email'),"user_id":temp_id,"name":localStorage.getItem('temp_registered_name'),"password":password,"image":"https://i.ibb.co/vjxSMPr/furniture-img-1.png","address":localStorage.getItem('temp_registered_address'),"telephone":localStorage.getItem('temp_registered_tel')})

    localStorage.setItem('users', JSON.stringify(users));
    users = JSON.parse(localStorage.getItem('users'));

    localStorage.removeItem('temp_registered_password');
    localStorage.removeItem('temp_registered_email');
    localStorage.removeItem('temp_registered_address');
    localStorage.removeItem('temp_registered_tel');
    localStorage.removeItem('temp_registered_name');

    localStorage.setItem('loggedUser',JSON.stringify(temp_logged_user))
    localStorage.setItem('isUserLoggedIn', JSON.stringify(true));



};

const displayMessage = (message) => {

    $('.error-alert-banner').css({'display': 'grid'});
    $('.error-alert-banner .error-message').text(message);

    $('.error-alert-banner i').on('click', function () {
        $('.error-alert-banner').css({'display': 'none'});
    });
};

const getLatestId = () => {
    let max_id = 0;

    for (let i in users) {
        if (i === '0' ){
            max_id = users[0].user_id;
        } else if (users[i].user_id > max_id) {
            max_id = users[i].user_id;
        }
        max_id++
    }
    return max_id;

};
