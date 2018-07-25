'use strict';

var utils = require('../utils/writer.js');
var Sequelize = require('sequelize');
var Users = require('../models').Users;
var LookupCommunicators = require('../models').LookupCommunicators;
var UserContents = require('../models').UserContents;
var auth = require("../utils/auth");
const Op = Sequelize.Op;
module.exports.createUser = function createUser (req, res, next) {
  var user = req.swagger.params['user'].value;
  
  new Promise(function(resolve, reject) {
    Users
      .build(user)
      .save()
      .then(result => result == null ? reject() : resolve(result))
  })
  .then(response => {
    utils.writeJson(res, response);
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
  })
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  var id = req.swagger.params['id'].value;
  new Promise(function(resolve, reject) {
    Users.destroy({
      where: {
          UserId: id
      }
    }).then(result => result == null ? reject() : resolve(result))
  })
  .then(response => {
    utils.writeJson(res, response);
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
  })
};

const getCommunicatorDetailsById = (id) => {
  console.log("getCommunicatorDetailsById")
  return new Promise((resolve, reject) => {
    LookupCommunicators.findOne({
      where: {
        CommunicatorId: id
      },
    })
    .then(result => {console.log(result);result == null ? reject() : resolve(result)})
  });
}

module.exports.getUserByEmail = function getUserByEmail (req, res, next) {
  var email = req.swagger.params['email'].value;
  new Promise(function(resolve, reject) {
    Users.findOne({
      where: {
        [Op.or]: [{PrimaryEmail: email}, {SecondaryEmail: email}]
      },
    })
    .then(result => result == null ? reject() : resolve(result))
  })
  .then(response => {
    getCommunicatorDetailsById(response["dataValues"]["CommunicatorId"])
    .then(response1 => {
      response["dataValues"]['CommunicatorName'] = response1.CommunicatorName;
      response["dataValues"]['Summary'] = response1.Summary;
      utils.writeJson(res, response);
    })
    .catch(() => {
      utils.writeJson(res, response);
    })
    
  })
  .catch(() => {
    Users.create({
      PrimaryEmail: email,
      SecondaryEmail: "",
      Title: 1,
      FirstName: "",
      LastName: "",
      Language: 1,
      LanguageProficency: 1,
      CompanyId: 1,
      LastLoggedIn: new Date().toISOString().replace('T',' ').slice(0, -1),
      OptInData: 1,
      CommunicatorId: 1,
      BelbinPreferred: 0,
      Mbti: 0,
      Gender: 2,
      DateOfBirth: new Date().toISOString().replace('T',' ').slice(0, -1),
      Status: 0,
    }).then(response => {
      getCommunicatorDetailsById(response["dataValues"]["CommunicatorId"])
      .then(response1 => {
        response["dataValues"]['CommunicatorName'] = response1.CommunicatorName;
        response["dataValues"]['Summary'] = response1.Summary;
        utils.writeJson(res, response["dataValues"]);
      })
      .catch(() => {
        utils.writeJson(res, response["dataValues"]);
      })
    })
  })
};

module.exports.getUserById = function getUserById (req, res, next) {
  var id = req.swagger.params['id'].value;
  new Promise(function(resolve, reject) {
    Users.findOne({
      where: {UserId: id}
    })
    .then(result => result == null ? reject() : resolve(result))
  })
  .then(response => {
    utils.writeJson(res, response);
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "not found"}))
  })
};

module.exports.loginUser = function loginUser (req, res, next) {
  var user = req.swagger.params['user'].value;
  new Promise(function(resolve, reject) {
    Users.findOne({
      where: {
        [Op.or]: [{PrimaryEmail: user.email}, {SecondaryEmail: user.email}]
      }
    })
    .then(result => result == null ? reject() : resolve({token: auth.generateToken(result.dataValues)}))
  })
  .then(response => {
    utils.writeJson(res, response);
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "login failed", message: "User email or password should be valid"}))
  })
};

module.exports.logoutUser = function logoutUser (req, res, next) {

};

module.exports.updateUser = function updateUser (req, res, next) {
  var id = req.swagger.params['id'].value;
  var user = req.swagger.params['user'].value;
  new Promise(function(resolve, reject) {
    Users.update(user, {
      where: {UserId: id},
    }).then(result => result == null ? reject() : resolve(result))
  })
  .then(response => {
    utils.writeJson(res, response);
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
  })
};

module.exports.getContentById = function getContentById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var content = req.swagger.params['content'].value;
  var userContents = {
		SentenceCount: 0,
		UnusualWordCount: 0,
		QuestionsCount:0,
		ExclamationPointCount: 0,
		LongestSentenceWordCount: 0,
		ClassificationId: 0,
		ContentId: 0,
		ParentContentId: 0,
		Score: Math.floor(Math.random() * (100 - 20)) + 20,
		CharacterCount: 0,
		WordCount: 0
  };

  userContents.ContentsText = content.contentsText;
  userContents.AuthoredDate = new Date(content.authoredDate).toISOString().replace('T',' ').slice(0, -1);
  userContents.UserId = id;

  var promise1 = new Promise((resolve, reject) => 
    Users.findOne({
      where: {UserId: id}
    })
    .then(
      result => {
        if (result == null)
          reject();
        else{
          userContents.CompanyId = result["dataValues"].CompanyId;
          resolve();
        } 
      }
    )
    .catch(() => reject())
  ) 

  var promise2 = new Promise( (resolve, reject) => 
    Users.findOne({
      where: {
        [Op.or]: [{PrimaryEmail: content.recipientEmail}, {SecondaryEmail: content.recipientEmail}]
      }
    })
    .then(
      result => {
        if (result == null)
          Users.create({
            PrimaryEmail: content.recipientEmail,
            SecondaryEmail: "",
            Title: 0,
            FirstName: "",
            LastName: "",
            Language: 0,
            LanguageProficency: 0,
            CompanyId: 0,
            LastLoggedIn: new Date().toISOString().replace('T',' ').slice(0, -1),
            OptInData: 1,
            CommunicatorId: 0,
            BelbinPreferred: 0,
            Mbti: 0,
            Gender: 0,
            DateOfBirth: new Date().toISOString().replace('T',' ').slice(0, -1)
          }).then(response => {
            userContents.RecipientId = response["dataValues"].UserId;
            resolve();
          })
          .catch(() => reject())
        else{
          userContents.RecipientId = result["dataValues"].UserId;
          resolve();
        }
      },
      error => {
        reject();
      }
    )
  )

  Promise.all([promise1, promise2]).then(() => {
    UserContents.create(userContents)
    .then(result => {
      utils.writeJson(res, {score: result["dataValues"].Score});
    })
  })
  .catch(() => {
    utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
  })

  
}