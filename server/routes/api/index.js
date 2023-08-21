import express from 'express';
const router = express.Router();
import friendRoutes from './friendRoutes.js';
import assignmentRoutes from './assignmentRoutes.js';
import imageRoutes from './imageRoutes.js';
import packRoutes from './packRoutes.js';
import userRoutes from './userRoutes.js';
import wishRoutes from './wishRoutes.js';

router.use('/users', userRoutes);
router.use('/packs', packRoutes);
router.use('/images', imageRoutes);
router.use('/wishes', wishRoutes);
router.use('/friends', friendRoutes);
router.use('/assignments', assignmentRoutes);

export default router;