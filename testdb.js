//db.js
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://Skylab:97531@cluster0.izz05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url);

// The database to use
const dbName = "testdb";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("testCollection");

        // Construct a document                                                                                                                                                              
        let personDocument = {
            "name": { "first": "Alan03", "last": "Turing03" },
            "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
            "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
            "contribs": ["Turing machine", "Turing test", "Turingery"],
            "views": 1250000
        }
        // Insert a single document, wait for promise so we can read it back
        //const p = await col.insertOne(personDocument);

        // Find one document
        const myDoc = await col.findOne();
        

        //Find all document
        //const myDocAll = col.find({});
        const myDocAll02 = await col.find().toArray()

        // Print to the console
        console.log(myDoc);
        console.log("===================")
        console.log(myDocAll02);
        console.log("===================")
        console.log(myDocAll02.length);
        console.log("===================")
        console.log(myDocAll02[10])
        console.log("===================")
        console.log(myDocAll02[10].views)

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}
run().catch(console.dir);

