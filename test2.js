//moduulit
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
//.env sisältää salis ja user
var user = process.env.DB_USER;
var salis = process.env.DB_PASS;
const uri = "mongodb+srv://" + user + ":" + salis + "@cluster0.jmzx9.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
//yhteysolio mongodb
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

//query
var query = {
    borough: "Queens"
}
//Luo yhteyden mongodb
client.connect(err => {
    const collection = client.db("sample_restaurants").collection("restaurants");
    console.log("connected");
    collection
        .find(query)
        .limit(5)
    // perform actions on the collection object
    client.close();
});
