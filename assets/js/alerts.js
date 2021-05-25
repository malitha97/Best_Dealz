const displaySuccessAlert = (message) => {
    return `
        <div class="success-alert-container">
            <div class="close-modal">+</div>
            <img src="assets/images/success-image.png" width="96" height="96"><br>
            <span>${message}</span>
        </div>
    `;
};

const displaySuccessAlertWithMessage = (message, subMessage) => {
    return `
        <div class="success-alert-container sub-message-container">
            <div class="close-modal">+</div>
            <img src="assets/images/success-image.png" width="96" height="96"><br>
            <span class="main">${message}<br><span class="sub-message">${subMessage}</span></span>
        </div>
    `;
};

const displayErrorAlert = (message, subMessage) => {
    return `
        <div class="error-alert-container">
            <div class="close-modal">+</div>
            <img src="assets/images/error-image.png" width="96" height="96"><br>
            <span class="main">${message}<br><span class="sub-message">${subMessage}</span></span>
        </div>
    `;
};
