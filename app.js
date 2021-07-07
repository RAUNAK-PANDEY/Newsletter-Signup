const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const { json } = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res)
{res.sendFile(__dirname + "/signup.html");
 
});

app.post("/" , function(req , res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

   var data ={
       members : [
           {
               email_address : email , status :   "subscribed" ,
                "merge_fields": {
                "FNAME": firstName,
                "LNAME": lastName
              }
           }
       ] 
   };

var jsonData = JSON.stringify(data);

var options = {

    //<API-List-ID> -->Your own Mailchimp List ID
    url : "https://us6.api.mailchimp.com/3.0/lists/<API-List-ID>" ,
    method : "POST" ,
    headers : {
        //the api key has been hidden due to security resons
        //<name API-KEY> ---> Any name and your own API-KEY
        "Authorization": "<name API-KEY>"
    } ,
    body : jsonData
};
request(options , function(error , response ,body){
 if(error){
     res.sendFile (__dirname + "/failure.html");

 }else{
     if(response.statusCode === 200)
     {
        res.sendFile (__dirname + "/success.html");
     }
     else {
        res.sendFile (__dirname + "/failure.html");
     }
 }
});

});

app.post("/failure" , function(req ,res){
    res.redirect("/");
});

// for deploying on heroku write port as "process.env.PORT"
app.listen(process.env.PORT || 3000 , function()
{
    console.log("Server is running on port 3000");
}); 

 
