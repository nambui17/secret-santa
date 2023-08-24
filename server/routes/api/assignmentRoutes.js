import express from 'express';
import {
    addAssignment,
    removeAssignment
} from '../../controllers/assignmentController.js'

const router = express.Router();

router.route('/create-assign/:userId')
    .post(addAssignment)

router.route('/remove-assign')
    .delete(removeAssignment)

export default router
