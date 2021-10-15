import jwt from 'jsonwebtoken';
import models from '../models/models';

//funcion que genera el token para nuestros usuarios.
async function checkToken(token){
    let data = null;
    try {
        const {_id}= await jwt.decode(token);
        data = _id;
    } catch (e) {
        return false;
    }
    const user = await models.Usuario.findOne({_id:data, estado:1})
    if (user) {
        const token = await jwt.sign({_id:data}, 'audulbdubublyiandkjlhufg',{expiresIn: '1d'} )
        return {token, rol: user.rol}
    } else {
        return false;
    }
}

//logica de encode = codificar y llave secreta de generacion.
let encode = async (_id) =>{
    const token = await jwt.sign({_id: _id}, 'audulbdubublyiandkjlhufg', {expiresIn: '1d'})
}

//logica de descodificar = decode y llave secreta de generacion
let decode = async (token) =>{
    try {
        const {_id} = await jwt.verify(token, 'audulbdubublyiandkjlhufg')//la cadena de texto se usa para utilizar y definir el token
        const user = await models.Usuario.findOne({_id, estado:1})//el "1" en el estado significa que el usuario se encuentra activo.
        if (user) {
            return user
        } else {
            return false;
        }
    } catch (e) {
        const newToken = await checkToken(token)
        return newToken;
    }
}


export default{
    encode,
    decode
}