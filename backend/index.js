import express from "express"
const app = express()
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./route/auth.route.js"
import userRouter from "./route/user.routes.js"
import postRouter from "./route/post.routes.js"
import reelRouter from "./route/reel.routes.js"
dotenv.config()
app.use(express.json())


//middleware
app.use(cors({
    origin:['http://localhost:5173', 'https://sparksocialm.netlify.app'],
    credentials:true
}))
app.use(cookieParser());

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/reel", reelRouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})