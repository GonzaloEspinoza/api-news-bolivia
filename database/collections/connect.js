const mongoose = require('mongoose')

try {
    mongoose.connect('mongodb://192.168.99.100:27017/newsDB',{useNewUrlParser: true, useUnifiedTopology:true})
   
   .then(()=>{
    console.log('conected database mongodb ok')
   }) 
    
} catch (error) {
    
    console.log({error:'error el la coneccion a la base de datos',err})
}



module.exports = mongoose