let express = require("express");

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

            if(jsonMsg.msg.toLowerCase() == "hi" || jsonMsg.msg.toLowerCase() == "hello")
            {
                console.log("Server says: Hello " + jsonMsg.username + "!")
                socket.send("Hello " + jsonMsg.username + "!");
            }
            else if(jsonMsg.msg.toLowerCase() == "how can i download google chrome?")
            {
                socket.send("You can use microsoft edge that comes pre-installed on windows. Open up Microsoft Edge by double clicking on its icon, then type in the address bar: 'Google Chrome.' Once you click on the link to the Google chrome download page, you will then be able to install it by running the installer and following the steps on screen!");
            }
            else if(jsonMsg.msg.toLowerCase() == "how can i update my computer?")
            {
                socket.send("Your Windows computer should have automatic updates enabled by default, but if you want to install updates manually, you can go to the settings menu in windows. Then, click on Update & Security. Finally, click on Windows Update and select check for updates!");
            }
            else if(jsonMsg.msg.toLowerCase() == "how can i turn on or off vibrate mode on my iphone?")
            {
                socket.send("You can toggle vibrate mode by using the selector switch on the side of the phone. You will get a notification on screen letting you know that the change was successful!");
            }
            else if(jsonMsg.msg.toLowerCase() == "why does the volume not work on my computer speakers?")
            {
                socket.send("First, you should double check that all of the cables are connected properly. If your speakers have a 3.5mm connection, make sure they are connected to the audio output on your computer. After this, I would try restarting your computer to make sure all drivers are loaded properly!");
            }
            else if(jsonMsg.msg.toLowerCase() == "how do i hook up a bluetooth device?")
            {
                socket.send("You will need to go to the 'bluetooth and other devices settings' menu in windows. From there, you will see an option to pair a new device. Make sure your device is in pairing mode, then you should see your device pop up on screen. Select your device to pair it!");
            }
            else if(jsonMsg.msg.toLowerCase() == "why isnt my printer working?")
            {
                socket.send("First, make sure all of the required cables are properly connected. If your printer uses bluetooth or wifi, make sure this is connected properly. If this still does not solve the issue, try restarting your computer to resolve any potential driver issues. If you do not have drivers for your printer, please visit the manufacturers website to download them!");
            }
            else if(jsonMsg.msg.toLowerCase() == "how do i add more storage to my computer?")
            {
                socket.send("You can add more storage to your computer by adding either a internal or external disk drive. You can purchase these at most electronics stores, and if you do not know how to install them yourself, most of these stores would be willing to install them for a fee.");
            }
            else
            {
                console.log("Server says: Sorry, I didn't understand what you wanted. Please try again.");
                socket.send("Sorry, I didn't understand what you wanted. Please try again.");
            }
        }
    });

    socket.send("Thank you for connecting! How can we help you today?");
});

app.listen(9090, ()=> console.log("Server running on port 9090!"));