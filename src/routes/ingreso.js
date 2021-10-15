import routerx from 'express-promise-router';
import IngController from '../controllers/ingreso';
import auth from '../middlewares/auth';

const app = routerx();
//post
app.post('/add', auth.verifyAlma, IngController.add );
//get
app.get('/quiery', auth.verifyAlma, IngController.query);
app.get('/list', auth.verifyAlma, IngController.list);
app.get('/grafanual', auth.verifyUser, IngController.grafAnual);
app.get('/consulFecha', auth.verifyUser, IngController.consultFecha );
//put
app.put('activate', auth.verifyAlma, IngController.activate);
app.put('/desactivate', auth.verifyAlma, IngController.desactivate);


export default app;