"use strict";

exports.LOGTYPE = {
    INFO: 'Information',
    WARNING: 'Warning',
    ERROR: 'Error'
}

exports.log = (type, title,  message) => {
    console.log(type, title, message);
}