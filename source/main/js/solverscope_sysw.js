/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/

function sysw_domain_change( domain_id ){
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sysw_domain_last_set' },
		data: { 'domain_id': domain_id },
		success: function( data ) {
			page_refresh();
			
		}
	});  

}




/***** PROFILES ***********************************************************************************************************************************************************/



function sysw_profil_insert() {
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="input-name">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="sysw_profil_insert_save()">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


function sysw_profil_insert_save() {
	var input_name = $( '#input-name' ).val();
	input_name = input_name.trim();

	if ( input_name != '' && input_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'sysw_profil_insert' },
			data: { 'input_name': input_name },
			success: function( data ) {
				sys_profil_list();
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
	
}



function sysw_profil_update( profil_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_profil_get' },
		data: { 'profil_id': profil_id },
		success: function( data ) {
			var row = svc_get_json( data );
			$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_NAME' ) );
			$( '#myModalBody' ).html( '<input type="text" class="form-control" id="input-name" value="' + row['PROFIL_NAME'] + '">' );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="sysw_profil_update_save(' + profil_id +')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			$( '#myModal' ).modal( 'show' );
		}
	});

}


function sysw_profil_update_save( profil_id ) {
	var input_name = $( '#input-name' ).val();
	input_name = input_name.trim();

	if ( input_name != '' && input_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'sysw_profil_update' },
			data: { 'profil_id': profil_id, 'input_name': input_name },
			success: function( data ) {
				sys_profil_list();
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
	
}


function sysw_profil_delete( profil_id ) {
	if ( confirm( svc_lang_str( 'CONFIRM_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'sysw_profil_delete' },
			data: { 'profil_id': profil_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'RECORD_NOT_EMPTY' ) ); 
				}
				else {
					sys_profil_list();
				}
			}
		});

	}

}




/***** PROFILES SIDEBAR ***********************************************************************************************************************************************************/


function sysw_profil_m_insert( profil_id ) {
	//WORK_IN_PROGRESS - sysw_profil_m_insert
	alert( 'WORK IN PROGRESS' );
}

function sysw_profil_m_delete( profm1_id ) {
	//WORK_IN_PROGRESS - sysw_profil_m_delete
	alert( 'WORK IN PROGRESS' );
}





/***** PROFILES PROCEDURES ***********************************************************************************************************************************************************/


function sysw_profil_p_insert( profil_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_profp0_list' },
		success: function( data ) {
			var rows = svc_get_json( data );
			var tx = '';
			tx += '<select id="profp0-id">';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<option value="' + rows[i]['PROFP0_ID'] + '">' + rows[i]['PROFP0_NAME'] + '</option>';
			}
			tx += '</select>';
			$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_PROFP0' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="sysw_profil_p_insert_save(' + profil_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			$( '#myModal' ).modal( 'show' );

		}
	});
	
}

function sysw_profil_p_insert_save( profil_id ) {

	var profp0_id = $( '#profp0-id' ).val();

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sysw_profp1_insert' },
		data: { 'profil_id': profil_id, 'profp0_id': profp0_id },
		success: function( data ) {
			sys_profil_get( profil_id );
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}




function sysw_profil_p_delete( profp1_id, profil_id ) {
	
	if ( confirm( svc_lang_str( 'CONFIRM_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'sysw_profp1_delete' },
			data: { 'profp1_id': profp1_id },
			success: function( data ) {
				sys_profil_get( profil_id );
			}
		});

	}



}




/***** USERS (PERSONS) ***********************************************************************************************************************************************************/


function sysw_person_insert(){
	//WORK_IN_PROGRESS - sysw_person_insert
	alert( 'WORK IN PROGRESS - sysw_person_insert' );
}


function sysw_person_update( person_id ){
	//WORK_IN_PROGRESS - sysw_person_update
	alert( 'WORK IN PROGRESS - sysw_person_update' );
}


function sysw_person_delete( person_id ){
	//WORK_IN_PROGRESS - sysw_person_delete
	alert( 'WORK IN PROGRESS - sysw_person_delete' );
}

