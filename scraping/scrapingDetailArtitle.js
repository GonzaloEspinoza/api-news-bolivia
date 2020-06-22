'use strict'

const pupperter = require('puppeteer');
const Articles = require('../database/collections/articlesNews')
const DetailArticles = require('../database/collections/detailArticles')



async function DetailArtitle(req, res){
    console.log('arrive request to get detail el deber')
    const idArticle = req.params.id; 
    const Author = 'el deber';
    const section = 'pais';

    const datos = await Articles.find({author:Author, titleSection:section}).exec()
    // console.log(datos)

    if(!datos.length) {res.send({message:'no hay datos  para realizar el scraping'})}

    
    const result = (async(datos)=>{
        console.log(datos.length)
          try {
            const browser = await pupperter.launch();
            const page = await browser.newPage();

            var articulos =new Array();

            for (let i = 0; i < datos.length; i++) {
                console.log(datos[i].urlContendDetail)
                await page.goto(datos[i].urlContendDetail);
                // await page.screenshot({path:'detailEldeber.png'});
                
                let data = await page.evaluate(()=>{
    
                    const title = document.querySelector('.wrapper.detail .text h1').innerText;
                    const imgDetail = document.querySelector('.wrapper.detail .media img').src;
                    const contentDetail = [...document.querySelectorAll('.wrapper.detail .content-aside .textoPlanazo p')].map((d,i)=>d.textContent);
    
                    const info = {
                        // idArticle : datos[i]._id,
                        // urlFuente: datos[i].urlContendDetail,
                        title : title,
                        urlImage : imgDetail,
                        detail : contentDetail
    
                    }
                    
                    return info
                })
                // console.log(data)
                data={...data,idArticle:datos[i]._id,fuente:datos[i].urlContendDetail, author:datos[i].author, titleSection:datos[i].titleSection}
                articulos=[...articulos,data]


            }
            
            console.log('articulos obetenidos')
            console.log(articulos.length)
            if(articulos.length){

                SaveDataScrapingDetail(articulos)
            }
            browser.close()


          } catch (error) {
              console.log('error scraping el deber deatail');
              console.log(error)
          }



        })(datos)

    

}



async function SaveDataScrapingDetail(datos){

   for (let i = 0; i < datos.length; i++) {
       const obJDetail = new DetailArticles({
            idArtitcle: datos[i].idArticle,
            urlFunte: datos[i].fuente,
            author:datos[i].author,
            titleSection:datos[i].titleSection,
            title:datos[i].title,
            urlImage:datos[i].urlImage,
            conetent: datos[i].detail
       })

       obJDetail.save((err,response)=>{
           if(err){console.log({err:'no se guardo el dato del detalle '})}
            console.log(response._id)
       })
       
   }

}



module.exports = {
    DetailArtitle
}