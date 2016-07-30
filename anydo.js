//dependencies
var express = require('express');
var path = require('path');
var app = express();
var bodyparser = require('body-parser');

//new environment setup in express 4
	//var logger=require("morgan");
	//app.use(logger('combined'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: 'yes'}));
//methodOverride
var connection = require('express-myconnection');
var mysql = require('mysql');

//environments
app.set('port', 3002);
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

/*development only
if ('development' === app.get('env')){
	app.use(express.errorHandler());
}
*/

//mysql connections
app.use(
	connection(mysql, {
		host:'localhost',
		user:'root',
		password:'Shanghai1!',
		path:'3306',
		database:'anydo',
	}, 'pool')
);

//tables action routing 
var tables = require('./lib/routes/tables.js');
app.get("/", tables.list);
/*app.get('/', function(req, res){
	res.render('/', {layout:false, data: data});
});*/


app.post("/tables/save", tables.save);
app.get("/tables/delete/:id", tables.delete);
app.post("/tables/update/:id", tables.update);
app.get("/todos/:names", tables.view);
//ajax
//app.get("/tables/refresh", tables.refresh);

var tasks = require('./lib/routes/tasks.js');
app.post("/tasks/save", tasks.save);
app.get("/tasks/delete/:id", tasks.delete);
//app.post("/tasks/update/:id", tasks.update);

//customerized 404
app.use(function(req, res, next){
	res.status(404);
	res.render('404')
});

//customerized 500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//listening
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port'));
});

