const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const ScrapingElDeber = require('./scraping/scraper')
const scrapingCoreoDelSur = require('./scraping/scrapingCorreoSur')

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


app.listen(port,()=>{
    console.log(`server run on port: http://localhost:${port}`)
})

