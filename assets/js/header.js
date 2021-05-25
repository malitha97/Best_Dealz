$(document).ready(function () {
    let orderItems = JSON.parse(localStorage.getItem('orderItems'));
    if (orderItems !== null && orderItems.length !==0){
        $('.cart-item-indicator').html(orderItems.length).css('display','flex')
    }

    let filePath;
    if (window.location.href.includes('furniture')) {
        filePath = '../assets/json/products.json';
    } else {
        filePath = 'assets/json/products.json';
    }
    $.getJSON(filePath, function (products) {
        let currentProducts = JSON.parse(localStorage.getItem('products'));
        if (isNullOrUndefinedOrEmpty(currentProducts)) {
            localStorage.setItem('products', JSON.stringify(products.items));
        }

        $(".search-bar").on('keyup', function (){
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById("searchInput");
            filter = input.value.toUpperCase();
            var filtered_list = [];
            for (i = 0; i < products.items.length; i++) {
                txtValue = products.items[i].name;
                if (txtValue.toUpperCase().includes(filter)) {
                    filtered_list.push(products.items[i])
                }
            }

            if (isNullOrUndefinedOrEmpty(filter)) {
                filtered_list = [];
            }

            let suggetions_list = '';
            if (filtered_list.length !== 0){
                for (j =0; j<filtered_list.length; j++){
                    let itemUrl;
                    if (window.location.href.includes('furniture')) {
                        let itemUrlArr = (filtered_list[j].url).split('products/');
                        itemUrl = itemUrlArr[1];
                    } else {
                        itemUrl = filtered_list[j].url
                    }
                    suggetions_list += `<li><a href="${itemUrl}" style="color:black">${filtered_list[j].name}</a></li>`
                }
                $('.suggestionsUL').html(suggetions_list).css('display','grid');
                $('.body-container').css('pointer-events','none');
            } else {
                $('.suggestionsUL').html(suggetions_list).css('display', 'none');
            }
        });
    });

    $(document).mouseup(function(e)
    {
        var container = $('.suggestionsUL');
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            if (!$('.search-bar').is(e.target) && !$('.search-icon-container').is(e.target) && $('.search-icon-container').has(e.target).length === 0) {
                container.hide();
                $('.body-container').css('pointer-events','auto');
            }
        }
    });

});