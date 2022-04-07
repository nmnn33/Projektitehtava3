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
    Customers.find({}, null, { limit: 20 }, function (err, results) {
        // Jos tietokantahaussa tapahtuu virhe, palautetaan virhekoodi myös selaimelle
        if (err) {
            res.json("Järjestelmässä tapahtui virhe", 500);
        }
        // Muuten lähetetään tietokannan tulokset selaimelle 
        else {
            res.json(results, 200);
        }
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
    var name = req.body.name;
    var address = req.body.address;
    var email = req.body.email;
    console.log(Customers);
    var asiakas =
    {
        name: name,
        address: address,
        email: email
    };
    Customers.insertOne(asiakas);

    res.send("Lisätään customer: " + joku + " (" + joku2 + ")");
};

exports.updateId = function (req, res) {
    var id = req.params.id;

    Customers.findByIdAndUpdate(id, { name: "Junior" }, function (err, results) {
        // Tietokantavirheen käsittely 
        if (err) {
            console.log(err);
            res.json("Järjestelmässä tapahtui virhe.", 500);
        } // Tietokanta ok, mutta poistettavaa ei löydy. Onko kyseessä virhe vai ei on semantiikkaa
        else if (results == null) {
            res.json("id vastaavaa tiedostoa ei löydetty.", 200);
        } // Viimeisenä tilanne jossa kaikki ok
        else {
            console.log(results);
            res.json("Muutettu " + id + " " + results.name, 200);
        }
    });

    res.render('index');
    console.log('index.ejs here!');
};

exports.deleteId = function (req, res) {
    // Poimitaan id talteen ja välitetään se tietokannan poisto-operaatioon
    var id = req.params.id;

    Customers.findByIdAndDelete(id, function (err, results) {
        // Tietokantavirheen käsittely 
        if (err) {
            console.log(err);
            res.json("Järjestelmässä tapahtui virhe.", 500);
        } // Tietokanta ok, mutta poistettavaa ei löydy. Onko kyseessä virhe vai ei on semantiikkaa
        else if (results == null) {
            res.json("Poistetavaa ei löytynyt.", 200);
        } // Viimeisenä tilanne jossa kaikki ok
        else {
            console.log(results);
            res.json("Deleted " + id + " " + results.email, 200);
        }
    });

    res.render('index');
    console.log('index.ejs here!');
};