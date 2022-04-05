require("dotenv").config();
//tunnukset mongoDb .env
var user = process.env.DB_USER
var salis = process.env.DB_PASS
//Mongo Db yhteys luonti mongoose avulla
var mongoose = require("mongoose"); //mongoose
const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.jmzx9.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Tulostetaan tieto yhteyden onnistumisesta tai virheestä
db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
    console.log("yhteys muodostettu!");
});