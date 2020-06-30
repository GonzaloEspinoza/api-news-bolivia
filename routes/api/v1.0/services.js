const mongoose  = require('mongoose')
const connect = require('../../../database/collections/connect')

const express = require('express');
const route = express.Router();

const ArticlesNews  = require('./ArtitlesNews')

// metodos de peticion

route.get('/',(req, res)=>{
    res.status(200).send({message:'Api-Rest-news ok '})
})



// ::::::::::::::::::::::: UPLOAD NEWS -(SCRAPING)::::::::::::::::::::::::::::::::::::::::::::::::::::

// :::: SCRAPING DE EL DEBER::
const Scraping = require('../../../scraping/UploadScraper')
const control = require('./constrols')

// endpoint -->http://localhost:7000/upload/news/eldeber/section=pais
// https://eldeber.com.bo/santa-cruz    --> santa cruz, pais, economia, mundo

route.get('/scraping/news/upload/eldeber',
    Scraping.UpdateScraper
)

// enpoint -->  http://localhost:7000/scraping/upload/eldeber/radio/
route.get('/scraping/upload/eldeber/radio',Scraping.ScrapinRadioElderber)



// :::correo del sus:::

const uploadCorreoSur= require('../../../scraping/UploadScraperCorreoSur')

// enpoint -->  http://localhost:7000/scraping/news/upload/correosur/section=:local
// https://correodelsur.com/local   --> local, sociedad, politica, seguridad, economia, mundo
route.get('/scraping/news/upload/correodelsur' ,uploadCorreoSur.UpdateScraperCorreoSur)

// realiza un scrapin de la radio de correo del sur
route.get('/scraping/upload/correodelsur/radio',uploadCorreoSur.uploadScrapingRadioCorreoSur)


// :::::::::SCRAPING EL POTOSI::::::
const ElPototosi = require('../../../scraping/UploadScrapingElPotosi');

route.get('/scraping/news/upload/elpotosi',ElPototosi.UploadScrapingElPotosi)

// :::::::::::::::::::::::::::::::::



// scraping article detail el deber----
// http://localhost:7000/scraping/news/detail/id=5ee3a3f7d4cc642d4c867525
const ScrapingDetail = require('../../../scraping/scrapingDetailArtitle')

route.get('/scraping/news/detail/id=:id',ScrapingDetail.DetailArtitle)
// --------------------------------

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




// ::::: PETICIONES GET, PUT, DELETE, UPDATE

// listar las noticias por subtitulo , el deber[santa-cruz, pais, economia, mundo]
// listar las noticias por subtitulo , correo del sur[local, sociedad, politica, seguridad, economia, mundo]
route.get('/show/noticias/source=:source&section=:section', ArticlesNews.showNews)


// muestra todos los DETAILS ARTICLES de los srticulos de la pagina el deber
const Detail = require('./ShowDetailEldeber')
route.get('/show/deatilartitcles/eldeber/section=:section',Detail.ShowDetail)





// :::::Informacion de uso de la api rest
const InfoApi = require('./infoApiResources')

route.get('/api/info',InfoApi.infoApiResources)



// ::::::Receibde token users:::::::::::::::
const token = require('./token_Users_receive/token_Users');

route.get('/user/new/token=:token',token.ReceiveTokenUser);

// :::::::::::::::end::::::::::::::::::::::::





// respuesta por defaul de al api-rest
route.use('*',(req, res, next)=>{
    res.status(404).send({
        status:404,
        err: 'Error en la peticion',
        message: 'Ruta o peticion incorrecta'

    })
})


module.exports = route