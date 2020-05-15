const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const newsRario = new Schema({
    title:String,
    urlRadio:String,
    urlImgRadio:String,
    source:{
        name:String,
        url:String
    }
})

module.exports= mongoose.model('radionews',newsRario)
