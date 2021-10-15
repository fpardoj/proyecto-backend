import routerx from 'express-promise-router';
import UsController from '../controllers/usuario';
import {check} from 'express-validator';
import valid from '../middlewares/valid-campos';
import auth from '../middlewares/auth';

const app = routerx()

//post
app.post('/add',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty,
    check('email', ' El correo no es valido').isEmail(),
    check('password', 'El password debe tener mas de 5 caracteres').isLength({min: 5, max: 16}),
    valid.validCampos,
    auth.verifyUserAdmin
], UsController.add);
app.post('/login', auth.verifyUserAdmin, UsController.login);

//get
app.get('/query', auth.verifyUserAdmin,  UsController.query);
app.get('/list', auth.verifyUserAdmin,  UsController.list);

//put
app.put('/update', auth.verifyUserAdmin,  UsController.update);
app.put('/activate', auth.verifyUserAdmin,   UsController.activate);
app.put('/desactivate', auth.verifyUserAdmin,  UsController.desactivate);

//delate
app.delete('/remove', auth.verifyUserAdmin,  UsController.remove);

export default app;

