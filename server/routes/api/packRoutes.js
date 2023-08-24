import express from 'express';
import {
    createPack,
    deletePack,
    addUserPack,
    removeUserPack,
    getPacks,
    getPackById
} from '../../controllers/packController.js'
const router = express.Router();

router.route('/create-pack')
    .post(createPack)

router.route('/delete-pack')
    .delete(deletePack)

router.route('/add-user')
    .put(addUserPack)

router.route('/remove-user')
    .put(removeUserPack)

router.route('/')
    .get(getPacks)

router.route('/pack-by-id')
    .get(getPackById)

export default router;
