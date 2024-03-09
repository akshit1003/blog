import  express  from "express";

const app = express()
const port = 8080;

app.get('/', (req,res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Port is running at: ${port}`)
})