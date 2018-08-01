'use strict';

var service_Serviceauth = require('../services/Serviceauth');
module.exports.authService = function authService (req, res, next) {
    service_Serviceauth.authService(req, res, next);
};
