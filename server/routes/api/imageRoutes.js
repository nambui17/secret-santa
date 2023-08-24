import express from 'express';
import {
    addImage,
    removeImage
} from '../../controllers/imageController.js'
const router = express.Router();

router.route("/add-image/:_id")
    .post(addImage)

router.route("/delete-image")
    .delete(removeImage)
    
export default router;
