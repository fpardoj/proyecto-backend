//archivo donde se hace gestion de todas las rutas.
import routerx from 'express-promise-router';
import Categoria from './categoria';
import Articulo from './articulo';
import Usuario from './usuario';
import Persona from './persona';
import Venta from './venta';
import Ingreso from './ingreso'
const router = routerx();

router.use('/articulo', Articulo);
router.use('/Categoria', Categoria);
router.use('/usuario', Usuario);
router.use('/persona', Persona);
router.use('/venta',Venta)
router.use('/ingreso', Ingreso)
export default router;