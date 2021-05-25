const sendEmailFavourites = async (email, selectedFavourites) => {
    let templateParams = {
        toEmail: email,
        message: emailMessageFavourite(selectedFavourites)
    };
    emailjs.init('user_CdMuChwMu9ZotTR1FHnuQ');
    await emailjs.send('service_5ppu4os', 'template_o2kr7je', templateParams)
        .then(function (response) {
            return response;
        }, function (error) {
            throw new Error('Unexpected error occurred. Please try again later.');
        });
};

const sendEmailOrder = async (email, orderId, orderItems, discountAmount) => {
    let templateParams = {
        toEmail: email,
        orderId: orderId,
        message: emailMessageOrder(orderItems, discountAmount)
    };
    emailjs.init('user_CdMuChwMu9ZotTR1FHnuQ');
    await emailjs.send('service_5ppu4os', 'template_47e05ra', templateParams)
        .then(function (response) {
            return response;
        }, function (error) {
            // Handle without throwing exception.
        });
};

const emailMessageFavourite = (selectedFavourites) => {
    let emailMessage = `<div class="logo-img" style="display: block; text-align: center;">` +
            `<img src="https://i.ibb.co/dbyrvnh/logo-light.png" width="200px" height="85px">` +
            `</div><h1 style="font-weight: bold; font-family: 'Poppins', serif; color: #7f187f; text-align: center; margin-top: 0;">Favourites</h1>`;
    for (let i = 0; i < selectedFavourites.length; i++) {
        emailMessage += `<div style="display: flex; vertical-align: middle; margin-bottom: 10px;">
                            <table align="center" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                <tr>
                                    <td rowspan="3">
                                        <div style="display: block;">
                                            <img src="${selectedFavourites[i].image}" width="154" height="156">
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 15px; font-weight: 600; margin: 5px;">
                                            <a href="http://localhost:63342/best-dealz/${selectedFavourites[i].url}">${selectedFavourites[i].name}</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 12px; margin: 5px">${selectedFavourites[i].description}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <div style="font-family: 'Poppins', serif; font-size: 15px; font-weight: 600; margin: 5px; color: #7f187f;">
                                            Rs. ${selectedFavourites[i].discountedPrice.toFixed(2)}
                                    </div>
                                </tr>
                            </table>
                         </div>`;
    }
    emailMessage += `<div style="display: inline-block; font-weight: bold; font-family: 'Roboto', serif; width: 100%;
                        background-color: #7f187f; color: #ffffff; text-align: center; margin-top: 12px; padding: 5px;">
                        Copyright &copy; 2021 All Rights Reserved by Best Dealz
                     </div>`;
    return emailMessage;
};

const emailMessageOrder = (orderItems, discountAmount) => {
    let orderTotal = calculateOrderTotal(orderItems);
    discountAmount = (discountAmount) ? parseFloat(discountAmount) : 0.00;
    let emailMessage = `<div class="logo-img" style="display: block; text-align: center;">` +
        `<img src="https://i.ibb.co/dbyrvnh/logo-light.png" width="200px" height="85px">` +
        `</div><h1 style="font-weight: bold; font-family: 'Poppins', serif; color: #7f187f; text-align: center; margin-top: 0;">Order Summary</h1>`;
    for (let i = 0; i < orderItems.length; i++) {
        emailMessage += `<div style="display: flex; vertical-align: middle; justify-content: center; margin-bottom: 10px; flex-wrap: wrap;">
                            <table align="center" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                <tr>
                                    <td rowspan="6">
                                        <div style="display: block;">
                                            <img src="${orderItems[i].image}" width="154" height="156">
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 15px; font-weight: 600; margin: 5px; width: 185px;">
                                            <a href="http://localhost:63342/best-dealz/${orderItems[i].url}">${orderItems[i].name}</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <div style="font-family: 'Poppins', serif; font-size: 15px; font-weight: 600; margin: 3px; color: #646266;">
                                        Rs. ${orderItems[i].discountedPrice.toFixed(2)}
                                    </div>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b;">
                                            Quantity
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b; text-align: right;">
                                            ${orderItems[i].quantity}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b;">
                                            Subtotal
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b; text-align: right;">
                                            Rs. ${orderItems[i].subTotal.toFixed(2)}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b;">
                                            Shipping Cost
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b; text-align: right;">
                                            Rs. ${orderItems[i].shippingCost.toFixed(2)}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b;">
                                            Total Amount
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div style="font-family: 'Poppins', serif; font-size: 13px; font-weight: 600; margin: 2px; color: #8b8b8b; text-align: right;">
                                            Rs. ${orderItems[i].total.toFixed(2)}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                         </div>`;
    }
    emailMessage += `<div style="font-family: 'Poppins', serif; font-size: 16px; font-weight: 600; margin: 7px; color: #707070; text-align: center">
                            Order Total: Rs. ${orderTotal.toFixed(2)} (Discount: Rs. ${discountAmount.toFixed(2)})
                     </div>
                     <div style="display: inline-block; font-weight: bold; font-family: 'Roboto', serif; width: 100%;
                        background-color: #7f187f; color: #ffffff; text-align: center; margin-top: 12px; padding: 5px;">
                        Copyright &copy; 2021 All Rights Reserved by Best Dealz
                     </div>`;
    return emailMessage;
};
