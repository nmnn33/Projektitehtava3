//tunnukset mongoDb .env
var user = process.env.DB_USER
var salis = process.env.DB_PASS
//Mongo Db yhteys luonti mongoose avulla
var mongoose = require("mongoose"); //mongoose
const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.jmzx9.mongodb.net/sample_analytics?retryWrites=true&w=majority";
mongoose.connect(uri);

exports.index = function (req, res) {
    res.render('index');
    console.log('index.ejs here!');
};

//var db = mongoose.connection;

// Määritellään Customers-niminen Schema, eli tietomalli taulukkoon tallennettavista olioista
const Customers = mongoose.model(
    "Customers",
    {
        name: String,
        address: String,
        email: String
    },
    "customers"
);

exports.getAll = function (req, res) {

    Customers.find({}, function (err, results) {
        console.log(results);
        res.json(results, 200);
    });
};

exports.id = function (req, res) {
    Customers.find({ _id: req.params.id }, function (err, results) {
        console.log(results);
        res.json(results, 200);
    });
    console.log("id search");
};

exports.add = function (req, res) {
    console.log(req.body);
    res.send("Lisätään customer: " + req.body.name + " (" + req.body.email + ")");
};

exports.updateId = function (req, res) {
    res.render('index');
    console.log('index.ejs here!');
};

exports.deleteId = function (req, res) {
    res.render('index');
    console.log('index.ejs here!');
};