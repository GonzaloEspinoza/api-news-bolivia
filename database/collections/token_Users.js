const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const tokenUser= new Schema({
    tokenUser : String,
    createDate : {
        type:Date, default: Date.now
    }
})


module.exports = mongoose.model('token_Users', tokenUser);
