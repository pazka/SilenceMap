var express = require('express');
var db = require('../persist/silence');
var router = express.Router();
/* GET home page. */
router.get('/soundId', function(req, res, next) {
  res.sendfile('index.html');
});

router.get('/soundByLoc', function(req, res, next) {
  db.findAll({where:{
      lon : {[between] : [req.lon - req.radius, req.lon + req.radius]},
      lat : {[between] : [req.lat - req.radius, req.lat + req.radius]}
  }}).then((allSounds)=>{
      res.send(allSounds);
  });
});


router.post('newSound',(req,res,next) =>{
    db.create( {
        file: "sounds/" + req.filename,
        name: req.name || "Anonymous",
        lon: req.lon,
        lat: req.lat,
        createdAt: new Date()
    }).then((ret)=>{
        res.sendStatus(200);
    }).error((err)=>{
        console.log(err);
        res.send(err);
        return err;
    });
});

router.put("/sound", (req, res) => {
  var mp3SongName = "TODO";
  var mp3_file = fs.createWriteStream(mp3SongName);

  mp3_file.on('open', function (fd) {
    req.on('data', function(data){
        console.log("loading... \n");
        mp3_file.write(data);
    });

    req.on('end', function(){
        console.log("finalizing...");
        mp3_file.end();
        res.sendStatus(200);
    });
  });
});

module.exports = router;
