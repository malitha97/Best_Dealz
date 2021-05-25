let isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'));
let orderItems = JSON.parse(localStorage.getItem('orderItems'));
let orderContacts = JSON.parse(localStorage.getItem('orderContacts'));

if (isNullOrUndefinedOrEmpty(isUserLoggedIn) || isUserLoggedIn === false) {
    window.location.href = 'http://localhost:63342/best-dealz/login.html';
} else if (isNullOrUndefinedOrEmpty(orderItems)) {
    window.location.href = 'http://localhost:63342/best-dealz/cart.html';
} else if (isNullOrUndefinedOrEmpty(orderContacts)) {
    window.location.href = 'http://localhost:63342/best-dealz/checkout.html';
}

$(document).ready(function () {
    if (orderContacts !== null) {
        $('#user-email').val(orderContacts.email);
    }

    // Create a Stripe client.
    let stripe = Stripe('pk_test_51HcuSpCRryQJ065wLCg8QBhGxGs27tKUEumqBdmTQZEMQNy0PlJS52vQamS1MIhGvAOSkXMKrWPZaTNoLPnwi5R000prNJqqcF');
    let elements = stripe.elements();

    let card = elements.create('cardNumber', {
        placeholder: 'Card Number',
        classes: {
            base: 'form-field',
            invalid: 'field-error'
        }
    });

    let cvc = elements.create('cardCvc', {
        classes: {
            base: 'form-field',
            invalid: 'field-error'
        }
    });

    let expiration = elements.create('cardExpiry', {
        classes: {
            base: 'form-field',
            invalid: 'field-error'
        }
    });

    card.mount('#card-number');
    cvc.mount('#card-cvv');
    expiration.mount('#card-expiration');

    let orderTotal = calculateOrderTotal(orderItems);
    $('.pay-btn').text(`PAY LKR. ${orderTotal.toFixed(2)}`);

    $('.pay-btn').on('click', function(e) {
        e.preventDefault();
        $('.payment-loader-parent').css({'display': 'block'});
        $('.form-errors').html('&nbsp;');

        let email = $('#user-email').val();
        let orderId = Date.now();
        if (isNullOrUndefinedOrEmpty(email) || isValidEmail(email)) {
            stripe.createToken(card).then(async function(result) {
                if (result.error) {
                    $('.form-errors').text(result.error.message);
                    $('.payment-loader-parent').css({'display': 'none'});
                } else {
                    // Redirect to checkout and display success alert.
                    sessionStorage.setItem('paymentSuccess', JSON.stringify(true));
                    let discountAmount = localStorage.getItem('price_equivalent_discount');
                    await sendEmailOrder(email, orderId, orderItems, discountAmount);
                    $('.payment-loader-parent').css({'display': 'none'});
                    localStorage.setItem('orderItems', JSON.stringify(null));
                    localStorage.setItem('orderContacts', JSON.stringify(null));
                    window.location.href = 'http://localhost:63342/best-dealz/cart.html';
                }
            });
        } else {
            $('.payment-loader-parent').css({'display': 'none'});
            $('.form-errors').text('Invalid email address is given.');
        }
    });
});
