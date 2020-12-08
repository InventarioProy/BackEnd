import routerx from 'express-promise-router';
import personaController from '../controllers/PersonaController';

const router=routerx();
router.post('/add',personaController.add);
router.get('/query',personaController.query);
router.get('/list',personaController.list);
router.get('/listClientes',personaController.listClientes);
router.get('/listProveedores',personaController.listProveedores);
router.put('/update',personaController.update);
router.delete('/remove',personaController.remove);
router.put('/activate',personaController.activate);
router.put('/deactivate',personaController.deactivate);
export default router;