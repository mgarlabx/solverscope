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



