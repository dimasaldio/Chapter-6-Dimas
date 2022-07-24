const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDB = new Schema({
    username : {type: String},
    email : {type : String},
    password : {type : String},
    firstName : {type: String},
    lastName : {type: String},
    gender : {type: String},
    age : {type: String}
})

const userData = mongoose.model('userdata', userDB)
module.exports = userData