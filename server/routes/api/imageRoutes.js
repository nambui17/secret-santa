import express from 'express';
import {
    addImage,
    removeImage
} from '../../controllers/imageController.js'
const router = express.Router();

router.route("/:_id")
    .post(addImage)

router.route("/")
    .delete(removeImage)
    
export default router;
