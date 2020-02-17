/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/***** PRODUCTS ***********************************************************************************************************************************************************/


function PRODUCTS_main() {

	$( '#main-title' ).html( svc_lang_str( 'PRODUCTS' ) );
	
	svc_master_function( 'PRODUCTS_main() @ solverscope_pro.js' );

	pro_produc_list();

}


function pro_produc_list() {
	
	svc_master_function( 'pro_produc_list() @ solverscope_pro.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'pro_check_insert' },
		success: function( data1 ) {
			var permission = data1.trim();

			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'pro_produc_list' },
				success: function( data ) {
					var rows = svc_get_json( data );
			
					var tx = '';
	
					if ( permission ==  1 ) tx += '<div class="m-3"><button class="btn btn-primary" onclick="prow_produc_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'PRODUCT' ) + '</button></div>';

					if (data.length > 20 ) {
		
						tx += '<table class="table table-hover">';
						tx += '<tbody>';
						for ( var i = 0; i < rows.length ; i++ ) {
							tx += '<tr>';
							tx += '<td>' + rows[i]['PROLBL_NAME'] + '</td>' ;
							tx += '<td>' + rows[i]['PROARE_NAME'] + '</td>' ;
							tx += '<td>' + rows[i]['PROTYP_NAME'] + '</td>' ;
							tx += '<td onclick="pro_produc_get(' + rows[i]['PRODUC_ID'] + ')"><a href="#">' + rows[i]['PRODUC_NAME'] + '</a>' ;
							if ( global_master == 1 ) tx += ' <span class="svc-master">PRODUC_ID: ' + rows[i]['PRODUC_ID'] + '</span>';
							tx += '</td>' ;
				
							if ( permission ==  1 ) {
								tx += '<td align="right">';
								tx += '<button type="button" class="btn btn-primary" onclick="prow_produc_update(' + rows[i]['PRODUC_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
								tx += '<button type="button" class="btn btn-danger" onclick="prow_produc_delete(' + rows[i]['PRODUC_ID'] + ')"><i class="fa fa-trash"></i></button>';
								tx += '</td>' ;
							}
			
							tx += '</tr>';
						}
						tx += '</tbody>';
						tx += '</table>';	
		
					}
			
					$( '#svc-main-content-0' ).html( tx );
					$( '#svc-main-content-0' ).show();
		
				}
			});  

		
		}
	}); 
	
	
	
	
	
	
	
}


function pro_produc_get( produc_id ) {
	
	svc_master_function( 'pro_produc_get(' + produc_id + ') @ solverscope_pro.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'pro_check_insert' },
		success: function( data1 ) {
			var permission = data1.trim();
	
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'pro_schema_list' },
				data: { 'produc_id': produc_id },
				success: function( data ) {
					var rows = svc_get_json( data );
			
					var tx = '';
	
					if ( permission ==  1 ) tx += '<div class="m-3"><button class="btn btn-primary" onclick="prow_schema_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'SCHEMA' ) + '</button></div>';

					if (data.length > 20 ) {
		
			
	
						tx += '<table class="table table-hover">';
						tx += '<tbody>';
						for ( var i = 0; i < rows.length ; i++ ) {
							tx += '<tr>';
							tx += '<td onclick="pro_schema_get(' + rows[i]['SCHEMA_ID'] + ')"><a href="#">' + svc_date_format( rows[i]['SCHEMA_DATE'] ) + '</a>' ;
							if ( global_master == 1 ) tx += ' <span class="svc-master">SCHEMA_ID: ' + rows[i]['SCHEMA_ID'] + '</span>';
							tx += '</td>' ;
							tx += '<td>' + rows[i]['SCHEMA_COMMENTS'] + '</td>' ;
				
							if ( permission ==  1 ) {
								tx += '<td align="right">';
								tx += '<button type="button" class="btn btn-primary" onclick="prow_schema_update(' + rows[i]['SCHEMA_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
								tx += '<button type="button" class="btn btn-danger" onclick="prow_schema_delete(' + rows[i]['SCHEMA_ID'] + ')"><i class="fa fa-trash"></i></button>';
								tx += '</td>' ;
							}
			
							tx += '</tr>';
						}
						tx += '</tbody>';
						tx += '</table>';	
		
					}

					$( '#svc-main-content-0' ).hide();			
					$( '#svc-main-content-header-1' ).html( svc_lang_str( 'SCHEMAS' ) );
					$( '#svc-main-content-body-1' ).html( tx );
					$( '#svc-main-content-1' ).show();
		
				}
			});  
	
		
		}
	}); 
	
}


function pro_schema_get( schema_id ) {
	
	svc_master_function( 'pro_schema_get(' + schema_id + ') @ solverscope_pro.js' );
	
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'pro_check_insert' },
		success: function( data1 ) {
			var permission = data1.trim();
	
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'pro_blocks_list' },
				data: { 'schema_id': schema_id },
				success: function( data ) {
			
					var rows = svc_get_json( data );
			
					var tx = '';
	
					if ( permission ==  1 ) tx += '<div class="m-3"><button class="btn btn-primary" onclick="prow_blocks_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'BLOCK' ) + '</button></div>';

					if (data.length > 20 ) {
		
						var last_block = 0;
	
						tx += '<table class="table table-hover">';
						tx += '<tbody>';
						for ( var i = 0; i < rows.length ; i++ ) {
					
					
							if ( last_block != rows[i]['BLOCKS_ID'] ) {
								tx += '<tr style="font-weight:bold;background-color:#C0C0C0">';
								tx += '<td colspan="3">' + rows[i]['BLOCKS_NAME'] + '<td>';
								if ( permission ==  1 ) {
									tx += '<td align="right">';
									tx += '<button type="button" class="btn btn-primary" onclick="prow_blocks_update(' + rows[i]['BLOCKS_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
									tx += '<button type="button" class="btn btn-danger" onclick="prow_blocks_delete(' + rows[i]['BLOCKS_ID'] + ')"><i class="fa fa-trash"></i></button>';
									tx += '</td>' ;
								}
								else {
									tx += '<td>&nbsp;</td>';
								}
								tx += '</tr>';
								if ( permission ==  1 ) tx += '<tr><td><button class="btn btn-primary" onclick="prow_blomod_insert(' + rows[i]['BLOCKS_ID'] + ')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'MODULE' ) + '</button></td></tr>';
								last_block = rows[i]['BLOCKS_ID'];
							}
					
							tx += '<tr>';
							tx += '<td><a href="#" onclick="mod_module_get(' + rows[i]['MODULE_ID'] + ',3)">' + rows[i]['MODULE_CODE'] + '</a><td>';
							tx += '<td><a href="#" onclick="mod_module_get(' + rows[i]['MODULE_ID'] + ',3)">' + rows[i]['MODULE_NAME'] + '</a><td>';
							if ( permission ==  1 ) {
								tx += '<td align="right">';
								tx += '<button type="button" class="btn btn-primary" onclick="prow_blomod_update(' + rows[i]['BLOMOD_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
								tx += '<button type="button" class="btn btn-danger" onclick="prow_blomod_delete(' + rows[i]['BLOMOD_ID'] + ')"><i class="fa fa-trash"></i></button>';
								tx += '</td>' ;
							}
			
							tx += '</tr>';
						}
						tx += '</tbody>';
						tx += '</table>';	
		
					}

					$( '#svc-main-content-0' ).hide();			
					$( '#svc-main-content-1' ).hide();			
					$( '#svc-main-content-header-2' ).html( svc_lang_str( 'BLOCKS' ) );
					$( '#svc-main-content-body-2' ).html( tx );
					$( '#svc-main-content-2' ).show();
		
				}
			});  
		
		}
	}); 
	
	
}