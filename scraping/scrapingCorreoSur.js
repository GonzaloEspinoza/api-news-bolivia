const puppeteer = require('puppeteer')


async function scrapingCorreoSur(str){

    const parametre = str;
    // host: https://correodelsur.com/
    // rutas a las puede hacer scraping: sociedad, politica, seguridad, economia, mundo, deportes

    const urlCorreSur=`https://correodelsur.com/${parametre}`;
                        // https://correodelsur.com/local
  const result=  ( async( )=> {
        console.log(`Realizando scraping -->  ${urlCorreSur}`);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlCorreSur);
        await page.screenshot({path: 'correoDelSur.png'});
        const data=await page.evaluate(()=>{

            var cantidadDeImagenes = [...document.querySelectorAll('.card-note.main-section img')].map(i=>i.src);
            if(cantidadDeImagenes && cantidadDeImagenes.length>1){
                document.querySelector('.card-note.main-section img').remove();
            };
            if(cantidadDeImagenes && cantidadDeImagenes.length==0){
                document.querySelector('.card-note.main-section').remove();
            };


            const titleSection = document.querySelectorAll('.section-name')[0].textContent.toLocaleLowerCase();

            const source={
                name:'correo del sur',
                url: document.URL
            }

            const urlImage=[
                ...document.querySelectorAll('.row .card-note img')
            ].map((d,i)=>d.src)

            const urlContentDetail = [
                ...document.querySelectorAll('.row .card-note a')
            ].map((d,i)=>d.href)

            const title = [
                ...document.querySelectorAll('.row .card-note .title-note')
            ].map((d,i)=>d.textContent)

            const descriptions = [
                ...document.querySelectorAll('.row .card-note .description-note')
            ].map((d,i)=>d.textContent.trim())

            const dates =[
                ...document.querySelectorAll('.row .card-note .fecha-version .fecha')
            ].map((d,i)=>d.textContent.trim())


            const articles =new Array
            for (let i = 0; i < title.length; i++) {
                const element = {
                    author:'correo del sur',
                    title:title[i],
                    titleSection:titleSection,
                    description:descriptions[i],
                    urlImage:urlImage[i]?urlImage[i].replace('_10','_840'):'',
                    sobre:titleSection,
                    publishedAt:dates[i],
                    urlContentDetail:urlContentDetail[i],
                    source:source
                }

                articles[i]=element
            }




            return articles
        })

        console.log(`OK: ${data.length} articulos obtenidos de --> ${urlCorreSur}`);
        // console.log(data)
        await browser.close()
        return data
        
    })()
    
    return result
}


// extarer la url de la radio de correo del sur

function scrapingRdioCorreoDelSur(){

    const urlCorreoDelSurRdio = `https://correodelsur.com/`;

   const result= (async()=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlCorreoDelSurRdio);

        const data = await page.evaluate(()=>{


            const radioCorreoDelSur ={
                title: 'correo del sur radio',
                urlRadio:document.querySelector('audio source').src,
                urlImgRadio:document.querySelector('#radio-suscripciones img').src,
                source:{
                    name:'correo del sur',
                    url:document.URL
                }
            }

            return radioCorreoDelSur
        })
        
        console.log(data)
        await browser.close();
        return data;

    })()
    return result;
}




module.exports ={
    scrapingCorreoSur,
    scrapingRdioCorreoDelSur
}