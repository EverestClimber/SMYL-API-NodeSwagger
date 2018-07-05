"use strict";

var jwt = require("jsonwebtoken");
var sharedSecret = "shh";

exports.verifyToken = function(req, authOrSecDef, token, callback) {
  if (token && token.indexOf("Bearer ") == 0) {
    var tokenString = token.split(" ")[1];

    jwt.verify(tokenString, sharedSecret, function(
      verificationError,
      decodedToken
    ) {
        if (verificationError == null && decodedToken) {
            req.auth = decodedToken;	
            callback(null);
        } else {
            callback({
                code: "",
                message: "",
                type: "",
                statusCode: 401,
            })
        }
    });
  } else {
    //return the error in the callback if the Authorization header doesn't have the correct format
    callback({
        code: "",
        message: "",
        state: "string",
        statusCode: 401,
    })
  }
};

exports.generateToken = function(user) {
  var token = jwt.sign(
    user,
    sharedSecret
  );
  return token;
};