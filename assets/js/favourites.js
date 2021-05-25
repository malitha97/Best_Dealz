const EMAIL_SUCCESS_ALERT = 'Email sent successfully';
const EMAIL_FAILURE_ALERT = 'Email sending failed!';
let favouriteItems = JSON.parse(localStorage.getItem('favourites'));
let selectedFavouriteIds = [];

$(document).ready(function () {
    if (!isNullOrUndefinedOrEmpty(favouriteItems) && favouriteItems.length !== 0) {
        let favouritesContent = `<div class="select-all-container">
                                    <span>Select All</span>
                                    <label class="checkbox select-all-checkbox">
                                        <input type="checkbox" class="select-all">
                                        <span class="check-mark"></span>
                                    </label>
                                </div>
                                <div class="favourite-items-container">`;
        for (let i = 0; i < favouriteItems.length; i++) {
            let starsContent = generateRatingSection(favouriteItems[i].rating).replace(/,/g, '');
            favouritesContent += `<div class="favourite-item-container">
                                    <div class="item-image">
                                        <a href="${favouriteItems[i].url}">
                                            <img src="${favouriteItems[i].image}" width="154" height="156">
                                        </a>
                                        <div id="${favouriteItems[i].id}" class="favourite-btn-container">&#xf004;</div>
                                    </div>
                                    <div class="item-description">
                                        <a href="${favouriteItems[i].url}"><div class="product-name">${favouriteItems[i].name}</div></a>
                                        <div class="product-description">${favouriteItems[i].description}</div>
                                        <div class="product-rating">
                                            ${starsContent}
                                        </div>
                                        <div class="product-price">Rs. ${favouriteItems[i].discountedPrice.toFixed(2)}</div>
                                    </div>
                                    <label class="checkbox favourite-checkbox">
                                        <input type="checkbox" class="select-favourite" id="${favouriteItems[i].id}">
                                        <span class="check-mark"></span>
                                    </label>
                                  </div>`;
        }
        favouritesContent += "</div><button class='button-disabled share-favourite-btn' disabled>Share Favourites</button>";
        $('.favourite-container').html(favouritesContent);
    } else {
        let emptyContent = "<i class='fa fa-frown-o empty-icon'></i><div class='favourites-empty'>Your favourites list is empty</div>";
        $('.favourite-container').html(emptyContent).css({'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'justify-content': 'center'});
    }

    $('input.select-all').on('change', function () {
        let isChecked = $('input.select-all').is(':checked');
        if (isChecked) {
            $('input.select-favourite').prop('checked', true);
            $('.share-favourite-btn').removeClass('button-disabled').addClass('primary-button-filled').removeAttr('disabled');
            selectedFavouriteIds = [];
            $('.favourite-item-container input.select-favourite:checked').each(function() {
                selectedFavouriteIds.push($(this).attr('id'));
            });
        } else {
            $('input.select-favourite').prop('checked', false);
            $('.share-favourite-btn').removeClass('primary-button-filled').addClass('button-disabled').attr('disabled', true);
            selectedFavouriteIds = [];
        }
    });

    $('.favourite-item-container input.select-favourite').on('change', function () {
        let isChecked = $(this).is(':checked');
        let isSelectAllChecked = $('input.select-all').is(':checked');
        let id = $(this).attr('id');
        updateIdArray(id, selectedFavouriteIds);
        if (isChecked) {
            if (selectedFavouriteIds.length === favouriteItems.length) {
                $('input.select-all').prop('checked', true);
            }
        } else if (isSelectAllChecked && selectedFavouriteIds.length !== favouriteItems.length) {
            $('input.select-all').prop('checked', false);
        }

        if (selectedFavouriteIds.length === 0) {
            $('.share-favourite-btn').removeClass('primary-button-filled').addClass('button-disabled').attr('disabled', true);
        } else {
            $('.share-favourite-btn').removeClass('button-disabled').addClass('primary-button-filled').removeAttr('disabled');
        }
    });

    $('.favourite-btn-container').on('click', function () {
        let id = $(this).attr('id');
        removeItemFromFavourite(id, favouriteItems);
        location.reload();
    });

    $('.share-favourite-btn').on('click', function () {
        $('.share-favourites-modal').css({'display': 'flex'});
    });

    $('.share-favourite-modal-container .close-modal').on('click', function () {
        $('.share-favourites-modal').css({'display': 'none'});
    });

    $('.send-email-btn').on('click', async function () {
        $('.error-alert-banner').css({'display': 'none'});
        $('.favourite-loader-parent').css({'display': 'block'});
        let email = $('#email-input').val();
        if (!isValidEmail(email)) {
            $('.favourite-loader-parent').css({'display': 'none'});
            $('.error-alert-banner').css({'display': 'grid'});
            $('.error-alert-banner .error-message').text('Please enter a valid email address first.');

            $('.error-alert-banner i').on('click', function () {
                $('.error-alert-banner').css({'display': 'none'});
            });
        } else {
            let selectedFavourites = [];
            for (let i = 0; i < selectedFavouriteIds.length; i++) {
                let favourite = getItemById(parseInt(selectedFavouriteIds[i]), favouriteItems);
                selectedFavourites.push(favourite);
            }
            try {
                await sendEmailFavourites(email, selectedFavourites);
                $('.favourite-loader-parent').css({'display': 'none'});
                let successAlert = displaySuccessAlert(EMAIL_SUCCESS_ALERT);
                $('.share-favourites-modal').css({'display': 'none'});
                $('.success-alert').html(successAlert).css({'display': 'flex'});

                $('.success-alert-container .close-modal').on('click', function () {
                    $('.success-alert').css({'display': 'none'});
                    $('input.select-all').prop('checked', false);
                    $('input.select-favourite').prop('checked', false);
                    $('.share-favourite-btn').removeClass('primary-button-filled').addClass('button-disabled').attr('disabled', true);
                    selectedFavouriteIds = [];
                });
            } catch (error) {
                let errorAlert = displayErrorAlert(EMAIL_FAILURE_ALERT, error.message);
                $('.favourite-loader-parent').css({'display': 'none'});
                $('.share-favourites-modal').css({'display': 'none'});
                $('.error-alert').html(errorAlert).css({'display': 'flex'});

                $('.error-alert-container .close-modal').on('click', function () {
                    $('.error-alert').css({'display': 'none'});
                });
            }
        }
    });
});

const updateIdArray = (id, list) => {
    if (!list.includes(id)) {
        list.push(id);
    } else {
        let index = list.indexOf(id);
        list.splice(index, 1);
    }
};
