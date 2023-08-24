import express from 'express';
const router = express.Router();
import {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getAllUsers
} from '../../controllers/userController.js';

router.route('/user-by-id/:_id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

router.route('/')
    .post(createUser)
    .get(getAllUsers)

export default router;
