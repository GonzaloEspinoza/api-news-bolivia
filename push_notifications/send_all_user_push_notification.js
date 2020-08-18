'use strict'

const axios = require('axios');
const Artitles = require('../database/collections/articlesNews');
const Token = require('../database/collections/token_Users');
// const { SendMessageFirebase } = require('./firebase_condig_push_Notification');



const SearchArtticleSendPushNot= async()=>{
    
    const tokenUsers = new Array;
    const articles = await Artitles.find({author:'el deber', titleSection:'pais'})
                            .sort({createdDate:-1})
                            .limit(6)
                            .exec();
    
    console.log(articles[0].title)

    const tokens = await Token.find({}).exec();
    if(tokens.length==0)return null
    
    console.log(tokens)
    tokens.forEach(iten => {
        // SendAllPushNotification(iten.tokenUser,articles[4].title, articles[4].description, articles[4].urlImage)
        // SendAllPushNotification(iten.tokenUser,articles[3].title, articles[3].description, articles[3].urlImage)
        SendAllPushNotification(iten.tokenUser,articles[2].title, articles[2].description, articles[2].urlImage)
        SendAllPushNotification(iten.tokenUser,articles[1].title, articles[1].description, articles[1].urlImage)
    });

}




const SendAllPushNotification = ( tokenUser, title, desciption, urlImage ) => {

    // if(!token || !title || !urlImage){
    //     return ''
    // }
    console.log(tokenUser,'---------------')
    console.log(urlImage,'---------------')
    console.log(title,'---------------')

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
            // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
    // SendAllPushNotification,
    SearchArtticleSendPushNot
}