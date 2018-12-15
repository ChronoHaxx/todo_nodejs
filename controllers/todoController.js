var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var secret_key = require('./secret_key.js')
//connect to database
mongoose.connect(secret_key);

//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item : 'get milk'},{item: 'learn nodejs'}];
var urlencodeParser = bodyParser.urlencoded({extended : false});

module.exports = function(app){

app.get('/todo', function(req,res){
  //get data from mongodb and pass to view
  Todo.find({},function(err, data){
    if (err) throw err;
      res.render('todo',{todos: data});
  });
});

app.post('/todo', urlencodeParser, function(req,res){
  //get data from view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', function(req,res){
  //delete requested item from mongodb
  Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

  };
