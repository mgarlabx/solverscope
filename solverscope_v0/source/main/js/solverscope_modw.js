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
			mod_module_get( module_id );
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





/***** UNITS ***********************************************************************************************************************************************************/


function modw_tpunit_insert( templa_id, module_id ) {
	
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_TPUNIT_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="tpunit-name">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpunit_insert_save(' + templa_id + ', ' + module_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );

}


function modw_tpunit_insert_save( templa_id, module_id ) {
	
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


function modw_tpsegm_insert( tpunit_id, permission ) {
	
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_TPSEGM_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="tpsegm-name">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="modw_tpsegm_insert_save(' + tpunit_id + ',' + permission + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
	
}


function modw_tpsegm_insert_save( tpunit_id, permission ) {
	
	var tpsegm_name = $( '#tpsegm-name' ).val();
	
	tpsegm_name = tpsegm_name.trim();
	if ( tpsegm_name != '' && tpsegm_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'modw_tpsegm_insert' },
			data: { 'tpunit_id': tpunit_id, 'tpsegm_name': tpsegm_name },
			success: function( data ) {
				mod_tpsegm_list( tpunit_id, permission );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
	
	
}
