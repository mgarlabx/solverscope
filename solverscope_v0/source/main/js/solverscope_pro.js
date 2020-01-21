/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/***** PRODUCTS ***********************************************************************************************************************************************************/


function PRODUCTS_main() {

	$( '#main-title' ).html( svc_lang_str( 'PRODUCTS' ) );
	
	svc_master_function( 'PRODUCTS_main() @ solverscope_pro.js' );

	var tx = '';
	
	tx += 'PRODUCTS | SCHEMAS | BLOCKS | MODULES'; //WORK_IN_PROGRESS 
	tx += '<hr>';
	tx += 'WORK IN PROGRESS';
	
	$( '#svc-main-content-0' ).html( tx );
	$( '#svc-main-content-0' ).show();

}

