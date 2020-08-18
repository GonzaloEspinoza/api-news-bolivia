

const axios = require('axios');


const f=()=>{

    var config = {
      method: 'post',
      url: 'https://feurl.com/api/source/08d8rhl0p-28e61',
    //   headers: { 
    //     'Cookie': '__cfduid=dd5a3342ea7eaac34b35d952d256ee0651593289066'
    //   }
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

f();