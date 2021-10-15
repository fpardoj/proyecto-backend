// en este archivo se crean las rutas que son funciones que hara nuestro servidor
import ArtController from '../controllers/articulo';
import routerx from 'express-promise-router';
import auth from '../middlewares/auth';

const app = routerx();

//get
app.get('/query', auth.verifyAlma, ArtController.query);
app.get('/queryCodigo', auth.verifyUser, ArtController.queryCodigo);
app.get('/list',auth.verifyAlma, ArtController.list);

//post
app.post('/add', auth.verifyAlma, ArtController.add);

//put
app.put('/update', auth.verifyAlma, ArtController.update);
app.put('/activate', auth.verifyAlma, ArtController.activate);
app.put('/desactivate', auth.verifyAlma,ArtController.desactivate);

//delate
app.delete('/remove', auth.verifyAlma,ArtController.remove);


export default app;