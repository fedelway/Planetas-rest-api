const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express(bodyParser.json);

app.get('/', (req,res) => res.send('Bienvenido a Planetas API rest'));

app.get('/clima', (req,res) => {
    let requestedDay = Number.parseInt(req.query["dia"]);

    connectToMongo().then( client => {
        const daysCollection = client.db('test').collection('Days');

        let weather = daysCollection.find({Day: requestedDay});
        weather.toArray().then(array => {
            if( array.length != 1){
                res.send('No se pudo encontrar el día especificado');
            }else{
                res.send(removeId(array[0]));
            }

            client.close();
        },
        //On rejected 
        err => {
            res.send('No se pudo establecer conexión a base de datos');
            client.close();
        });
    });
});

app.get('/reporte', (req,res) => {
    connectToMongo().then( client => {
        const reportCollection = client.db('test').collection('Summary');

        reportCollection.find({}).toArray().then( array => {
            if(array.length === 0){
                res.send('No existe un reporte');
            }else{
                res.send(removeId(array[0]));
            }
            client.close();
        },
        err => {
            res.send('No se pudo establecer conexión a base de datos');
            client.close();
        });
    });
});

function connectToMongo(){
    const uri = "mongodb+srv://meli-user:zLnlBqEFiUwlZzzG@meli-solarsystem-jcs7m.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    return client.connect();
}

function removeId(obj){
    delete obj._id;
    return obj;
}

module.exports = app;