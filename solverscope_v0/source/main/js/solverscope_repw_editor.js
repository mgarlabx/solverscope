/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


$( document ).ready( function() {
	
	//paste plain text (instead of formatted)
	$( '#svc-editor-text' ).on( 'paste', function ( e ) {
		e.preventDefault();
		var cd = e.originalEvent.clipboardData.getData( 'text/plain' );
		document.execCommand( 'insertText', false, cd );
	});
	
	$( '#svc-editor-colors' ).mouseleave( function(){
		$( '#svc-editor-colors' ).hide();
	});
	
	$( '#svc-editor-symbols' ).mouseleave( function(){
		$( '#svc-editor-symbols' ).hide();
	});
	
	$( '#svc-editor-modal-header' ).mouseover( function(){
		$( '#svc-editor-colors' ).hide();
		$( '#svc-editor-symbols' ).hide();
	});
	
	
	
});



//translate editor labels
function svc_editor_translate() {
	$( '#svc-editor-modal-title' ).html( svc_lang_str( 'TEXT_EDITOR' ) );
	$( '#svc-editor-button-BOLD' ).attr( 'title', svc_lang_str( 'BOLD' ) );
	$( '#svc-editor-button-ITALIC' ).attr( 'title', svc_lang_str( 'ITALIC' ) );
	$( '#svc-editor-button-UNDERLINED' ).attr( 'title', svc_lang_str( 'UNDERLINED' ) );
	$( '#svc-editor-button-SUPERSCRIPT' ).attr( 'title', svc_lang_str( 'SUPERSCRIPT' ) );
	$( '#svc-editor-button-SUBSCRIPT' ).attr( 'title', svc_lang_str( 'SUBSCRIPT' ) );
	$( '#svc-editor-button-COLORS' ).attr( 'title', svc_lang_str( 'COLORS' ) );
	$( '#svc-editor-button-SYMBOLS' ).attr( 'title', svc_lang_str( 'SYMBOLS' ) );
	$( '#svc-editor-button-CLEAR_FORMAT' ).attr( 'title', svc_lang_str( 'CLEAR_FORMAT' ) );
	$( '#svc-editor-orderby-label' ).html( svc_lang_str( 'ORDER_BY' ) );
	$( '#svc-editor-style-label' ).html( svc_lang_str( 'STYLE' ) );
	$( '#svc-editor-select-PARAGRAPH' ).html( svc_lang_str( 'PARAGRAPH' ) );
	$( '#svc-editor-select-HEADER-1' ).html( svc_lang_str( 'HEADER' ) + ' 1' );
	$( '#svc-editor-select-HEADER-2' ).html( svc_lang_str( 'HEADER' ) + ' 2' );
	$( '#svc-editor-select-FOOTNOTE' ).html( svc_lang_str( 'FOOTNOTE' ) );
}



//format text
function svc_editor_format( str ) {
	
	if ( str == 'colors' ) {
		var p = $( '#svc-editor-button-colors' ).position();
		$( '#svc-editor-symbols' ).hide();
 		$( '#svc-editor-colors' ).css('left', p.left + 15 );
 		$( '#svc-editor-colors' ).css('top', p.top + 35 );
 		$( '#svc-editor-colors' ).show();
	}
	
	else if ( str == 'symbols' ) {
		var symbols = [ '&alpha;', '&beta;', '&gamma;', '&Gamma;', '&delta;', '&Delta;', '&epsilon;', '&theta;', '&Theta;', '&lambda;', '&Lambda;', '&mu;', '&nu;', '&xi;', '&pi;','&sigma;', '&Sigma;', '&tau;', '&phi;', '&Phi;', '&psi;', '&Psi;', '&omega;', '&Omega;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&rArr;', '&hArr;','&#8596;', '&#8629;', '&forall;', '&part;', '&exist;', '&nabla;', '&isin;', '&ni;', '&sum;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;','&cap;', '&cup;', '&int;', '&there4;', '&ne;', '&#8804;', '&#8805;', '&equiv;', '&lt;', '&gt;', '&#8773;', '&#8776;', '&plusmn;', '&times;', '&divide;','&amp;', '&sub;', '&sup;', '&sube;', '&supe;', '&perp;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&#171;', '&#187;', '&dagger;', '&Dagger;', '&permil;','&lsaquo;', '&rsaquo;', '&not;', '&pound;', '&sect;', '&copy;', '&reg;', '&#8482;', '&micro;', '&para;', '&Oslash;', '&oslash;', '&#185;', '&sup2;','&sup3;', '&frac14;', '&frac12;', '&frac34;', '&deg;', '&#186;', '&#170;', '&#191;', '&#161;', '&#8709;', '&#8713;', '&#8836;', '&#8853;', '&#8855;','&#338;', '&#339;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;' ];
		var tx_symbols = '';
		var r = 0
		for ( i = 0; i < symbols.length; i++ ) {
			tx_symbols += '<button class="svc-editor-symbol" style="background-symbol:black" onclick="svc_editor_symbol(\'' +  symbols[i] + '\')">' + symbols[i] +'</button>';
			if ( r < 9 ) {
				r = r + 1;	
			}
			else {
				tx_symbols += '<br>';
				r = 0;
			}
		}
		$( '#svc-editor-colors' ).hide();
		$( '#svc-editor-symbols' ).html( tx_symbols );
		var p = $( '#svc-editor-button-symbols' ).position();
 		$( '#svc-editor-symbols' ).css('left', p.left - 30 );
 		$( '#svc-editor-symbols' ).css('top', p.top + 35 );
 		$( '#svc-editor-symbols' ).show();
		
	}

	else {
		//ref https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
		document.execCommand( str, false, null ); 
		$( '#svc-editor-colors' ).hide();
		$( '#svc-editor-symbols' ).hide();
	}
	
}


//set color
function svc_editor_color( color ) {
	if ( color == 'no' ) {
		var tx = $( '#svc-editor-text' ).html();
		tx = tx.replace( '<font color="red">', '' );
		tx = tx.replace( '<font color="green">', '' );
		tx = tx.replace( '<font color="blue">', '' );
		tx = tx.replace( '<font color="cyan">', '' );
		tx = tx.replace( '<font color="purple">', '' );
		tx = tx.replace( '<font color="yellow">', '' );
		tx = tx.replace( '<font color="grey">', '' );
		tx = tx.replace( '<font color="black">', '' );
		tx = tx.replace( '<font color="white">', '' );
		tx = tx.replace( '</font>', '' );		
		$( '#svc-editor-text' ).html( tx );
	}
	else {
		document.execCommand( 'foreColor', false, color ); 
	}
	$( '#svc-editor-colors' ).hide();
}


//set symbol
function svc_editor_symbol( s ){
	document.execCommand( 'insertHTML', false, s );
	$( '#svc-editor-symbols' ).hide();
}






/******  TXTITE ***************************************************************************************************************/
		
function repw_txtite_update( txtite_id ) {
	
	svc_master_function( 'repw_txtite_update(' + txtite_id + ') @ solverscope_repw_editor.js' );
	
	global_last_op = 'repw_txtite_update';
	
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_txtite_get' },
		data: { 'txtite_id': txtite_id },
		success: function( data ) {

			var rows = svc_get_json( data );
			var tx = '';
			var maxseg = 0;

			$( '#svc-main-content-header-2' ).html( '&nbsp;' );
			
			for ( var i = 0; i < rows.length ; i++ ) {
				maxseg = rows[i]['TXTSEG_ORDERBY'];
				
				tx += '<div class="col-md-12">';
				tx += '<div class="card">';
				tx += '<div class="card-head">';
				tx += '<header>' + svc_lang_str( 'PART' ) + ' ' + rows[i]['TXTSEG_ORDERBY'];
				if ( global_master == 1 ) tx += '<span class="svc-master">TXTSEG_ID: ' + rows[i]['TXTSEG_ID'] + '</span>';
				tx += '</header>';
				tx += '<div class="float-right">';
				if ( rows[i]['TXTSEG_TYPE'] == 'TXT' ){
					tx += '<button type="button" class="btn btn-primary" onclick="repw_txtseg_txt_update(' + rows[i]['TXTSEG_ID'] + ')"><i class="fa fa-pencil"></i></button> ';
					tx += '<button type="button" class="btn btn-danger" onclick="repw_txtseg_delete(' + rows[i]['TXTSEG_ID'] + ', ' + txtite_id + ')"><i class="fa fa-trash-o"></i></button>';
					tx += '</div>';
					tx += '</div>';
					tx += '<div class="card-body svc-editor-txt-' + rows[i]['TXTSEG_STYLE'] + '">';
					tx += rows[i]['TXTSEG_CONTENT'];
				}
				else if ( rows[i]['TXTSEG_TYPE'] == 'IMG' ){
					tx += '<button type="button" class="btn btn-danger" onclick="repw_txtseg_delete(' + rows[i]['TXTSEG_ID'] + ', ' + txtite_id + ')"><i class="fa fa-trash-o"></i></button>';
					tx += '</div>';
					tx += '</div>';
					tx += '<div class="card-body">';
					tx += '<div class="svc-editor-img"><img style="max-width:' + rows[i]['TXTSEG_STYLE'] + 'px;" src="' + rows[i]['TXTSEG_CONTENT'] + '" /></div>'; //<--- WORK_IN_PROGRESS limitar largura
				}
				else if ( rows[i]['TXTSEG_TYPE'] == 'YOU' ){
					var content = rows[i]['TXTSEG_CONTENT'];
					tx += '<button type="button" class="btn btn-primary" onclick="repw_txtseg_you_update(' + rows[i]['TXTSEG_ID'] + ', ' + txtite_id + ', \'' + content + '\')"><i class="fa fa-pencil"></i></button> ';
					tx += '<button type="button" class="btn btn-danger" onclick="repw_txtseg_delete(' + rows[i]['TXTSEG_ID'] + ', ' + txtite_id + ')"><i class="fa fa-trash-o"></i></button>';
					tx += '</div>';
					tx += '</div>';
					tx += '<div class="card-body">';
					content = '<iframe width="560" height="349" src="https://www.youtube.com/embed/' + content +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
					tx += '<div class="svc-editor-you">' + content + '</div>';
				}
				else if ( rows[i]['TXTSEG_TYPE'] == 'FOR' ){
					var content = rows[i]['TXTSEG_CONTENT'];
					content = content.replace(/\\/gi, 'X4597SEZXOUY');
					tx += '<button type="button" class="btn btn-primary" onclick="repw_txtseg_for_update(' + rows[i]['TXTSEG_ID'] + ', ' + txtite_id + ', \'' + content + '\')"><i class="fa fa-pencil"></i></button> ';
					tx += '<button type="button" class="btn btn-danger" onclick="repw_txtseg_delete(' + rows[i]['TXTSEG_ID'] + ', ' + txtite_id + ')"><i class="fa fa-trash-o"></i></button>';
					tx += '</div>';
					tx += '</div>';
					tx += '<div class="card-body">';
					content = rows[i]['TXTSEG_CONTENT'];
					content = katex.renderToString( content, {throwOnError: false} );
					tx += '<div class="svc-editor-for">' + content + '</div>';
				}
				tx += '</div>';
				tx += '</div>';
				tx += '</div>';
				tx += '</div>';
			}
			
			tx += '<div class="col-md-12">';
			tx += '<div class="card">';
			tx += '<div class="card-head">';
			tx += '<div style="width:100%;text-align:center">';
			tx += '<button type="button" class="btn btn-success" onclick="repw_txtseg_txt_insert(' + txtite_id + ',' + maxseg + ')">+ <i class="fa fa-file-word-o"></i> ' + svc_lang_str( 'TEXT' ) + '</button>&nbsp;&nbsp;';
			tx += '<button type="button" class="btn btn-success" onclick="repw_txtseg_img_insert(' + txtite_id + ',' + maxseg + ')">+ <i class="fa fa-picture-o"></i> ' + svc_lang_str( 'IMAGE' ) + '</button>&nbsp;&nbsp;';
			tx += '<button type="button" class="btn btn-success" onclick="repw_txtseg_you_insert(' + txtite_id + ',' + maxseg + ')">+ <i class="fa fa-youtube"></i> ' + 'Youtube' + '</button>&nbsp;&nbsp;';
			tx += '<button type="button" class="btn btn-success" onclick="repw_txtseg_for_insert(' + txtite_id + ',' + maxseg + ')">+ <i class="fa fa-superscript"></i> ' + svc_lang_str( 'EQUATION' ) + '</button>&nbsp;&nbsp;';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';
			tx += '</div>';
		
			
			$( '#svc-main-content-body-2' ).html( tx );
			$( '#svc-main-content-0' ).hide();
			$( '#svc-main-content-1' ).hide();
			$( '#svc-main-content-2' ).show();
			
			
		}
	});
	
	
}


//del 
function repw_txtseg_delete( txtseg_id, txtite_id ) {
	if ( confirm( svc_lang_str( 'CONFIRM_PART_DEL') ) ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_txtseg_delete' },
			data: { 'txtseg_id': txtseg_id },
			success: function( data ) {
				repw_txtite_update( txtite_id );
			}
		});
	}
}





/***** TXT *******************************************************************************************************************************************/

//update TXT
function repw_txtseg_txt_update( txtseg_id ) {
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'rep_txtseg_get' },
		data: { 'txtseg_id': txtseg_id },
		success: function( data ) {
			var row = svc_get_json( data );
			$( '#svc-editor-id' ).html( txtseg_id );
			$( '#svc-editor-orderby-value' ).val( row['TXTSEG_ORDERBY'] );
			$( '#svc-editor-style-value' ).val( row['TXTSEG_STYLE'] );
			$( '#svc-editor-text' ).html( row['TXTSEG_CONTENT'] );
			$( '#svc-editor-modal-button' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_txt_update_save()">' + svc_lang_str( 'SAVE' )+ '</button>' );			
			$( '#svc-editor-modal' ).modal( 'show' );
		}
	});
}


//update save TXT
function repw_txtseg_txt_update_save() {
	var txtseg_id = $( '#svc-editor-id' ).html();
	var content = $( '#svc-editor-text' ).html();
	var style = $( '#svc-editor-style-value' ).val();
	var orderby = $( '#svc-editor-orderby-value' ).val();
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_txtseg_txt_update' },
		data: { 'txtseg_id': txtseg_id, 'content': content, 'style': style, 'orderby': orderby },
		success: function( data ) {
			var id = data.trim();
			$( '#svc-editor-modal' ).modal( 'hide' );
			if ( id > 0 ) {
				repw_txtite_update( id );
			}
		}
	});
}


//new TXT
function repw_txtseg_txt_insert( txtite_id, maxseg ) {
	
	$( '#svc-editor-id' ).html( txtite_id );
	$( '#svc-editor-orderby-value' ).val( maxseg+1 );
	$( '#svc-editor-style-value' ).val( 'paragraph' );
	$( '#svc-editor-text' ).html( '' );
	$( '#svc-editor-modal-button' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_txt_insert_save()">' + svc_lang_str( 'SAVE' )+ '</button>' );			
	$( '#svc-editor-modal' ).modal( 'show' );
	
}


//new save TXT
function repw_txtseg_txt_insert_save() {
	var txtite_id = $( '#svc-editor-id' ).html();
	var content = $( '#svc-editor-text' ).html();
	var style = $( '#svc-editor-style-value' ).val();
	var orderby = $( '#svc-editor-orderby-value' ).val();
	$.ajax({
		url: 'app/',
		type: 'POST',
		headers: { 'tk': tk, 'procedure': 'repw_txtseg_txt_insert' },
		data: { 'txtite_id': txtite_id, 'content': content, 'style': style, 'orderby': orderby },
		success: function( data ) {
			var id = data.trim();
			$( '#svc-editor-modal' ).modal( 'hide' );
			repw_txtite_update( txtite_id );
		}
	});
}





/***** IMG *******************************************************************************************************************************************/


//new IMG
function repw_txtseg_img_insert( txtite_id, maxseg ) {

	var tx = '';
	tx += '<form enctype="multipart/form-data" action="app/procedures/rep/repZ_txtseg_img_insert.php" method="post" id="fileupload" target="_blank">';
	tx += '<input type="hidden" name="tk" value="' + BigInt( tk ) + '">';
	tx += '<input type="hidden" name="txtite_id" value="' + txtite_id + '">';
	tx += '<input type="hidden" name="maxseg" value="' + maxseg + '">';
	tx += '<input name="image-name" accept="image/*" type="file">';
	tx += '</form>';

	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_FILE_NAME' ) );
	$( '#myModalBody' ).html( tx );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_img_insert_save(' + txtite_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );

}

//new save IMG
function repw_txtseg_img_insert_save( txtite_id ) {

	$( '#fileupload' ).submit();
	$( '#myModal' ).modal( 'hide' );

	setTimeout(function(){
		repw_txtite_update( txtite_id );
	}, 500 ); 
	
}




/***** YOUTUBE *******************************************************************************************************************************************/

//update YOU
function repw_txtseg_you_update( txtseg_id, txtite_id, content ) {
	//WORK_IN_PROGRESS: permitir mudar a ordenação
	content = content.replace(/X4597SEZXOUY/gi, '\\');
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_VIDEO_ID' ) );
	$( '#myModalBody' ).html( '<input type="text" style="width:100%" class="youm-control" id="content" value="' + content + '">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_you_update_save(' + txtseg_id + ', ' + txtite_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


//new save YOU
function repw_txtseg_you_update_save( txtseg_id, txtite_id ) {
	//WORK_IN_PROGRESS: permitir mudar a ordenação
	var content = $( '#content' ).val();
	content = svc_clean_youtube( content );
	if ( content != '' && content != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_txtseg_you_update' },
			data: { 'txtseg_id': txtseg_id, 'content': content },
			success: function( data ) {
				repw_txtite_update( txtite_id );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}



//new YOU
function repw_txtseg_you_insert( txtite_id, maxseg ) {
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_VIDEO_ID' ) );
	$( '#myModalBody' ).html( '<input type="text" style="width:100%" class="youm-control" id="content">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_you_insert_save(' + txtite_id + ',' + maxseg + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


//new save YOU
function repw_txtseg_you_insert_save( txtite_id, maxseg ) {
	var content = $( '#content' ).val();
	content = svc_clean_youtube( content );
	if ( content != '' && content != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_txtseg_you_insert' },
			data: { 'txtite_id': txtite_id, 'orderby': (maxseg+1), 'content': content },
			success: function( data ) {
				repw_txtite_update( txtite_id );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}


//extract ID from Youtube URL
function svc_clean_youtube( url ) {
	if ( url.length == 11 ) {
		return url;
	}
	else {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match( regExp );
		return ( match&&match[7].length==11 )? match[7] : false;
	}
}



/***** FOR *******************************************************************************************************************************************/


//update FOR
function repw_txtseg_for_update( txtseg_id, txtite_id, content ) {
	//WORK_IN_PROGRESS: permitir mudar a ordenação
	content = content.replace(/X4597SEZXOUY/gi, '\\');
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_EQUATION' ) );
	$( '#myModalBody' ).html( '<input type="text" style="width:100%" class="form-control" id="content" value="' + content + '">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_for_update_save(' + txtseg_id + ', ' + txtite_id + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


//new save FOR
function repw_txtseg_for_update_save( txtseg_id, txtite_id ) {
	//WORK_IN_PROGRESS: permitir mudar a ordenação
	var content = $( '#content' ).val();
	content = content.trim();
	if ( content != '' && content != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_txtseg_for_update' },
			data: { 'txtseg_id': txtseg_id, 'content': content },
			success: function( data ) {
				repw_txtite_update( txtite_id );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}



//new FOR
function repw_txtseg_for_insert( txtite_id, maxseg ) {
	$( '#myModalTitle' ).html( svc_lang_str( 'PROMPT_EQUATION' ) );
	$( '#myModalBody' ).html( '<input type="text" style="width:100%" class="form-control" id="content">' );
	$( '#myModalButton' ).html( '<button type="button" class="btn btn-primary" onclick="repw_txtseg_for_insert_save(' + txtite_id + ',' + maxseg + ')">' + svc_lang_str( 'SAVE' ) + '</button>' );
	$( '#myModal' ).modal( 'show' );
}


//new save FOR
function repw_txtseg_for_insert_save( txtite_id, maxseg ) {
	var content = $( '#content' ).val();
	content = content.trim();
	if ( content != '' && content != null ) {
		$.ajax({
			url: 'app/',
			type: 'POST',
			headers: { 'tk': tk, 'procedure': 'repw_txtseg_for_insert' },
			data: { 'txtite_id': txtite_id, 'orderby': (maxseg+1), 'content': content },
			success: function( data ) {
				repw_txtite_update( txtite_id );
			}
		});
	}
	$( '#myModal' ).modal( 'hide' );
}
