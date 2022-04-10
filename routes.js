//tunnukset mongoDb .env
var user = process.env.DB_USER
var salis = process.env.DB_PASS
//Mongo Db yhteys luonti mongoose avulla
var mongoose = require("mongoose"); //mongoose
const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.jmzx9.mongodb.net/sample_analytics?retryWrites=true&w=majority";
//yhdistetään tietokantaan
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Määritellään Customers-niminen Schema, eli tietomalli taulukkoon tallennettavista olioista.
const CustomerSchema = new mongoose.Schema({

    name: String,
    address: String,
    email: String
});
//Määritellään Schema
const Customers = mongoose.model(
    "Customers",
    CustomerSchema,
    "customers"
);
/*// Määritellään Customers-niminen Schema, eli tietomalli taulukkoon tallennettavista olioista. Alla oleva "customers" kertoo kokoelman.
const Customers = mongoose.model(
    "Customers",
    {
        name: String,
        address: String,
        email: String
    },
    "customers"
);
*/
//Pääsivu polku (/)
exports.index = function (req, res) {
    res.render('index');
    console.log('index.ejs here!');
};

//Tulostaa 20 ekaa kokoelmasta (/api/getall)
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

//Tuo yhden Id:n perusteella (/api/:id)
exports.id = function (req, res) {
    Customers.find({ _id: req.params.id }, function (err, results) {
        console.log(results);
        res.json(results, 200);
    });
    console.log("id search");
};

// Lisää yhden dokumentin kokoelmaan (/api/add)
exports.add = function (req, res) {
    var nimi = req.body.name;
    var osoite = req.body.address;
    var emaili = req.body.email;

    const asiakas = new Customers(
        {
            name: nimi,
            address: osoite,
            email: emaili
        });
    // Tietokantavirheen käsittely 
    try {
        console.log(asiakas);
        asiakas.save();
        res.send("Lisätään customer: " + nimi + " " + osoite + " " + emaili);
    } // jos error
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// Päivittää Id:n perusteella yhden dokumentin nimen Junioriksi
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
};

// Poistaa Id:n perusteella yhden dokumentin
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
};