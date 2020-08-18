const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const ScrapingElDeber = require('./scraping/scraper')
const scrapingCoreoDelSur = require('./scraping/scrapingCorreoSur')
const scrapingElPotosi = require('./scraping/ScrapingElPotosi')

const app = express();
const port = process.env.PORT || 7000;


const services = require('./routes/api/v1.0/services')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/news/api/v1.0/',services)
app.use('/', services)

// app.use(function (req, res, next) {
//     res.status(404).send("Sorry can't find that!")
//   })

// ScrapingElDeber.ScrapingChreerio()
// ScrapingElDeber.ScrapingPuppeterRadioElDeber()
//    scrapingCoreoDelSur.scrapingCorreoSur()
// scrapingElPotosi.ScrapingElPotosi('local');

const uploadElPototis = require('./scraping/UploadScrapingElPotosi')
// uploadElPototis.UploadScrapingElPotosi();

// const firebase = require('./push_notifications/firebase_condig_push_Notification')
const pusNot = require('./push_notifications/send_all_user_push_notification')
// // firebase.SendMessageFirebase();
// pusNot.SearchArtticleSendPushNot();
const eliminar=require('./routes/api/v1.0/deleteDuplicateArticles/searchAndDelete');
eliminar.SearchArticles();




app.listen(port,()=>{
    console.log(`server run on port: http://localhost:${port}`)
})

