let loggedInStatus = JSON.parse(localStorage.getItem('isUserLoggedIn'));
let orderItems = JSON.parse(localStorage.getItem('orderItems'));
let user_avail_points_global = "";
let stored_index ="";
let total_rupee_equivalent ="";


if (isNullOrUndefinedOrEmpty(loggedInStatus) || loggedInStatus === false) {
    window.location.href = 'http://localhost:63342/best-dealz/login.html';
} else if (isNullOrUndefinedOrEmpty(orderItems)) {
    window.location.href = 'http://localhost:63342/best-dealz/cart.html';
}

$(document).ready(function () {
    const handleCheckoutWithRedeem = (user_avail_points_global) => {
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        stored_index = userHasPoints(user_avail_points_global,user);

        if (userHasPoints(user_avail_points_global,user) > -1 ) {
            total_rupee_equivalent = (parseInt(user_avail_points_global[stored_index].saved_score)/2.0);
            let max_possible_discount = "";

            if (total_rupee_equivalent>calculateOrderTotal(orderItems,1)){
                max_possible_discount = calculateOrderTotal(orderItems,1);
            } else {
                max_possible_discount = total_rupee_equivalent;
            }

            $('#quiz_points_redeem').val(max_possible_discount*2);
            $('#avail_points_span').text(total_rupee_equivalent*2);

            localStorage.setItem('price_equivalent_discount', JSON.stringify(max_possible_discount));
        } else {
            $('#quiz_points_redeem').val(0);
            $('#avail_points_span').text("0");
            localStorage.setItem('price_equivalent_discount', "0");
            total_rupee_equivalent =0;
        }

        if (!isNullOrUndefinedOrEmpty(user)) {
            const { email, address, telephone } = user;
            $('#email-input').val(email);
            $('#address-input').val(address);
            $('#telephone-input').val(telephone);
        }

        let orderContent = '';
        if (!isNullOrUndefinedOrEmpty(orderItems) && orderItems.length !== 0) {
            for (let i = 0; i < orderItems.length; i++) {
                orderContent += `<div class="order-item-container">
                                <div class="item-image">
                                    <img src="${orderItems[i].image}" width="154" height="156">
                                </div>
                                <div class="item-description">
                                    <div class="product-name">${orderItems[i].name}</div>
                                    <div class="product-price">Rs. ${orderItems[i].discountedPrice.toFixed(2)}</div>
                                    <div class="product-quantity">
                                        <div class="quantity-label">Quantity</div>
                                        <input type="hidden" class="item-id" id="${orderItems[i].id}">
                                        <input type="text" class="input-quantity" value="${orderItems[i].quantity}" pattern="[0-9]" disabled>
                                    </div>
                                    <br>
                                    <div class="product-subtotal">
                                        <div class="subtotal-label">Subtotal</div>
                                        <div class="subtotal-value">Rs. ${orderItems[i].subTotal.toFixed(2)}</div>
                                    </div>
                                    <br>
                                    <div class="product-shipping-total">
                                        <div class="shipping-label">Shipping</div>
                                        <div class="shipping-value">Rs. ${orderItems[i].shippingCost.toFixed(2)}</div>
                                    </div>
                                    <br>
                                    <div class="product-total">
                                        <div class="total-label">Total Amount</div>
                                        <div class="total-value">Rs. ${orderItems[i].total.toFixed(2)}</div>
                                    </div>
                                </div>
                             </div>`;
            }
            $('.order-items-container').html(orderContent);
        }

        $('input.input-quantity-points').on('change', function () {
            if (isNullOrUndefinedOrEmpty($('#quiz_points_redeem').val()) || ($('#quiz_points_redeem').val()) < 0){
                $('#quiz_points_redeem').val(0);
            }

            let max_possible_discount = "";

            if(userHasPoints(user_avail_points_global,user) <= -1 ){
                max_possible_discount = 0;
            } else if (total_rupee_equivalent > calculateOrderTotal(orderItems,1)) {
                max_possible_discount = calculateOrderTotal(orderItems,1);
            } else {
                max_possible_discount = total_rupee_equivalent;
            }

            let quiz_redeem_input = parseInt($('#quiz_points_redeem').val()) / 2;


            if (quiz_redeem_input <= max_possible_discount) {
                localStorage.setItem('price_equivalent_discount', JSON.stringify(quiz_redeem_input));

                const orderTotal = calculateOrderTotal(JSON.parse(localStorage.getItem('orderItems')));
                $('.order-total-container .span_1').text(orderTotal.toFixed(2));
            }
        });

        $('input.input-quantity').on('change', function () {
            let id = parseInt($('.item-id').attr('id'));
            let quantity = parseInt($(this).val());
            let updatedList = updateOrderItemQuantity(id, quantity, orderItems);
            localStorage.setItem('orderItems', JSON.stringify(updatedList));
            let updatedItem = getItemById(id, orderItems);
            const orderTotal = calculateOrderTotal(orderItems);


            $('.subtotal-value').text(`Rs. ${updatedItem.subTotal.toFixed(2)}`);
            $('.total-value').text(`Rs. ${updatedItem.total.toFixed(2)}`);
            $('.order-total-container .span_1').text(orderTotal.toFixed(2));
        });

        const orderTotal = calculateOrderTotal(orderItems);
        $('.order-total-container .span_1').text(orderTotal.toFixed(2));


        $('.pay-btn').on('click', function () {
            $('.error-alert-banner').css({'display': 'none'});
            let email = $('#email-input').val();
            let address = $('#address-input').val();
            let telephone = $('#telephone-input').val();
            if (isNullOrUndefinedOrEmpty(email) || isNullOrUndefinedOrEmpty(address) || isNullOrUndefinedOrEmpty(telephone)) {
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('Please fill order contact details before proceeding to pay.');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            } else if (!isValidEmail(email)) {
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('Please enter a valid email address before proceeding to pay.');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            } else if (!isValidTelephone(telephone)) {
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('Please enter a valid telephone number before proceeding to pay.');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            } else if (parseInt($('#quiz_points_redeem').val()) > total_rupee_equivalent * 2){
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('You do not have that much of quiz points');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            } else if(calculateOrderTotal(orderItems,1) * 2 < parseInt($('#quiz_points_redeem').val())){
                $('.error-alert-banner').css({'display': 'grid'});
                $('.error-alert-banner .error-message').text('You cannot have an order Total less than zero');

                $('.error-alert-banner i').on('click', function () {
                    $('.error-alert-banner').css({'display': 'none'});
                });
            } else {
                localStorage.setItem('orderContacts', JSON.stringify({ email, address, telephone }));
                window.location.href = 'http://localhost:63342/best-dealz/stripe.html';
            }
        });

        $('.back-btn').on('click', function () {
            window.location.href = 'http://localhost:63342/best-dealz/cart.html';
        });
    };

    if (isNullOrUndefinedOrEmpty(localStorage.getItem('available_points'))) {
        $.getJSON('assets/json/available-points.json', function (available_points) {
            localStorage.setItem('available_points', JSON.stringify(available_points.items));
            handleCheckoutWithRedeem(available_points.items);
        });
    } else {
        user_avail_points_global = JSON.parse(localStorage.getItem('available_points'));
        handleCheckoutWithRedeem(user_avail_points_global);
    }
});

const userHasPoints = (saved_points, user) => {
    let user_id = user.user_id;

    for (let i in saved_points) {
        if (saved_points[i].user_id === user_id) {
            return parseInt(i);
        }
    }
    return -1;
};
