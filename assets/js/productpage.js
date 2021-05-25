let productId;
let productsList = JSON.parse(localStorage.getItem('products'));

$(document).ready(function () {
    let isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'));
    productId = $('.Product-item-container').data('id');
    let currentProduct = getItemById(productId, productsList);
    let current_rating = currentProduct.rating;
    let whole_stars = Math.floor(currentProduct.rating);
    let has_halfStar = (current_rating - whole_stars !== 0);
    let starsContent = makeStars(whole_stars,has_halfStar);
    $('.product-rating .ratings').html(starsContent);
    $('.product-rating #prate').text(currentProduct.rating.toFixed(1));


    $('.add-to-cart-btn').on('click', function () {
        $('.quantity-error').html('&nbsp;');
        let quantity = $('.inp-units input').val();
        if (!quantity || parseInt(quantity) === 0 || parseInt(quantity) < 1) {
            $('.quantity-error').html('Enter a valid quantity before adding.');
        } else {
            let products = JSON.parse(localStorage.getItem('products'));
            let product = getItemById(productId, products);
            let orderItem = {
                ...product,
                quantity,
                subTotal: parseInt(quantity) * product.discountedPrice,
                total: (parseInt(quantity) * product.discountedPrice) + product.shippingCost
            };
            addItemToCart(orderItem);
            location.reload();
        }
    });

    $('.product-rating .ratings #1').on('click',function (){
        if (isUserLoggedIn === true){
            current_rating = currentProduct.rating;
            let product_reviews = currentProduct.noOfReviews;
            let new_rating = (1+current_rating)/(product_reviews+1);
            whole_stars = Math.floor(new_rating);
            has_halfStar = (new_rating - whole_stars !== 0);
            let starsContent = makeStars(whole_stars,has_halfStar);
            $('.product-rating .ratings').html(starsContent);
            $('.product-rating #prate').text(new_rating.toFixed(1));
            $('.product-rating .num-reviews').text((product_reviews+1)+ " Reviews");
            current_rating = new_rating;
        }else{
            window.location.href = 'http://localhost:63342/best-dealz/login.html';
        }
    });

    $('.product-rating .ratings #2').on('click',function (){
        if (isUserLoggedIn === true){
            current_rating = currentProduct.rating;
            let product_reviews = currentProduct.noOfReviews;
            let new_rating = (2+current_rating)/(product_reviews+1);
            whole_stars = Math.floor(new_rating);
            has_halfStar = (new_rating - whole_stars !== 0);
            let starsContent = makeStars(whole_stars,has_halfStar);
            $('.product-rating .ratings').html(starsContent);
            $('.product-rating #prate').text(new_rating.toFixed(1));
            $('.product-rating .num-reviews').text((product_reviews+1)+ " Reviews");
            current_rating = new_rating;
        }else{
            window.location.href = 'http://localhost:63342/best-dealz/login.html';
        }
    });

    $('.product-rating .ratings #3').on('click',function (){
        if (isUserLoggedIn === true){
            current_rating = currentProduct.rating;
            let product_reviews = currentProduct.noOfReviews;
            let new_rating = (3+current_rating)/(product_reviews+1);
            whole_stars = Math.floor(new_rating);
            has_halfStar = (new_rating - whole_stars !== 0);
            let starsContent = makeStars(whole_stars,has_halfStar);
            $('.product-rating .ratings').html(starsContent);
            $('.product-rating #prate').text(new_rating.toFixed(1));
            $('.product-rating .num-reviews').text((product_reviews+1)+ " Reviews");
            current_rating = new_rating;
        }else{
            window.location.href = 'http://localhost:63342/best-dealz/login.html';
        }
    });

    $('.product-rating .ratings #4').on('click',function (){
        if (isUserLoggedIn === true){
            current_rating = currentProduct.rating;
            let product_reviews = currentProduct.noOfReviews;
            let new_rating = (4+current_rating)/(product_reviews+1);
            whole_stars = Math.floor(new_rating);
            has_halfStar = (new_rating - whole_stars !== 0);
            let starsContent = makeStars(whole_stars,has_halfStar);
            $('.product-rating .ratings').html(starsContent);
            $('.product-rating #prate').text(new_rating.toFixed(1));
            $('.product-rating .num-reviews').text((product_reviews+1)+ " Reviews");
            current_rating = new_rating;
        }else{
            window.location.href = 'http://localhost:63342/best-dealz/login.html';
        }
    });

    $('.product-rating .ratings #5').on('click',function (){
        if (isUserLoggedIn === true){
            current_rating = currentProduct.rating;
            let product_reviews = currentProduct.noOfReviews;
            let new_rating = (5+current_rating)/(product_reviews+1);
            whole_stars = Math.floor(new_rating);
            has_halfStar = (new_rating - whole_stars !== 0);
            let starsContent = makeStars(whole_stars,has_halfStar);
            $('.product-rating .ratings').html(starsContent);
            $('.product-rating #prate').text(new_rating.toFixed(1));
            $('.product-rating .num-reviews').text((product_reviews+1)+ " Reviews");
            current_rating = new_rating;
        }else{
            window.location.href = 'http://localhost:63342/best-dealz/login.html';
        }
    });

});

function makeStars(whole_stars,has_halfStar){
    let remaining_whole_stars = whole_stars;
    let starsContent =``;
    for (let i=1; i<=5; i++){
        if (remaining_whole_stars!==0) {
            starsContent += `<i id=${i} class="fa fa-star"></i>`;
            remaining_whole_stars -= 1;
        } else{
            if(has_halfStar===true){
                starsContent += `<i id=${i} class="fa fa-star-half-o"></i>`;
                has_halfStar = false;
            }else{
                starsContent += `<i id=${i} class="fa fa-star-o"></i>`;
            }
        }
    }

    return starsContent;
}
