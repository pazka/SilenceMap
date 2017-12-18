
window.showed = true;
var map ;

function showDetail(){
    showed = (showed ? false : true);
    if(!showed)
    $("#otherPre").css("display","inline");
    else
    $("#otherPre").css("display","none");

}

function initMap() {
    var allMarks = [
        {pos :{lat:48.5840324, lng: 7.744312}, title :"Homme de fer", sound:"audio/homme de fer.mp3"},
        {pos :{lat:48.5834538, lng: 7.7456927}, title :"Place Kleber", sound:"audio/place kleber.mp3"}
    ];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat:48.5840324, lng: 7.744312},
        styles : mapStyle
    });
}

function placeMarker(mark){
    var marker = new google.maps.Marker({
        position: elem.pos,
        map: map,
        self : markers[i],
        infos : new google.maps.InfoWindow({
            content: "<p>"+mark.title+"</p>"
        }),
        sound : mark.file
    });
}


    allMarks.forEach(function(elem){
        markers[i] =

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
            alert(err);
        });
    } else {
        alert( "Geolocation is not supported by this browser.");
    }
}

function test(){

    //alert(map.center.lat() +"///"+map.center.lng()+"///"+map.zoom);
    /*$.get('/api/soundByLoc',{lon:map.center.lng(),lat:map.center.lat(),radius:0.00010*1.5*(25-map.zoom)})
    .then((allSound)=>{
            alert(allSound);
        });*/
        /*
        48.5840324///7.744312000000036///16
        48.58390464755429///7.751114082061816///16
        0,00012775244571 // 16

        0,000007984527856875 //16
        0,000040556172565 //14

        48.58445114186436///7.744687509262134///14
        48.58388335544845///7.771380853378345///14
        0,00056778641591//14*/
}
