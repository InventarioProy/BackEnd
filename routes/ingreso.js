import routerx from 'express-promise-router';
import ingresoController from '../controllers/IngresoController';

const router=routerx();
router.post('/add',ingresoController.add);
router.get('/query',ingresoController.query);
router.get('/queryCodigo',ingresoController.queryCodigo);
router.get('/list',ingresoController.list);
router.get('/consultaFechas',ingresoController.consultaFechas);
router.get('/grafico12meses',ingresoController.grafico12Meses);
// router.put('/update',ingresoController.update);
// router.delete('/remove',ingresoController.remove);
router.put('/activate',ingresoController.activate);
router.put('/deactivate',ingresoController.deactivate);
export default router;