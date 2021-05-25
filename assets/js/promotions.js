let products_global= "";
let favouriteList_global="";
let unaltered_products = "";

$(document).ready(function () {

    $.getJSON('assets/json/products.json', function (products) {
        localStorage.setItem('products', JSON.stringify(products.items));

        let favouriteList = JSON.parse(localStorage.getItem('favourites'));
        favouriteList_global = favouriteList;
        products_global = products;

        // unaltered_products = Object.assign(unaltered_products,products)
        $.getJSON('assets/json/products.json', function (products_3) {
            unaltered_products=products_3;
        });

        generateHTMLDiv(products,favouriteList);

        $('.promotions-items-container').on('click','.favourite-btn-container ',function () {
            let id = $(this).attr('id');
            let isFavourited = $(this).hasClass('favourited-item');
            favouriteList_global = JSON.parse(localStorage.getItem('favourites'));
            if (isFavourited) {
                $(this).removeClass('favourited-item');
                $(this).html('&#xf08a;');
                removeItemFromFavourite(id, favouriteList_global);
            } else {
                $(this).addClass('favourited-item');
                $(this).html('&#xf004;');
                let currentItem = getItemById(id, products.items);
                addItemToFavourite(currentItem, favouriteList_global);
            }
        });


    });

    $('.select-target-class_1').on('change', function() {
        // alert( this.value );

        $('.promotions-items-container').empty();
        if(this.value === '2'){
            priceAsc(products_global,favouriteList_global)
        }else if(this.value === '3'){
            priceDesc(products_global,favouriteList_global)
        }else if(this.value === '4'){
            alphaAsc(products_global,favouriteList_global)
        }else if(this.value === '5'){
            highReviews(products_global,favouriteList_global)
        }else if(this.value === '6'){
            highRating(unaltered_products,favouriteList_global)

        }else if ((this.value === '1')){
            latest(unaltered_products,favouriteList_global)
        }
    });


});

const latest = (products,favouriteList) => {
    generateHTMLDiv(products,favouriteList)
};

const priceDesc = (products,favouriteList) => {

        let productsNotFormatted  = (products.items.sort(function (a, b) {
            return b.discountedPrice - a.discountedPrice
        }))
        let products_ordered = {};
    products_ordered.items= productsNotFormatted

    generateHTMLDiv(products_ordered,favouriteList)

};
const highRating = (products,favouriteList) => {

    let productsNotFormatted  = (products.items.sort(function (a, b) {
        return b.rating - a.rating
    }))
    let products_ordered = {};
    products_ordered.items= productsNotFormatted

    generateHTMLDiv(products_ordered,favouriteList)

};
const highReviews = (products,favouriteList) => {

    let productsNotFormatted  = (products.items.sort(function (a, b) {
        return b.noOfReviews - a.noOfReviews
    }))
    let products_ordered = {};
    products_ordered.items= productsNotFormatted

    generateHTMLDiv(products_ordered,favouriteList)

};

const alphaAsc = (products,favouriteList) => {

    let productsNotFormatted  = (products.items.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;

    }))
    let products_ordered = {};
    products_ordered.items= productsNotFormatted

    generateHTMLDiv(products_ordered,favouriteList)

};


const priceAsc = (products,favouriteList) => {

    let productsNotFormatted  = (products.items.sort(function (a, b) {
        return a.discountedPrice - b.discountedPrice
    }))
    let products_ordered = {};
    products_ordered.items= productsNotFormatted


    generateHTMLDiv(products_ordered,favouriteList)

};

const generateHTMLDiv = (products,favouriteList) => {
    let promotions_list_content = '';

    for (let i in products.items) {
        let isFavourited = getItemById(parseInt(products.items[i].id), favouriteList) || false;
        let buttonClass;
        let buttonContent;
        if (isFavourited) {
            buttonClass = 'favourited-item';
            buttonContent = '&#xf004;';
        } else {
            buttonClass = '';
            buttonContent = '&#xf08a;';
        }

        let starsContent = generateRatingSection(products.items[i].rating).replace(/,/g, '');

        promotions_list_content += `<div class="promotions-item-container" id="${products.items[i].id}">
          
                <div class="item-image">
                    <a href="${products.items[i].url}">
                        <img class="image" id="${products.items[i].id}" src="${products.items[i].image}" width="170" height="160">
                    </a>
                    <div id="${products.items[i].id}" class="favourite-btn-container ${buttonClass}">${buttonContent}</div>
                </div>
                <div class="item-description">
                    <a href="${products.items[i].url}"><div class='product-name'>${products.items[i].name}</div></a>
                    <div class='product-rating'>
                        <div class="rating-stars">
                            ${starsContent}
                        </div>
                        <div class="no-of-reviews">(${products.items[i].noOfReviews})</div>
                    </div>
                    <div class="product-stock-availability">
                        Exclusive item - order soon
                    </div>
                    <div class='product-description'>${products.items[i].description}</div>
                    <div class="product-price">
                        <div class="price">Rs. ${products.items[i].discountedPrice.toFixed(2)} <span class="previous-price" >Rs. ${products.items[i].price.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>`;
    }
    $('.promotions-items-container').html(promotions_list_content);

};
