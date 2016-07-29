
exports.list = function (req, res){
	req.getConnection(function(err, connection){

		var query = connection.query('SELECT * FROM tables', function(err, rows){
			if (err){
				console.log("Error selecting: " + err);	
			}
      
			res.render('home', {page_title:'Barry\'s personal anydo', data: rows});  
		});
	});
};
/*
exports.refresh = function (req, res){
  req.getConnection(function(err, connection){
   
    var query = connection.query('SELECT * FROM tables', function(err, rows){
      if (err){
        console.log("Error selecting: " + err); 
      } 
      var html = res.render('home', {data: rows});
      res.send(html);
    });
  });
};
*/
exports.save = function(req,res){
	 
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        
        var data = {
            
            names: input.table
        
        };
        
        var query = connection.query("INSERT INTO tables set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
          
          //res.render('home', {page_title:'Barry\'s personal anydo', data: rows});
          
          res.redirect('/');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.update = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        
        var data = {
            
            names: input.save_edit
        
        };
        
        connection.query("UPDATE tables set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/');
          
        });
    
    });
};

exports.delete = function(req,res){

     var id = req.params.id;
     var tablename = [];

     req.getConnection(function (err, connection) {

        connection.query("SELECT names FROM tables where id = ?", [id], function(err, row){
          if(err){
            throw err;
          }
          else{
            tablename = row;
          }
        });
        
        connection.query("DELETE FROM tables WHERE id = ? ",[id], function(err, rows)
        {
            connection.query("DELETE FROM tasks WHERE tables = ? ",[tablename[0].names], function(err, rows)
            {
                
                 if(err)
                     console.log("Items error deleting : %s ",err );
                 
            });
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/');
             
        });
        
     });
};

exports.view = function(req, res){
    var name = req.params.names;
    req.getConnection(function (err, connection) {
            
        connection.query("SELECT * FROM tasks WHERE tables = ? ORDER BY id DESC",[name], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );
             res.render('todos', {page_title:'Anydo - ' + name, 
                                  data:rows, buffer:name});
             
        });
 
    });
};