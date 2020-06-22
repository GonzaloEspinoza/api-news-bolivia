'use strict'
const ScrapingElPotoi = require('./ScrapingElPotosi')
const ArticlesNews = require('../database/collections/articlesNews')
const Utils = require('../utils/removeAcentos')

async function UploadScrapingElPotosi(req, res){

    const Sections = ['local','nacional','mundo','deporte']
    
    for (let i = 0; i < Sections.length; i++) {
        const element = Sections[i];
        console.log(element)

        // ArticlesNews.deleteMany({author:'el potosi', titleSection:Sections[i]},(err,datos)=>{
        //     if(err){console.log('dError al eliminar los datos')}
        //     if(datos){console.log('Se eliminaron los datos, listo para actulizar la listas nueva informacion')}
        // })
        
        const data = await ScrapingElPotoi.ScrapingElPotosi(Sections[i]);

        for (let j = 0; j < data.length; j++) {
            const news = await new ArticlesNews({
                author:data[j].author,
                title: data[j].title,
                titleSection:Utils.removeAccents(data[j].titleSection),
                country:'',
                description:data[j].description ,
                urlImage: data[j].urlImage,
                sobre: data[j].sobre,
                publishedAt:data[j].publishedAt,
                urlContendDetail:data[j].urlContend,
                contenido:'',
                source: data[j].source
            })
    
    
            await  ArticlesNews.findOne({title:data[j].title, titleSection:Sections[i]},(error,noticia)=>{
                        if(error){ console.log(`error en la buscada ${error}`) }
                        if(!noticia){ 
                            
                            news.save(  (err, respuesta)=>{
                                if(err){console.log(err)}
                                console.log(respuesta.title)
                            })
                        }else{
                            console.log('la noticias ya existe')
                        }
                })
            
        }
        
    }

    res.status(200).send({message: 'scraping a el potosi realizado exitosamente'})

}


module.exports = {
    UploadScrapingElPotosi
}