
function fff(){
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'xxx' },
		data: { 'vvv': vvv, 'vvv': vvv },
		success: function( data ) {
			var rows = svc_get_json( data );
			
		}
	});  
}





function fff(){
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'xxx' },
		data: { 'vvv': vvv, 'vvv': vvv },
		success: function( data ) {
			var rows = svc_get_json( data );
			
			var tx = '';
			
			tx += '<div class="m-3"><button class="btn btn-primary" onclick="yyyw_xxx_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'TXTXTXTX' ) + '</button></div>';
		
			tx += '<table class="table table-hover">';
			tx += '<tbody>';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<tr>';
				tx += '<td onclick="yyy_xxx_get(' + rows[i]['XXX_ID'] + ')"><a href="#">' + rows[i]['XXX_CODE'] + '</a></td>' ;
				tx += '<td><a href="#">' + rows[i]['XXX_NAME'] + '</a>';
				if ( global_master == 1 ) tx += ' <span class="svc-master">XXX_ID: ' + rows[i]['XXX_ID'] + '</span>';
				tx += '</td>' ;
				tx += '<td align="right">';
				tx += '<button type="button" class="btn btn-primary" onclick="yyyw_xxx_update(' + rows[i]['XXX_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
				tx += '<button type="button" class="btn btn-danger" onclick="yyyw_xxx_delete(' + rows[i]['XXX_ID'] + ')"><i class="fa fa-trash"></i></button>';
				tx += '</td>' ;
				tx += '</tr>';
			}
			tx += '</tbody>';
			tx += '</table>';	
			
			$( '#svc-main-content-0' ).html( tx );
			$( '#svc-main-content-0' ).show();
			
		}
	});  
}



