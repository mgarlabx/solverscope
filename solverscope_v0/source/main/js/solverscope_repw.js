/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/




/******  FOLDER ***************************************************************************************************************/

function repw_folder_insert( parent ) {
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_FOLDER_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="folder-name">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_folder_insert_save(' + parent + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


function repw_folder_insert_save( parent ) {
	var folder_name = $( '#folder-name' ).val();
	folder_name = folder_name.trim();
	if ( folder_name != '' && folder_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_folder_insert' },
			data: { 'parent': parent, 'name': folder_name },
			success: function( data ) {
				rep_folder_list( parent );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}



function repw_folder_delete( folder_id, parent ) {
	if ( confirm( svc_lang_str( 'CONFIRM_FOLDER_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_folder_delete' },
			data: { 'folder_id': folder_id },
			success: function( data ) {
				if ( data.trim() == 'not_empty' ) {
					alert( svc_lang_str( 'FOLDER_NOT_EMPTY' ) );
				}
				else {
					rep_folder_list( parent );
				}
			}
		});
		
	}
}

function repw_folder_update( folder_id, parent, old_name ) {
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_FOLDER_NAME' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="folder-name" value="' + old_name + '">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_folder_update_save(' + folder_id + ', ' + parent + ', \'' + old_name + '\')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


function repw_folder_update_save( folder_id, parent, old_name ) {
	var folder_name = $( '#folder-name' ).val();
	folder_name = folder_name.trim();
	if ( folder_name != '' && folder_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_folder_update' },
			data: { 'folder_id': folder_id, 'name': folder_name },
			success: function( data ) {
				rep_folder_list( parent );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}



function repw_folder_move( folder_id, parent ) {
	
	//WORK_IN_PROGRESS: repw_folder_move - melhorar essa interface
	
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_ID' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="folder-to-id" value="' + parent + '">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_folder_move_save(' + folder_id + ', ' + parent + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


function repw_folder_move_save( folder_id, parent ) {
	var folder_to_id = $( '#folder-to-id' ).val();
	folder_to_id = folder_to_id.trim();
	if ( folder_to_id != '' && folder_to_id != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_folder_move' },
			data: { 'folder_id': folder_id, 'folder_to_id': folder_to_id },
			success: function( data ) {
				rep_folder_list( parent );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}



function rep_folder_share ( folder_id, parent ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_folder_share' },
		data: { 'folder_id': folder_id },
		success: function( data ) {
			rows = svc_get_json( data );

			var tx = '';
			tx += '<table class="table">';

			for ( i = 0; i < 6; i++ ) {
				var tit = svc_lang_str( 'AUTHOR' );
				var nam = rows['AUTHOR_NAME'];
				var id = rows['FOLDER_AUTHOR_ID'];

				if ( i > 0 ) {
					tit = svc_lang_str( 'REVIEWER' ) + ' ' + i;
					nam = rows['REVIEWER' + i + '_NAME'];
					id = rows['FOLDER_REVIEWER' + i + '_ID'];
				}
		
				tx += '<tr>';
				tx += '<td>' + tit + '</td>';
				tx += '<td>';
		
				tx += '<div id="folder-flow-r-' + i + '">';
				tx += '<div class="inline-block" id="folder-flow-n-' + i + '">' + nam + '</div>';
				tx += '<div class="inline-block float-right"><button class="btn btn-primary btn-xs" onclick="repw_folder_share_update(' + i + ')"><i class="fa fa-pencil"></i></button></div>';
				tx += '</div>';
		
				tx += '<div style="display:none" id="folder-flow-w-' + i + '">';
				tx += '<div class="inline-block">PERSON_ID:&nbsp;&nbsp;&nbsp;<input id="folder-flow-id-' + i + '" size="4" value="' + id + '"></div>'; //<---- WORK_IN_PROGRESS melhorar essa interface
				tx += '<div class="inline-block float-right">';
				tx += '<button class="btn btn-success btn-xs" onclick="repw_folder_share_save(' + folder_id + ', ' + i + ')"><i class="fa fa-check"></i></button>';
				tx += '<button class="btn btn-danger btn-xs" onclick="repw_folder_share_cancel(' + i + ')"><i class="fa fa-times"></i></button>';
				tx += '</div>';
				tx += '</div>';

				tx += '</td>';
				tx += '</tr>';
			}

			tx += '</table>';
	
			$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_FOLDER_INFO' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '' );
			$( '#myModal' ).modal( 'show' );

		}
	});
	
}


function repw_folder_share_update ( op ) {
	$( '#folder-flow-r-' + op ).hide();
	$( '#folder-flow-w-' + op ).show();
}

function repw_folder_share_save ( folder_id, op ) {
	var person2_id = $( '#folder-flow-id-' + op ).val();
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_folder_share_save' },
		data: { 'folder_id': folder_id, 'person2_id': person2_id, 'op': op },
		success: function( data ) {
			$( '#folder-flow-n-' + op ).html( data );	
			$( '#folder-flow-r-' + op ).show();
			$( '#folder-flow-w-' + op ).hide();
		}
	});
}

function repw_folder_share_cancel ( op ) {
	$( '#folder-flow-r-' + op ).show();
	$( '#folder-flow-w-' + op ).hide();
}
	
	








/******  OBJECT ***************************************************************************************************************/


function repw_object_insert( parent ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_objtyp_list' },
		success: function( data ) {
			objtypes = svc_get_json( data );

			var tx = '';
			tx += '<table>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'NAME' ) + '&nbsp;&nbsp;&nbsp;</td>';
			tx += '<td style="width:100%;padding-bottom:2rem"><input type="text" class="form-control" id="object-name"></td>';
			tx += '</tr>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'TYPE' ) + '</td>';
			tx += '<td style="padding-bottom:2rem"><select class="form-control" id="object-type">';
			for ( var i = 0; i < objtypes.length ; i++ ) {
				tx += '<option value="' + objtypes[i]['OBJTYP_ID'] + '">';
				tx += svc_lang_str( objtypes[i]['OBJTYP_NAME'] );
				tx += '</option>';			
			}
			tx += '</select></td>';			
			tx += '</tr>';
			
			tx += '</table>';
	
			$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_OBJECT_DATA' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_object_insert_save(' + parent +')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			$( '#myModal' ).modal( 'show' );
			
		}
	});
	
	
	
	
}


function repw_object_insert_save( parent ) {
	
	var object_name = $( '#object-name' ).val();
	var object_type = $( '#object-type' ).val();
	
	object_name = object_name.trim();
	
	if ( object_name != '' && object_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_object_insert' },
			data: { 'parent': parent, 'object_name': object_name, 'object_type': object_type },
			success: function( data ) {
				if ( global_last_op == 'rep_folder_list' ) {
					rep_folder_list( parent );
				}
				else if ( global_last_op == 'rep_my_folders_list' ) {
					rep_my_folder_list( global_last_id, global_last_str1, global_last_str2 );
				}
			}
		});
	}
	
	$( '#myModal' ).modal( 'hide' );
}


function repw_object_delete( object_id, parent ) {
	if ( confirm( svc_lang_str( 'CONFIRM_OBJECT_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_object_delete' },
			data: { 'object_id': object_id },
			success: function( data ) {
				if ( data.trim() == 'Error 804' ) {
					alert( svc_lang_str( 'OBJECT_NOT_EMPTY' ) ); //WORK_IN_PROGRESS -------- checar se esse objeto está sendo usado
				}
				else {
					if ( global_last_op == 'rep_folder_list' ) {
						rep_folder_list( parent );
					}
					else if ( global_last_op == 'rep_my_folders_list' ) {
						rep_my_folder_list( global_last_id, global_last_str1, global_last_str2 );
					}
				}
			}
		});
		
	}
}


function repw_object_update( object_id, parent, old_name, object_active ) {
	
	var tx = '';
	tx += '<table>';

	tx += '<tr>';
	tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'NAME' ) + '&nbsp;&nbsp;&nbsp;</td>';
	tx += '<td style="width:100%;padding-bottom:2rem"><input type="text" class="form-control" id="object-name" value="' + old_name + '"></td>';
	tx += '</tr>';

	tx += '<tr>';
	tx += '<td>' + svc_lang_str( 'ACTIVE' ) + '</td>';
	tx += '<td>';
	tx += '<label class="switchToggle">';
    tx += '<input type="checkbox" ';
	if ( object_active == 1 ) tx += 'checked ';
	tx += 'id="object-active">';
	tx += '<span class="slider aqua round"></span>';
	tx += '</label>';
	tx += '</td>';
	tx += '</tr>';
	
	tx += '</table>';

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_OBJECT_DATA' ) );
	$( '#myModalBody' ).html( tx );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_object_update_save(' + parent + ',' + object_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );

}



function repw_object_update_save( parent, object_id ) {
	
	var object_name = $( '#object-name' ).val();
	var object_active = $( '#object-active' ).is( ':checked' );
	
	object_name = object_name.trim();
	if ( object_active ) {
		object_active = 1;
	}
	else {
		object_active = 0;
	}
	
	if ( object_name != '' && object_name != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_object_update' },
			data: { 'object_name': object_name, 'object_id': object_id, 'object_active': object_active },
			success: function( data ) {
				
				if ( global_last_op == 'rep_folder_list' ) {
					rep_folder_list( parent );
				}
				else if ( global_last_op == 'rep_my_folders_list' ) {
					rep_my_folder_list( global_last_id, global_last_str1, global_last_str2 );
				}
				

			}
		});
	}
	
	$( '#myModal' ).modal( 'hide' );
}






function repw_object_move( object_id, folder_id ) {

	//WORK_IN_PROGRESS: repw_object_move - melhorar essa interface

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_ID' ) );
	$( '#myModalBody' ).html( '<input type="text" class="form-control" id="folder_to_id" value="' + folder_id + '">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_object_move_save(' + object_id + ', ' + folder_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


function repw_object_move_save( object_id, folder_id ) {
	var folder_to_id = $( '#folder_to_id' ).val();
	folder_to_id = folder_to_id.trim();
	if ( folder_to_id != '' && folder_to_id != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_object_move' },
			data: { 'object_id': object_id, 'folder_to_id': folder_to_id },
			success: function( data ) {
				rep_folder_list( folder_id );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}




function repw_object_review( object_id, reviewer ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_object_get' },
		data: { 'object_id': object_id },
		success: function( data ) {
			row = svc_get_json( data );

			if ( row['IS_REVIEWER_' + reviewer] == 1 ) {
				
				var tx = '';
				
				tx += '<div class="row">';
				
				tx += '<div class="radio">';
				tx += '<input id="review-radio-0" name="review-radio" type="radio" ';
				if ( row['OBJECT_REV_' + reviewer] == 0 ) tx += 'checked="checked"';
				tx += '>';
				tx += '<label for="review-radio-0">' + svc_lang_str( 'NOT_VERIFIED' ) + ' <i class="fa fa-clock-o text-info"></i></label>';
				tx += '</div>';

				tx += '<div class="radio">';
				tx += '<input id="review-radio-1" name="review-radio" type="radio" ';
				if ( row['OBJECT_REV_' + reviewer] == 1 ) tx += 'checked="checked"';
				tx += '>';
				tx += '<label for="review-radio-1">' + svc_lang_str( 'APPROVED' ) + ' <i class="fa fa-check text-primary"></i></label>';
				tx += '</div>';

				tx += '<div class="radio">';
				tx += '<input id="review-radio-2" name="review-radio" type="radio" ';
				if ( row['OBJECT_REV_' + reviewer] == 2 ) tx += 'checked="checked"';
				tx += '>';
				tx += '<label for="review-radio-2">' + svc_lang_str( 'NOT_APPROVED' ) + ' <i class="fa fa-times text-danger"></i></label>';
				tx += '</div>';

				tx += '</div>';
                                                
				tx += '<div class="row p-3">';
				tx += '<input style="width:100%" id="review-comment" value="' + row['OBJECT_REV_COMMENT_' + reviewer] + '">';
				tx += '</div>';
				
				$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_OBJECT_DATA' ) );
				$( '#myModalBody' ).html( tx );
				$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_object_review_save(' + object_id + ',' + reviewer + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
				$( '#myModal' ).modal( 'show' );

			}
			else {
				alert( 'Error' );
			}

		}
	});
	
}



function repw_object_review_save( object_id, reviewer ) {
	
	var radio_1 = $( '#review-radio-1' ).is( ':checked' );
	var radio_2 = $( '#review-radio-2' ).is( ':checked' );
	var comment = $( '#review-comment' ).val();

	var rev = 0;
	if ( radio_1 == 1 ) rev = 1;
	else if ( radio_2 == 1 ) rev = 2;

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_object_review_save' },
		data: { 'object_id': object_id, 'reviewer': reviewer, 'rev': rev, 'comment': comment },
		success: function( data ) {

			if ( global_last_op == 'rep_folder_list' ) {
				rep_folder_list( global_last_id );
			}
			else if ( global_last_op == 'rep_my_folders_list' ) {
				rep_my_folder_list( global_last_id, global_last_str1, global_last_str2 );
			}
			
			$( '#myModal' ).modal( 'hide' );
		}
	});

}












/******  OBJECT TAG ***************************************************************************************************************/



function repw_object_tag( object_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'tag_target_list' },
		data: { 'target_record_id': object_id, 'tartyp_table_name': 'REP_OBJECT' },
		success: function( data ) {
			rows = svc_get_json( data );
			var tx = '';
			tx += '<div id="tag-insert"><button class="btn btn-primary btn-xs" onclick="repw_object_tag_insert(' + object_id + ')"><i class="fa fa-plus"></i></button></div><p>';
			tx += '<table class="table">';
			for ( var i = 0; i < rows.length ; i++ ) {
				tx += '<tr>';
				tx += '<td>' + rows[i]['ENTITY_CODE'] + '</td>';
				tx += '<td>' + rows[i]['ENTITY_DESCRIPTION'] + '</td>';
				tx += '<td><button class="btn btn-danger btn-xs" onclick="repw_object_tag_delete(' + rows[i]['TARGET_ID'] + ', ' + object_id + ')"><i class="fa fa-trash-o"></i></button></td>';
				tx += '</tr>';
			}
			tx += '</table>';
			$( '#svc-tag-modal-header' ).html( svc_lang_str( 'TAGS' ) );
			$( '#svc-tag-modal-body' ).html( tx );
			$( '#svc-tag-modal-header-button' ).html( '' );
			$( '#svc-tag-modal' ).modal( 'show' );
		}
	});
	
}

function repw_object_tag_delete( target_id, object_id ) {
	if ( confirm( svc_lang_str( 'CONFIRM_TAG_REM' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'tagw_target_delete' },
			data: { 'target_id': target_id, 'target_record_id': object_id, 'tartyp_table_name': 'REP_OBJECT' },
			success: function( data ) {
				repw_object_tag( object_id );
			}
		});
	}
}




function repw_object_tag_insert( object_id ) {

	if ( global_tags_packets.length == 0 ) {
		
		$( '#tag-insert' ).html( global_processing )

		//load tag packets
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'tag_packet_list' },
			success: function( data ) {
				global_tags_packets = svc_get_json( data );
				
				//load tag entities
				$.ajax({
					url: 'app/',
					type: 'POST',
					headers: { 'tk': tk, 'procedure': 'tag_entity_list' },
					success: function( data ) {
						global_tags_entities = svc_get_json( data );
						
						//load tag filters
						$.ajax({
							url: 'app/',
							type: 'POST',
							headers: { 'tk': tk, 'procedure': 'tag_filter_list' },
							success: function( data ) {
								global_tags_filters = svc_get_json( data );
								repw_object_tag_insert_show( object_id );
								$( '#tag-insert' ).html( '<button class="btn btn-primary btn-xs" onclick="repw_object_tag_insert(' + object_id + ')"><i class="fa fa-plus"></i></button>' );
				
							}
						});
						
					}
				});
				
			}
		});
		
	}
	else {
		repw_object_tag_insert_show( object_id );
	}
	
}


function repw_object_tag_insert_show( object_id ) {

	var tx = '';

	tx += '<div style="margin-bottom:2rem; padding-bottom:2rem; border-bottom:1px solid #C0C0C0">'
	tx += '<h4>' + svc_lang_str( 'TAG_LINK_BY_CODE' ) + '</h4>';
	tx += svc_lang_str( 'CODE' ) + ': ';
	tx += '<input id="entity-code" size="4">&nbsp;&nbsp;&nbsp;';
	tx += '<button class="btn btn-success btn-xs" onclick="repw_object_tag_insert_save_code(' + object_id + ')"><i class="fa fa-check"></i></button>' 
	tx += '</div>';

	tx += '<div style="margin-bottom:2rem; padding-bottom:2rem; border-bottom:1px solid #C0C0C0">'
	tx += '<h4>' + svc_lang_str( 'TAG_LINK_BY_SEARCH' ) + '</h4>';
	tx += '<div>';
	tx += '<input id="tag-search-str" size="8">&nbsp;&nbsp;&nbsp;';
	tx += '<select id="tag-search-filter">';
	tx += '<option value="0">' + svc_lang_str( 'TAG_ALL_FILTERS' ) + '</option>';
	for ( i = 0; i < global_tags_filters.length ; i++ ) {
		tx += '<option value="' + global_tags_filters[i]['FILTER_ID'] + '">' + global_tags_filters[i]['FILTER_NAME'] + '</option>';
	}
	tx += '</select>&nbsp;&nbsp;&nbsp;';
	tx += '<button class="btn btn-success btn-xs" onclick="repw_object_tag_search(' + object_id + ')"><i class="fa fa-search"></i></button>' 
	tx += '</div>';
	tx += '<div id="tag-search-result"></div>';
	tx += '</div>';

	tx += '<div>'
	tx += '<h4>' + svc_lang_str( 'TAG_LINK_BY_PACKET' ) + '</h4>';
	tx += '<div id="tag-back"></div>';
	tx += '<div id="tag-packets">';
	var rows = global_tags_packets.filter( arr => arr.PACKET_PARENT_ID == '0' );
	for ( i = 0; i < rows.length ; i++ ) {
		tx += '<div class="p2 m2" onclick="repw_object_tag_packets(' + rows[i]['PACKET_ID'] + ', ' + object_id + ')"><a href="#"><i class="fa fa-folder"></i>&nbsp;&nbsp;' + rows[i]['PACKET_NAME'] + '</a></div>';
	}
	tx += '</div>';
	tx += '</div>';

	$( '#myModalTitle' ).html( svc_lang_str( 'TAG_LINK' ) );
	$( '#myModalBody' ).html( tx );
	$( '#myModalButton' ).html( ''  );
	$( '#myModal' ).modal( 'show' );

}



function repw_object_tag_search( object_id ) {
	var tag_search_str = $( '#tag-search-str' ).val().trim();
	var tag_search_filter = 1*$( '#tag-search-filter' ).val();
	if ( tag_search_str.length > 3 || tag_search_filter > 0 ) {

		$( '#tag-search-result' ).html( global_processing );
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'tag_entity_search' },
			data: { 'str_search': tag_search_str, 'filter_id': tag_search_filter },
			success: function( data ) {
				entities = svc_get_json( data );
				var tx = '';
				for ( i = 0; i < entities.length ; i++ ) {
					tx += '<div class="p-2 m-2 ">';
					tx += '<div class="" onclick="repw_object_tag_insert_save(' + entities[i]['ENTITY_ID'] + ', ' + object_id + ')"><a href="#"><i class="fa fa-tag"></i>&nbsp;&nbsp;' + entities[i]['ENTITY_CODE'] + '</a></div>';
					tx += '<div class="">' + entities[i]['ENTITY_DESCRIPTION'] + '</div>';
					tx += '</div>';
				}
				if ( i > 48 ) tx+= svc_lang_str( 'TAG_MAX_50' );
				
				$( '#tag-search-result' ).html( tx );
			}
		});

	}
	else {
		$( '#tag-search-result' ).html( '' );
	}
}



function repw_object_tag_packets( parent_id, object_id, old_id ) {

	var tx = '';

	var packets = global_tags_packets.filter( arr => arr.PACKET_PARENT_ID == parent_id );
	for ( i = 0; i < packets.length ; i++ ) {
		tx += '<div class="p2 m2" onclick="repw_object_tag_packets(' + packets[i]['PACKET_ID'] + ', ' + object_id + ')"><a href="#"><i class="fa fa-folder"></i>&nbsp;&nbsp;' + packets[i]['PACKET_NAME'] + '</a></div>';
	}

	var entities = global_tags_entities.filter( arr => arr.ENTITY_PACKET_ID == parent_id );
	for ( i = 0; i < entities.length ; i++ ) {
		tx += '<div class="p-2 m-2 ">';
		tx += '<div class="" onclick="repw_object_tag_insert_save(' + entities[i]['ENTITY_ID'] + ', ' + object_id + ')"><a href="#"><i class="fa fa-tag"></i>&nbsp;&nbsp;' + entities[i]['ENTITY_CODE'] + '</a></div>';
		tx += '<div class="">' + entities[i]['ENTITY_DESCRIPTION'] + '</div>';
		tx += '</div>';
	}
	
	var tb = '<button class="btn btn-info btn-xs" onclick="repw_object_tag_packets_reset(' + object_id + ')"><i class="fa fa-home"></i></button><br>&nbsp;<br>';
	$( '#tag-back' ).html( tb );
	$( '#tag-packets' ).html( tx );
}



function repw_object_tag_packets_reset( object_id ) {
	var tx = '';
	var rows = global_tags_packets.filter( arr => arr.PACKET_PARENT_ID == '0' );
	for ( i = 0; i < rows.length ; i++ ) {
		tx += '<div class="p2 m2" onclick="repw_object_tag_packets(' + rows[i]['PACKET_ID'] + ', ' + object_id + ')"><a href="#"><i class="fa fa-folder"></i>&nbsp;&nbsp;' + rows[i]['PACKET_NAME'] + '</a></div>';
	}
	$( '#tag-back' ).html( '' );
	$( '#tag-packets' ).html( tx );
}



function repw_object_tag_insert_save( entity_id, object_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'tagw_target_insert' },
		data: { 'entity_id': entity_id, 'target_record_id': object_id, 'tartyp_table_name': 'REP_OBJECT' },
		success: function( data ) {
			repw_object_tag( object_id );
			$( '#myModal' ).modal( 'hide' );
		}
	});

}

function repw_object_tag_insert_save_code( object_id ) {
	
	var entity_code = $( '#entity-code' ).val();
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'tagw_target_insert_code' },
		data: { 'entity_code': entity_code, 'target_record_id': object_id, 'tartyp_table_name': 'REP_OBJECT' },
		success: function( data ) {
			if ( data == 0 ){
				alert( svc_lang_str( 'TAG_NOT_FOUND' ) );
			}
			else {
				repw_object_tag( object_id );
				$( '#myModal' ).modal( 'hide' );
			}
		}
	});
	
}









/******  QUIITE & QUIOPT ***************************************************************************************************************/

function repw_quiopt_insert( quiite_id, object_id ) {
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_quiopt_insert' },
		data: { 'quiite_id': quiite_id },
		success: function( data ) {
			rep_quiite_get( object_id, 1 );
		}
	});
	
	
}


function repw_quiopt_update( quiopt_id, orderby, correct, object_id ) {
	
	var tx = '';
	tx += '<table>';

	tx += '<tr>';
	tx += '<td style="padding-bottom:2rem">' + svc_lang_str( 'ORDER_BY' ) + '&nbsp;&nbsp;&nbsp;</td>';
	tx += '<td style="width:100%;padding-bottom:2rem"><input type="text" style="width:4rem;text-align:center" class="form-control" id="orderby" value="' + orderby + '"></td>';
	tx += '</tr>';

	if ( correct == 0 ) {
		tx += '<tr>';
		tx += '<td>' + svc_lang_str( 'CORRECT' ) + '</td>';
		tx += '<td>';
		tx += '<label class="switchToggle">';
	    tx += '<input type="checkbox" ';
		tx += 'id="correct">';
		tx += '<span class="slider aqua round"></span>';
		tx += '</label>';
		tx += '</td>';
		tx += '</tr>';
	}
		
	tx += '</table>';

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_OPTION_INFO' ) );
	$( '#myModalBody' ).html( tx );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_quiopt_update_save(' + quiopt_id + ', ' + object_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
	
}                   
                                                    

function repw_quiopt_update_save( quiopt_id, object_id ) {
	var orderby = $( '#orderby' ).val();
	var correct = $( '#correct' ).is( ':checked' );
	if ( correct ) {
		correct = 1;
	}
	else {
		correct = 0;
	}
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_quiopt_update' },
		data: { 'quiopt_id': quiopt_id, 'orderby': orderby, 'correct': correct },
		success: function( data ) {
			rep_quiite_get( object_id, 1 );
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}		



function repw_quiopt_delete( quiopt_id, object_id ) {
	if ( confirm( svc_lang_str( 'CONFIRM_OPTION_DEL' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_quiopt_delete' },
			data: { 'quiopt_id': quiopt_id },
			success: function( data ) {
				rep_quiite_get( object_id, 1 );
			}
		});
	}
}	
	
	
	
	
	
	
	
	
		

		
/******  QUIASM & QUIAIT ***************************************************************************************************************/

function repw_quiasm_update( quiasm_id, object_id ) {
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_quiasm_get' },
		data: { 'object_id': object_id },
		success: function( data ) {
			var rows = svc_get_json( data );
			
			var quiasm_max_items = rows[0]['QUIASM_MAX_ITEMS'];
			var quiasm_random_items = rows[0]['QUIASM_RANDOM_ITEMS'];
			var quiasm_random_options = rows[0]['QUIASM_RANDOM_OPTIONS'];
			var permission = rows[0]['PERMISSION'];
	
			var chk = '';
			var tx = '';
	
			tx += '<table>';

			tx += '<tr>';
			tx += '<td style="padding-bottom:1rem;margin-right:1rem;">' + svc_lang_str( 'QUIZ_ASM_MAX_ITEMS' ) + '&nbsp;&nbsp;&nbsp;</td>';
			tx += '<td style="padding-bottom:1rem"><input type="text" style="width:4rem;text-align:center" class="form-control" id="quiasm_max_items" value="' + quiasm_max_items + '"></td>';
			tx += '</tr>';

			chk = '';
			if ( quiasm_random_items == 1 ) chk = ' checked ';
			tx += '<tr>';
			tx += '<td>' + svc_lang_str( 'QUIZ_ASM_RANDOM_ITEMS' ) + '</td>';
			tx += '<td>';
			tx += '<label class="switchToggle">';
		    tx += '<input type="checkbox" ' + chk;
			tx += 'id="quiasm_random_items">';
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
		    tx += '<input type="checkbox" ' + chk;
			tx += 'id="quiasm_random_options">';
			tx += '<span class="slider aqua round"></span>';
			tx += '</label>';
			tx += '</td>';
			tx += '</tr>';

			tx += '</table>';

			$( '#myModalTitle' ).html( svc_lang_str( 'SETTINGS' ) );
			$( '#myModalBody' ).html( tx );
			$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_quiasm_update_save(' + quiasm_id + ', ' + object_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
			$( '#myModal' ).modal( 'show' );
	
		}
	});
}


function repw_quiasm_update_save( quiasm_id, object_id ) {
	
	var quiasm_max_items = $( '#quiasm_max_items' ).val();
	var quiasm_random_items = $( '#quiasm_random_items' ).is( ':checked' );
	var quiasm_random_options = $( '#quiasm_random_options' ).is( ':checked' );
	
	if ( quiasm_random_items ) {
		quiasm_random_items = 1;
	}
	else {
		quiasm_random_items = 0;
	}
	
	
	if ( quiasm_random_options ) {
		quiasm_random_options = 1;
	}
	else {
		quiasm_random_options = 0;
	}
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_quiasm_update' },
		data: { 'quiasm_id': quiasm_id, 'quiasm_max_items': quiasm_max_items, 'quiasm_random_items': quiasm_random_items, 'quiasm_random_options': quiasm_random_options },
		success: function( data ) {
			rep_quiasm_get( object_id );
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}		



function repw_quiait_insert( quiasm_id, object_id ) {

	//WORK_IN_PROGRESS - melhorar essa interface - repw_quiait_insert
	
	var tx = '';
	tx += '<table>';
	tx += '<tr>';
	tx += '<td style="padding-bottom:1rem;margin-right:1rem;">' + 'QUIITE_ID' + '&nbsp;&nbsp;&nbsp;</td>';
	tx += '<td style="padding-bottom:1rem"><input type="text" style="width:4rem;text-align:center" class="form-control" id="quiite_id"></td>';
	tx += '</tr>';
	tx += '</table>';

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_ID' ) );
	$( '#myModalBody' ).html( tx );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_quiait_insert_save( ' + quiasm_id + ', ' + object_id + ' )">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
	
}


function repw_quiait_insert_save( quiasm_id, object_id ) {
	
	var quiite_id = $( '#quiite_id' ).val();
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_quiait_insert' },
		data: { 'quiasm_id': quiasm_id, 'quiite_id': quiite_id },
		success: function( data ) {
			rep_quiasm_get( object_id );
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}		


function repw_quiait_delete( quiait_id, object_id ) {
	if ( confirm( svc_lang_str( 'CONFIRM_QUIAIT_REM' ) ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_quiait_delete' },
			data: { 'quiait_id': quiait_id },
			success: function( data ) {
				rep_quiasm_get( object_id );
			}
		});
	}
}	


function repw_quiait_update( quiait_id , object_id, quiait_orderby ) {
	
	var tx = '';
	tx += '<table>';
	tx += '<tr>';
	tx += '<td style="padding-bottom:1rem;margin-right:1rem;">' + svc_lang_str( 'ORDER_BY' ) + '&nbsp;&nbsp;&nbsp;</td>';
	tx += '<td style="padding-bottom:1rem"><input type="text" style="width:4rem;text-align:center" class="form-control" id="quiait_orderby" value="' + quiait_orderby + '"></td>';
	tx += '</tr>';
	tx += '</table>';

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_OPTION_INFO' ) );
	$( '#myModalBody' ).html( tx );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_quiait_update_save( ' + quiait_id + ', ' + object_id + ' )">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
	
}


function repw_quiait_update_save( quiait_id, object_id ) {
	
	var quiait_orderby = $( '#quiait_orderby' ).val();
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_quiait_update' },
		data: { 'quiait_id': quiait_id, 'orderby': quiait_orderby },
		success: function( data ) {
			rep_quiasm_get( object_id );
			$( '#myModal' ).modal( 'hide' );
		}
	});
	
}