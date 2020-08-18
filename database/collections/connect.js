

const mongoose = require('mongoose')
const ScrapingAll = require('../../scraping/controllScraping/scraping_all_controll')

// mongo atlas:  mongodb+srv://gonzalo3:<password>@cluster0-dza4n.mongodb.net/test?retryWrites=true&w=majority
//            : 'mongodb+srv://gonzalo3:newspasswordmongodb@cluster0-dza4n.mongodb.net/test?retryWrites=true&w=majority'
// docker-compose: 'mongodb://192.168.99.100:27017/NewsBoliviaDB'
try {
    mongoose.connect('mongodb://192.168.99.100:27017/NewsBoliviaDB',{useNewUrlParser: true, useUnifiedTopology:true})
   
   .then( async()=>{
    console.log('conected database mongodb ok');
    // await ScrapingAll.ControlScrapingEldeber();
    // await ScrapingAll.ControlScrapingElPotosi();
    // await ScrapingAll.ControlScrapingCorreoDelSur();
   }) 
    
} catch (error) {
    
    console.log({error:'error el la coneccion a la base de datos',err})
}



module.exports = mongoose