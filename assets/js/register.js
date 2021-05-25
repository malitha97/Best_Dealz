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




    $('.next-btn').on('click', function () {
        $('.error-alert-banner').css({'display': 'none'});

        let email = $('#email-input').val();
        let telephone = $('#telephone-input').val();
        let address = $('#address-input').val();
        let name_input = $('#name-input').val();

        // let status =checkCredentials(email,password);

        if (isNullOrUndefinedOrEmpty(email) || isNullOrUndefinedOrEmpty(telephone) || isNullOrUndefinedOrEmpty(address) || isNullOrUndefinedOrEmpty(name_input)) {
            displayMessage('Please fill all the required details before continue.');
        } else {
            if (!isValidEmail(email)) {
                displayMessage('Please enter a valid email address.');
            } else if (!isValidTelephone(telephone)) {
                displayMessage('Please enter a valid telephone number.');
            } else if(!checkEmail(email)){
                displayMessage('Email already in use.');
            } else {
                localStorage.setItem('temp_registered_email',email);
                localStorage.setItem('temp_registered_address',address);
                localStorage.setItem('temp_registered_tel',telephone);
                localStorage.setItem('temp_registered_name',name_input);

                $(location).attr('href', './register-2.html');
            }
            // else if (){
            //
            // }




        }

        // $('.error-alert-banner').css({'display': 'none'});




    });


});

const checkEmail = (email) => {

    for (let i in users) {
        if (users[i].email === email) {
            return false;
        }
    }
    return true;
};

const displayMessage = (message) => {

    $('.error-alert-banner').css({'display': 'grid'});
    $('.error-alert-banner .error-message').text(message);

    $('.error-alert-banner i').on('click', function () {
        $('.error-alert-banner').css({'display': 'none'});
    });
};
