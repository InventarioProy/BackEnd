import routerx from "express-promise-router";
import categoriRouter from './categoria';
import usuarioRouter from './usuario';
import productoRouter from './producto';
import personaRouter from './persona';
import ingresoRouter from './ingreso';
import salidaRouter from './salida';
import marcaRouter from './marca';

const router =routerx();

router.use('/usuario',usuarioRouter);
router.use('/salida',salidaRouter);
router.use('/ingreso',ingresoRouter);
router.use('/producto',productoRouter);
router.use('/categoria',categoriRouter);
router.use('/marca',marcaRouter);
router.use('/persona',personaRouter);
export default router;