/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/***** PROFILES ***********************************************************************************************************************************************************/


function PROFILES_main() {
	sys_profil_list();
}



function sys_profil_list(){
	
	svc_master_function( 'sys_profil_list() @ solverscope_sys.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_profil_list' },
		success: function( data ) {
			var rows = svc_get_json( data );
			var tx = '';
			
			tx += '<div class="m-3"><button class="btn btn-primary" onclick="sysw_profil_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'PROFILE' ) + '</button></div>';

			tx += '<table class="table table-hover">';
			tx += '<tbody>';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<tr>';
				tx += '<td>' + rows[i]['PROFIL_ID'] + '</td>';
				tx += '<td onclick="sys_profil_get(' + rows[i]['PROFIL_ID'] + ')"><a href="#">' + rows[i]['PROFIL_NAME'] + '</a></td>';
				tx += '</td>' ;
				tx += '<td align="right">';
				tx += '<button type="button" class="btn btn-primary" onclick="sysw_profil_update(' + rows[i]['PROFIL_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
				tx += '<button type="button" class="btn btn-danger" onclick="sysw_profil_delete(' + rows[i]['PROFIL_ID'] + ')"><i class="fa fa-trash"></i></button>';
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


function sys_profil_get( profil_id ) {
	
	//sidebar
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_profil_m_list' },
		data: { 'profil_id': profil_id },
		success: function( data ) {
			var profil_m = svc_get_json( data );
			
			//procedures
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'sys_profil_p_list' },
				data: { 'profil_id': profil_id },
				success: function( data1 ) {
					var profil_p = svc_get_json( data1 );
			
					var tx = '';
			
					tx += '<div class="m-3"><button class="btn btn-primary" onclick="sysw_profil_m_insert()"><i class="fa fa-plus"></i> SIDEBAR</button></div>';

					tx += '<table class="table table-hover">';
					tx += '<tbody>';
					for ( var i = 0; i < profil_m.length ; i++ ) {
						tx += '<tr>';
						tx += '<td>' + profil_m[i]['PROFM0_ID'] + '</td>';
						tx += '<td>';
						if ( profil_m[i]['PROFM0_LEVEL'] == 3 ) tx += '<span class="pl-5">- </span>';
						tx += svc_lang_str( profil_m[i]['PROFM0_LABEL'] );
						tx += ' (' + profil_m[i]['PROFM0_LABEL'] + ')';
						if ( global_master == 1 ) tx += ' <span class="svc-master">PROFM1_ID: ' + profil_m[i]['PROFM1_ID'] + '</span>';
						tx += '</td>' ;
						tx += '<td>' + profil_m[i]['PROFM0_COMMENTS'] + '</td>';
						tx += '<td align="right">';
						tx += '<button type="button" class="btn btn-danger" onclick="sysw_profil_m_delete(' + profil_m[i]['PROFM1_ID'] + ')"><i class="fa fa-trash"></i></button>';
						tx += '</td>' ;
						tx += '</tr>';
					}
					tx += '</tbody>';
					tx += '</table>';
					

					tx += '<div class="m-3 mt-8"><button class="btn btn-primary" onclick="sysw_profil_p_insert()"><i class="fa fa-plus"></i> PROCEDURE</button></div>';

					tx += '<table class="table table-hover">';
					tx += '<tbody>';
					for ( var i = 0; i < profil_p.length ; i++ ) {
						tx += '<tr>';
						tx += '<td>' + profil_p[i]['PROFP0_ID'] + '</td>';
						tx += '<td>' + profil_p[i]['PROFP0_NAME'];
						if ( global_master == 1 ) tx += ' <span class="svc-master">PROFP1_ID: ' + profil_p[i]['PROFP1_ID'] + '</span>';
						tx += '</td>' ;
						tx += '<td>' + profil_p[i]['PROFP0_COMMENTS'] + '</td>';
						tx += '<td align="right">';
						tx += '<button type="button" class="btn btn-danger" onclick="sysw_profil_p_delete(' + profil_p[i]['PROFP1_ID'] + ')"><i class="fa fa-trash"></i></button>';
						tx += '</td>' ;
						tx += '</tr>';
					}
					tx += '</tbody>';
					tx += '</table>';

					
					$( '#svc-main-content-body-1' ).html( tx );
					$( '#svc-main-content-0' ).hide();
					$( '#svc-main-content-1' ).show();
			
			
				}
			});  
			
		}
	});  
}



/***** USERS (PERSONS) ***********************************************************************************************************************************************************/



function USERS_main() {
	sys_person_list();
}



function sys_person_list(){
	
	svc_master_function( 'sys_person_list() @ solverscope_sys.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_person_list' },
		success: function( data ) {
			var rows = svc_get_json( data );
			var tx = '';
			
			tx += '<div class="m-3"><button class="btn btn-primary" onclick="sysw_person_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'USER' ) + '</button></div>';

			tx += '<table class="table table-hover">';
			tx += '<tbody>';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<tr>';
				tx += '<td align="center">' + rows[i]['PERSON_ID'] + '</td>';
				tx += '<td><a href="#" onclick="sys_person_get(' + rows[i]['PERSON_ID'] + ')">' + rows[i]['PERSON_NAME'] + '</a></td>';
				tx += '<td>' + rows[i]['DOMAIN_NAME'] + '</td>';
				tx += '<td>' + svc_date_format( rows[i]['PERACC_DATE'] ) + '</td>';
				tx += '<td>' + rows[i]['N'] + '</td>';
				tx += '<td align="right">';
				tx += '<button type="button" class="btn btn-primary" onclick="sysw_person_update(' + rows[i]['PERSON_ID'] + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
				tx += '<button type="button" class="btn btn-danger" onclick="sysw_person_delete(' + rows[i]['PERSON_ID'] + ')"><i class="fa fa-trash"></i></button>';
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

function sys_person_get( person_id ){
	alert( 'WORK IN PROGRESS - sys_person_get' );
}
	
