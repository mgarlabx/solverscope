/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/***** MODULES ***********************************************************************************************************************************************************/


function modw_module_insert(){

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_MODULE_CODE' ) );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_module_insert_save()">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModalBody' ).html( '<input style="width:100%" id="module-input">' );
	$( '#myModal' ).modal( 'show' );

}




function modw_module_insert_save(){
	
	var module_input = $( '#module-input' ).val().trim();
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_module_insert' },
		data: { 'module_input': module_input },
		success: function( data ) {
			if ( data.trim() != 0 ) {
				mod_module_get( data.trim() );
			}
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}





function modw_module_update( module_id, column ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_module_get' },
		data: { 'module_id': module_id },
		success: function( data ) {

			var module = svc_get_json( data );

			$( '#myModalTitle' ).html( svc_lang_str( column ) );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_module_update_save(' + module_id + ',\'' + column + '\')">' + svc_lang_str( 'SAVE' ) + '</button>' );

			var tx = '';

			if ( column == 'MODLBL_NAME' ) {
				$.ajax({
					url: 'app/',
					type: 'POST',
					headers: { 'tk': tk, 'procedure': 'mod_modlbl_list' },
					success: function( data1 ) {
						var rows = svc_get_json( data1 );
						tx += '<select id="module-input" style="width:100%">';
						for ( var i = 0; i < rows.length; i++ ){
							tx += '<option ';
							if ( rows[i]['MODLBL_NAME'] ==  module['MODLBL_NAME'] ) tx += 'selected ';
							tx += 'value="' + rows[i]['MODLBL_ID'] + '">' + rows[i]['MODLBL_NAME'] + '</option>';
						}
						tx += '</select>';
						$( '#myModalBody' ).html( tx );
						$( '#myModal' ).modal( 'show' );
					}
				});
			}
			
			else if ( column == 'MODTYP_NAME' ) {
				$.ajax({
					url: 'app/',
					type: 'POST',
					headers: { 'tk': tk, 'procedure': 'mod_modtyp_list' },
					data: { 'modlbl_id': module['MODLBL_ID'] },
					success: function( data1 ) {
						var rows = svc_get_json( data1 );
						tx += '<select id="module-input" style="width:100%">';
						for ( var i = 0; i < rows.length; i++ ){
							tx += '<option ';
							if ( rows[i]['MODTYP_NAME'] ==  module['MODTYP_NAME'] ) tx += 'selected ';
							tx += 'value="' + rows[i]['MODTYP_ID'] + '">' + rows[i]['MODTYP_NAME'] + '</option>';
						}
						tx += '</select>';
						$( '#myModalBody' ).html( tx );
						$( '#myModal' ).modal( 'show' );
					}
				});
			}

			else {
				if ( column == 'MODULE_SUMMARY' || column == 'MODULE_DESCRIPTION' ) {
					tx += '<textarea style="width:100%;resize: none;" rows="10" id="module-input">' + module[column] + '</textarea>';
				}
				else {
					tx += '<input style="width:100%" id="module-input" value="' + module[column] +'">';
				}
				$( '#myModalBody' ).html( tx );
				$( '#myModal' ).modal( 'show' );
			}


		}
	});
	
	
	
}

function modw_module_update_save( module_id, column ) {
	
	var module_input = $( '#module-input' ).val().trim();
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_module_update' },
		data: { 'module_id': module_id, 'column': column, 'module_input': module_input },
		success: function( data ) {
			if ( column == 'MODULE_SUMMARY' ) {
				$( '#module-summary').html( svc_line_break( module_input ) );
			}
			else if ( column == 'MODULE_DESCRIPTION' ) {
				$( '#module-description').html( svc_line_break( module_input ) );
			}
			else {
				mod_module_get( module_id );
			}
			$( '#myModal' ).modal( 'hide' );
			
			
		}
	});

}


function modw_module_delete( module_id ) {
	
	if ( confirm( svc_lang_str( 'CONFIRM_MODULE_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_module_delete' },
			data: { 'module_id': module_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'MODULE_NOT_EMPTY' ) ); 
				}
				else {
					$( '#svc-module-text' ).val( '' );
					$( '#modules' ).html( '' );
					$( '#svc-main-content-1' ).hide();
					$( '#svc-main-content-0' ).show();
				}
			}
		});
		
	}
}









/***** TEMPLATES ***********************************************************************************************************************************************************/


function modw_templa_insert( module_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_templa_insert' },
		data: { 'module_id': module_id },
		success: function( data ) {
			mod_templa_list( module_id );
		}
	});
	
}




function modw_templa_delete( templa_id, module_id ) {
	
	if ( confirm( svc_lang_str( 'CONFIRM_TEMPLA_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_templa_delete' },
			data: { 'templa_id': templa_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'TEMPLA_NOT_EMPTY' ) ); 
				}
				else {
					mod_templa_list( module_id );
				}
			}
		});
		
	}
}


function modw_templa_update( templa_id, module_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_templa_get' },
		data: { 'templa_id': templa_id },
		success: function( data ) {
			var templa = svc_get_json( data );
			
			var tx = '';
			
			tx += '<table>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'DATE' ) + '&nbsp;&nbsp;&nbsp;</td>';
			tx += '<td style="width:100%;padding-bottom:2rem"><input type="text" class="form-control" id="templa-date" value="' + svc_date_format( templa['TEMPLA_DATE'] ) + '"></td>'; //WORK_IN_PROGRESS: incluir um datepicker
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'ACTIVE' ) + '</td>';
			tx += '<td>';
			tx += '<label class="switchToggle">';
		    tx += '<input type="checkbox" ';
			if ( templa['TEMPLA_ACTIVE'] == 1 ) tx += 'checked ';
			tx += 'id="templa-active">';
			tx += '<span class="slider aqua round"></span>';
			tx += '</label>';
			tx += '</td>';
			tx += '</tr>';
	
			tx += '</table>';

			$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_TEMPLA_INFO' ) );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_templa_update_save(' + templa_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			//$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_templa_update_save(' + templa_id + ',' + module_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			$( '#myModalBody' ).html( tx );
			$( '#myModal' ).modal( 'show' );

		}
	});
	
}

function modw_templa_update_save( templa_id ){
	var templa_date = $( '#templa-date' ).val();
	var templa_active = $( '#templa-active' ).is( ':checked' );
	if ( templa_active ) {
		templa_active = 1;
	}
	else {
		templa_active = 0;
	}
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_templa_update' },
		data: { 'templa_id': templa_id, 'templa_date': templa_date, 'templa_active': templa_active },
		success: function( data ) {
			if ( data.trim() != 0 ) {
				$( '#mod-templa-date' ).html( templa_date );
				if ( templa_active == 1 ) {
					$( '#mod-templa-active' ).html( '<i title="' + svc_lang_str( 'ACTIVE' ) + '" class="fa fa-check"></i>' );
				}
				else {
					$( '#mod-templa-active' ).html( '' );
				}
				$( '#myModal' ).modal( 'hide' );
			}
		}
	});

	
}


function modw_tpphas_insert( templa_id, permission ){
	
	var phase_number = prompt( svc_lang_str( 'PROMPT_PHASE_NUMBER' ) );

	if ( phase_number != null && phase_number.trim() != '' ) {

		var phase_weight = prompt( svc_lang_str( 'PROMPT_PHASE_WEIGHT' ) );

		if ( phase_weight != null && phase_weight.trim() != '' ) {
	
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'modw_tpphas_insert' },
				data: { 'templa_id': templa_id, 'phase_number': phase_number, 'phase_weight': phase_weight },
				success: function( data ) {
					mod_tpphas_tpsegm_list( templa_id, permission );		
				}
			});  
	
		}
	
	}
	
	
	
}


function modw_tpphas_delete( tpphas_id, templa_id, permission ){
	if ( confirm( svc_lang_str( 'CONFIRM_DEL' ) ) ) {
		
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_tpphas_delete' },
			data: { 'tpphas_id': tpphas_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'TPPHAS_NOT_EMPTY' ) ); 
				}
				else {
					mod_tpphas_tpsegm_list( templa_id, permission );
				}
			}
		});  
		
		
	}
	
}



/***** UNITS ***********************************************************************************************************************************************************/


function modw_tpunit_insert( templa_id, module_id ) {
	
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_TPUNIT_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="tpunit-name">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpunit_insert_save(' + templa_id + ', ' + module_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );

}


function modw_tpunit_insert_save( templa_id, module_id ) {
	
	$( '#svc-main-content-body-2' ).html( global_processing )
	
	var tpunit_name = $( '#tpunit-name' ).val();
	tpunit_name = tpunit_name.trim();
	if ( tpunit_name != '' && tpunit_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_tpunit_insert' },
			data: { 'templa_id': templa_id, 'tpunit_name': tpunit_name },
			success: function( data ) {
				mod_templa_get( templa_id, module_id );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
	
}



function modw_tpunit_update( tpunit_id, templa_id, module_id ) {

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_tpunit_get' },
		data: { 'tpunit_id': tpunit_id },
		success: function( data ) {

			var tpunit = svc_get_json( data );
			
			var tx = '';
			tx += '<table>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'NAME' ) + '&nbsp;&nbsp;&nbsp;</td>';
			tx += '<td style="width:100%;padding-bottom:2rem"><input type="text" class="form-control" id="tpunit-name" value="' + tpunit['TPUNIT_NAME'] + '"></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'ORDER_BY' ) + '&nbsp;&nbsp;&nbsp;</td>';
			tx += '<td style="width:100%;padding-bottom:2rem"><input type="text" class="form-control" id="tpunit-orderby" value="' + tpunit['TPUNIT_ORDERBY'] + '"></td>';
			tx += '</tr>';

			tx += '</table>';

			$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_UNIT_DATA' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpunit_update_save(' + tpunit_id + ',' + templa_id + ',' + module_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			$( '#myModal' ).modal( 'show' );

		}
	});

}



function modw_tpunit_update_save( tpunit_id, templa_id, module_id ) {

	$( '#svc-main-content-body-2' ).html( global_processing )
	
	var tpunit_name = $( '#tpunit-name' ).val();
	var tpunit_orderby = $( '#tpunit-orderby' ).val();
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_tpunit_update' },
		data: { 'tpunit_id': tpunit_id, 'tpunit_name': tpunit_name, 'tpunit_orderby': tpunit_orderby },
		success: function( data ) {
			mod_templa_get( templa_id, module_id );
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}




function modw_tpunit_delete( tpunit_id, templa_id, module_id ) {


	if ( confirm( svc_lang_str( 'CONFIRM_TPUNIT_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_tpunit_delete' },
			data: { 'tpunit_id': tpunit_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'TPUNIT_NOT_EMPTY' ) ); 
				}
				else {
					mod_templa_get( templa_id, module_id );
				}
			}
		});
		
	}
	
}





/***** SEGMENTS ***********************************************************************************************************************************************************/


function modw_tpsegm_insert( tpunit_id, templa_id, permission ) {
	
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_TPSEGM_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="tpsegm-name">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpsegm_insert_save(' + tpunit_id + ', ' + templa_id + ',' + permission + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
	
}


function modw_tpsegm_insert_save( tpunit_id, templa_id, permission ) {
	
	var tpsegm_name = $( '#tpsegm-name' ).val();
	
	$( '#tpunit-' + tpunit_id ).html( global_processing );
	
	tpsegm_name = tpsegm_name.trim();
	if ( tpsegm_name != '' && tpsegm_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_tpsegm_insert' },
			data: { 'tpunit_id': tpunit_id, 'tpsegm_name': tpsegm_name },
			success: function( data ) {
				mod_tpsegm_list( tpunit_id, templa_id, permission );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
	
	
}




function modw_tpsegm_object( tpsegm_id, permission ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_tpsegm_get' },
		data: { 'tpsegm_id': tpsegm_id },
		success: function( data ) {
			
			var segment = svc_get_json( data );
			var str_obj_id = '';
			var tx = '';
			
			$( '#myModalTitle' ).html( svc_lang_str( 'OBJECT_LINKED' ) );

			if ( permission == 1 ) {
				if ( segment['TPSEGM_OBJECT_ID'] == 0 ) {
					str_obj_id = '<input onkeyup="modw_tpsegm_object_refresh()" size="4" style="text-align:center" id="tpsegm-object-id">';
				}
				else {
					str_obj_id = '<input onkeyup="modw_tpsegm_object_refresh()" size="4" style="text-align:center" id="tpsegm-object-id" value="' + segment['TPSEGM_OBJECT_ID'] + '">';
				}
			}
			else {
				if ( segment['TPSEGM_OBJECT_ID'] == 0 ) {
					str_obj_id = '';
				}
				else {
					str_obj_id = segment['TPSEGM_OBJECT_ID'];
				}
			}
			
			tx += '<table cellpadding="10">';
			
			tx += '<tr>';
			tx += '<td width="150"><b>' + svc_lang_str( 'OBJECT_ID' ) + '</b></td>';
			tx += '<td>' + str_obj_id + '</td>';
			tx += '</tr>';
			
			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'NAME' ) + '</b></td>';
			tx += '<td id="tpsegm-object-name"></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TYPE' ) + '</b></td>';
			tx += '<td id="tpsegm-object-type"></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'FOLDER' ) + '</b></td>';
			tx += '<td id="tpsegm-object-folder"></td>';
			tx += '</tr>';

			tx += '</table>';
			
			$( '#myModalBody' ).html( tx );
			if ( permission == 1 ) {
				$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpsegm_object_save(' + tpsegm_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			}
			else {
				$( '#myModalButton' ).html( '' );
		
			}
			$( '#myModal' ).modal( 'show' );
			modw_tpsegm_object_refresh();

		}
	});
	
}

function modw_tpsegm_object_refresh() {

	var object_id = $( '#tpsegm-object-id' ).val();

	$( '#tpsegm-object-name' ).html( '<i class="fa fa-spinner fa-spin"></i>' );
	$( '#tpsegm-object-type' ).html( '' );
	$( '#tpsegm-object-folder' ).html( '' );

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_object_get' },
		data: { 'object_id': object_id },
		success: function( data ) {
			
			$( '#tpsegm-object-name' ).html( '' );
			$( '#tpsegm-object-type' ).html( '' );
			$( '#tpsegm-object-folder' ).html( '' );

			if ( data.length > 20 ) {
				var object = svc_get_json( data );
				if ( object['OBJECT_ACTIVE'] == 1 ){
					$( '#tpsegm-object-name' ).html( object['OBJECT_NAME'] );
					$( '#tpsegm-object-type' ).html( '<i class="fa fa-' + object['OBJTYP_ICON'] + '"></i> ' + svc_lang_str( object['OBJTYP_NAME'] ) );
					$( '#tpsegm-object-folder' ).html( '<a onclick="rep_folder_list(' + object['OBJECT_FOLDER_ID'] + ')" href="#">' + object['FOLDER_NAME'] + '</a>' );
				}
			}
			

		}
	});

}


function modw_tpsegm_object_save( tpsegm_id ) {
	var object_id = $( '#tpsegm-object-id' ).val();
	if ( object_id == '' ) object_id = 0;
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_tpsegm_object_update' },
		data: { 'tpsegm_id': tpsegm_id, 'object_id': object_id  },
		success: function( data ) {
			if ( object_id == 0 ) {
				$( '#object-button-' + tpsegm_id ).html( '<i style="color:#4BD396" class="fa fa-circle"></i>' );
			}
			else {
				$( '#object-button-' + tpsegm_id ).html( '<i class="fa fa-' + data.trim() + '"></i>' );
			}
		}
	});
	$( '#myModal' ).modal( 'hide' );
}







function modw_tpsegm_segrel( tpsegm_id ) {
	alert( 'WORK IN PROGRESS - modw_tpsegm_segrel' );
	//WORK_IN_PROGRESS: relação entre segmentos (adaptativo e requisitivo)
	
}





function modw_tpsegm_update( tpsegm_id, tpunit_id, templa_id, permission ){
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_tpphas_list' },
		data: { 'templa_id': templa_id },
		success: function( data1 ) {
			var phases = svc_get_json( data1 );

			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'mod_tpsegm_get' },
				data: { 'tpsegm_id': tpsegm_id },
				success: function( data ) {
			
					tpsegm = svc_get_json( data );

					var tx = '';
					tx += '<table class="table table-hover">';
					tx += '<tbody>';

					tx += '<tr>';
					tx += '<td width="200"><b>' + svc_lang_str( 'TPSEGM_ORDERBY' ) + '</b></td>';
					tx += '<td><input size="2" style="text-align:center" id="tpsegm-orderby" value="' + tpsegm['TPSEGM_ORDERBY'] + '"></td>';
					tx += '</tr>';

					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'TPSEGM_NAME' ) + '</b></td>';
					tx += '<td><input id="tpsegm-name" value="' + tpsegm['TPSEGM_NAME'] + '"></td>';
					tx += '</tr>';

					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'TPSEGM_DESCRIPTION' ) + '</b></td>';
					tx += '<td><input id="tpsegm-description" value="' + tpsegm['TPSEGM_DESCRIPTION'] + '"></td>';
					tx += '</tr>';
			
					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'TPSEGM_LENGTH' ) + '</b></td>';
					tx += '<td><input size="2" style="text-align:center" id="tpsegm-length" value="' + tpsegm['TPSEGM_LENGTH'] + '"></td>';
					tx += '</tr>';

					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'TPSEGM_ALLOW_UPLOAD' ) + '</b></td>';
					tx += '<td><label class="switchToggle">';
				    tx += '<input id="tpsegm-allow-upload" type="checkbox" ';
					if ( tpsegm['TPSEGM_ALLOW_UPLOAD'] == 1 ) tx += 'checked ';
					tx += 'id="object-active">';
					tx += '<span class="slider aqua round"></span>';
					tx += '</label></td>';
					tx += '</tr>';

					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'TPSEGM_MANUAL_GRADING' ) + '</b></td>';
					tx += '<td><label class="switchToggle">';
				    tx += '<input id="tpsegm-manual-grading" type="checkbox" ';
					if ( tpsegm['TPSEGM_MANUAL_GRADING'] == 1 ) tx += 'checked ';
					tx += 'id="object-active">';
					tx += '<span class="slider aqua round"></span>';
					tx += '</label></td>';
					tx += '</tr>';

					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'ASSESSMENT_PHASE' ) + '</b></td>';
					tx += '<td><select id="tpsegm-tpphas-id">';
					tx += '<option value="0"';
					if ( tpsegm['TPSEGM_TPPHAS_ID'] == 0 ) tx += ' SELECTED';
					tx += '>0</option>';
					for ( var i = 0; i < phases.length; i++ ) {
						tx += '<option value="' + phases[i]['TPPHAS_ID'] + '"';
						if ( tpsegm['TPSEGM_TPPHAS_ID'] == phases[i]['TPPHAS_ID'] ) tx += ' SELECTED';
						tx += '>' + phases[i]['TPPHAS_ORDERBY'] + '</option>';
					}
					tx += '</select></td>';
					tx += '</tr>';
			
					tx += '<tr>';
					tx += '<td><b>' + svc_lang_str( 'TPSEGM_WEIGHT' ) + '</b></td>';
					tx += '<td><input size="2" style="text-align:center" id="tpsegm-weight" value="' + tpsegm['TPSEGM_WEIGHT'] + '"></td>';

					tx += '</tr>';
			
					tx += '</tbody>';
					tx += '</table><p>';
	
					$( '#myModalTitle' ).html( svc_lang_str( 'SEGMENT' ) );
					$( '#myModalBody' ).html( tx );
					$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpsegm_update_save(' + tpsegm_id + ', ' + tpunit_id + ', ' + templa_id + ', ' + permission + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
					$( '#myModal' ).modal( 'show' );
			
				}
			});
	
		}
	});

}


function modw_tpsegm_update_save( tpsegm_id, tpunit_id, templa_id, permission ){

	var tpsegm_orderby = $( '#tpsegm-orderby' ).val();
	var tpsegm_name = $( '#tpsegm-name' ).val();
	var tpsegm_description = $( '#tpsegm-description' ).val();
	var tpsegm_length = $( '#tpsegm-length' ).val();
	var tpsegm_allow_upload = $( '#tpsegm-allow-upload' ).is( ':checked' );
	var tpsegm_manual_grading = $( '#tpsegm-manual-grading' ).is( ':checked' );
	var tpsegm_tpphas_id = $( '#tpsegm-tpphas-id' ).val();
	var tpsegm_weight = $( '#tpsegm-weight' ).val();

	tpsegm_orderby = tpsegm_orderby.trim();
	tpsegm_name = tpsegm_name.trim();
	tpsegm_description = tpsegm_description.trim();
	tpsegm_length = tpsegm_length.trim();
	if ( tpsegm_allow_upload ) {
		tpsegm_allow_upload = 1;
	}
	else {
		tpsegm_allow_upload = 0;
	}
	if ( tpsegm_manual_grading ) {
		tpsegm_manual_grading = 1;
	}
	else {
		tpsegm_manual_grading = 0;
	}
	tpsegm_tpphas_id = tpsegm_tpphas_id.trim();
	tpsegm_weight = tpsegm_weight.trim();

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'modw_tpsegm_update' },
		data: { 
			'tpsegm_id': tpsegm_id,
			'tpsegm_orderby': tpsegm_orderby,
			'tpsegm_name': tpsegm_name,
			'tpsegm_description': tpsegm_description,
			'tpsegm_length': tpsegm_length,
			'tpsegm_allow_upload': tpsegm_allow_upload,
			'tpsegm_manual_grading': tpsegm_manual_grading,
			'tpsegm_tpphas_id': tpsegm_tpphas_id,
			'tpsegm_weight': tpsegm_weight
		},
		success: function( data ) {
			mod_tpsegm_list( tpunit_id, templa_id, permission );
			$( '#myModal' ).modal( 'hide' );
		}
	});

	
}




function modw_tpsegm_delete( tpsegm_id, tpunit_id, templa_id, permission ) {
	
	if ( confirm( svc_lang_str( 'CONFIRM_TPSEGM_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_tpsegm_delete' },
			data: { 'tpsegm_id': tpsegm_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'TPSEGM_NOT_EMPTY' ) ); 
				}
				else {
					mod_tpsegm_list( tpunit_id, templa_id, permission );
				}
			}
		});
		
	}
	
}






