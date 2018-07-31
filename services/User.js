var utils = require('../utils/writer.js');
var Users = require('../models').Users;
var LookupCommunicators = require('../models').LookupCommunicators;
var UserContents = require('../models').UserContents;
const Op = require('sequelize').Op;

GenerateUsersObject = (obj) => {
    var obj_user = {
        PrimaryEmail:           "",
        SecondaryEmail:         "",
        Title:                  0,
        FirstName:              "",
        LastName:               "",
        Language:               0,
        LanguageProficency:     0,
        CompanyId:              0,
        LastLoggedIn:           new Date().toISOString().replace('T',' ').slice(0, -1),
        OptInData:              1,
        CommunicatorId:         0,
        BelbinPreferred:        0,
        Mbti:                   0,
        Gender:                 0,
        DateOfBirth:            new Date().toISOString().replace('T',' ').slice(0, -1),
        Status:                 2
    }
    for (key in obj)
        obj_user[key] = obj[key];
    return Users.create(obj_user);
}

GenerateUserContentsObject = (obj) => {
    var obj_userContent = 
    {
          SentenceCount:                0,
          UnusualWordCount:             0,
          QuestionsCount:               0,
          ExclamationPointCount:        0,
          LongestSentenceWordCount:     0,
          ClassificationId:             0,
          ContentId:                    0,
          ParentContentId:              0,
          Score:                        0,
          CharacterCount:               0,
          WordCount:                    0,
          ContentsText:                 "",
          AuthoredDate:                 new Date().toISOString().replace('T',' ').slice(0, -1),
          UserId:                       0,
          MessageConversationId:        0,
          Subject:                      "",
          CompanyId:                    0,
          RecipientId:                  0,
    };

    for (key in obj)
        obj_userContent[key] = obj[key];
    return UserContents.create(obj_userContent);
}

exports.getUserByEmail = async (req, res, next) => {
    /* fetching paramter : email - path */
    var req_email = req.swagger.params['email'].value;

    try {
        // find Users object having email value as primaryemail or secondaryemail
        var obj_user = await Users.findOne({
            where: {
                [Op.or]: [{PrimaryEmail: req_email}, {SecondaryEmail: req_email}]
            },
        })

        if (obj_user == null) {
            // Creating new User
            obj_user = await GenerateUsersObject({
                PrimaryEmail:   req_email
            })
            // Responding error if there is error in creating new user
            if (obj_user == null) throw new Error("Cannot Create User")
            // if rebrand email, set key/value like below
            obj_user["dataValues"]["RecipientStatusId"] = 2;
        }
        // Returning Communicator Name and Summary from the LookupCommunications table
        const lookupCommunicators_for_summary_communicatorName = await LookupCommunicators.findOne({
            where: {
              CommunicatorId: obj_user["dataValues"]["CommunicatorId"]
            },
        })

        if (lookupCommunicators_for_summary_communicatorName != null ) {
            obj_user["dataValues"]['CommunicatorName'] =    lookupCommunicators_for_summary_communicatorName.CommunicatorName;
            obj_user["dataValues"]['Summary'] =             lookupCommunicators_for_summary_communicatorName.Summary;
        }
        utils.writeJson(res, obj_user);
    }
    catch(error) {
        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: error.message}))
    }
}

exports.getContentById = async (req, res, next) => {
    /* fetching paramters : id - path, content - body
    
    ContentsText --> UserContents.ContentsText
    AuthoredDate --> UserContents.AuthoredDate
    Subject --> UserContents.Subject
    MessageConversationId --> UserContents.MessageConversationId
    taken from PUT {id} --> UserContents.UserId

    */
    var req_id =        req.swagger.params['id'].value;
    var req_content =   req.swagger.params['content'].value;
    var obj_userContents = 
    {
          Score:                    Math.floor(Math.random() * (100 - 20)) + 20,
          ContentsText:             req_content.contentsText,
          AuthoredDate:             new Date(req_content.authoredDate).toISOString().replace('T',' ').slice(0, -1),
          UserId:                   req_id,
          MessageConversationId:    req_content.messageConversationId,
          Subject:                  req_content.subject,
    };
    
    // implementing API functionalities
    try {

        // taken from PUT {id} and lookup User record for matching User.CompanyId --> UserContents.CompanyId
        const user_find_companyId = await Users.findOne({
            where: {UserId: req_id}
        })
        if (user_find_companyId != null) 
            obj_userContents.CompanyId = user_find_companyId["dataValues"].CompanyId;
        else 
            throw new Error("User id in the api path doesn't exist ")
        
        // RecipientEmail --> lookup User table
        const user_find_userId = await Users.findOne({
            where: {
                [Op.or]: [{PrimaryEmail: req_content.recipientEmail}, {SecondaryEmail: req_content.recipientEmail}]
            }
        })

        if (user_find_userId == null) {
            // if matching UserId is not found, then create a new User table entry and then save into database UserContents.RecipientId
            const obj_user = await GenerateUsersObject({
                PrimaryEmail:   req_content.recipientEmail
            })

            if (obj_user == null) 
                throw new Error("Cannot Create User")
            else
                obj_userContents.RecipientId = obj_user["dataValues"].UserId;
        }
        else 
            // If UserId is matching, save that into database UserContents.RecipientId
            obj_userContents.RecipientId = user_find_userId["dataValues"].UserId;
  
        // creating new object in UserContents and responding 'Score' & 'UserContentID'
        const userContents_for_score_id = await GenerateUserContentsObject(obj_userContents);
        utils.writeJson(res, {
            score: userContents_for_score_id["dataValues"].Score, 
            userContentId: userContents_for_score_id["dataValues"].UserContentId
        });
    }
    catch(error) {
        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: error.message}))
    }
}