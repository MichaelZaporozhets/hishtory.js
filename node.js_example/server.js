var fs = require("fs");
var port = 80;
var express = require("express");

var app = express();
app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/:dir", function(req,res){ //root dir
	res.redirect('/#!/'+req.params.dir);
});

app.listen(port);