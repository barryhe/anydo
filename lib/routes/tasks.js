/*
exports.list = function (req, res){
	req.getConnection(function(err, connection){
		var query = connection.query('SELECT * FROM tasks', function(err, rows){
			if (err){
				console.log("Error selecting: " + err);	
			}
			res.render('home', {title:'Anydo - Todoapp', data: rows});
		});
	});
};
*/

exports.save = function(req,res){
	 
    var input = JSON.parse(JSON.stringify(req.body));
    
    console.log(input);
    
    req.getConnection(function (err, connection) {
        
        var data = {

            items : input.task,
            tables: input.table
        
        };
        
        var query = connection.query("INSERT INTO tasks set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('back');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};
/*
exports.update = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            tables: input.table,
            tasks: input.task
        
        };
        
        connection.query("UPDATE anydo set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('back');
          
        });
    
    });
};
*/
exports.delete = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM tasks WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('back');
             
        });
        
     });
};