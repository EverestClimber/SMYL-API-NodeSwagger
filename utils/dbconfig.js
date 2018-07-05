var Sequelize = require('sequelize');
var sequelizer = new Sequelize('Version1', 'Happy', 'Lucky5lug!', {
    host: 'machinelearningdev.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        encrypt: true
    }
  });

module.exports = {
    sequelizer, Sequelize
};