import express from 'express';
const router = express.Router();
import {
    createWish,
    deleteWish,
    updateWish,
} from '../../controllers/wishController.js';

router.route('/create/:packId/:userId')
    .post(createWish)

router.route('/delete')
    .delete(deleteWish)

router.route('/update')
    .put(updateWish)

export default router;
