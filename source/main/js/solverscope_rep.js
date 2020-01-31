/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/



/***** FOLDERS FULL ACCESS ***********************************************************************************************************************************************************/


function REPOSITORY_FULL_ACCESS_main() {
	$( '#main-title' ).html( svc_lang_str( 'REPOSITORY' ) );
	
	rep_folder_list( 0 );
}


function rep_folder_list( parent ) {
	
	global_last_op = 'rep_folder_list'; 
	global_last_id = parent; 
	
	svc_master_function( 'rep_folder_list(' + parent + ') @ solverscope_rep.js' );
		
	$( '#svc-main-content-0' ).html( global_processing );

	//ajax get folder list START
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_folder_list' },
		data: { 'parent': parent },
		success: function( data ) {

			rows = svc_get_json( data );
			var tx = '';



				//buttons for new folder and new object
				tx += '<div id="new-folder-object" style="margin-bottom:1rem;width:100%"></div>';
				
				//ajax get folder path START
				$.ajax({
					url: 'app/',
					type: 'POST',
					headers: { 'tk': tk, 'procedure': 'rep_folder_path' },
					data: { 'folder_id': parent },
					success: function( path ) {
						path = svc_get_json( path );
						var txp = '';
						if ( path[0] != null ){
							for ( var i = 0; i < path.length ; i++ ) {
								txp = '<li class="breadcrumb-item" onclick="rep_folder_list( ' + path[i]['FOLDER_ID'] +' )"><a href="#">' + path[i]['FOLDER_NAME'] + '</a></li>' + txp;
							}
						}
						tx += '<nav aria-label="breadcrumb">';
						tx += '<ol class="breadcrumb">';
						tx += '<li class="breadcrumb-item" onclick="rep_folder_list(0)"><a href="#"> .. </a></li>' + txp;
						tx += '</ol>';
						tx += '</nav>';
						
						tx += '<table class="table table-hover">';
						tx += '<tbody>';
						for ( var i = 0; i < rows.length ; i++ ) {
							tx += '<tr>';
							tx += '<td style="width:60%" onclick="rep_folder_list( ' + rows[i]['FOLDER_ID'] + ' )"><a href="#">';
							tx += '<i class="fa fa-folder"></i>&nbsp;&nbsp;&nbsp;' + rows[i]['FOLDER_NAME'];
							if ( global_master == 1 ) tx += '<span class="svc-master">FOLDER_ID: ' + rows[i]['FOLDER_ID'] + '</span>';
							tx += '</a></td>';
							if ( rows[i]['PERMISSION'] == 1 ) {
								tx += '<td align="right">';
								tx += '<button class="btn btn-info btn-xs" onclick="repw_folder_share(' + rows[i]['FOLDER_ID'] + ',' + parent + ')"><i class="fa fa-share-alt"></i></button>';
								tx += '<button class="btn btn-success btn-xs" onclick="repw_folder_move(' + rows[i]['FOLDER_ID'] + ',' + parent + ')"><i class="fa fa-arrows"></i></button>';
								tx += '<button class="btn btn-primary btn-xs" onclick="repw_folder_update(' + rows[i]['FOLDER_ID'] + ',' + parent + ',\'' + rows[i]['FOLDER_NAME'] + '\')"><i class="fa fa-pencil"></i></button>';
								tx += '<button class="btn btn-danger btn-xs" onclick="repw_folder_delete(' + rows[i]['FOLDER_ID'] + ',' + parent + ')"><i class="fa fa-trash-o"></i></button>';
								tx += '</td>';
							}
							else {
								tx += '<td></td>';
							}
							tx += '</tr>';
						}
						tx += '</tbody>';
						tx += '</table>';

						//ajax get object list START
						$.ajax({
							url: 'app/',
							type: 'POST',
							headers: { 'tk': tk, 'procedure': 'rep_object_list' },
							data: { 'folder_id': parent },
							success: function( data_o ) {
								objects = svc_get_json( data_o );
								tx += rep_objects_list( objects, parent, 1 );
								$( '#svc-main-content-0' ).html( tx );
								$( '#svc-main-content-0' ).show();
								
								//ajax check insert START
								$.ajax({
									url: 'app/',
									type: 'POST',
									headers: { 'tk': tk, 'procedure': 'rep_check_insert' },
									success: function( data_c ) {
										if ( data_c.trim() == '1' ) {
											var tx = '';
											tx += '<div style="display:inline-block;margin-right:1rem"><button class="btn btn-primary btn-xs" onclick="repw_folder_insert(' + parent +')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'FOLDER' ) + '</button></div>';
											if ( parent > 0 ) {
												tx += '<div style="display:inline-block;margin-right:1rem"><button class="btn btn-success btn-xs" onclick="repw_object_insert(' + parent +')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'OBJECT' ) + '</button></div>';
												tx += '<div style="display:inline-block;margin-right:1rem"><button class="btn btn-info btn-xs" onclick="repw_quiite_import(' + parent +')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'IMPORT' ) + '</button></div>';
											}
											$( '#new-folder-object' ).html( tx );
										}
									}
								});
								//ajax check insert END

							}
						});
						//ajax get object list END
						
					}
				});
				//ajax get folder path END
	

		}
	});
	//ajax get folder list END
}






/***** MY FOLDERS ***********************************************************************************************************************************************************/
                                    

function REPOSITORY_MY_FOLDERS_main() {
	$( '#main-title' ).html( svc_lang_str( 'REPOSITORY' ) );
	rep_my_folders_list();
}


function rep_my_folders_list() {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_my_folders_list' },
		success: function( data ) {
			rows = svc_get_json( data );
			var tx = '';
			tx += '<table class="table table-hover">';
			tx += '<tbody>';
			for ( var i = 0; i < rows.length ; i++ ) {
				var is_author = '';
				var is_reviewer1 = '';
				var is_reviewer2 = '';
				var is_reviewer3 = '';
				var is_reviewer4 = '';
				var is_reviewer5 = '';
				if ( rows[i]['IS_AUTHOR'] == 1 ) is_author = svc_lang_str( 'AUTHOR' );
				if ( rows[i]['IS_REVIEWER1'] == 1 ) is_reviewer1 = svc_lang_str( 'REVIEWER' ) + ' 1';
				if ( rows[i]['IS_REVIEWER2'] == 1 ) is_reviewer2 = svc_lang_str( 'REVIEWER' ) + ' 2';
				if ( rows[i]['IS_REVIEWER3'] == 1 ) is_reviewer3 = svc_lang_str( 'REVIEWER' ) + ' 3';
				if ( rows[i]['IS_REVIEWER4'] == 1 ) is_reviewer4 = svc_lang_str( 'REVIEWER' ) + ' 4';
				if ( rows[i]['IS_REVIEWER5'] == 1 ) is_reviewer5 = svc_lang_str( 'REVIEWER' ) + ' 5';
					
				tx += '<tr>';
				tx += '<td style="width:80%" onclick="rep_my_folder_list( ' + rows[i]['FOLDER_ID'] + ',\'' + rows[i]['FOLDER_NAME'] + '\',\'' + is_author + '\' )"><a href="#">';
				tx += '<i class="fa fa-folder"></i>&nbsp;&nbsp;&nbsp;' + rows[i]['FOLDER_NAME'];
				if ( global_master == 1 ) tx += '<span class="svc-master">FOLDER_ID: ' + rows[i]['FOLDER_ID'] + '</span>';
				tx += '</a></td>';
				
				tx += '<td>' + is_author + ' ' + is_reviewer1 + ' ' + is_reviewer2 + ' ' + is_reviewer3 + ' ' + is_reviewer4 + ' ' + is_reviewer5 + '</td>';
				
				tx += '</tr>';
			}
			tx += '</tbody>';
			tx += '</table>';
			$( '#svc-main-content-0' ).html( tx );

		}
	});
	
}



function rep_my_folder_list( folder_id, folder_name, is_author ) {

	global_last_op = 'rep_my_folders_list'; 
	global_last_id = folder_id; 
	global_last_str1 = folder_name;
	global_last_str2 = is_author;
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_my_folder_list' },
		data: { 'folder_id': folder_id },
		success: function( data ) {
			objects = svc_get_json( data );
			var tx = '';
			tx += '<h3>' + folder_name + '</h3>';
			if ( is_author != '' ){
				tx += '<div id="new-folder-object" style="margin-bottom:1rem;width:100%">';
				tx += '<div style="display:inline-block"><button class="btn btn-success btn-xs" onclick="repw_object_insert(' + folder_id +')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'OBJECT' ) + '</button></div>';
				tx += '</div>'; 
			}
			tx += rep_objects_list( objects, 0, 2 );
			$( '#svc-main-content-0' ).html( tx );
			$( '#svc-main-content-0' ).show();
		}
	});
	
}





/***** OBJECTS ***********************************************************************************************************************************************************/

function rep_objects_list ( objects, parent, op_layout ) {
	/*
		op_layout 1 = full access
		op_layout 2 = my folders
	*/
	
	var tx = '';
	tx += '<table class="table table-hover table-light">';
	tx += '<tbody>';
	for ( var i = 0; i < objects.length ; i++ ) {

		var txline = '';
		txline += '<tr>';
		txline += '<td style="width:60%" onclick="';
		if ( objects[i]['OBJTYP_NAME'] == 'OBJ_QUIZ' ) {
			txline += 'rep_quiite_get(' + objects[i]['OBJECT_ID'] + ', 1 )';
		}
		else if  ( objects[i]['OBJTYP_NAME'] == 'OBJ_QUIZ_ASM' ) {
			txline += 'rep_quiasm_get(' + objects[i]['OBJECT_ID'] +')';
		}
		else if  ( objects[i]['OBJTYP_NAME'] == 'OBJ_ESSAY' ) {
			txline += 'rep_essite_get(' + objects[i]['OBJECT_ID'] + ', 1 )';
		}
		else if  ( objects[i]['OBJTYP_NAME'] == 'OBJ_TEXT' ) {
			txline += 'rep_htmobj_get(' + objects[i]['OBJECT_ID'] +')';
		}
		
		else {
			txline += 'alert( \'WORK IN PROGRESS\' );' //WORK_IN_PROGRESS: fazer outros objetos
		}
		
		txline += '"><a href="#">';
		txline += '<i class="fa fa-' + objects[i]['OBJTYP_ICON'] +'" title="' + svc_lang_str( objects[i]['OBJTYP_NAME'] ) + '"></i>&nbsp;&nbsp;&nbsp;';
		txline += objects[i]['OBJECT_NAME'];
		if ( objects[i]['OBJECT_ACTIVE'] == 1 ){
			txline += '&nbsp;&nbsp;&nbsp;<i style="color:blue" title="' + svc_lang_str( 'ACTIVE' ) + '" class="fa fa-check"></i>'
		}
		else {
			txline += '&nbsp;&nbsp;&nbsp;<i style="color:red" title="' + svc_lang_str( 'INACTIVE' ) + '" class="fa fa-ban"></i>'
		}
		if ( global_master == 1 ) txline += '<span class="svc-master">OBJECT_ID: ' + objects[i]['OBJECT_ID'] + '</span>';
		txline += '</a></td>';
		
		for ( var j = 1; j < 6; j++ ){
			if  ( objects[i]['FOLDER_REVIEWER' + j + '_ID'] == 0 ) break;
			var ic = '<i class="fa fa-clock-o text-info"></i>';
			if ( objects[i]['OBJECT_REV_' + j] == 1 ) ic = '<i class="fa fa-check text-primary"></i>';
			else if ( objects[i]['OBJECT_REV_' + j] == 2 ) ic = '<i class="fa fa-times text-danger"></i>';
			txline += '<td data-toggle="tooltip" data-placement="top" title="' + objects[i]['OBJECT_REV_COMMENT_' + j] + '">'; //WORK_IN_PROGRESS <-------- Fazer esse tooltip funcionar!
			if ( 
				objects[i]['OBJECT_ACTIVE'] == 1 
				&& objects[i]['IS_REVIEWER_' + j] == 1 
				&& ( j == 5 || objects[i]['OBJECT_REV_' + (j+1)] != 1 )
				&& ( j == 1 || objects[i]['OBJECT_REV_' + (j-1)] == 1 )
			) {
				txline += '<button class="btn btn-xs" onclick="repw_object_review(' + objects[i]['OBJECT_ID'] + ', ' + j +')">' + ic + '</button>';
			}
			else {
				txline += ic;
			}
			txline += '</td>';
		}
		
		if ( objects[i]['PERMISSION'] == 1 && objects[i]['OBJECT_REV_1'] != 1 ) {
			txline += '<td align="right">';
			txline += '<button class="btn btn-info btn-xs" onclick="repw_object_tag(' + objects[i]['OBJECT_ID'] + ')"><i class="fa fa-tags"></i></button>';
			if ( op_layout != 2 ) txline += '<button class="btn btn-success btn-xs" onclick="repw_object_move(' + objects[i]['OBJECT_ID'] + ',' + parent + ')"><i class="fa fa-arrows"></i></button>';
			txline += '<button class="btn btn-primary btn-xs" onclick="repw_object_update(' + objects[i]['OBJECT_ID'] + ',' + parent + ',\'' + objects[i]['OBJECT_NAME'] + '\', ' + objects[i]['OBJECT_ACTIVE'] +')"><i class="fa fa-pencil"></i></button>';
			txline += '<button class="btn btn-danger btn-xs" onclick="repw_object_delete(' + objects[i]['OBJECT_ID'] + ',' + parent + ')"><i class="fa fa-trash-o"></i></button>';
			txline += '</td>';
		}
		else {
			txline += '<td></td>';
		}
		txline += '</tr>';
		
		if ( op_layout == 2 && objects[i]['OBJTYP_NAME'] == 'OBJ_QUIZ_ASM' ) {
			tx += '';
		}
		else {
			tx += txline;
		}
	
	}
	tx += '</tbody>';
	tx += '</table>';

	return tx;
}






/***** TXTITE & TXTSEG ***********************************************************************************************************************************************************/
                                    
                 
//get and display content from EDITOR                                                
function rep_txtite_get( txtite_id, div_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_txtite_get' },
		data: { 'txtite_id': txtite_id },
		success: function( data ) {
			var rows = svc_get_json( data );
			var tx = '';
			for ( var i = 0; i < rows.length ; i++ ) {
				if ( rows[i]['TXTSEG_TYPE'] == 'TXT' ){
					tx += '<div class="svc-editor-txt-' + rows[i]['TXTSEG_STYLE'] + '">' + rows[i]['TXTSEG_CONTENT'] + '</div>';
				}
				
				else if ( rows[i]['TXTSEG_TYPE'] == 'IMG' ){
					tx += '<div class="svc-editor-img-1">';
					tx += '<img class="svc-editor-img-2" style="max-width:' + rows[i]['TXTSEG_STYLE'] + 'px" src="' + rows[i]['TXTSEG_CONTENT'] + '" />';
					tx += '</div>'; 
				}
				
				
				else if ( rows[i]['TXTSEG_TYPE'] == 'YOU' ){
					var content = rows[i]['TXTSEG_CONTENT'];
					content = '<iframe width="560" height="349" src="https://www.youtube.com/embed/' + content +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
					tx += '<div class="svc-editor-you">' + content + '</div>';
				}
				
				else if ( rows[i]['TXTSEG_TYPE'] == 'FOR' ){
					var content = rows[i]['TXTSEG_CONTENT'];
					content = katex.renderToString( content, {throwOnError: false} );
					tx += '<div class="svc-editor-for">' + content + '</div>';
				}
			}
			$( '#' + div_id ).html( tx );
		}
	});
}
                                            






/***** QUIITE & QUIOPT ***********************************************************************************************************************************************************/
                

//show quiz										   
function rep_quiite_get( object_id, svc_main_content_id ) {
		
	svc_master_function( 'rep_quiite_get(' + object_id + ', ' + svc_main_content_id  + ') @ solverscope_rep.js' );

	global_last_id = object_id;
	global_last_str1 = 'rep_quiite_get';
	
	$( '#svc-main-content-body-' + svc_main_content_id ).html( global_processing );

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_quiite_get' },
		data: { 'object_id': object_id },
		success: function( data ) {

			var rows = svc_get_json( data );
			var object_name = rows[0]['OBJECT_NAME'];
			var command_id = rows[0]['QUIITE_TXTITE_ID_COMMAND'];
			var feedback_id = rows[0]['QUIITE_TXTITE_ID_FEEDBACK'];
			var quiite_id = rows[0]['QUIITE_ID'];
			var folder_id = rows[0]['OBJECT_FOLDER_ID'];
			var author_name = rows[0]['AUTHOR_NAME'];

			var permission = rows[0]['PERMISSION'];
			if ( rows[0]['OBJECT_REV_1'] == 1 ) permission = 0;
			
			var tx = '';

			//name
			var header = object_name;
			header += '<span style="font-size:80%;margin-left:1rem;"> (ID: ' + quiite_id + ')</span>';
			$( '#svc-main-content-header-' + svc_main_content_id ).html( header );
			tx += '<h4 class="ml-2">' + svc_lang_str( 'AUTHOR' ) + ': ' + author_name +'</h4>';
			tx += '<div class="svc-main-content-path" id="object-path"></div>';
			

			//command
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'COMMAND' );
			if ( global_master == 1 ) tx += '<span class="svc-master">TXTITE_ID: ' + command_id + '</span>';
			tx += '</header>';
			if ( permission == 1 ) tx += '<div class="float-right"><button type="button" class="btn btn-primary" onclick="repw_txtite_update(' + command_id + ')"><i class="fa fa-pencil"></i></button></div>';
			tx += '</div>';
			tx += '<div class="card-body texseg" id="texseg-' + command_id +'"></div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			//feedback
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'FEEDBACK' );
			if ( global_master == 1 ) tx += '<span class="svc-master">TXTITE_ID: ' + feedback_id + '</span>';
			tx += '</header>';
			if ( permission == 1 ) tx += '<div class="float-right"><button type="button" class="btn btn-primary" onclick="repw_txtite_update(' + feedback_id + ')"><i class="fa fa-pencil"></i></button></div>';
			tx += '</div>';
			tx += '<div class="card-body texseg" id="texseg-' + feedback_id +'"></div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			//options
			for ( var i = 0; i < rows.length ; i++ ) {
				var icon = 'ban';
				var color = 'red';
				if ( rows[i]['QUIOPT_CORRECT'] == 1 ) {
					icon = 'check';
					color = 'blue';
				}
				tx += '<div class="col-md-12">';
				tx += '<div class="card">';
				tx += '<div class="card-head">';
				tx += '<header>' + svc_lang_str( 'OPTION' ) + ' ' + rows[i]['QUIOPT_ORDERBY'] + '&nbsp;&nbsp;&nbsp;&nbsp;<i style="color:' + color + '" class="fa fa-' + icon +'"></i>';
				if ( global_master == 1 ) tx += '<span class="svc-master">QUIOPT_ID: ' + rows[i]['QUIOPT_ID'] + '</span>&nbsp;&nbsp;';
				if ( global_master == 1 ) tx += '<span class="svc-master">QUIOPT_TXTITE_ID: ' + rows[i]['QUIOPT_TXTITE_ID'] + '</span>';
				tx += '</header>';
				tx += '<div class="float-right">';
				if ( permission == 1 ) tx += '<button type="button" class="btn btn-success" onclick="repw_quiopt_update(' + rows[i]['QUIOPT_ID'] + ', ' + rows[i]['QUIOPT_ORDERBY'] + ', ' + rows[i]['QUIOPT_CORRECT'] + ', ' + object_id + ')"><i class="fa fa-arrows"></i></button> ';
				if ( permission == 1 ) tx += '<button type="button" class="btn btn-primary" onclick="repw_txtite_update(' + rows[i]['QUIOPT_TXTITE_ID'] + ')"><i class="fa fa-pencil"></i></button> ';
				if ( permission == 1 ) tx += '<button type="button" class="btn btn-danger" onclick="repw_quiopt_delete(' + rows[i]['QUIOPT_ID'] + ', ' + object_id + ')"><i class="fa fa-trash-o"></i></button>';
				tx += '</div>';
				tx += '</div>';
				tx += '<div class="card-body texseg" id="texseg-' + rows[i]['QUIOPT_TXTITE_ID'] +'"></div>';
				tx += '</div>';
				tx += '</div>';
				tx += '</div>';

			}

			if ( permission == 1 ) {

				tx += '<div class="col-md-12">';
				tx += '<div class="card">';
				tx += '<div class="card-head">';
				tx += '<header>' + svc_lang_str( 'OPTION' ) + '</header>';
				tx += '<div class="float-right">';
				tx += '<button type="button" class="btn btn-success" onclick="repw_quiopt_insert(' + rows[0]['QUIITE_ID'] + ', ' + object_id + ')"><i class="fa fa-plus"></i></button>';
				tx += '</div>';
				tx += '</div>';
				tx += '</div>';
				tx += '</div>';

			}

			$( '#svc-main-content-body-' + svc_main_content_id ).html( tx );

			//get and populate texts
			$( '.texseg' ).each( function(){
				var id = $( this ).attr( 'id' );
				id = id.replace( 'texseg-', '' );
				rep_txtite_get( id, 'texseg-' + id );
			});

			$( '#svc-main-content-' + ( svc_main_content_id-1 ) ).hide();
			$( '#svc-main-content-' + svc_main_content_id ).show();

			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'rep_folder_path' },
				data: { 'folder_id': folder_id },
				success: function( data ) {
					var rows = svc_get_json( data );
					var tx = '';
					for ( var i = 0; i < rows.length ; i++ ) {
						tx = '/' + rows[i]['FOLDER_NAME'] + tx;
					}
					tx = '..' + tx;

					$( '#object-path' ).html( tx );
				}
			});

		}
	});

}          



/***** QUIASM & QUIAIT ***********************************************************************************************************************************************************/
                                    

//show quiz assessment (quiasm)							   
function rep_quiasm_get( object_id ) {
	
	svc_master_function( 'rep_quiasm_get(' + object_id + ') @ solverscope_rep.js' );
	
	$( '#svc-main-content-body-1' ).html( global_processing );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_quiasm_get' },
		data: { 'object_id': object_id },
		success: function( data ) {
			var rows = svc_get_json( data );

			var object_name = rows[0]['OBJECT_NAME'];
			var quiasm_id = rows[0]['QUIASM_ID'];
			var quiasm_max_items = rows[0]['QUIASM_MAX_ITEMS'];
			var quiasm_random_items = rows[0]['QUIASM_RANDOM_ITEMS'];
			var quiasm_random_options = rows[0]['QUIASM_RANDOM_OPTIONS'];
			var permission = rows[0]['PERMISSION'];
			var author_name = rows[0]['AUTHOR_NAME'];
	
			var tx = '';
			var chk = '';
			
			if ( global_master == 1 ) object_name += '<span class="svc-master">QUIASM_ID: ' + quiasm_id + '</span>';
	
			//name
			$( '#svc-main-content-header-1' ).html( object_name );
			tx += '<h4 class="ml-2">' + svc_lang_str( 'AUTHOR' ) + ': ' + author_name +'</h4>';
	
	
			//settings BEGIN
	
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'SETTINGS' ) + '</header>';
			tx += '<div class="float-right">';
			if ( permission == 1 ) tx += '&nbsp;&nbsp;<button type="button" class="btn btn-primary" onclick="repw_quiasm_update(' + quiasm_id + ', ' + object_id + ')"><i class="fa fa-pencil"></i></button>';
			tx += '</div>';
			tx += '</div>';
			tx += '<div class="card-body">';
	
			tx += '<table>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:1rem">' + svc_lang_str( 'QUIZ_ASM_MAX_ITEMS' ) + '&nbsp;&nbsp;&nbsp;</td>';
			tx += '<td style="padding-bottom:1rem"><input disabled type="text" style="width:4rem;text-align:center" class="form-control" value="' + quiasm_max_items + '"></td>';
			tx += '</tr>';

			chk = '';
			if ( quiasm_random_items == 1 ) chk = ' checked ';
			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'QUIZ_ASM_RANDOM_ITEMS' ) + '</td>';
			tx += '<td>';
			tx += '<label class="switchToggle">';
		    tx += '<input disabled type="checkbox" ' + chk;
			tx += '>';
			tx += '<span class="slider aqua round"></span>';
			tx += '</label>';
			tx += '</td>';
			tx += '</tr>';
	
			chk = '';
			if ( quiasm_random_options == 1 ) chk = ' checked ';
			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'QUIZ_ASM_RANDOM_OPTIONS' ) + '</td>';
			tx += '<td>';
			tx += '<label class="switchToggle">';
		    tx += '<input disabled type="checkbox" ' + chk;
			tx += '>';
			tx += '<span class="slider aqua round"></span>';
			tx += '</label>';
			tx += '</td>';
			tx += '</tr>';
		
			tx += '</table>';

			tx += '</div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';
	
			//settings END


			//items BEGIN
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'ITEMS' ) + '</header>';
			if ( permission == 1 ) {
				tx += '<div class="float-right">';
				tx += '<button type="button" class="btn btn-primary mr-3" onclick="repw_quiait_insert_this(' + quiasm_id + ', ' + object_id + ')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'THIS_FOLDER' ) + '</button>';
				tx += '<button type="button" class="btn btn-primary mr-3" onclick="repw_quiait_insert_other(' + quiasm_id + ', ' + object_id + ', 0 )"><i class="fa fa-plus"></i> ' + svc_lang_str( 'OTHER_FOLDER' ) + '</button>';
				tx += '<button type="button" class="btn btn-primary mr-3" onclick="repw_quiait_insert_id(' + quiasm_id + ', ' + object_id + ')"><i class="fa fa-plus"></i> ID</button>';
				tx += '</div>';
			}
			tx += '</div>';
			tx += '<div class="card-body">';
	
			tx += '<table class="table table-hover">';
	
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'rep_quiait_list' },
				data: { 'quiasm_id': quiasm_id },
				success: function( data1 ) {
					var rows1 = svc_get_json( data1 );

					for ( var i = 0; i < rows1.length ; i++ ) {
						var quiait_id = rows1[i]['QUIAIT_ID'];
						var quiite_id = rows1[i]['QUIAIT_QUIITE_ID'];
						var quiait_orderby = rows1[i]['QUIAIT_ORDERBY'];
						var object_name = rows1[i]['OBJECT_NAME'];
						var object_id2 = rows1[i]['OBJECT_ID'];
						var object_active = rows1[i]['OBJECT_ACTIVE'];
						
						tx += '<tr>';
						tx += '<td>' + quiait_orderby + '</td>';
						tx += '<td style="width:60%"><a href="#" onclick="rep_quiite_get(' + object_id2 + ', 2 )">' + object_name + '</a>';
						if ( object_active == 1 ){
							tx += '&nbsp;&nbsp;&nbsp;<i style="color:blue" title="' + svc_lang_str( 'ACTIVE' ) + '" class="fa fa-check"></i>'
						}
						else {
							tx += '&nbsp;&nbsp;&nbsp;<i style="color:red" title="' + svc_lang_str( 'INACTIVE' ) + '" class="fa fa-ban"></i>'
						}
						if ( global_master == 1 ) {
							tx += '<span class="svc-master">QUIAIT_ID: ' + quiait_id + '</span>&nbsp;&nbsp;&nbsp;';
							tx += '<span class="svc-master">QUIAIT_QUIITE_ID: ' + quiite_id + '</span>';
						}
						tx += '</td>';
						if ( permission == 1 ) {
							tx += '<td align="right">';
							tx += '<button type="button" class="btn btn-primary" onclick="repw_quiait_update(' + quiait_id + ', ' + object_id + ', ' + quiait_orderby + ')"><i class="fa fa-pencil"></i></button>&nbsp;';
							tx += '<button type="button" class="btn btn-danger" onclick="repw_quiait_delete(' + quiait_id + ', ' + object_id + ')"><i class="fa fa-trash"></i></button>&nbsp;';
							tx += '</td>';
						}
						tx += '</tr>';
					
					}
	
					tx += '</table>';

					tx += '</div>';
					tx += '</div>';
					tx += '</div>';
					tx += '</div>';
					//items END

					$( '#svc-main-content-body-1' ).html( tx );
					$( '#svc-main-content-0' ).hide();
					$( '#svc-main-content-1' ).show();
			
				}
			});
		
			
		}
	});
	
}






/***** ESSITE ***********************************************************************************************************************************************************/
                                    

//show essay						   
function rep_essite_get( object_id , svc_main_content_id ) {
	
	svc_master_function( 'rep_essite_get(' + object_id + ', ' + svc_main_content_id  + ') @ solverscope_rep.js' );

	global_last_id = object_id;
	global_last_str1 = 'rep_essite_get';

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_essite_get' },
		data: { 'object_id': object_id },
		success: function( data ) {

			var rows = svc_get_json( data );
			var object_name = rows[0]['OBJECT_NAME'];
			var command_id = rows[0]['ESSITE_TXTITE_ID_COMMAND'];
			var feedback_id = rows[0]['ESSITE_TXTITE_ID_FEEDBACK'];
			var essite_id = rows[0]['ESSITE_ID'];
			var folder_id = rows[0]['OBJECT_FOLDER_ID'];
			var author_name = rows[0]['AUTHOR_NAME'];

			var permission = rows[0]['PERMISSION'];
			if ( rows[0]['OBJECT_REV_1'] == 1 ) permission = 0;
			
			var tx = '';

			//name
			var header = object_name;
			if ( global_master == 1 ) header += '<span class="svc-master">ESSITE_ID: ' + essite_id + '</span>';
			$( '#svc-main-content-header-' + svc_main_content_id ).html( header );
			tx += '<h4 class="ml-2">' + svc_lang_str( 'AUTHOR' ) + ': ' + author_name +'</h4>';
			tx += '<div class="svc-main-content-path" id="object-path"></div>';

			//command
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'COMMAND' );
			if ( global_master == 1 ) tx += '<span class="svc-master">TXTITE_ID: ' + command_id + '</span>';
			tx += '</header>';
			if ( permission == 1 ) tx += '<div class="float-right"><button type="button" class="btn btn-primary" onclick="repw_txtite_update(' + command_id + ')"><i class="fa fa-pencil"></i></button></div>';
			tx += '</div>';
			tx += '<div class="card-body texseg" id="texseg-' + command_id +'"></div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			//feedback
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'FEEDBACK' );
			if ( global_master == 1 ) tx += '<span class="svc-master">TXTITE_ID: ' + feedback_id + '</span>';
			tx += '</header>';
			if ( permission == 1 ) tx += '<div class="float-right"><button type="button" class="btn btn-primary" onclick="repw_txtite_update(' + feedback_id + ')"><i class="fa fa-pencil"></i></button></div>';
			tx += '</div>';
			tx += '<div class="card-body texseg" id="texseg-' + feedback_id +'"></div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			$( '#svc-main-content-body-' + svc_main_content_id ).html( tx );

			//get and populate texts
			$( '.texseg' ).each( function(){
				var id = $( this ).attr( 'id' );
				id = id.replace( 'texseg-', '' );
				rep_txtite_get( id, 'texseg-' + id );
			});

			$( '#svc-main-content-' + ( svc_main_content_id-1 ) ).hide();
			$( '#svc-main-content-' + svc_main_content_id ).show();

			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'rep_folder_path' },
				data: { 'folder_id': folder_id },
				success: function( data ) {
					var rows = svc_get_json( data );
					var tx = '';
					for ( var i = 0; i < rows.length ; i++ ) {
						tx = '/' + rows[i]['FOLDER_NAME'] + tx;
					}
					tx = '..' + tx;

					$( '#object-path' ).html( tx );
				}
			});

		}
	});
	
	
}





/***** TEXT (HTML Object) ***********************************************************************************************************************************************************/
                                    

//show htmobj						   
function rep_htmobj_get( object_id ) {
	
	svc_master_function( 'rep_htmobj_get(' + object_id + ') @ solverscope_rep.js' );

	global_last_id = object_id;
	global_last_str1 = 'rep_htmobj_get';

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_htmobj_get' },
		data: { 'object_id': object_id },
		success: function( data ) {

			var rows = svc_get_json( data );
			var object_name = rows[0]['OBJECT_NAME'];
			var command_id = rows[0]['HTMOBJ_TXTITE_ID'];
			var htmobj_id = rows[0]['HTMOBJ_ID'];
			var folder_id = rows[0]['OBJECT_FOLDER_ID'];
			var author_name = rows[0]['AUTHOR_NAME'];

			var permission = rows[0]['PERMISSION'];
			if ( rows[0]['OBJECT_REV_1'] == 1 ) permission = 0;
			
			var tx = '';

			//name
			var header = object_name;
			if ( global_master == 1 ) header += '<span class="svc-master">HTMOBJ_ID: ' + htmobj_id + '</span>';
			$( '#svc-main-content-header-1' ).html( header );
			tx += '<h4 class="ml-2">' + svc_lang_str( 'AUTHOR' ) + ': ' + author_name +'</h4>';
			tx += '<div class="svc-main-content-path" id="object-path"></div>';

			//text
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<header>' + svc_lang_str( 'TEXT' );
			if ( global_master == 1 ) tx += '<span class="svc-master">TXTITE_ID: ' + command_id + '</span>';
			tx += '</header>';
			if ( permission == 1 ) tx += '<div class="float-right"><button type="button" class="btn btn-primary" onclick="repw_txtite_update(' + command_id + ')"><i class="fa fa-pencil"></i></button></div>';
			tx += '</div>';
			tx += '<div class="card-body texseg" id="texseg-' + command_id +'"></div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			$( '#svc-main-content-body-1'  ).html( tx );

			//get and populate texts
			$( '.texseg' ).each( function(){
				var id = $( this ).attr( 'id' );
				id = id.replace( 'texseg-', '' );
				rep_txtite_get( id, 'texseg-' + id );
			});

			$( '#svc-main-content-0' ).hide();
			$( '#svc-main-content-1' ).show();

			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'rep_folder_path' },
				data: { 'folder_id': folder_id },
				success: function( data ) {
					var rows = svc_get_json( data );
					var tx = '';
					for ( var i = 0; i < rows.length ; i++ ) {
						tx = '/' + rows[i]['FOLDER_NAME'] + tx;
					}
					tx = '..' + tx;

					$( '#object-path' ).html( tx );
				}
			});

		}
	});
	
	
}

