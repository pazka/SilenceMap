var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'silence',
     'root',
      '',
      {host: 'localhost',
      dialect: 'mysql',
      // disable logging; default: console.log
      logging: false});
//var sequelize = new Sequelize('mysql://'+process.env.bdduser+":"+process.env.bddpsw+'@54.37.70.57:3306/Silence')
var sound = sequelize.define('sound', {
    id: {type: Sequelize.INTEGER, primaryKey : true},
    file: Sequelize.TEXT,
    adr: Sequelize.TEXT,
    name: Sequelize.TEXT,
    lon: Sequelize.FLOAT,
    lat: Sequelize.FLOAT,
    createdAt: Sequelize.DATE
});

module.exports = sound;
