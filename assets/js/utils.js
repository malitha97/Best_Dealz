$(document).bind('mobileinit',function() {
    $.mobile.keepNative = 'select, input, button, div';
    $.mobile.ajaxEnabled = false;
});

const isNullOrUndefinedOrEmpty = (value) => {
    return value === undefined || value === null || value === '';
};

const isValidEmail = (email) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isNullOrUndefinedOrEmpty(email.trim())) {
        return false;
    } else return emailRegex.test(email);
};

const isValidPassword = (password) => {
    let passwordRegex = /^((?=.*\d)(?=.*[A-Z]).{8,})$/;
    return passwordRegex.test(password);
};

const isValidTelephone = (telephone) => {
    let telephoneRegex = /^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/;
    if (isNullOrUndefinedOrEmpty(telephone.trim())) {
        return false;
    } else return telephoneRegex.test(telephone);
};

const calculateOrderTotal = (items, unreduced = 0) => {
    let total = 0.00;
    if (items != null) {
        for (let i = 0; i < items.length; i++) {
            total += items[i].total;
        }
    }
    if (unreduced === 0) {
        let stored_discount = localStorage.getItem('price_equivalent_discount');
        if (!isNullOrUndefinedOrEmpty(stored_discount)) {
            stored_discount = parseInt(stored_discount);
            total -= stored_discount;
        }

        if (total < 0) {
            total = 0;
        }
    }

    return total;
};

const updateOrderItemQuantity = (itemId, quantity, items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(itemId)) {
            items[i].quantity = quantity;
            items[i].subTotal = items[i].discountedPrice * quantity;
            items[i].total = items[i].subTotal + items[i].shippingCost;
        }
    }
    return items;
};

const getItemById = (itemId, items) => {
    if (items != null) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(itemId)) {
                return items[i];
            }
        }
    }
};

const addItemToFavourite = (item, favouriteList) => {
    if (favouriteList != null) {
        favouriteList.push(item);
        localStorage.setItem('favourites', JSON.stringify(favouriteList));
    } else {
        favouriteList = [];
        favouriteList.push(item);
        localStorage.setItem('favourites', JSON.stringify(favouriteList));
    }
};

const removeItemFromFavourite = (itemId, favouriteList) => {
    for (let i = 0; i < favouriteList.length; i++) {
        if (favouriteList[i].id === parseInt(itemId)) {
            favouriteList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('favourites', JSON.stringify(favouriteList));
};


const getLoggedUserHighScore = (leaderBoardList) => {

    for (let i = 0; i < leaderBoardList.length; i++) {

        if (!isNullOrUndefinedOrEmpty(localStorage.getItem('loggedUser'))){
            if (leaderBoardList[i].user_id === JSON.parse(localStorage.getItem('loggedUser')).user_id) {
                // console.log(i);
                return i;
            }
        } else {
            return -1;
        }

    }
    return -1;

};

const isLoggedIn = () => {

    return !isNullOrUndefinedOrEmpty(localStorage.getItem('loggedUser'))

    // return (localStorage.getItem('isUserLoggedIn')) ? localStorage.getItem('isUserLoggedIn') : false;
    // return false;
};

const logOut = () => {
    localStorage.setItem('isUserLoggedIn', JSON.stringify(false));
    localStorage.removeItem('loggedUser');
};

const getExistingItemFromCart = (itemId, orderlist) => {
    let existingItem = null;
    for (let i = 0; i < orderlist.length; i++) {
        if (orderlist[i].id === parseInt(itemId)) {
            existingItem = orderlist[i];
            orderlist.splice(i, 1);
            return existingItem;
        }
    }
    return existingItem;
};

const addItemToCart = (item) => {
    let orderlist = JSON.parse(localStorage.getItem('orderItems'));
    if (orderlist !== null && orderlist.length !== 0) {
        let existingItem = getExistingItemFromCart(item.id, orderlist);
        if (existingItem) {
            existingItem.quantity = parseInt(existingItem.quantity) + parseInt(item.quantity);
            existingItem.subTotal = existingItem.discountedPrice * existingItem.quantity;
            existingItem.total = existingItem.total + (item.discountedPrice * item.quantity);
            orderlist.push(existingItem);
        } else {
            orderlist.push(item);
        }
        localStorage.setItem('orderItems', JSON.stringify(orderlist));
    } else {
        orderlist = [];
        orderlist.push(item);
        localStorage.setItem('orderItems', JSON.stringify(orderlist));
    }
};

const removeItemFromCart = (itemId, orderlist) => {
    for (let i = 0; i < orderlist.length; i++) {
        if (orderlist[i].id === parseInt(itemId)) {
            orderlist.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('orderItems', JSON.stringify(orderlist || []));
};

const removeAllItemFromCart = (orderlist) => {
    orderlist.splice(0, orderlist.length);
    localStorage.setItem('orderItems', JSON.stringify(orderlist));
};

const addComment = (product_id, user, parent_comment, comment, commentsList) => {
    let max_comment_id = 0;
    for (let i =0; i < commentsList.length; i++){
        if (commentsList[i].comment_id > max_comment_id){
            max_comment_id = commentsList[i].comment_id;
        }
    }
    let new_comment_id = max_comment_id + 1;
    let new_comment = {
        "product_id": parseInt(product_id),
        "user_id": parseInt(user),
        "comment_id": parseInt(new_comment_id),
        "parent_comment": parseInt(parent_comment),
        "comment": comment
    };

    commentsList.unshift(new_comment);
    localStorage.setItem('comments', JSON.stringify(commentsList));
};
