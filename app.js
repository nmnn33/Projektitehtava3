//Moduuleja
const PORT = process.env.PORT || 8083; //Portti
var http = require("http");
var fs = require('fs');
var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config(); /* Haetaan ympäristömuuttujat .env tiedostosta */
var app = express();    //express-moduuli

//Moduulit (itse tekemä), joissa reitti logiikkamme
var routes = require('./routes');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.locals.pretty = true;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser käyttöön POST-tyyppisten lomakkeiden asiointiin.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Polut
app.get('/', routes.index); //pääsivu ja navigaatio

app.get('/api/getall', routes.getAll); //Return all documents in collection
app.get('/api/:id', routes.id); //Return one item with the given id
app.post('/api/add/:name', routes.add); //Create a new document in the collection
app.put('/api/update/:id', routes.updateId); //Update the document with the given id
app.delete('/api/delete/:id', routes.deleteId); //Delete the item with the given id

//Web-palvelin
app.listen(PORT, function () {
    console.log("Portti avattu, serveri pystyssä: " + PORT);
});
