'use strict';

var utils = require('../utils/writer.js');
var LookupServices = require('../models').LookupServices;
var auth = require("../utils/auth");
module.exports.authService = function authService (req, res, next) {
    var key = req.swagger.params['servicekey'].value;

    LookupServices.findOne({
        where: {
            ServiceKey: key
        }
    })
    .then(result => {
        console.log(result)
        if (result == null)
            utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
        else
            utils.writeJson(res, {token: auth.generateToken(result.dataValues)});
    })
    .catch(() => {
        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
    })
};
