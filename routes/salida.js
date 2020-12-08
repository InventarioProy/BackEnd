import routerx from 'express-promise-router';
import salidaController from '../controllers/SalidaController';

const router=routerx();
router.post('/add',salidaController.add);
router.get('/query',salidaController.query);
router.get('/list',salidaController.list);
router.get('/consultaFechas',salidaController.consultaFechas);
router.get('/grafico12meses',salidaController.grafico12Meses);
// router.put('/update',salidaController.update);
// router.delete('/remove',salidaController.remove);
router.put('/activate',salidaController.activate);
router.put('/deactivate',salidaController.deactivate);
export default router;