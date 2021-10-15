import routerx from 'express-promise-router';
import persona from '../controllers/persona';
import PerController from '../controllers/persona';
import auth from '../middlewares/auth';

const app = routerx();
//post
app.post('/add', auth.verifyUser, PerController.add);
//get
app.get('/quiery', auth.verifyUser,  PerController.query);
app.get('/list', auth.verifyUser,  PerController.list);
app.get('/listClientes', auth.verifyUser,  PerController.listcliente);
app.get('/listProveedores', PerController.listProveedor);
//put
app.put('/update', auth.verifyUser,  PerController.update);
app.put('activate', auth.verifyUser,  PerController.activate);
app.put('/desactivate', auth.verifyUser,  PerController.desactivate);
//delete
app.delete('/remove', auth.verifyUser,  PerController.remove);

export default app;