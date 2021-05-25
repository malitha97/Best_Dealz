$(document).ready(function (listener) {

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    $('.fa-close').on('click', function () {
        $('.qr-modal').css("display", "none");
        stopScan(scanner);
    });

    $('.fa-qrcode').on('click', function (listener) {
        $('.qr-modal').css("display", "grid");
        startScan(scanner);

    });

    $('.scan-again-btn').on('click', function (listener) {
        $('#scaning_status').css("color", "#8C8989");
        $('#scaning_status').html("Scanning");
        $('.cancel-scan-btn').css("display", "flex");
        $('.scan-again-btn').css("display", "none");
        startScan(scanner);

    });

    $('.cancel-scan-btn').on('click', function (listener) {
        $('.qr-modal').css("display", "none");
        stopScan(scanner);

    });

});

function startScan(scanner) {
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            console.log(cameras[0])
            scanner.start(cameras[0]);
            scanner.addListener('scan', function (content) {
                let url = null;
                let isValid = false;
                $.getJSON('assets/json/products.json', function (products) {
                    localStorage.setItem('products', JSON.stringify(products.items));
                    for (let i in products.items) {
                        if (products.items[i].id === parseInt(content)){
                            url = products.items[i].url;
                            isValid = true;
                            break;
                        }
                    }
                    if (isValid === true){
                        window.location.href = url;
                        scanner.stop()
                    }else{
                        scanner.stop()
                        $('#scaning_status').css("color", "#B00020");
                        $('#scaning_status').html("Invalid QR code, <br> Try Again!");

                        $('.cancel-scan-btn').css("display", "none");
                        $('.scan-again-btn').css("display", "flex");
                    }
                });
            });
        } else {
            scanner.stop()
            $('#scaning_status').css("color", "#B00020");
            $('#scaning_status').html("No available cameras, <br> Try Again!");

            $('.cancel-scan-btn').css("display", "none");
            $('.scan-again-btn').css("display", "flex");

        }
    }).catch(function (e) {
        $('#scaning_status').css("color", "#B00020");
        $('#scaning_status').html("Please allow page to access cameras, <br> Try Again!");
        $('.cancel-scan-btn').css("display", "none");
        $('.scan-again-btn').css("display", "flex");
    });
}

function stopScan(scanner) {
    scanner.stop();
}

