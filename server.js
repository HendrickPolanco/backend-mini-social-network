const express = require("express")
const router = require("./src/router/router")
const cors = require("cors");
const helmet = require("helmet")
const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express()
app.use(helmet())
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(cookieParser())

app.use(express.json())


app.use("/router", router)

app.get("/",(req, res)=>{
    res.send("it's working")
})


app.listen(4025, ()=> {
    console.log("http://localhost:4025")
})