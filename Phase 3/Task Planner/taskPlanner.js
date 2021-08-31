let http = require("http");
let fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

let jsonItem;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>
{
    res.sendFile(__dirname+"\\taskPlannerHome.html");
});

app.get("/taskPlannerHome", (req, res)=>
{
    res.sendFile(__dirname+"\\taskPlannerHome.html");
});

app.get("/listTaskPage", (req, res)=>
{
    fs.readFile("taskLog.json", (err, data)=>
    {
        if(data.toString() != "")
        {
            let jsonArray = JSON.parse(data.toString());

            let table = "<table style='border-style='solid', border-color='black', width='100%''> <tr><td>Employee ID</td><td>Task Id</td><td>Task Description</td><td>Deadline</td>";

            for(let task of jsonArray)
            {
                table += "<tr><td>" + task.employeeId + "</td><td>" + task.taskId + "</td><td>" + task.taskDescription + "</td><td>" + task.deadline + "</td>"
                console.log(task);
            }

            table += "</table> <br> <h3><a href='taskPlannerHome'>Return to Home</a></h3>";

            res.send(table);
        }
        else
        {
            res.send("<h2>No tasks to display!</h2> <br> <h3><a href='taskPlannerHome'>Return to Home</a></h3>");
        }
    });
});

app.get("/deleteTask", (req, res)=>
{
    fs.readFile("taskLog.json", (err, data) =>
    {
    if (err)
    {
        return console.error(err);
    };

    if(data.toString() != "")
    {
        temp = JSON.parse(data.toString());

        let found = temp.findIndex(id => id.taskId == req.query["deleteId"]);

        if(found != -1)
        {
            console.log(JSON.stringify(temp) + "Before splice");
            newData = temp.splice(found, 1);
            newData = JSON.stringify(temp);
            console.log(newData);
            console.log(found);
            res.send("<h2>Deleted Task with Id: " + req.query["deleteId"] + "</h2> <br> <h3><a href='taskPlannerHome'>Return to Home</a></h3>");
        }
        else
        {
            res.send("<h2>No task with that Id to delete.</h2> <br> <h3><a href='taskPlannerHome'>Return to Home</a></h3>");
            return;
        }
    }

    fs.writeFile("taskLog.json", newData, err =>
    {
        if(err)
        {
            return console.error(err);
        }
    });
    });

    
});

app.post("/addTask", (req, res)=>
{
    let jsonItem = req.body;

    let found;

    fs.readFile("taskLog.json", (err, data) =>
    {
    if (err)
    {
        return console.error(err);
    };

    if(data.toString() != "")
    {
        let temp = JSON.parse(data.toString());

        found = temp.find(id => id.taskId == jsonItem.taskId);

        if(found != undefined)
        {
            console.log("Found object:"+ JSON.stringify(found));
        }
        else
        {
            console.log("No duplicate task.");
        }
        

        if(found != undefined)
        {
            res.send("<h2>Task with duplicate Id exists, cannot add new task.</h2> <br> <h3><a href='taskPlannerHome'>Return to Home</a></h3>");
            console.log("I should only be here if there is a duplicate!");
            return;
        }
    }
    
    if(data.toString() == "")
    {
        newData = "[" + data.toString() + JSON.stringify(jsonItem) + "]";
    }
    else
    {
        let dataJson = JSON.parse(data.toString());

        dataJson.push(jsonItem);

        newData = JSON.stringify(dataJson);
    }

    res.send("<h2>" + JSON.stringify(jsonItem) + "</h2> added to task list! <br> <h3><a href='taskPlannerHome'>Return to Home</a></h3>");

    fs.writeFile("taskLog.json", newData, err =>
    {
        if(err)
        {
            return console.error(err);
        }

    });
    });

});

app.listen(9090,()=>console.log("Server running on port 9090!"));