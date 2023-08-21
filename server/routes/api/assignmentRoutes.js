import express from 'express';
import {
    addAssignment,
    removeAssignment
} from '../../controllers/assignmentController.js'

const router = express.Router();

router.route('/:userId')
    .post(addAssignment)

router.route('/remove')
    .delete(removeAssignment)

export default router
