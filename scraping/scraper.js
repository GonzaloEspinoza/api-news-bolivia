const cheerio = require('cheerio')
// const axios = require('axios')
const request = require('request')
const puppeteer = require('puppeteer')



// ::::::: pupperter for scrapin::::::::::::::::::::::

 

  function ScraperPuppeter (str){
    
    const parametre = str

    const urlElDeber = `https://eldeber.com.bo/${parametre}`;

   const result= (async()=>{
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(urlElDeber);
            // const html = await page.content();
            // console.log(html)
            // await page.waitFor(5000)
            await page.screenshot({path: 'example.png'});
            let data = await page.evaluate(()=>{

                const title= [
                    ...document.querySelectorAll('.nota.linked .text')
                ].map((d,i)=>d.querySelector('h2').textContent)

                const urlImage = [
                    ...document.querySelectorAll(".progressive")
                ].map((d,i)=>d.querySelector('.loadingImage').dataset.image)
                
                const description = [
                    ...document.querySelectorAll(".nota.linked .text")
                ].map((d,i)=>d.querySelector('p').textContent)

                // sobre, ouede ser pais, departamento, u otro tema
                const sobre = [
                    ...document.querySelectorAll(".nota.linked .text")
                ].map((d,i)=>d.querySelector('h4').textContent.toLocaleLowerCase().trim())

                const publishedAt = [
                    ...document.querySelectorAll('.nota.linked .text')
                ].map((d,i)=>d.querySelector('.date').textContent)
                
                const urlContend = [
                    ...document.querySelectorAll('.nota-link')
                ].map((d,i)=>d.href)

                const source ={
                    name:document.title,
                    url:document.URL
                }

                const titleSection = document.querySelector('.section-title h2').textContent.toLocaleLowerCase().trim()


                const objetoNocias=[
                    'author',
                    'title',
                    'description',
                    'urlImage',
                    'sobre',
                    'publishedAt',
                    'urlConten'
                ]

                const articles =new Array
                for (let i = 0; i < title.length; i++) {
                    const element = {
                        author:'el deber',
                        title:title[i],
                        titleSection:titleSection,
                        description:description[i],
                        urlImage:urlImage[i],
                        sobre:sobre[i],
                        publishedAt:publishedAt[i],
                        urlContend:urlContend[i],
                        source:source
                    }

                    articles[i]=element
                }


                return articles
            })
            
            console.log(data)
            await browser.close()
            return data
            

        } catch (error) {
            console.log('error scraping')
            console.log(error)
        }

    })()

    return result

}



// ::::::::::: radio el deber :::::::::::

 function ScrapingPuppeterRadioElDeber (){

    const urlElDeberRdio = `https://eldeber.com.bo/eldeberradio`;

   const result= (async () =>{
        const browser2 = await puppeteer.launch();
        const page2 = await browser2.newPage();
        await page2.goto(urlElDeberRdio);
        await page2.screenshot({path: 'elDeberRadio.png'})
        let data = await page2.evaluate(()=>{

            const source ={
                name:document.title,
                url:document.URL
            }

            const urlRadioElDeber = document.querySelector('video source').src;

            const title = document.title


            const objetoRadio ={
                title:'el deber',
                urlRadioElDeber: urlRadioElDeber,
                source: source
            }

            return objetoRadio
            
        })
        
        console.log(data)

        await browser2.close();
        return data;
    
    })();

    return result
}



module.exports ={
    ScraperPuppeter,
    ScrapingPuppeterRadioElDeber
}


// apuntes

// document.querySelectorAll(".holder")

// "("https://static.eldeber.com.bo//Files/Sizes/2020/5/11/imagen-referencial_57345704_760x520.jpeg")"

// var url = url.substr(url.indexOf('("')+2,url.indexOf('")')-2)

// card[0].querySelector('.overlay').style.backgroundImage

// [...document.querySelectorAll(".image.progressive")].map((d,i)=>d.querySelector('.overlay').style.backgroundImage)