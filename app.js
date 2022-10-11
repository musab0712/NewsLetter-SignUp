const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/cdb14b9941";
    const options = {
        method : "POST",
        auth : "Musab:a8eb872ff5a4c46cbe8ce8c994b582e1-us8"
    };
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/public/html/success.html");
        }
        else{
            res.sendFile(__dirname + "/public/html/failure.html");
        }

        response.on("data", function(data){

        })
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.post("/success", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
});

// Api Key:  a8eb872ff5a4c46cbe8ce8c994b582e1-us8
// ID : cdb14b9941