const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const Router = require("./routes")
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
app.use(morgan("dev"))

const PORT = process.env.PORT || 3005
const connectToDB = require('./mongodbConnection')
connectToDB()
app.use("/user", Router)
app.use("/recipe", Router)
app.use(async (req,res, next)=>{
    // const error = new Error("Not found")
    // error.status = 404
    next(createError.NotFound())
})
app.use((err, req,res, next)=>{
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})
app.listen(PORT, () => console.log(`server is runing on http://localhost:${PORT}`))