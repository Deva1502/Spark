import express from "express"
const app = express()
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()



app.get("/", (req, res) => {
    res.send("Hello World")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})