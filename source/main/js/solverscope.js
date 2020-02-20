/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/



/*** global variables ****************************************************************************/

var global_processing = '<div id="processing" style="margin:0 auto"><img src="img/processig.gif" width="64" alt="Processing"></div>';

var global_lang = []; //language dictionary
var global_person_name = ''; //current person name
var global_person_id = ''; //current person id
var global_domain_id = ''; //current domain id
var global_sys_person_domain_list = []; //list of persons of current domain

var global_tags_packets = [];
var global_tags_entities = [];
var global_tags_filters = [];

var global_rep_permission = 0;

var global_last_op = '';
var global_last_id = 0;
var global_last_str1 = '';
var global_last_str2 = '';



/*** developer ****************************************************************************/

var global_master = 0; //set 1 for debug purposes - see function TOGGLE_ID()

//include shortcuts to speed up development 
function svc_develop_mode() {
	// rep_quiasm_get(155);
	// global_master = 1;
}


//toggle var global_master for debug purposes
function TOGGLE_ID_main(){
	if ( global_master == 0 ) {
		global_master = 1;
	}
	else {
		global_master = 0;
	}
	page_refresh();
}


/*** on load ****************************************************************************/


$( document ).ready( function() {
	
	$( '#svc-main-content-0' ).html( global_processing );
	
	$( '[data-toggle="tooltip"]' ).tooltip(); //<--- WORK_IN_PROGRESS: fazer funcionar tooltip

	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_lngstr_current' },
		success: function( data ) {
			global_lang = svc_get_json( data );
			
			$.ajax({
				url: 'app/',
				type: 'POST',
				headers: { 'tk': tk, 'procedure': 'sys_person_name_get' },
				success: function( data1 ) {
					global_person_name = data1.trim();
					page_refresh();
					svc_editor_translate();
				}
			});
			
		}
	});
	
	//get list of persons of current domain
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_person_domain_list' },
		success: function( data ) {
			global_sys_person_domain_list = svc_get_json( data );
		}
	});
	
	//get current domain id
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_domain_id_get' },
		success: function( data ) {
			global_domain_id = data.trim();
		}
	});
		
	//get current person id
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_person_id_get' },
		success: function( data ) {
			global_person_id = data.trim();
		}
	});
	
	
	
	
	
});





function page_refresh() {
	
	$( '#svc-domain-menu' ).html( global_processing );
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_domain_list' },
		success: function( data ) {
			var rows = svc_get_json( data );
			var tx = '';
			for ( var i = 0; i < rows.length; i++ ){
				var active = '';
				if ( rows[i]['CURRENT'] == 1 ) {
					$( '#svc-domain-name' ).html( rows[i]['DOMAIN_NAME'] );
					active = ' active';
				}
				tx += '<li class="dropdown-item' + active + '"><a href="#" onclick="sysw_domain_change(' + rows[i]['PERPRO_DOMAIN_ID'] + ')"> ' + rows[i]['DOMAIN_NAME'] + ' </a></li>';
			}
			tx += '<li class="dropdown-item"><a href="#" onclick="page_click(\'LOGOUT\')"><i class="icon-logout"></i> ' + svc_lang_str( 'LOGOUT' ) + ' </a></li>';
			$( '#svc-domain-menu' ).html( tx );
			page_sidebar();
		}
	});  
	
}


function page_sidebar() {

	$( '#svc-side-bar' ).html( '<i class="fa fa-spinner fa-spin"></i>' );
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'sys_profm0_list' },
		success: function( data ) {
			var rows = svc_get_json( data );
			var tx = '';
			var first_label = '';
			
			var top_menu_items = rows.filter( arr => arr.PROFM0_LEVEL != 3 );

	        tx += '<li class="sidebar-toggler-wrapper hide"><div class="sidebar-toggler"><span></span></div></li>';
			
			tx += '<h4 style="width:100%;color:white;text-align:center">' + global_person_name + '</h4>';
			
			for ( var i = 0; i < top_menu_items.length; i++ ){
		       
				if ( top_menu_items[i]['PROFM0_LEVEL'] == 1 ) {
					tx += '<li class="nav-item nav-item-click" id="' + top_menu_items[i]['PROFM0_LABEL'] + '">';
					tx += '<a href="#" class="nav-link nav-toggle" onclick="page_click(\'' + top_menu_items[i]['PROFM0_LABEL'] + '\')"> ';
					tx += '<i class="material-icons">' + top_menu_items[i]['PROFM0_ICON'] + '</i>';
					tx += '<span class="title">' + svc_lang_str( top_menu_items[i]['PROFM0_LABEL'] ) + '</span>';
					tx += '</a></li>';
					if ( first_label == '' ) first_label = top_menu_items[i]['PROFM0_LABEL'];
				}
				else {
					tx += '<li class="nav-item">';
					tx += '<a href="#" class="nav-link nav-toggle">';
					tx += '<i class="material-icons">' + top_menu_items[i]['PROFM0_ICON'] + '</i>';
					tx += '<span class="title">' + svc_lang_str( top_menu_items[i]['PROFM0_LABEL'] ) + '</span>';
					tx += '<span class="arrow"></span></a>';
					tx += '<ul class="sub-menu">';
 					var id = top_menu_items[i]['PROFM1_PROFM0_ID'];
					items = rows.filter( arr => arr.PROFM0_PARENT_ID == id );
					for ( var j = 0; j < items.length; j++ ){
						tx += '<li class="nav-item nav-item-click" id="' + items[j]['PROFM0_LABEL'] + '">';
						tx += '<a href="#" class="nav-link" onclick="page_click(\'' + items[j]['PROFM0_LABEL'] + '\')">';
						tx += '<span class="title">' + svc_lang_str( items[j]['PROFM0_LABEL'] ) + '</span>';
						tx += '</a></li>';
						if ( first_label == '' ) first_label = items[j]['PROFM0_LABEL'];
						
					}
					tx += '</ul>';
					tx += '</li>';

				}

			}
			$( '#svc-side-bar' ).html( tx );
			
			page_click( first_label );
			
			
			svc_develop_mode(); 
			
			
			
		}
	});  

	
}





function page_click( label ){
	
	svc_master_function( '' );
	
	$( '.navbar-collapse' ).collapse( 'hide' );
	
	main_display( 0 );
	$( '#main-title' ).html( '' );
	$( '#svc-main-content-0' ).html( ' ' );
	$( '.nav-item' ).removeClass( 'active' );
	$( '#' + label ).addClass( 'active' );

	try {
		eval( label + '_main()' );
	}
	catch ( e ) {
		$( '#main-title' ).html( svc_lang_str( label ) );
   	 	$( '#svc-main-content-0' ).html( '<div style="margin:0 auto"><img src="img/work_in_progress.gif" /></div>' );
		console.log( label );
	}
	
	
	
}




function main_display( n ) {
	
	svc_master_function( '' );
	
	$( '#svc-main-content-0' ).hide();
	$( '.svc-main-content' ).hide();
	if ( n == 0 ) {
		$( '#svc-main-content-0' ).show();
	}
	else {
		$( '#svc-main-content-' + n ).show();
		if ( global_last_op == 'repw_txtite_update' ){
			if ( global_last_str1 == 'rep_quiite_get' ) {
				rep_quiite_get( global_last_id, 1 );
			}
			else if ( global_last_str1 == 'rep_essite_get' ) {
				rep_essite_get( global_last_id, 1 );
			}
			else if ( global_last_str1 == 'rep_htmobj_get' ) {
				rep_htmobj_get( global_last_id );
			}
			else if ( global_last_str1 == 'rep_matopt_list' ) {
				rep_matopt_list( global_last_id );
			}
		}
	}
}
	


	
	
	
/*** functions ****************************************************************************/



//format date according to language
function svc_date_format( str ) {
	
	if ( str == null || str == undefined || str == '' ) {
		return '';
	}
	else {
		// var dat = new Date( str );
		// var d = dat.getDate();
		// var m = dat.getMonth();
		// var y = dat.getFullYear();
		// d = '0' + d;
		// 	 	d = d.substr( -2 );
		// m = m + 1;
		// 	 	m = '0' + m;
		// 	 	m = m.substr( -2 );

		var d = str.substr( 8, 2 );
		var m = str.substr( 5, 2 );
		var y = str.substr( 0, 4 );

		var langua_id = svc_lang_str( 'LANGUA_ID' );

		if ( langua_id == 2 ) {
			return m + '/' + d + '/' + y;
		}
		else {
			return d + '/' + m + '/' + y;
		}
	}
}


//replace line breaks by HTML <br>
function svc_line_break( str ) {
	str = str.replace( /(?:\r\n|\r|\n)/g, '<br>' );
	return str;
}



//read json
function svc_get_json( data ) {
	var jso = data.replace( /\uFEFF/g, ''); 
	try {
		var prs = $.parseJSON( jso );
		return prs;
	}
	catch ( e ){
		return '#ERR';
	}
}


//translate string
function svc_lang_str( str ) {
	var ret = str;
	try {
		var lineLang = global_lang.filter(x => x.LKEY === str );
		lineLang = lineLang[0];
		ret = lineLang['LSTR'];
	}
	catch ( e ){
		//skip to return the input str
	}

	return ret
}


//display system info for debug
function svc_master_function( str ) {
	$( '#svc-master-info' ).html( '' );
	if ( global_master == 1 ) $( '#svc-master-info' ).html( str );

}


//remove accents
function svc_remove_accents( str ) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}







function LOGOUT_main() {
	//WORK_IN_PROGRESS --- ajustar para encerrar a sessão
	window.location.href = '../login/'; 
}







