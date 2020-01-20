/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/

function HOME_main() {
	$( '#main-title' ).html( svc_lang_str( 'HOME' ) );

	var tx = '';

	tx += '<div style="width:100%;text-align:center" class="alert alert-warning">' + svc_lang_str( 'DISCLAIMER_1' ) + '</div>';
	
	tx += '<div style="width:100%;text-align:center;margin-top:1rem">' + svc_lang_str( 'DISCLAIMER_2' ) + '</div>';

	tx += '<div style="width:100%;text-align:center;margin-top:1rem"><b>' + svc_lang_str( 'DISCLAIMER_3' ) + '</b></div>';

	tx += '<div style="width:100%;text-align:center;margin-top:1rem"><a target="_blank" rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" width="150" src="img/cc_by.png" /></a></div>';
		
	tx += '<div style="width:100%;text-align:center;margin-top:3rem"><img style="width:60%" src="img/prototype.jpg"></div>';

	
	$( '#svc-main-content-0' ).html( tx );
	
}