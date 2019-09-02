import { Router } from 'express';
import bookings from './bookings';

const router = Router();

router.use('/bookings', bookings);

export = router;