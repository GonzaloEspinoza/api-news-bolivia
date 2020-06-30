const mongoose = require('mongoose')

// mongo atlas:  mongodb+srv://gonzalo3:<password>@cluster0-dza4n.mongodb.net/test?retryWrites=true&w=majority
//            : 'mongodb+srv://gonzalo3:newspasswordmongodb@cluster0-dza4n.mongodb.net/test?retryWrites=true&w=majority'
// docker-compose: 'mongodb://192.168.99.100:27017/NewsBoliviaDB'
try {
    mongoose.connect('mongodb://192.168.99.100:27017/NewsBoliviaDB',{useNewUrlParser: true, useUnifiedTopology:true})
   
   .then(()=>{
    console.log('conected database mongodb ok')
   }) 
    
} catch (error) {
    
    console.log({error:'error el la coneccion a la base de datos',err})
}



module.exports = mongoose