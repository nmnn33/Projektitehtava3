Node.js nettisovellus/client joka käyttää mongoDB.
Käytössä on mongoose.

Nettisovelluksella otetaan yhteyttä minun tietokantaani ja siitä olevat tiedot saadaan käyttäjälle osittain esiin REST API avulla.

Näytä kokeilua varten suosittelen käyttämään postman sovellusta https://www.postman.com/.

Toimivat id:t hakua varten:

- ObjectId("5ca4bbcea2dd94ee58162a69")
- 5ca4bbcea2dd94ee58162a7e
- 5ca4bbcea2dd94ee58162ab8
- 5ca4bbcea2dd94ee58162b02

http://myapp.com/ tuo esiin etusivuni.

http://myapp.com/api/getall tuo esiin 20 esimmäistä dokumenttiä kokoelmastani mongodb:stä

http://myapp.com/api/:id hakee id:n avulla dokumentin

http://myapp.com/api/add lisää dokumentin annetuilla avain-arvo pareilla, jotka ovat "name", "address", "email" ilman """.

http://myapp.com/api/update/:id muuttaa yhden dokumentin "name" kohdan Junior:ksi.

http://myapp.com/api/delete/:id poistaa haetun id:n vastaavan dokumentin kokoelmasta.
