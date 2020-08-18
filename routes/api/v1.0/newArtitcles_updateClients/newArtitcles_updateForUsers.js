'use strict'
const Article = require('../../../../database/collections/articlesNews');

const NewArticle= async(req, res, next)=>{

    // console.log(JSON.parse(req.body.articles))

    var data =await JSON.parse(req.body.articles)
    // console.log(data.length)
    if(data.length>0){
        for (let i = data.length-1; i>=0; i--) {
            var newData = new Article({
                author:data[i].author,
                title:data[i].title,
                titleSection:data[i].titleSection,
                description:data[i].description,
                urlImage:data[i].urlImage,
                sobre:data[i].sobre,
                publishedAt:data[i].publishedAt,
                urlContend:data[i].urlContend,
                source:{
                        name:data[i].source,
                        url:data[i].url
                }
            })

            const artitle = await Article.findOne({title:data[i].title, titleSection:data[i].titleSection}).exec();
            if(!artitle){
                const saved = await newData.save();
                if(!saved){
                    console.log('noticia nueva ->',saved.title)
                }
                
            }
            else{
                console.log('noticia existente ->', data[i].title)
            }
        }
    }


    res.send({message:'new artitle ok'})

}


module.exports = {
    NewArticle
}