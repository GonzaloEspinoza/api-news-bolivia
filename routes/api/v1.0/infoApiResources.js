
function infoApiResources (req, res){


    const infoAPI=[
        {
            'el deber':'todos los recursos de este periodico',
            enpoints:{
                resource:'el deber',
                section:'santa-cruz, país, economia, mundo',
                host:'http://localhost:7000',
                example:'http://localhost:7000/show/noticias/source=el%20deber&section=pais'

            }
        },
        {
            'correo del sur':'todos los recursos de este periodico digital',
            enpoints:{
                resource:'correo del sur',
                section:'local, sociedad, politica, seguridad, economia, mundo',
                host:'http://localhost:7000',
                example:'http://localhost:7000/show/noticias/source=correo%20del%20sur&section=pilitica'

            }
        },{
            'ULPload data news':'links para la actualizacion de los datos (noticias)'
        },{

            name:'El deber',
            url:'https://eldeber.com.bo',
            section:'santa cruz, país, economia, mundo',
            remenber: ['https://eldeber.com.bo/santa-cruz','https://eldeber.com.bo/pais','https://eldeber.com.bo/economia','https://eldeber.com.bo/mundo'],
            scraping:[
                'endpoint --> /scraping/news/upload/eldeber',
                'enpoint directo -->  http://localhost:7000/scraping/upload/eldeber/radio/ '
            ]

        },{

            name:'correo del sur',
            url:'https://correodelsur.com/',
            section:'local, sociedad, politica, seguridad, economia, mundo',
            remenber: [
                    'https://correodelsur.com/local',
                    'https://correodelsur.com/sociedad',
                    'https://correodelsur.com/politica',
                    'https://correodelsur.com/seguridad',
                    'https://correodelsur.com/economia',
                    'https://correodelsur.com/mundo',
                    'https://correodelsur.com/cultura'
            ],
            scraping:[
                'endpoint --> http://localhost:7000/scraping/news/upload/correodelsur',
                'enpoint directo -->  /scraping/upload/correodelsur/radio '

            ]

        },{

            name:'El Potosi',
            url:'https://elpotosi.net',
            section:'local, nacional, mundo, deporte',
            remenber: ['https://eldeber.com.bo/santa-cruz','https://eldeber.com.bo/pais','https://eldeber.com.bo/economia','https://eldeber.com.bo/mundo'],
            scraping:[
                'endpoint --> http://localhost:7000/scraping/news/upload/elpotosi',
                'enpoint directo -->  no tiene radio '
            ]

        }

    ]

    
    res.send({'recursos de esta Api':infoAPI})
}





module.exports={
    infoApiResources
}