
window.showed = true;

function showOthers(){
    showed = (showed ? false : true);

    if(!showed)
    $("#otherPre").css("display","inline");
    else
    $("#otherPre").css("display","none");

}

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        alert( "Geolocation is not supported by this browser.");
    }
}

function initMap() {

    var allMarks = [
        {pos :{lat:48.5840324, lng: 7.744312}, title :"Homme de fer", sound:"audio/homme de fer.mp3"},
        {pos :{lat:48.5834538, lng: 7.7456927}, title :"Place Kleber", sound:"audio/place kleber.mp3"}
    ];
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: allMarks[0].pos,
        styles : mapStyle
    });

    var i =0;
    window.markers= [];
    window.infos = [];
    window.players = {};

    allMarks.forEach(function(elem){
        markers[i] = new google.maps.Marker({
            position: elem.pos,
            map: map,
            self : markers[i],
            infos : new google.maps.InfoWindow({
                content: "<p>"+elem.title+"</p>"
            }),
            sound : elem.sound
        });

        window.players[elem.sound] = $("<audio src ='audio/"+elem.sound+"'></audio>");


        google.maps.event.addListener(markers[i], 'click', function(){
            this.infos.open(this.get('map'), this);

            var player = $("#player");
            player[0].src = this.sound;
            player[0].play().catch((error) => {
                 alert( "file not found: " + error);
            });
        });

        i++;
    });
}
