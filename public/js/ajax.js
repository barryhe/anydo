//New table
/*
$('#myform').on('submit', function(e){
			e.preventDefault();
			var action = $(this).attr('action');
			var name = $('#name').val();
			$.ajax({
				url: '/tables/save',
				data: {table: name},
				type: 'POST',
				success: function(data){
						console.log('Success!');

				}, 
				error: function(){
					console.log("Submission Error");
				}
			}).then(function(){
			$.ajax({
				url: '/tables/refresh',
				dataType: 'text',
				type: 'GET',
				success: function(data){
					var html = data;
					var start = html.indexOf('<div class="row" id="panels">');
					var end = html.indexOf('<div><div></div></div>');
					html = html.substring(start, end-1);
					//new EJS({action:'/'}).update(document.querySelector('#panels'), data);
					$('#panels').html(html);
					$('#name').val('');
				}, 
				error: function(){
					console.log("Error: request");
				}
			});
		});
	});
*/
/*
//delete table
$('.delete').click(function(e){
			e.preventDefault();
			var action = $(this).attr('href');
					console.log(action);
			$.ajax({
				url: action,
				type: 'GET',
				success: function(data){
						console.log('Delete success!');

				}, 
				error: function(){
					console.log("Delete Error");
				}
			}).then(function(){
			$.ajax({
				url: '/tables/refresh',
				dataType: 'text',
				type: 'GET',
				success: function(data){
					var html = data;
					var start = html.indexOf('<div class="row" id="panels">');
					var end = html.indexOf('<form id="myform" method="post" action="/tables/save">');
					html = html.substring(start, end-1);
					//new EJS({action:'/'}).update(document.querySelector('#panels'), data);
					$('#panels').html(html);
				}, 
				error: function(){
					console.log("Error: request");
				}
			});
		});
	});
*/