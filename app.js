var express = require('express');
var todoController = require('./controllers/todoController.js');

var app = express();

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
};
app.listen(port);
console.log('Halo halo,lisstening to port 3000');
