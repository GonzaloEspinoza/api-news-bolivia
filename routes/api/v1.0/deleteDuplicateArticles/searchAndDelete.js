'use strict'
const Articles = require('../../../../database/collections/articlesNews');

async function SearchArticles(){

  const articulos = await  Articles.find({author:'el deber',titleSection:'pais'}).sort({createdDate:-1}).skip(0).limit(25);

  if(articulos){
    articulos.forEach( async i => {
        const existe = await Articles.find({author:i.author,titleSection:i.titleSection,title:i.title}).exec();
        if(existe.length>1){
            const del=await Articles.deleteOne({_id:existe[1]._id});
            if(del){
                console.log('replica eliminada')
                // console.log(del.title)
            }
        }
    });
  }

}



module.exports = {
    SearchArticles
}