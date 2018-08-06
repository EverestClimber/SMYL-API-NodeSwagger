var utils = require('../utils/writer.js');
var Users = require('../models').Users;
var LookupCommunicators = require('../models').LookupCommunicators;
var UserContents = require('../models').UserContents;
var auth = require("../utils/auth");
const { LOGTYPE, log } = require('../utils/log');
const Op = require('sequelize').Op;

GenerateDateObject = (dateValue) => {
    return dateValue == undefined  ? 
        new Date().toISOString().replace('T',' ').slice(0, -1) : 
        new Date(dateValue).toISOString().replace('T',' ').slice(0, -1)
}

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
        LastLoggedIn:           GenerateDateObject(),
        OptInData:              1,
        CommunicatorId:         0,
        BelbinPreferred:        0,
        Mbti:                   0,
        Gender:                 0,
        DateOfBirth:            GenerateDateObject(),
        Status:                 2
    }
    for (key in obj)
        obj_user[key] = obj[key];
    return obj_user;
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
          AuthoredDate:                 GenerateDateObject(),
          UserId:                       0,
          MessageConversationId:        "",
          Subject:                      "",
          CompanyId:                    0,
          RecipientId:                  0,
    };

    for (key in obj)
        obj_userContent[key] = obj[key];
    return obj_userContent;
}

exports.loginUser = async (req, res, next) => {

    log(LOGTYPE.INFO, 'API', 'LoginUser');

    var user = req.swagger.params['user'].value;

    log(LOGTYPE.INFO, 'Request Params', req.swagger.params);

    try {
        var obj_user = await Users.findOne({
            where: {
                [Op.or]: [{PrimaryEmail: user.email}, {SecondaryEmail: user.email}]
            }
        })
        
        if (obj_user == null) throw new Error('User not found');

        log(LOGTYPE.INFO, 'User Found', obj_user["dataValues"])

        const result_lastloggedin_update = await Users.update( { LastLoggedIn: GenerateDateObject() }, { where: { UserId: obj_user["dataValues"]["UserId"] } });

        if (result_lastloggedin_update.length <= 0) 
            log(LOGTYPE.WARNING, '', 'User not Updated')
        else
            log(LOGTYPE.INFO, '', 'User Updated Successfully')

        utils.writeJson(res, {token: auth.generateToken(obj_user["dataValues"])});

    } catch(error) {

        log(LOGTYPE.ERROR, '', error.message)

        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: error.message}))
    }
}

exports.getUserByEmail = async (req, res, next) => {
    /* fetching paramter : email - path */

    log(LOGTYPE.INFO, 'API', 'GetUserByEmail')

    var req_email = req.swagger.params['email'].value;

    log(LOGTYPE.INFO, 'Request Params', req.swagger.params);
    

    try {
        // find Users object having email value as primaryemail or secondaryemail
        var obj_user = await Users.findOne({
            where: {
                [Op.or]: [{PrimaryEmail: req_email}, {SecondaryEmail: req_email}]
            }
        })

        if (obj_user == null) {

            log(LOGTYPE.INFO, '', 'User not Found')

            // Creating new User
            obj_user = await Users.create(
                GenerateUsersObject({
                    PrimaryEmail:   req_email
                })
            );

            // Responding error if there is error in creating new user
            if (obj_user == null) throw new Error("User not Created")

            log(LOGTYPE.INFO, 'User Created', obj_user["dataValues"])

            // if rebrand email, set key/value like below
            obj_user["dataValues"]["RecipientStatusId"] = 2;
        } 
        else
            log(LOGTYPE.INFO, 'User Found', obj_user["dataValues"])
        // Returning Communicator Name and Summary from the LookupCommunications table
        const lookupCommunicators_for_summary_communicatorName = await LookupCommunicators.findOne({
            where: {
              CommunicatorId: obj_user["dataValues"]["CommunicatorId"]
            },
        })        

        if (lookupCommunicators_for_summary_communicatorName == null )
            log(LOGTYPE.WARNING, '', 'LookupCommunicators not Found')
        else {

            log(LOGTYPE.INFO, 'LookupCommunicators Found', lookupCommunicators_for_summary_communicatorName["dataValues"])

            obj_user["dataValues"]['CommunicatorName'] =    lookupCommunicators_for_summary_communicatorName.CommunicatorName;
            obj_user["dataValues"]['Summary'] =             lookupCommunicators_for_summary_communicatorName.Summary;
        }
        // update LastLoggedIn of user
        utils.writeJson(res, obj_user);
    }
    catch(error) {
        
        log(LOGTYPE.ERROR, '', error.message)

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

   log(LOGTYPE.INFO, 'API', 'GetContentById')

    var req_id =        req.swagger.params['id'].value;
    var req_content =   req.swagger.params['content'].value;
    var obj_userContents = 
    {
          Score:                    Math.floor(Math.random() * (100 - 20)) + 20,
          ContentsText:             req_content.contentsText,
          AuthoredDate:             GenerateDateObject(req_content.authoredDate),
          UserId:                   req_id,
          MessageConversationId:    !req_content.messageConversationId ? '' : req_content.messageConversationId,
          Subject:                  !req_content.subject ? '' : req_content.subject,
    };
    
    log(LOGTYPE.INFO, 'Request Params', req.swagger.params);

    // implementing API functionalities
    try {

        // taken from PUT {id} and lookup User record for matching User.CompanyId --> UserContents.CompanyId
        const user_find_companyId = await Users.findOne({
            where: {UserId: req_id}
        })

        if (user_find_companyId != null) {

            log(LOGTYPE.INFO, 'User Found', user_find_companyId["dataValues"])

            obj_userContents.CompanyId = user_find_companyId["dataValues"].CompanyId;
        }
        else 
            throw new Error("User not Found ")
        
        // RecipientEmail --> lookup User table
        const user_find_userId = await Users.findOne({
            where: {
                [Op.or]: [{PrimaryEmail: req_content.recipientEmail}, {SecondaryEmail: req_content.recipientEmail}]
            }
        })        

        if (user_find_userId == null) {
            // if matching UserId is not found, then create a new User table entry and then save into database UserContents.RecipientId

            log(LOGTYPE.INFO, '', 'User not Found')

            const obj_user = await await Users.create(
                GenerateUsersObject({
                    PrimaryEmail:   req_content.recipientEmail
                })
            );

            if (obj_user == null) 
                throw new Error("User not Created")
            else {

                log(LOGTYPE.INFO, 'User Created', obj_user["dataValues"])

                obj_userContents.RecipientId = obj_user["dataValues"].UserId;
            }
        }
        else {

            log(LOGTYPE.INFO, 'User Found', user_find_userId["dataValues"])

            // If UserId is matching, save that into database UserContents.RecipientId
            obj_userContents.RecipientId = user_find_userId["dataValues"].UserId;
        }
            
  
        // creating new object in UserContents and responding 'Score' & 'UserContentID'
        const userContents_for_score_id = await UserContents.create(
            GenerateUserContentsObject(obj_userContents)
        );

        if (userContents_for_score_id == null) throw new Error('UserContents not Created')

        log(LOGTYPE.INFO, 'UserContents Created', userContents_for_score_id["dataValues"])

        utils.writeJson(res, {
            score: userContents_for_score_id["dataValues"].Score, 
            userContentId: userContents_for_score_id["dataValues"].UserContentId
        });
    }
    catch(error) {

        log(LOGTYPE.ERROR, '', error.message)

        utils.writeJson(res, utils.respondWithCode(400, {error: 400, type: "error", message: error.message}))
    }
}