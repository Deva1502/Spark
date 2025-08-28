import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { comment, getAllReels, like, uploadReel } from "../controllers/reel.controller.js";

const reelRouter = express.Router();

reelRouter.post("/upload", isAuth, upload.single("media"), uploadReel);
reelRouter.get("/like/:reelId", isAuth, like);
reelRouter.get("/getAll", isAuth, getAllReels);
reelRouter.post("/comment", isAuth, comment);
// reelRouter.post("/saved/:reelId", isAuth, saved);

export default reelRouter;