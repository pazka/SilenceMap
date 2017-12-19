var express = require('express');
var db = require('../persist/silence');
var router = express.Router();
var Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const Op = Sequelize.Op;


/* GET home page. */
router.get('/soundId', function(req, res, next) {
  res.sendfile('index.html');
});

router.get('/soundByLoc', function(req, res, next) {
  db.findAll({where:{
      lon : {$between : [req.query.lon - req.query.radius, req.query.lon + req.query.radius]},
      lat : {$between : [req.query.lat - req.query.radius, req.query.lat + req.query.radius]}
  }}).then((allSounds)=>{
      res.send(allSounds);
  }).catch((err)=>{
      console.log(err);
      res.send(err);
  })
})

router.use(fileUpload({ safeFileNames: true }));

var publicPath = "./audio/";
var serverPath = "./public/audio/";
var baseExt = ".mp3";
router.post('/newSound',(req,res,next) =>{
    if(!req.body.name || !req.body.adr || !req.body.lon || !req.body.lat || !req.files){
        return res.status(400).send('not all param present : '  
	+ req.body.name 
	+ req.body.adr 
	+ req.body.lon 
	+ req.body.lat 
	+ req.files)
    }
    db.findAll({where:{file:serverPath + req.body.filename + baseExt}})
    .then((alreadyExist)=>{
        if(alreadyExist.length != 0)
            return res.status(400).send('File with that name already exists.');

        //creating file
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
        var fileUp = req.files.sound;
        fileUp.mv(serverPath+req.body.filename + baseExt).then(()=>
        {
            db.create({
                file: publicPath + req.body.filename + baseExt,
                name: req.body.name || "Anonymous",
                adr : req.body.adr,
                lon: req.body.lon,
                lat: req.body.lat,
                createdAt: new Date()
            }).then((ret)=>{
                res.redirect('/uploadDone.html');
            }).catch((err)=>{
                console.log(err);
                res.send(err);
            });
        }).catch((err)=>{
            console.log(err);
            res.send(err);
        });
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
