const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config()




const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.enmmk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const products = client.db("emaJohnStore").collection("products");
    app.post('/addProduct', (req, res) => {
        const product = req.body
        products.insertOne(product)
            .then(result => {
                console.log(result);
            })
    })

});


app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(4000);