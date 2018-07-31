var utils = require('../utils/writer.js');
var Users = require('../models').Users;
var LookupCommunicators = require('../models').LookupCommunicators;
var UserContents = require('../models').UserContents;
const Op = require('sequelize').Op;

exports.getContentById = async (req, res, next) => {
    var req_id =        req.swagger.params['id'].value;
    var req_content =   req.swagger.params['content'].value;
    var obj_userContents = 
    {
          SentenceCount:            0,
          UnusualWordCount:         0,
          QuestionsCount:           0,
          ExclamationPointCount:    0,
          LongestSentenceWordCount: 0,
          ClassificationId:         0,
          ContentId:                0,
          ParentContentId:          0,
          Score:                    Math.floor(Math.random() * (100 - 20)) + 20,
          CharacterCount:           0,
          WordCount:                0
    };
  
    obj_userContents.ContentsText =             req_content.contentsText;
    obj_userContents.AuthoredDate =             new Date(req_content.authoredDate).toISOString().replace('T',' ').slice(0, -1);
    obj_userContents.UserId =                   req_id;
    obj_userContents.MessageConversationId =    req_content.messageConversationId;
    obj_userContents.Subject =                  req_content.subject;
  
    try {
        const user_find_companyId = await Users.findOne({
            where: {UserId: req_id}
        })
        if (user_find_companyId != null) 
            obj_userContents.CompanyId = user_find_companyId["dataValues"].CompanyId;
        else 
            throw new Error("No company ID")
        
        const user_find_userId = await Users.findOne({
            where: {
                [Op.or]: [{PrimaryEmail: req_content.recipientEmail}, {SecondaryEmail: req_content.recipientEmail}]
            }
        })

        if (user_find_userId == null) {
            const obj_user = await Users.create({
                PrimaryEmail:       req_content.recipientEmail,
                SecondaryEmail:     "",
                Title:              0,
                FirstName:          "",
                LastName:           "",
                Language:           0,
                LanguageProficency: 0,
                CompanyId:          0,
                LastLoggedIn:       new Date().toISOString().replace('T',' ').slice(0, -1),
                OptInData:          1,
                CommunicatorId:     0,
                BelbinPreferred:    0,
                Mbti:               0,
                Gender:             0,
                DateOfBirth:        new Date().toISOString().replace('T',' ').slice(0, -1),
            })
            obj_userContents.RecipientId = obj_user["dataValues"].UserId;
        }
        else 
            obj_userContents.RecipientId = user_find_userId["dataValues"].UserId;
  
        const userContents_for_score_id = await UserContents.create(obj_userContents);
        utils.writeJson(res, {
            score: userContents_for_score_id["dataValues"].Score, 
            userContentId: userContents_for_score_id["dataValues"].UserContentId
        });
    }
    catch(error) {
        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: "error"}))
    }
}