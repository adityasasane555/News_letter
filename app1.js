const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static('public'));

app.get("/",function(req,res){
   res.sendFile(__dirname +"/singup.html");
});

app.post("/",function(req,res){
  const firstname = req.body.name;
  const lastname = req.body.sname;
  const email = req.body.email_id;

 var data = {
   members:[
     {
       email_address :  email,
       status : "subscribed",
       merge_fields : {
         FNAME : firstname,
         LNAME : lastname
       }

     }
   ]
 };

const jsondata = JSON.stringify(data);

const url = "https://us5.api.mailchimp.com/3.0/lists/0f069c987e";

var options = {
  method : "post",
  auth : "aditya3:af9f9891d7846ecbf7a767d09821f1ac-us5"
}

 const request = https.request(url, options, function(response){

   if(response.statusCode===200){
     res.sendFile(__dirname + "/succes.html");
   }else{
       res.sendFile(__dirname + "/failure.html");
   }

   response.on("data",function(data) {
     console.log(JSON.parse(data));
   })
 });

 request.write(jsondata);
 request.end();

});

app.post("/failure.html",function(req,res){
  res.redirect("/");
});

app.listen(7000,function(){
  console.log("server is started on 7000 port");
});

//api
//af9f9891d7846ecbf7a767d09821f1ac-us5
//list id
//0f069c987e
