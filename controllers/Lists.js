'use strict';

var utils = require('../utils/writer.js');
var LookupGroupEmails = require('../models').LookupGroupEmails;

module.exports.getGroupEmails = function getGroupEmails (req, res, next) {
    LookupGroupEmails.findAll({
        attributes: ["LocalPart"]
    })
    .then(result => {
        var data = [];
        result.forEach(element => {
            data.push(element["dataValues"].LocalPart)
        });
        utils.writeJson(res, data);
    })
    .catch(() => {
        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
    })
};
