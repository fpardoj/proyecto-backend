import routerx from 'express-promise-router';
import VentController from '../controllers/venta';
import auth from '../middlewares/auth';

const app = routerx();
//post
app.post('/add', auth.verifyUserVend, VentController.add );
//get
app.get('/quiery', auth.verifyUserVend, VentController.query);
app.get('/list', auth.verifyUserVend, VentController.list);
app.get('/grafanual', auth.verifyUser, VentController.grafAnual);
app.get('/consulFecha', auth.verifyUser, VentController.consultFecha );
//put
app.put('activate', auth.verifyUserVend, VentController.activate);
app.put('/desactivate', auth.verifyUserVend, VentController.desactivate);


export default app;