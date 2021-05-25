var Lat = 6.9271;
var Lng = 79.8612;

function initMap() {
    // The location of Uluru
    const location = { lat: Lat, lng: Lng };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 15,
        center: location,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}



$(document).ready(function(){
    initMap();

    $("#locations").change(function(){
        var loc = $("#locations option:selected").text();

        if(loc === "Wallawatta"){
            Lat = 6.8741;
            Lng = 79.8605;

        }else if(loc === "Bambalapitiya"){
            // Lat = 6.8748929;
            // Lng = 79.8601971;
            Lat = 6.9044;
            Lng = 79.8540;

        }else if(loc === "Panadura"){
            Lat = 6.7106;
            Lng = 79.9074;

        }else if(loc === "Matara") {
            Lat = 5.9549;
            Lng = 80.5550;

        }

        initMap();

    });
});