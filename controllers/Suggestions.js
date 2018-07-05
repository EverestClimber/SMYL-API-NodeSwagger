'use strict';

var utils = require('../utils/writer.js');
var sequelizer = require('../utils/dbconfig').sequelizer;
var Sequelize = require('../utils/dbconfig').Sequelize;
var UserSuggestions = require('../models/UserSuggestions')(sequelizer, Sequelize);

module.exports.getSuggestions = function getSuggestions (req, res, next) {
  var id = req.swagger.params['id'].value;
  new Promise(function(resolve, reject) {
    UserSuggestions.findOne({
      where: {UserSuggestionId: id},
    }).then(result => result == null ? reject() : resolve(result))
  })
  .then(response => {
    utils.writeJson(res, response);
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "not found"}))
  })
};
