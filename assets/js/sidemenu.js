$(document).ready(function () {

    $('.fa-close').on('click', function () {
        $('.side-bar-menu-modal').css("display", "none");

    });

    $('.side-bar-icon').on('click', function () {
        $('.side-bar-menu-modal').css("display", "flex");
    });

});
