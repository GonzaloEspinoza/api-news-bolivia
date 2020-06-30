const ArticlesNews = require('../database/collections/articlesNews')
const scraper = require('./scrapingCorreoSur')

const Radio = require('../database/collections/radioNews')

async function UpdateScraperCorreoSur(req, res) {

    const parametre = req.params.section;

    // ArticlesNews.deleteMany({author:'correo del sur'},(err,datos)=>{
    //     if(err){console.log('dError al eliminar los datos')}
    //     if(datos){console.log('Se eliminaron los datos, listo para actulizar la listas nueva informacion')}
    // })

    const sections = ['local','sociedad','politica','mundo','deporte'];

    for (let i = 0; i < sections.length; i++) {

        const data = await scraper.scrapingCorreoSur(sections[i])

        for (let j = data.length-1; j>=0; j--) {
            const news =await new ArticlesNews({
                author:data[j].author,
                title: data[j].title,
                titleSection:data[j].titleSection,
                country:'',
                description:data[j].description ,
                urlImage: data[j].urlImage,
                sobre: data[j].sobre,
                publishedAt:data[j].publishedAt,
                urlContendDetail:data[j].urlContentDetail,
                contenido:'',
                source: data[j].source
            })
    
    
           await ArticlesNews.findOne({title:data[j].title,titleSection:sections[i]},(error,noticia)=>{
                    if(error){ console.log(`error en la buscada ${error}`) }
                    if(!noticia){ 
                        
                        news.save((err, respuesta)=>{
                            if(err){console.log(err)}
                            console.log(respuesta.title)
                        })
                    }else{
                        console.log('la noticias ya existe')
                    }
            })
    
            
        }
        
    }
    
   


    res.status(200).send({message:'scraping exitoso a correo del sur'})

}



// ScrapingEllDeberRadio

async function uploadScrapingRadioCorreoSur(req, res){


  const data= await  scraper.scrapingRdioCorreoDelSur()

    const newRadio = new Radio({
        title:data.title,
        urlRadio:data.urlRadio,
        urlImgRadio:data.urlImgRadio,
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

    // res.status(200).send(data)
}






module.exports = {
    UpdateScraperCorreoSur,
    uploadScrapingRadioCorreoSur
}