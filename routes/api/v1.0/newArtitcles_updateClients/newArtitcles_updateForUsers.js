'use strict'
const axios = require('axios');
const Article = require('../../../../database/collections/articlesNews');
const TokenUser = require('../../../../database/collections/token_Users');

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
                urlContendDetail:data[i].urlContend,
                source:{
                        name:data[i].name,
                        url:data[i].url
                }
            })

            const artitle = await Article.findOne({title:data[i].title, titleSection:data[i].titleSection}).exec();
            if(!artitle){
                const saved = await newData.save();
                if(saved){
                    console.log('noticia nueva ->',saved.title);
                    const Tokens = await TokenUser.find({}).exec();
                    if(Tokens.length==0)return null;
                    Tokens.forEach(iten =>{saved.desciption,
                        SendAllPushNotification(iten.tokenUser,saved.title, saved.desciption,saved.urlImage);
                    })

                }
                
            }
            else{
                console.log('noticia existente ->', data[i].title)
            }
        }
    }


    res.send({message:'new artitle ok'})

}



// function for send notification::::::::::::::::::::

const SendAllPushNotification = ( tokenUser, title, desciption, urlImage ) => {
    
    const obj = {
        to: tokenUser,
        notification: {
            title: title,
            image: urlImage,
            body: desciption,
            color: 'red',
        },
        data: {
            comida: "server noticias bolivai",
            name: "hire data"
            
        }
    };

    var data = JSON.stringify(obj);

    var config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Authorization': 'key=AAAA75XbjC8:APA91bErhgAYtoP2nGa98schQys0v0zyyySV-fMNy7zOnEbowQvHXKTy9O-5R3RrSHz4GJKdDOkPgQ0Sg2gld4MZBHuswDZSqWsx2ZyKlmJrHtGqsmNti1ch2CZi6vRVn4OI2A1WO1yT',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}



module.exports = {
    NewArticle
}

