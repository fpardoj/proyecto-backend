import tokenServer from '../services/token';

let verifyUser = async (req, res, next) => {
    //valida si se encuentra o no un token definido.
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error NO se tiene un token - user"
        });
    }
    //en caso de que si exista un token definido se procede a realizar la busqueda en la base de datos.
    const resp = await tokenServer.decode(req.headers.token)
    //se valida si el usuario puede ingresar o no a la pagina.
    if (resp.rol == 'Administrador'|| res.rol == 'Vendedor' || resp.rol == 'Almacenero') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

let verifyUserAdmin = async (req, res, next) => {
    //valida si se encuentra o no un token definido.
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error NO se tiene un token - user"
        });
    }
    //en caso de que si exista un token definido se procede a realizar la busqueda en la base de datos.
    const resp = await tokenServer.decode(req.headers.token)
    //se valida si el usuario puede ingresar o no a la pagina.
    if (resp.rol == 'Administrador') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

let verifyUserVend = async (req, res, next) => {
    //valida si se encuentra o no un token definido.
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error NO se tiene un token - user"
        });
    }
    //en caso de que si exista un token definido se procede a realizar la busqueda en la base de datos.
    const resp = await tokenServer.decode(req.headers.token)
    //se valida si el usuario puede ingresar o no a la pagina.
    if ( resp.rol == 'Administrador'|| res.rol == 'Vendedor' ) {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

let verifyAlma = async (req, res, next) => {
    //valida si se encuentra o no un token definido.
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error NO se tiene un token - user"
        });
    }
    //en caso de que si exista un token definido se procede a realizar la busqueda en la base de datos.
    const resp = await tokenServer.decode(req.headers.token)
    //se valida si el usuario puede ingresar o no a la pagina.
    if (resp.rol == 'Administrador'|| resp.rol == 'Almacenero') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

export default{
    verifyAlma,
    verifyUser,
    verifyUserAdmin,
    verifyUserVend
}