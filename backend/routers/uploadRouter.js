import multer from 'multer'
import express from 'express'
import {isAuth} from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback){
        callback(null, `${Date.now()}.jpg`);
    }
});

const multerUpload = multer({storage});

uploadRouter.post('/', isAuth, multerUpload.single('image'), (req,res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;