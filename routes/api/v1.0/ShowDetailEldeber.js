'use strict'

const Detail = require('../../../database/collections/detailArticles')


async function ShowDetail (req, res){
    const Section= req.params.section;

    if(Section){
        
        const detailsArticles =await Detail.find({titleSection:Section}).exec();
        res.status(200).send({detailsArticles})
    }
}



module.exports = {
    ShowDetail
}