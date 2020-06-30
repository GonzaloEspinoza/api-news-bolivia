'use strict'

var axios = require('axios');


function SendMessageFirebase(){


    const obj={
                to:"dC-uy3_Cs2E:APA91bFqHJ6hYpnBjgbUXQCNmJAfiNdb5J0U4A-uJYcOD1K7sbthe0Am9TP4zByBqfSjllWc0NeeLVfyWlAdzYYC2dtLNJ2nuzkKx73d73vw7Edmxsn7aSHTw5nuGMT8C9S1IBuW6K83",
                notification:{
                    title:"Actualizamos nuestra información",
                    image:'https://static.eldeber.com.bo//Files/Sizes/2020/6/21/lucha-contra-el-covid-19-en-tarija_719621013_380x260.jpg',
                    body:"Mira los ultima acontesimientos sucedidos",
                    color:'red',
                    
                },
                data:{
                    comida:"comida desde postman",
                    name: "tody",
                    direccion: "strict salta"
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
      data : data
    };
    
    axios(config)
    .then(function (response) {
        console.log(response.data)
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}




module.exports={
    SendMessageFirebase
}
