import { Router } from 'express';
import apiRouter from '../controllers';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';

const router = Router();

router.use('/api', apiRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.all('*', (req, res) => res.sendStatus(404));

export = router;