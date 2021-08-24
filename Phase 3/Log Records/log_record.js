let readline= require("readline-sync");
let fs = require('fs');

let firstName = readline.question("Enter your first name: ");
let lastName = readline.question("Enter your last name: ");
let gender = readline.question("Enter your gender: ");
let emailAddress = readline.questionEMail("Enter your email address: ");
debugger;

let jsonItem = 
{
    "firstName":firstName,
    "lastName":lastName,
    "gender":gender,
    "emailAddress":emailAddress,
    "logTime":Date()
};

console.log(jsonItem);

fs.readFile("logs.json", (err, data) =>
{
    if (err)
    {
        return console.error(err);
    };

    
    debugger;
    if(data.toString() == "")
    {
        newData = "[" + data.toString() + JSON.stringify(jsonItem) + "]";
        debugger;
    }
    else
    {
        let dataJson = JSON.parse(data.toString());

        dataJson.push(jsonItem);
        debugger;

        newData = JSON.stringify(dataJson);
        debugger;
    }


    fs.writeFile("logs.json", newData, err =>
    {
        if(err)
        {
            return console.error(err);
        }
        debugger;
    });
    debugger;
});
debugger;

console.log("Log saved! Run the program again to add another log.");