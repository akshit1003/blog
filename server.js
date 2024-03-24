import  express from "express";
import mongoose from "mongoose";
// import { Product } from "./models/productModel.js";
import { Product } from "./models/productModel"

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req,res) => {
    res.send("API working")
});


app.get('/blog', (req, res) => {
    res.send("Hello blog");
});

app.get('/products', (req, res) => {
    Product.find({})
    .then(product => {
        res.status(200).json(product);
    }) .catch(error => {
        res.status(500).json({message: error.message});
    });
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then(product => {
            res.status(200).json(product)
        }).catch(error => {
            res.status(500).json({ message: error.message })
        })
})

app.post('/products', (req, res) => {
    Product.create(req.body)
    .then(product => {
        res.status(200).json(product);
    })
    .catch(error => {
        console.log(error.message);
        res.status(500).json({message: error.message});
    })
})

app.put('/products/:id', (req, res) => {
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid Product Id"})
    }
    Product.findByIdAndUpdate(id, req.body)
    .then(product => {
        if (!product) {
            return res.status(404).json({message: "Product not find"});
        }
        Product.findById(id)
        .then(updatedProduct => {
            res.status(200).json(updatedProduct)
        })
    }) .catch(error => {
        res.status(500).json
    })
})



mongoose.connect('mongodb+srv://akshit:1234@cluster0.ciarjp0.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to monogdb');
    app.listen(port, () => {
        console.log(`Port is running at: ${port}`)
    });
}).catch((error) => {
    console.log(error)
});