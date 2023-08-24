import express from 'express';
const router = express.Router();
import {
    createWish,
    deleteWish,
    updateWish,
    getAllWishes,
    getWishById
} from '../../controllers/wishController.js';

router.route('/create-wish')
    .post(createWish)

router.route('/delete-wish')
    .delete(deleteWish)

router.route('/update-wish')
    .put(updateWish)

router.route('/wish-by-id')
    .get(getWishById)

router.route('/')
    .get(getAllWishes)

export default router;
