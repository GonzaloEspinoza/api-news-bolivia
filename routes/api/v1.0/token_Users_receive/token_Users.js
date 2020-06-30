'use strict'
const Token = require('../../../../database/collections/token_Users');

const ReceiveTokenUser=async(req, res)=>{

    if(!req.params.token) return res.status(400).send('required token');

    const token =  new Token({
        tokenUser: req.params.token
    })

    const data = await Token.findOne({tokenUser:req.params.token}).exec();
    if(!data){
        token.save((err,data)=>{
            if(err){
                console.log('error al guardar el token del usuario');
                return null;
            };
            if(data){
                console.log(data);
                res.status(200).send('token save succes');
                return null
            }
        })
    }
    if(data){

        res.status(400).send('el token ya existe');
    }


}



module.exports={
    ReceiveTokenUser
}