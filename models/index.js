const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const sequelizer = require('../utils/dbconfig').sequelizer;
const Sequelize = require('../utils/dbconfig').Sequelize;
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelizer.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizer = sequelizer;
db.Sequelize = Sequelize;

module.exports = db;