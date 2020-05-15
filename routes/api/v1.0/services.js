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

route.get('/upload/news/eldeber/section=:section',control.controlSectionElDeber, Scraping.UpdateScraper)

// enpoint -->  http://localhost:7000/scraping/upload/eldeber/radio/
route.get('/scraping/upload/eldeber/radio',Scraping.ScrapinRadioElderber)



// :::correo del sus:::

const uploadCorreoSur= require('../../../scraping/UploadScraperCorreoSur')

// enpoint -->  http://localhost:7000/scraping/news/upload/correosur/section=:local
// https://correodelsur.com/local   --> local, sociedad, politica, seguridad, economia, mundo
route.get('/scraping/news/upload/correodelsur/section=:section',control.controlSectionCorreoDelSur ,uploadCorreoSur.UpdateScraperCorreoSur)

// realiza un scrapin de la radio de correo del sur
route.get('/scraping/upload/correodelsur/radio',uploadCorreoSur.uploadScrapingRadioCorreoSur)

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




// ::::: PETICIONES GET, PUT, DELETE, UPDATE

// listar las noticias por subtitulo , el deber[santa-cruz, pais, economia, mundo]
// listar las noticias por subtitulo , correo del sur[local, sociedad, politica, seguridad, economia, mundo]
route.get('/show/noticias/source=:source&section=:section', ArticlesNews.showNews)




// :::::Informacion de uso de la api rest
const InfoApi = require('./infoApiResources')

route.get('/api/info',InfoApi.infoApiResources)




// respuesta por defaul de al api-rest
route.use('*',(req, res, next)=>{
    res.status(404).send({
        status:404,
        err: 'Error en la peticion',
        message: 'Ruta o peticion incorrecta'

    })
})


module.exports = route