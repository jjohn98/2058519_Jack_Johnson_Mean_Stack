let bodyParser = require("body-parser");
let express = require("express");
let mongo = require("mongodb").MongoClient;

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>
{
    res.sendFile(__dirname+"\\dashboard.html");
});

app.get("/addCourse",(req, res)=>
{
    res.sendFile(__dirname+"\\addCoursePage.html");
});

app.get("/updateCourse",(req, res)=>
{
    res.sendFile(__dirname+"\\updateCoursePage.html");
});

app.get("/deleteCourse",(req, res)=>
{
    res.sendFile(__dirname+"\\deleteCoursePage.html");
});

app.post("/add", (req,res)=>
{
    let jsonItem = req.body;

    console.log(jsonItem);

    mongo.connect("mongodb://localhost:27017/", function(err,db)
    {
        if (err){console.error(err);}

        let database = db.db("coursePlatform");

        database.collection("courses").insertOne(jsonItem, function(err, res)
        {
            if (err){console.error(err);}
            console.log("Inserted item: " + JSON.stringify(jsonItem));
            db.close();
        })
    })

    res.send("<h2>Successfully added course: " + JSON.stringify(jsonItem) + "</h2> <br> <h3><a href='/'>Return to Home</a></h3>");
});

app.post("/update", (req,res)=>
{
    let jsonItem = req.body;

    let filter = {courseId:jsonItem.courseId};

    let update = {$set:{courseCost:jsonItem.courseCost}};

    mongo.connect("mongodb://localhost:27017/", function(err,db)
    {
        if (err){console.error(err);}

        let database = db.db("coursePlatform");

        database.collection("courses").updateMany(filter, update, function(err, result)
        {
            console.log("Updated " + result.modifiedCount + " object(s).");
            res.send("<h2>Updated " + result.modifiedCount + " objects with course Id " + jsonItem.courseId + " to have a cost of: " + jsonItem.courseCost + "</h2> <br> <h3><a href='/'>Return to Home</a></h3>");
        });
    });
});

app.post("/delete", (req,res)=>
{
    let jsonItem = req.body;

    mongo.connect("mongodb://localhost:27017/", function(err,db)
    {
        if (err){console.error(err);}

        let database = db.db("coursePlatform");

        database.collection("courses").deleteMany({courseId:jsonItem.courseId}, function(err, result)
        {
            console.log("Deleted " + result.deletedCount + " object(s).");
            res.send("<h2>Deleted " + result.deletedCount + " objects with course Id: " + jsonItem.courseId + "</h2> <br> <h3><a href='/'>Return to Home</a></h3>");
        });
    });
});

app.get("/fetchCourses",(req, res)=>
{  

    let jsonArray = [];

    mongo.connect("mongodb://localhost:27017/", function(err,db)
    {
        let database = db.db("coursePlatform");

        database.collection("courses").find({}).toArray(function(err,result)
        {
            let table = "<table style='border-style='solid', border-color='black', width='100%''> <tr><td>Course ID</td><td>Course Name</td><td>Course Description</td><td>Course Cost</td>";

            for(let course of result)
            {
                table += "<tr><td>" + course.courseId + "</td><td>" + course.courseName + "</td><td>" + course.description + "</td><td>" + course.courseCost + "</td>"
                console.log(course);
            }

            table += "</table> <br> <h3><a href='/'>Return to Home</a></h3>";

            res.send(table);
            db.close();
        });

    });

    
});














app.listen(9090,()=>console.log("Server running on port 9090!"));