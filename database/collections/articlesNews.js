const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ArticlesNews = new Schema({
    author: String,
    titleSection:{ type:String ,
        enum:['portada','local','país', 'pais','política', 'politica','deportes','economía', 'economia','mundo','comunicados','santa cruz', 'sociedad','seguridad','nacional','deporte']
    },
    country:String,
    title: String,
    description: String,
    urlImage: String,
    sobre: String,
    publishedAt:String,
    urlContendDetail:String,
    content: String,
    createdDate:{type:Date, default:Date.now },
    source:{
        name:String,
        url:String
    }
})



module.exports = mongoose.model('news',ArticlesNews)

