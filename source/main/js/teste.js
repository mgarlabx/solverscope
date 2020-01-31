/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/



$( document ).ready( function() {

	$( '#simpleUpload' ).simpleUpload({  

	    url: '../../../upload/upload.php',  

	    trigger: '#enviar', 
		
		size: 1024, 
		
		fields: {'p1': 12, 'p2': 13 },

	    types: [ 'jpg', 'png', 'gif', 'jpeg' ],  

	    error: function( error ) { 
			if ( error.type == 'fileType' ) {
				alert( 'Formato não permitido' );
			}
			else if ( error.type == 'size' ) {
				alert( 'Arquivo muito grande. O máximo é 1 Mb.' );
			}
			else {
				alert( error.type );
			}
	    },
		 
	    success: function(data){  

	        alert(data);  

	    }  

	});


	
});


