var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.bddbdd, process.env.bdduser, process.env.bddpsw,{host: 'http://54.37.70.57:8080',
dialect: 'mysql',
  // disable logging; default: console.log
logging: false});
var sound = sequelize.define('', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

module.exports = sound;
