'use strict'

const puppeteer = require('puppeteer');

// secciones que recibe ['local',Nacional','mundo', 'deportes']

function ScrapingElPotosi (str){
    // console.log(str)
    const section=str ? str:'local';

    console.log(section)
    const URL = `https://elpotosi.net/${section}`;

  const resutl = (async()=>{
        try {
            
            console.log({message:`Ejecutando Scraping a el potosi -->${URL}`})
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(URL);
            await page.screenshot({path: 'elPotosi.png'});

            let data = await page.evaluate(()=>{

                var CantidadImag=[...document.querySelectorAll('.card-note.main-section  img')].map(i=>i.src);
                
                if(CantidadImag && CantidadImag.length>1){
                    document.querySelector('.card-note.main-section img').remove();
                }
                if(CantidadImag && CantidadImag.length==0){
                    document.querySelector('.card-note.main-section').remove();
                }


                const titles = [...document.querySelectorAll('.col-md-8 .card-note .title-note')].map((d,i)=>d.textContent);
                const urlImages =[...document.querySelectorAll('.col-md-8 .card-note img')].map((d,i)=>d.src);
                const urlDetail = [...document.querySelectorAll('.col-md-8 .card-note a')].map((d,i)=>d.href); 
                const description = [...document.querySelectorAll('.col-md-8 .card-note .description-note')].map((d,i)=>d.textContent.trim());
                const fechaPublicacion = [...document.querySelectorAll('.col-md-8 .card-note .fecha')].map((d,i)=>d.textContent.trim());
                const titleSection = document.title.toLocaleLowerCase();
                const source = {
                    name: 'el potosi',
                    url: document.URL
                }


                const articles = new Array
                for (let i = 0; i < titles.length; i++) {
                    const element = {
                        author:'el potosi',
                        title:titles[i],
                        titleSection:titleSection,
                        description:description[i],
                        urlImage:urlImages[i].replace('_360','_840'),
                        sobre:titleSection,
                        publishedAt:fechaPublicacion[i],
                        urlContend:urlDetail[i],
                        source:source
                    }

                    articles[i]=element;
                }
                
                return articles
            })

            console.log({OK: `${data.length} articulos obtenidos --> ${URL}`})
            // console.log(data)

            await browser.close();
            return data

        } catch (error) {
            console.log({error:`Error al realizar el scraping --> ${URL}`})
            console.log(error)
        }
     
    })()

    return resutl

}



module.exports = {
    ScrapingElPotosi
}