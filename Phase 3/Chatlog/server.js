let express = require("express");

let mongo = require("mongodb").MongoClient;

let app = express();

let ws = require("express-ws")(app);

app.get("/", (req, res) =>
{
    res.sendFile(__dirname+"\\chatHome.html");
});

app.ws("/",(socket, req)=>
{
    console.log("New user connected.");

    socket.on("message",msg=>
    {
        if(msg != "" && msg != undefined && msg != null)
        {
            let jsonMsg = JSON.parse(msg);

            console.log(jsonMsg.username + " says: " + jsonMsg.msg);

            mongo.connect("mongodb://localhost:27017/", function(err,db)
            {
                let database = db.db("chatlog");

                database.collection("recieved").insertOne(jsonMsg, function(err, result)
                {
                    console.log("Inserted Item: "+ JSON.stringify(jsonMsg));
                    db.close();
                });
            });

            socket.send("Message recieved and logged in MongoDB.");
        }
    });

    socket.send("Thank you for connecting! Please enter your message to be logged.");
});

app.listen(9090, ()=> console.log("Server running on port 9090!"));