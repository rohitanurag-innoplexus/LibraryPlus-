var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    ISBN: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    publisher: {
        type: String,
        default: ''
    },
    pnumber: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    tnum: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },  

    issued: {
        type: String,
        default: ''
    }


});
