const ModelArtitlesNews=require('../../../database/collections/articlesNews')

function showNews(req, res, next){


    console.log(req.params)

    const source=req.params.source;  //pusde ser 'el deber', ' correo del sus', etc... 
    const section=req.params.section;


    // console.log(source,section)
   
    ModelArtitlesNews.find({ author:req.params.source, titleSection:req.params.section},(err, articles)=>{

        // if(articles.length>0){

        //     var result=new Array;
        //     console.log(result)
        //     for (let i = 0 ; i < articles.length  ; i++) {
        //         result=[ articles[i],...result,]
        //     }
        // }
        // console.log(articles.length)
        // if(err)console.log(err)
        res.send({articles})

    })
    .sort({createdDate:-1})
    .skip(0)
    .limit(25)

    // res.send(req.params)  
}



module.exports={
    showNews
}