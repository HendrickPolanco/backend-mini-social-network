const express = require("express")
const router = require("./src/router/router")
const cors = require("cors")
// require("dotenv").config();

const app = express()
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())


app.use("/router", router)

app.get("/",(req, res)=>{
    res.send("it's working")
})


app.listen(4023, ()=> {
    console.log("http://localhost:4023")
})