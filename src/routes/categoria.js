// se importan los metodos definidos en la carpeta controller en 
import routerx from 'express-promise-router';
import CatController from '../controllers/categoria';
import auth from '../middlewares/auth';

const app = routerx();
//post
app.post('/add',auth.verifyAlma, CatController.add);
//get
app.get('/quiery', auth.verifyAlma, CatController.query);
app.get('/list', auth.verifyAlma, CatController.list);
//put
app.put('/update', auth.verifyAlma, CatController.update);
app.put('activate', auth.verifyAlma, CatController.activate);
app.put('/desactivate', auth.verifyAlma, CatController.desactivate);
//delete
app.delete('/remove', auth.verifyAlma, CatController.remove);

export default app;