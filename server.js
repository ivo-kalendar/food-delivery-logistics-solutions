const { MongoClient } = require("mongodb");
const mongoURI = require("./config/mongoURI");

const mongodb = new MongoClient(mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongodb.connect()
    .then((connectedClient) => {
        console.log(`Server started and connected to database!`);
        
        module.exports = connectedClient;
        
        require("./config/app");
    })
    .catch(err => {
        console.error("Грешка при конекција со MongoDB:", err);
        process.exit(1); // Сопирање на серверот ако нема база
    });