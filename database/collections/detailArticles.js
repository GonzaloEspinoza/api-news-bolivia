'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailArticles = new Schema({
    idArtitcle: String,
    urlFunte: String,
    author:String,
    titleSection:String,
    title:String,
    urlImage:String,
    conetent: []
})


module.exports = mongoose.model('detailarticles', detailArticles)