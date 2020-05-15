const ArticlesNews = require('../database/collections/articlesNews')
const scraper = require('./scraper')

const Radio = require('../database/collections/radioNews')
const Utils=require('../utils/removeAcentos')

async function UpdateScraper(req, res) {

    const { section='pais' } = req.params

    


    const data = await scraper.ScraperPuppeter(section)


    
        for (let i = 0; i < data.length; i++) {
            
            const news = await new ArticlesNews({
                author:data[i].author,
                title: data[i].title,
                titleSection:Utils.removeAccents(data[i].titleSection),
                country:'',
                description:data[i].description ,
                urlImage: data[i].urlImage,
                sobre: data[i].sobre,
                publishedAt:data[i].publishedAt,
                urlContendDetail:data[i].urlContend,
                contenido:'',
                source: data[i].source
            })
    
    
          await  ArticlesNews.findOne({title:data[i].title},(error,noticia)=>{
                    if(error){ console.log(`error en la buscada ${error}`) }
                    if(!noticia){ 
                        
                        news.save(  (err, respuesta)=>{
                            if(err){console.log(err)}
                            console.log(respuesta)
                        })
                    }else{
                        console.log('la noticias ya existe')
                    }
            })
            
        }


    // res.status(200).send(data)

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