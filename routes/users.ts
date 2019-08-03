import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction): void => {});
router.get('/', (req: Request, res: Response, next: NextFunction): void => {});

export default router;
