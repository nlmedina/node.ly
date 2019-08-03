import { Router } from 'express';
import shortUrlsRouter from './shortUrls';
import usersRouter from './users';

const router = Router();

router.use('/users', usersRouter);
router.use('/short_urls', shortUrlsRouter);

export default router;
