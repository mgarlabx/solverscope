/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/***** MODULES ***********************************************************************************************************************************************************/


function MODULES_main() {

	$( '#main-title' ).html( svc_lang_str( 'MODULES' ) );
	
	svc_master_function( 'MODULES_main() @ solverscope_mod.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_check_insert' },
		success: function( data ) {
			var tx = '';
			tx += '<div id="new-module" style="margin-bottom:1rem;width:100%">';
			if ( data.trim() == '1' ) {
				tx += '<div style="display:inline-block;margin-right:1rem"><button class="btn btn-primary btn-xs" onclick="modw_module_insert()"><i class="fa fa-plus"></i> ' + svc_lang_str( 'MODULE' ) + '</button></div>';
			}
			tx += '</div>';			
			tx += '<div style="width:100%;margin-top:2rem;margin-bottom:2rem;"><i class="fa fa-search"></i>&nbsp;<input onkeyup="mod_module_search()" id="svc-module-text"></div>';
			tx += '<div style="width:100%" id="modules"></div>';
			$( '#svc-main-content-0' ).html( tx );
			$( '#svc-main-content-0' ).show();
		}
	});

}




function mod_module_search(){

	$( '#modules' ).html( '' );
	var str = $( '#svc-module-text' ).val();
	str = str.trim();
	if ( str.length > 2 ){
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'mod_module_search' },
			data: { 'str_search': str },
			success: function( data ) {
				rows = svc_get_json( data );
				var tx = '';
				tx += '<table class="table table-hover">';
				tx += '<tbody>';
				for ( var i = 0; i < rows.length ; i++ ) {
					if ( rows[i]['MODULE_CODE'] != undefined ) {
						tx += '<tr onclick="mod_module_get(' + rows[i]['MODULE_ID'] + ')">';
						tx += '<td><a href="#">' + rows[i]['MODULE_CODE'] + '</a></td>' ;
						tx += '<td><a href="#">' + rows[i]['MODULE_NAME'] + '</a>';
						if ( global_master == 1 ) tx += ' <span class="svc-master">MODULE_ID: ' + rows[i]['MODULE_ID'] + '</span>';
						tx += '</td>' ;
						tx += '</tr>';
					}
				}
				tx += '</tbody>';
				tx += '</table>';
				$( '#modules' ).html( tx );

			}
		});
	}
}




function mod_module_get( module_id ) {
	
	svc_master_function( 'mod_module_get(' + module_id + ') @ solverscope_mod.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_module_get' },
		data: { 'module_id': module_id },
		success: function( data ) {

			module = svc_get_json( data );
			
			var tx = '';
			tx += '<table class="table table-hover">';
			tx += '<tbody>';

			tx += '<tr>';
			tx += '<td style="width:20%">' + svc_lang_str( 'LABEL' ) + '</td>';
			tx += '<td>' + module[ 'MODLBL_NAME' ] + '</td>';
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<td align="right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODLBL_NAME\' )"><i class="fa fa-pencil"></i></button></td>';
			tx += '</tr>';
			
			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'CODE' ) + '</td>';
			tx += '<td><b style="font-size:140%">' + module[ 'MODULE_CODE' ] + '</b></td>';
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<td align="right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODULE_CODE\' )"><i class="fa fa-pencil"></i></button></td>';
			tx += '</tr>';
			
			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'NAME' ) + '</td>';
			tx += '<td><b>' + module[ 'MODULE_NAME' ] + '</b></td>';
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<td align="right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODULE_NAME\' )"><i class="fa fa-pencil"></i></button></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'TYPE' ) + '</td>';
			tx += '<td>' + module[ 'MODTYP_NAME' ] + '</td>';
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<td align="right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODTYP_NAME\' )"><i class="fa fa-pencil"></i></button></td>';
			tx += '</tr>';
			
			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'LENGTH' ) + '</td>';
			tx += '<td>' + module[ 'MODULE_LENGTH' ] + '</td>';
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<td align="right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODULE_LENGTH\' )"><i class="fa fa-pencil"></i></button></td>';
			tx += '</tr>';
			
			tx += '</tbody>';
			tx += '</table><p>';

			//summary and description
			tx += '<div class="panel panel-default">';
			tx += '<div class="panel-heading panel-heading-gray">';
			tx += '<h4 class="panel-title">';
			tx += '<a class="accordion-toggle accordion-toggle-styled" data-toggle="collapse" href="#collapse-data" aria-expanded="true"> ' + svc_lang_str( 'MODULE_DATA' ) + ' </a>';
			tx += '</h4>';
			tx += '</div>';
			tx += '<div id="collapse-data" class="panel-collapse in collapse">';
			tx += '<div class="panel-body">';
			tx += '<h3>' + svc_lang_str( 'SUMMARY' );
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<span class="float-right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODULE_SUMMARY\' )"><i class="fa fa-pencil"></i></button></span>';
			tx += '</h3>';
			tx += '<div id="module-summary">' + module[ 'MODULE_SUMMARY' ] + '</div>';
			tx += '<h3>' + svc_lang_str( 'DESCRIPTION' );
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<span class="float-right"><button type="button" class="btn btn-primary" onclick="modw_module_update(' + module_id + ', \'MODULE_DESCRIPTION\' )"><i class="fa fa-pencil"></i></button></span>';
			tx += '</h3>';
			tx += '<div id="module-description">' + module[ 'MODULE_DESCRIPTION' ] + '</div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			//templates
			tx += '<div class="panel panel-default">';
			tx += '<div class="panel-heading panel-heading-gray">';
			tx += '<h4 class="panel-title">';
			tx += '<a class="accordion-toggle accordion-toggle-styled" data-toggle="collapse" href="#collapse-templates" aria-expanded="true">' + svc_lang_str( 'TEMPLATES' ) + '</a>';
			tx += '</h4>';
			tx += '</div>';
			tx += '<div id="collapse-templates" class="panel-collapse in collapse">';
			tx += '<div class="panel-body">';
			if ( module[ 'PERMISSION' ] == 1 ) tx += '<button type="button" class="btn btn-primary mb-3" onclick="modw_templa_insert(' + module_id + ' )"><i class="fa fa-plus"></i> ' + svc_lang_str( 'TEMPLATE' ) + '</button>';
			tx += '<div id="module-templates"></div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';
			
			//tags
			tx += '<div class="panel panel-default">';
			tx += '<div class="panel-heading panel-heading-gray">';
			tx += '<h4 class="panel-title">';
			tx += '<a class="accordion-toggle accordion-toggle-styled" data-toggle="collapse" href="#collapse-tags" aria-expanded="true"> ' + svc_lang_str( 'TAGS' ) + ' </a>';
			tx += '</h4>';
			tx += '</div>';
			tx += '<div id="collapse-tags" class="panel-collapse in collapse">';
			tx += '<div class="panel-body">';
			tx += '';
			tx += '';
			tx += 'WORK_IN_PROGRESS'; //WORK_IN_PROGRESS - etiquetas para módulos
			tx += '';
			tx += '';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';

			if ( module[ 'PERMISSION' ] == 1 ) tx += '<button type="button" class="btn btn-danger" onclick="modw_module_delete(' + module_id + ' )"><i class="fa fa-trash"></i> ' + svc_lang_str( 'DELETE' ) + ' ' + svc_lang_str( 'MODULE' ) + '</button>';

			$( '#svc-main-content-header-1' ).html( '' ); 
			$( '#svc-main-content-body-1' ).html( tx );
			$( '#svc-main-content-0' ).hide();
			$( '#svc-main-content-1' ).show();

			//templates
			mod_templa_list( module_id );


		}
	});
	
	
}



/***** TEMPLATES ***********************************************************************************************************************************************************/


function mod_templa_list( module_id ) {
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_templa_list' },
		data: { 'module_id': module_id },
		success: function( data ) {
			rows = svc_get_json( data );
			var ty = '';
			ty += '<table class="table table-hover">';
			ty += '<tbody>';
			for ( var i = 0; i < rows.length ; i++ ) {
				if ( rows[i]['TEMPLA_ID'] != undefined ) {
					var active = '&nbsp;';
					if ( rows[i]['TEMPLA_ACTIVE'] == 1 ) active = '<i title="' + svc_lang_str( 'ACTIVE' ) + '" class="fa fa-check"></i>';
					ty += '<tr>';
					ty += '<td onclick="mod_templa_get(' + rows[i]['TEMPLA_ID'] + ', ' + module_id + ')"><a href="#">' + svc_date_format( rows[i]['TEMPLA_DATE'] ) + '</a>&nbsp;&nbsp;&nbsp;' + active;
					if ( global_master == 1 ) ty += ' <span class="svc-master">TEMPLA_ID: ' + rows[i]['TEMPLA_ID'] + '</span>';
					ty += '</td>' ;
					if ( rows[i][ 'PERMISSION' ] == 1 ) ty += '<td align="right"><button type="button" class="btn btn-danger" onclick="modw_templa_delete(' + rows[i]['TEMPLA_ID'] + ', ' + module_id + ' )"><i class="fa fa-trash"></i></button></td>';
					ty += '</tr>';
				}
			}
			ty += '</tbody>';
			ty += '</table>';
			$( '#module-templates' ).html( ty );

		}
	});

}


function mod_templa_get( templa_id, module_id ) {
	
	svc_master_function( 'mod_templa_get(' + templa_id + ', ' + module_id + ') @ solverscope_mod.js' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_templa_get' },
		data: { 'templa_id': templa_id },
		success: function( data ) {

			templa = svc_get_json( data );
			
			var tx = '';
			tx += '<b style="font-size:140%">' + svc_lang_str( 'TEMPLATE' ) + ' <span id="mod-templa-date">' + svc_date_format( templa[ 'TEMPLA_DATE' ] ) + '</span></b>&nbsp;&nbsp;&nbsp;';
			if ( templa['TEMPLA_ACTIVE'] == 1 ) tx += '<div class="inline-block" id="mod-templa-active"><i title="' + svc_lang_str( 'ACTIVE' ) + '" class="fa fa-check"></i></div>';
			if ( templa[ 'PERMISSION' ] == 1 ) tx += '<button type="button" class="btn btn-primary float-right" onclick="modw_templa_update(' + templa_id + ', \'TEMPLA_DATE\' )"><i class="fa fa-pencil"></i></button>';
			$( '#svc-main-content-header-2' ).html( tx ); 

			tx = '';
			
			//units
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'mod_tpunit_list' },
				data: { 'templa_id': templa_id },
				success: function( data1 ) {

					rows = svc_get_json( data1 );

					tx += '<p>';
					if ( templa[ 'PERMISSION' ] == 1 ) tx += '<button type="button" class="btn btn-primary mb-3" onclick="modw_tpunit_insert(' + templa_id + ', ' + module_id + ' )"><i class="fa fa-plus"></i> ' + svc_lang_str( 'UNIT' ) + '</button>&nbsp;&nbsp;&nbsp;';
					tx += '<button type="button" class="btn btn-info mb-3" onclick="mod_tpphas_list(' + templa_id + ', ' + templa[ 'PERMISSION' ] + ' )"><i class="fa fa-list-ul"></i> ' + svc_lang_str( 'PHASES' ) + '&nbsp;&nbsp;</button>';

					for ( var i = 0; i < rows.length ; i++ ) {
						if ( rows[i]['TPUNIT_ID'] != undefined ) {

							tx += '<div class="panel panel-default">';
							tx += '<div class="panel-heading panel-heading-gray">';
							tx += '<h4 class="panel-title">';
							tx += '<a class="accordion-toggle accordion-toggle-styled" data-toggle="collapse" onclick="mod_tpsegm_show(' + rows[i]['TPUNIT_ID'] + ', ' + templa[ 'PERMISSION' ] + ')" href="#collapse-units-' + i + '" aria-expanded="true"> ';
							tx += rows[i]['TPUNIT_NAME'];
							tx += ' </a>';
							if ( global_master == 1 ) tx += ' <span class="svc-master">TPUNIT_ID: ' + rows[i]['TPUNIT_ID'] + '</span>';
							if ( rows[i][ 'PERMISSION' ] == 1 ) {
								tx += '<div class="float-right">';
								tx += '<button type="button" class="btn btn-primary" onclick="modw_tpunit_update(' + rows[i]['TPUNIT_ID'] + ', ' + templa_id + ', ' + module_id + ')"><i class="fa fa-pencil"></i></button>&nbsp;&nbsp;';
								tx += '<button type="button" class="btn btn-danger" onclick="modw_tpunit_delete(' + rows[i]['TPUNIT_ID'] + ', ' + templa_id + ', ' + module_id + ')"><i class="fa fa-trash"></i></button>';
								tx += '</div>';
							}
							tx += '</h4>';
							tx += '</div>';
							tx += '<div id="collapse-units-' + i + '" class="panel-collapse in collapse">';
							tx += '<div class="panel-body" id="tpunit-' + rows[i]['TPUNIT_ID'] +'"></div>';
							tx += '</div>';
							tx += '</div>';
							tx += '</div>';

						}
					}

					$( '#svc-main-content-body-2' ).html( tx );
					$( '#svc-main-content-0' ).hide();
					$( '#svc-main-content-1' ).hide();
					$( '#svc-main-content-2' ).show();
				}
			});

			
		}
	});
	
}


//assessment phases
function mod_tpphas_list( templa_id, permission ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_tpphas_list' },
		data: { 'templa_id': templa_id },
		success: function( data ) {
			var rows = svc_get_json( data );
		
			var tx = '';
		
			if ( permission > 0 ) {
				tx += '<div class="m-3"><button class="btn btn-primary" onclick="modw_tpphas_insert(' + templa_id + ',' + permission + ')"><i class="fa fa-plus"></i> ' + svc_lang_str( 'PHASE' ) + '</button></div>';
			}
			
			tx += '<table class="table table-hover">';
			tx += '<thead>';
			tx += '<tr>';
			tx += '<td align="center">' + svc_lang_str( 'PHASE' ) + '</td>' ;
			tx += '<td align="center">' + svc_lang_str( 'TPSEGM_WEIGHT' ) + '</td>' ;
			tx += '</tr>';
			tx += '</thead>';
			tx += '<tbody>';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<tr>';
				tx += '<td align="center">' + rows[i]['TPPHAS_ORDERBY'] + '</td>' ;
				tx += '<td align="center">' + rows[i]['TPPHAS_WEIGHT'];
				if ( global_master == 1 ) tx += ' <span class="svc-master">TPPHAS_ID: ' + rows[i]['TPPHAS_ID'] + '</span>';
				tx += '</td>' ;
				if ( permission > 0 ) {
					tx += '<td align="right">';
					tx += '<button type="button" class="btn btn-danger" onclick="modw_tpphas_delete(' + rows[i]['TPPHAS_ID'] + ', ' + templa_id + ',' + permission + ')"><i class="fa fa-trash"></i></button>';
					tx += '</td>' ;
				}
				tx += '</tr>';
			}
			tx += '</tbody>';
			tx += '</table>';	
		

			$( '#myModalTitle' ).html( svc_lang_str( 'ASSESSMENT_PHASES' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '' );
			$( '#myModal' ).modal( 'show' );

		
		}
	});  
	
	
	
}


/***** SEGMENTS ***********************************************************************************************************************************************************/


function mod_tpsegm_show( tpunit_id, permission ) {
	if ( $( '#tpunit-' + tpunit_id ).html() == '' ) {
		mod_tpsegm_list( tpunit_id, permission );
	}
}


function mod_tpsegm_list( tpunit_id, permission ) {

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'mod_tpsegm_list' },
		data: { 'tpunit_id': tpunit_id },
		success: function( data ) {
			rows = svc_get_json( data );
			var tx = '';
			
			if ( permission ==  1 ) tx += '<p><button type="button" class="btn btn-primary mb-3" onclick="modw_tpsegm_insert(' + tpunit_id + ', ' + permission + ' )"><i class="fa fa-plus"></i> ' + svc_lang_str( 'SEGMENT' ) + '</button>';

			tx += '<table class="table">';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<tr>';
				tx += '<td><a href="#" onclick="mod_tpsegm_get(' + rows[i]['TPSEGM_ID'] + ',' + tpunit_id + ',' + permission + ')">' + rows[i]['TPSEGM_NAME'] + '</a>';
				if ( global_master == 1 ) tx += ' <span class="svc-master">TPSEGM_ID: ' + rows[i]['TPSEGM_ID'] + '</span>';
				tx += '</td>';
				var icobj = '<i style="color:#4BD396" class="fa fa-circle"></i>';
				if ( rows[i]['TPSEGM_OBJECT_ID'] > 0 ) icobj = '<i class="fa fa-' + rows[i]['OBJTYP_ICON'] + '"></i>';
				tx += '<td align="right">';
				tx += '<button type="button" class="btn btn-success" onclick="modw_tpsegm_object(' + rows[i]['TPSEGM_ID'] + ')">' + icobj +'</button>';
				tx += '<button type="button" class="btn btn-info" onclick="modw_tpsegm_segrel(' + rows[i]['TPSEGM_ID'] + ')"><i class="fa fa-cogs"></i></button>';
				if ( permission == 1 ) {
					tx += '<button type="button" class="btn btn-primary" onclick="modw_tpsegm_update(' + rows[i]['TPSEGM_ID'] + ', ' + tpunit_id + ', ' + permission + ')"><i class="fa fa-pencil"></i></button>';
					tx += '<button type="button" class="btn btn-danger" onclick="modw_tpsegm_delete(' + rows[i]['TPSEGM_ID'] + ', ' + tpunit_id + ', ' + permission + ')"><i class="fa fa-trash"></i></button>';
				}
				tx += '</td>';
				tx += '</tr>';
			}
			tx += '</table>';
			$( '#tpunit-' + tpunit_id ).html( tx );
		}
	});

}


function mod_tpsegm_get( tpsegm_id, tpunit_id, permission ) {
	
	
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
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_ORDERBY' ) + '</b></td>';
			tx += '<td>' + tpsegm['TPSEGM_ORDERBY'] + '</td>';
			tx += '</tr>';


			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_NAME' ) + '</b></td>';
			tx += '<td>' + tpsegm['TPSEGM_NAME'] + '</td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_DESCRIPTION' ) + '</b></td>';
			tx += '<td>' + tpsegm['TPSEGM_DESCRIPTION'] + '</td>';
			tx += '</tr>';
			
			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_LENGTH' ) + '</b></td>';
			tx += '<td>' + tpsegm['TPSEGM_LENGTH'] + '</td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_ALLOW_UPLOAD' ) + '</b></td>';
			tx += '<td><label class="switchToggle">';
		    tx += '<input disabled type="checkbox" ';
			if ( tpsegm['TPSEGM_ALLOW_UPLOAD'] == 1 ) tx += 'checked ';
			tx += 'id="object-active">';
			tx += '<span class="slider aqua round"></span>';
			tx += '</label></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_MANUAL_GRADING' ) + '</b></td>';
			tx += '<td><label class="switchToggle">';
		    tx += '<input disabled type="checkbox" ';
			if ( tpsegm['TPSEGM_MANUAL_GRADING'] == 1 ) tx += 'checked ';
			tx += 'id="object-active">';
			tx += '<span class="slider aqua round"></span>';
			tx += '</label></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'ASSESSMENT_PHASE' ) + '</b></td>';
			tx += '<td>' + tpsegm['TPPHAS_ORDERBY'] + '</td>';
			tx += '</tr>';
			
			tx += '<tr>';
			tx += '<td><b>' + svc_lang_str( 'TPSEGM_WEIGHT' ) + '</b></td>';
			tx += '<td>' + tpsegm['TPSEGM_WEIGHT'] + '</td>';
			tx += '</tr>';
			
			tx += '</tbody>';
			tx += '</table><p>';
	
			$( '#myModalTitle' ).html( svc_lang_str( 'SEGMENT' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '' );
			$( '#myModal' ).modal( 'show' );

			
		}
	});
	
	
	
	
	
	
	
	
}





