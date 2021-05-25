$(document).ready(function () {
    $.getJSON('assets/json/top-sellers.json', function (topSellers) {
        localStorage.setItem('topSellers', JSON.stringify(topSellers.items));
        let topSellersContent = '';
        let favouriteList = JSON.parse(localStorage.getItem('favourites'));
        for (let i in topSellers.items) {
            let isFavourited = getItemById(parseInt(topSellers.items[i].id), favouriteList) || false;
            let buttonClass;
            let buttonContent;
            if (isFavourited) {
                buttonClass = 'favourited-item';
                buttonContent = '&#xf004;';
            } else {
                buttonClass = '';
                buttonContent = '&#xf08a;';
            }

            let starsContent = generateRatingSection(topSellers.items[i].rating).replace(/,/g, '');
            topSellersContent += `<li class="item-a">
                                    <div class="product-container">
                                        <div class="product-image">
                                            <a href="${topSellers.items[i].url}">
                                                <img src="${topSellers.items[i].image}" width="174" height="160">
                                            </a>
                                            <div id="${topSellers.items[i].id}" class="favourite-btn-container ${buttonClass}">${buttonContent}</div>
                                        </div>
                                        <a href="${topSellers.items[i].url}"><div class="product-name">${topSellers.items[i].name}</div></a>
                                        <div class="product-rating">
                                            ${starsContent}
                                            <span class="product-no-of-review">(${topSellers.items[i].noOfReviews})</span>
                                        </div>
                                        <div class="product-discounted-price">Rs. ${topSellers.items[i].discountedPrice.toFixed(2)} 
                                            <span class="product-price">Rs. ${topSellers.items[i].price.toFixed(2)}</span>
                                        </div>
                                        <div class="product-stock-count">
                                            Exclusive item - order soon
                                        </div>
                                    </div>
                                  </li>`;
        }
        $('.top-sellers-list').html(topSellersContent);

        $('#autoWidth').lightSlider({
            autoWidth:true,
            loop:true,
            onSliderLoad: function() {
                $('#autoWidth').removeClass('cS-hidden');
            }
        });

        $('.favourite-btn-container').on('click', function () {
            let id = $(this).attr('id');
            let isFavourited = $(this).hasClass('favourited-item');
            let favouriteList = JSON.parse(localStorage.getItem('favourites'));
            if (isFavourited) {
                $(this).removeClass('favourited-item');
                $(this).html('&#xf08a;');
                removeItemFromFavourite(id, favouriteList);
            } else {
                $(this).addClass('favourited-item');
                $(this).html('&#xf004;');
                let currentItem = getItemById(id, topSellers.items);
                addItemToFavourite(currentItem, favouriteList);
            }
        });
    });
});
