const express = require("express");
const {MongoClient} = require("mongodb");
const propertyRoutes = require("./routes/propertyRoutes");
const users = require("./routes/usersRoutes");
const app = express();
app.use(express.json());

let client = new MongoClient("mongodb://127.0.0.1:27017");
let db = null;
async function main(){
    await client.connect();
    db = client.db("CS477");
}

app.use((req, res, next)=>{
    req.db = db;
    next();
});

main().then(testDb).catch(()=>{console.log("connection error")});

function testDb(){
    console.log("Db connected...");
}

app.listen(8000, ()=>{console.log("connected on 8000...")});

app.use("/property", propertyRoutes);
app.use("/users", users);


// Error Handling
app.use((req, res, next)=>{
    res.send("API not supported!");
});

app.use((error, req, res, next)=>{
    if(error && error.message){
        res.send(error.message);
    }else{
        res.send("Backend Error...");
    }
})
