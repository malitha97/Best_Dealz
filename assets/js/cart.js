const PAYMENT_SUCCESS_ALERT = 'Order payment successful';
const ORDER_SUCCESS_MESSAGE = 'Your order has placed successfully. An email will be sent to you shortly with the order information.';

let orderItems = JSON.parse(localStorage.getItem('orderItems'));
$(document).ready(function () {
    let paymentSuccess = JSON.parse(sessionStorage.getItem('paymentSuccess') || false);
    if (paymentSuccess) {
        let successAlert = displaySuccessAlertWithMessage(PAYMENT_SUCCESS_ALERT, ORDER_SUCCESS_MESSAGE);
        $('.success-alert').html(successAlert).css({'display': 'flex'});
        sessionStorage.setItem('paymentSuccess', JSON.stringify(false));

        $('.success-alert-container .close-modal').on('click', function () {
            $('.success-alert').css({'display': 'none'});
        });
    }

    let cartContent = ``;
    if (!isNullOrUndefinedOrEmpty(orderItems) && orderItems.length !== 0) {
        cartContent += `<div class="items-remove-container">
                <div class="your-items">Your Items</div>
                <div class="remove-all">
                    <p>Remove All :</p>
                    <i class="fa fa-trash" id="remove-all"></i>
                </div>

            </div>`;
        for (let i = 0; i < orderItems.length; i++) {
            cartContent += `<div class="order-items-container">
                <div class="order-item-container">
                <div class="item-image">
                    <a href="${orderItems[i].url}">
                        <img src="${orderItems[i].image}" width="154" height="156">
                    </a>
                </div>
                <div class="item-description">
                    <div class="product-name-remove-container">
                        <div>
                            <a href="${orderItems[i].url}"><div class="product-name">${orderItems[i].name}</div></a>
                            <div class="product-brand">By : Best Dealz</div>
                        </div>
                        <i class="fa fa-trash" id="${orderItems[i].id}"></i>
                    </div>
                    <div  class="price-quntity-container">
                        <div class="product-price-container">
                            <div class="product-price">Rs. ${orderItems[i].discountedPrice.toFixed(2)}</div>
                            <div class="product-discounted-price">Rs. ${orderItems[i].price.toFixed(2)}</div>
                        </div>
                        <div class="product-quantity">
                            <div class="quantity-label">No.</div>
                                <input type="hidden" class="item-id" id="${orderItems[i].id}">
                                <input type="number" class="input-quantity" id="${orderItems[i].id}" value="${orderItems[i].quantity}" pattern="[0-9]" min="1" max="100">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        cartContent += `<div class="total-checkout-container">
                <div class="order-total-container">
                    <div class="total-label">Total</div>
                    <div class="total-value"></div>
                </div>
                <button class="primary-button-filled checkout-btn">CHECKOUT</button>
            </div>`;
        $('.cart-content').html(cartContent);
    } else {
        cartContent += "<div class='cart-empty-container'><i class='fa fa-frown-o empty-icon'></i><div class='cart-empty'>Your cart is empty</div></div>";
        $('.cart-content').html(cartContent).css({'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'justify-content': 'center'});
    }


    $('.fa-trash').on('click', function () {
        let id = $(this).attr('id');
        if (id !== 'remove-all'){
            removeItemFromCart(id, orderItems);
            location.reload();
        }
    });


    const orderTotal = calculateOrderTotal(orderItems,1);
    $('.total-value').text(`Rs. ${orderTotal.toFixed(2) || 0.00}`);


    $('.checkout-btn').on('click', function () {
        let orderItems_new = JSON.parse(localStorage.getItem('orderItems'));
        let have_nanValues = false;
        for (let i =0; i<orderItems_new.length; i++){
            if ( orderItems_new[i].quantity === null || orderItems_new[i].quantity === 0){
                have_nanValues = true;
            }
        }
        if (have_nanValues !== true){
            window.location.href = 'http://localhost:63342/best-dealz/checkout.html';
        }else {
            $('.error-alert-banner').css({'display': 'grid'});
            $('.error-alert-banner .error-message').text('Please enter a valid item amount.');

            $('.error-alert-banner i').on('click', function () {
                $('.error-alert-banner').css({'display': 'none'});
            });
        }

    });

    $('input.input-quantity').on('change', function () {
        let id = $(this).attr('id');
        let quantity = parseInt($(this).val());
        let updatedList = updateOrderItemQuantity(id, quantity, orderItems);
        localStorage.setItem('orderItems', JSON.stringify(updatedList));

        let orderTotal = calculateOrderTotal(orderItems,1);
        orderTotal = (orderTotal) ? orderTotal : 0.00;
        $('.total-value').text(`Rs. ${orderTotal.toFixed(2) || 0.00}`);
    });

    $('#remove-all').on('click', function () {
        $('.remove-all-modal').css({'display': 'flex'});

        $('.remove-all-modal-container .close-modal').on('click', function () {
            $('.remove-all-modal').css({'display': 'none'});
        });
    });

    $('.remove-all-no').on('click', function () {
        $('.remove-all-modal').css({'display': 'none'});
    });

    $('.remove-all-yes').on('click', function () {
        removeAllItemFromCart(orderItems);
        location.reload();
    });
});
