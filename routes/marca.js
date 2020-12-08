import routerx from 'express-promise-router';
import marcaController from '../controllers/MarcaController';

const router=routerx();
router.post('/add',marcaController.add);
router.get('/query',marcaController.query);
router.get('/list',marcaController.list);
router.put('/update',marcaController.update);
router.delete('/remove',marcaController.remove);
export default router;