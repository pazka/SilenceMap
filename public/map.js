
window.showed = true;
var map ;
var hshowed = false;
var fshowed = false;

function showHelp(){
    hshowed = (hshowed ? false : true);
    if(fshowed)
        showForm();

    if(hshowed)
    $("#help").css("display","block");
    else
    $("#help").css("display","none");
}
function showForm(){
    fshowed = (fshowed ? false : true);
    if(hshowed)
        showHelp();

    if(fshowed)
    $("#add").css("display","block");
    else
    $("#add").css("display","none");
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat:48.5840324, lng: 7.744312},
        styles : mapStyle
    });
    map.addListener('center_changed',getMarkers);
}

function getMarkers(){
    $.get('/api/soundByLoc',{lon:map.center.lng(),lat:map.center.lat(),radius:0.10*(25-map.zoom)}).then((allSound)=>{
        if(allSound){
            allSound.forEach((elem)=>{
                placeMarker(elem);
            });
        }
    });
}

function placeMarker(mark){
    var marker = new google.maps.Marker({
        position: {lat : mark.lat, lng : mark.lon},
        map: map,
        self : marker,
        infos : new google.maps.InfoWindow({
            content: "<p>"+mark.adr+"</p>"+"<p>Enregistré par "+mark.name+"</p>"
        }),
        sound : mark.file
    });

    google.maps.event.addListener(marker, 'click', function(){
        this.infos.open(this.get('map'), this);

        var player = $("#player");
        player[0].src = this.sound;
        player[0].play().catch((error) => {
            alert( "file not found: " + error);
        });
    });
}

function getLocalisation(){
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos)=>{
            console.log(pos);
            $("#lon").attr("value",pos.coords.longitude);
            $("#lat").attr("value",pos.coords.latitude);
        },
        (err)=>{
            alert(JSON.stringify(err));
        });
    } else {
        alert( "Geolocation is not supported by this browser.");
    }
}

function getMapLocalisation(){
    $("#lon").attr("value",map.center.lng());
    $("#lat").attr("value",map.center.lat());
}

function test(){
}
