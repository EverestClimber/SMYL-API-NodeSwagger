'use strict';

var utils = require('../utils/writer.js');
var LookupServices = require('../models').LookupServices;
var auth = require("../utils/auth");
exports.authService = async function authService (req, res, next) {

    const req_key = req.swagger.params['servicekey'].value;

    try {
        const obj_lookupService = await LookupServices.findOne({
            where: {
                ServiceKey: req_key
            }
        });
    
        if (obj_lookupService == null) throw new Error("no auth service key")
        utils.writeJson(res, {
            token:                      auth.generateToken(obj_lookupService.dataValues),
            HistoricMessagesCount:      obj_lookupService.HistoricMessagesCount,
            HistoricMessageMinChars:    obj_lookupService.HistoricMessageMinChars
        });
    } 
    catch(error) {
        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: error.message}))
    }

};
