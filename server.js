const express = require('express');
const app = express(); 
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const upload = multer();
const assert = require('assert')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 

app.listen(5500, function () {
	console.log('Listening on 5500')
})

app.get('/', function (req, res) {
	res.sendFile( __dirname + '/index.html');
})

//mongodb
const MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://trixiex:1234@sandbox.jadwj.mongodb.net/Inventory?retryWrites=true&w=majority"
const dbName = 'Inventory';
var db, collection;
MongoClient.connect(url)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        collection = db.collection('Inventory1')
    })
    .catch(console.error)

    //adding parts
    app.get('/Inventory1/parts/addparts', function (req, res) {
        res.sendFile( __dirname + '/addparts.html');
    })
    
    app.get('/Inventory1/parts', function (req, res) {
        res.sendFile( __dirname + '/parts.html');
    })
    
    app.post('/insert', function (req, res) {
        console.log(req.body)
        collection = db.collection('Inventory1'); 
        collection.insertOne(req.body)
            .then(result => {
                res.redirect('/parts.html')
            })
    })
    
    
    app.get('/Inventory1/parts/list', function (req, res) {
        console.log('Inventory List')
        var result
        collection.find().toArray(function (error, result) {
            if(error) {
                return response.status(500).send(error);
            }
            else{
                res.send(result);
            }
        });
    })
    

    const findDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('city');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          console.log(docs)
          callback(docs);
        });
      }
   

    
    

