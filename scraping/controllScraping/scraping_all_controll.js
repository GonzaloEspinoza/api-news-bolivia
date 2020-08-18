'use strict'
const axios = require('axios');
const ScrapingUploadEldeber = require('../UploadScraper');
const ScrapinUpdateElPotosi = require('../UploadScrapingElPotosi');
const ScrapingUpdateCorreoDelSur = require('../UploadScraperCorreoSur');

const ControlScrapingEldeber = async (numeroDePeticiones=0)=>{
  
    try {
        console.log('iniciando scraping el Deber...')
        ScrapingUploadEldeber.UpdateScraper(1,2);
        console.log('scraping ejecutada exitosamente');
    } catch (error) {
        console.log(error);
        if(numeroDePeticiones>2){
            return '';
        }
        console.log(`volviendo a ejecutart el scraping el deber ${numeroDePeticiones}`);
        ControlScrapingEldeber(numeroDePeticiones+1);
    }

}

const ControlScrapingElPotosi = async (numeroDePeticiones=0)=>{
  
    try {
        console.log('iniciando scraping el Potos...')
        ScrapinUpdateElPotosi.UploadScrapingElPotosi(1,2)
        console.log('scraping ejecutada exitosamente');
    } catch (error) {
        console.log(error);
        if(numeroDePeticiones>2){
            return '';
        }
        console.log(`volviendo a ejecutart el scraping el potosi ${numeroDePeticiones}`);
        ControlScrapingEldeber(numeroDePeticiones+1);
    }

}

const ControlScrapingCorreoDelSur = async (numeroDePeticiones=0)=>{
  
    try {
        console.log('iniciando scraping Correo del sur...')
        
        ScrapingUpdateCorreoDelSur.UpdateScraperCorreoSur(1,2);    
        console.log('scraping ejecutada exitosamente');
    } catch (error) {
        console.log(error);
        if(numeroDePeticiones>2){
            return '';
        }
        console.log(`volviendo a ejecutart el scraping corroe del sur ${numeroDePeticiones}`);
        ControlScrapingEldeber(numeroDePeticiones+1);
    }

}

module.exports={
    ControlScrapingEldeber,
    ControlScrapingElPotosi,
    ControlScrapingCorreoDelSur
}