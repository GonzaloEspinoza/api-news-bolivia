const ModelArtitlesNews=require('../../../database/collections/articlesNews')

function showNews(req, res, next){


    console.log(req.params)

    const source=req.params.source;  //pusde ser 'el deber', ' correo del sus' tetc
    const section=req.params.section;


   
    ModelArtitlesNews.find({author:req.params.source, titleSection:req.params.section},(err, articles)=>{

        res.send({articles})

    })

    // .limit(3).sort('-1')

    // res.send(req.params)  
}



module.exports={
    showNews
}