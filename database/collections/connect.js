const mongoose = require('mongoose')

// mongo atlas:  mongodb+srv://gonzalo3:<password>@cluster0-dza4n.mongodb.net/test?retryWrites=true&w=majority

try {
    mongoose.connect('mongodb+srv://gonzalo3:newspasswordmongodb@cluster0-dza4n.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology:true})
   
   .then(()=>{
    console.log('conected database mongodb ok')
   }) 
    
} catch (error) {
    
    console.log({error:'error el la coneccion a la base de datos',err})
}



module.exports = mongoose