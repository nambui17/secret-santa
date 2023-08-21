import express from 'express';
import {
    createPack,
    deletePack,
    addUserPack,
    removeUserPack,
} from '../../controllers/packController.js'
const router = express.Router();

router.route('/:userId')
    .post(createPack)

router.route('/')
    .delete(deletePack)

router.route('/addUser')
    .put(addUserPack)

router.route('/removeUser')
    .put(removeUserPack)

export default router;
