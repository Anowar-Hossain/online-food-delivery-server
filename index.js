const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config();
const objectId = require('mongodb').ObjectId
const port =process.env.PORT || 5000;


//middleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sg0vz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
    try{
        await client.connect();
        console.log('connect to database');
        const database = client.db("delivery_food");
        const allService = database.collection("services");
        const orderCollection = database.collection('orders');
        

    //getapi
    app.get('/services', async(req, res)=> {
        const cursor = allService.find({});
        const services = await cursor.toArray();
        res.send(services);
    })

    //get single service
    app.get('/services/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: objectId(id) };
        const service = await allService.findOne(query);
        res.send(service);
    })

     //order api add
     app.post('/orders', async (req, res)=> {
     const order = req.body;
     const result = await orderCollection.insertOne(order);
    res.json(result);
    })

    //get order data
    app.get('/orders', async(req, res)=> {
        const cursor = orderCollection.find({});
        const orders = await cursor.toArray();
        res.send(orders);
    })

    //delete order
    app.delete('/deleteorder/:id', async
        const id = req.params.id;
        const quary = {_id: objectId(id)};
        const result = await orderCollection.deleteOne(quary);
        res.send(result);

    });


    


        


    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!');
  })
  
  app.listen(port, () => {
    console.log('Runnig server');
  })