const ArticlesNews = require('../database/collections/articlesNews')
const scraper = require('./scraper')

const Radio = require('../database/collections/radioNews')
const Utils=require('../utils/removeAcentos')

const SendPushNot= require('../push_notifications/send_all_user_push_notification')

async function UpdateScraper(req, res) {

    // const { section='pais' } = req.params;

    const sections=['pais','mundo','economia','santa-cruz'];
    
    for(let i = 0; i < sections.length; i++) {
        
        const data = await scraper.ScraperPuppeter(sections[i])
    
        for (let j = data.length-1 ; j>=0 ; j--) {
            
                const news = await new ArticlesNews({
                    author:data[j].author,
                    title: data[j].title,
                    titleSection:Utils.removeAccents(data[j].titleSection),
                    country:'',
                    description:data[j].description,
                    urlImage: data[j].urlImage,
                    sobre: data[j].sobre,
                    publishedAt:data[j].publishedAt,
                    urlContendDetail:data[j].urlContend,
                    contenido:'',
                    source: data[j].source
                })
        
        
        const artitcle = await  ArticlesNews.findOne({title:data[j].title,titleSection:sections[i]}).exec();
            
            if(!artitcle){
                const saved = await news.save();
                if(!saved){
                    console.log(saved.title)
                }
            }else{
                console.log('Noticia existente');
            }
            
        }

    }

    SendPushNot.SearchArtticleSendPushNot();   // funcion que envia las notificaciones a los suarios
    res.status(200).send({message: 'realizando scraping a el deber'})

    
}

// ScrapingEllDeberRadio

async function ScrapinRadioElderber(req, res){


  const data= await  scraper.ScrapingPuppeterRadioElDeber()

    const newRadio = new Radio({
        title:data.title,
        urlRadio:data.urlRadioElDeber,
        source:data.source

    })

    Radio.findOne({urlRadio:data.urlRadioElDeber},(err, respuesta)=>{
        if(err){
            console.log('error el la buqueda')
            console.log(err)
            res.status(400).send(err)
        }

        if(!respuesta){
            newRadio.save((errone,dataSave)=>{
                if(errone)return res.status(400).send({error:'400',erro:'no de gusardo los datos'})
                
                res.status(200).send({status:200,message:'url de la rio actualizada',radio:dataSave})
            })
        }else{
            res.status(400).send({message:'la url ya existe'})
        }
    })

    // res.status(200).send( data)
}




module.exports = {
    UpdateScraper,
    ScrapinRadioElderber
}