import express from 'express';
const router = express.Router();
import {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
} from '../../controllers/userController.js';

router.route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

router.route('/')
    .post(createUser)

export default router;
