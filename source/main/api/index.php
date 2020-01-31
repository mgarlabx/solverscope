<?php
/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/



/* MAIN/API/INDEX.PHP */

include( '../../svc_settings.php' );
include( '../app/app_functions.php' );
include( '../app/app_cryp.php' );
include( '../app/app_data.php' );


//read headers
$headers = apache_request_headers();


//header procedure
if ( !isset( $headers['Procedure'] ) && !isset( $headers['procedure'] ) ){
	echo svc_error( 'api/index.php', 'Error 101' );
	die();
}
else {
	if ( isset( $headers['Procedure'] ) ){
		$procedure = $headers['Procedure'];
	}
	else {
		$procedure = $headers['procedure'];
	}
}


//header token
if ( !isset( $headers['Tk'] ) && !isset( $headers['tk'] ) ) {
	echo svc_error( 'api/index.php', 'Error 102' );
	die();
}
else {
	if ( isset( $headers['Tk'] ) ) {
		$tk = $headers['Tk'];
	}
	else {
		$tk = $headers['tk'];
	}
}


//read post
$post = json_decode( file_get_contents( 'php://input' ), true );
if ( sizeof( $post ) == 0 ) {
	$post = $_POST;
}


//procedures
if ( file_exists( 'procedures/' . '/api_' . $procedure . '.php' ) ) {
	
	//connect databases
	$connection = svc_connect( $host, $login, $password, $database );
	
	$sql = "SELECT DOMAIN_ID FROM SYS_DOMAIN WHERE DOMAIN_SECRET = " .$tk;
	$DOMAIN_ID = svc_get_var( $connection, $sql );
	
	if ( $DOMAIN_ID ==  '' ) {
		echo svc_error( 'api/index.php', 'Error 105 | procedure: ' . $procedure );
		svc_disconnect( $connection );
		die();
	}

	//run procedure
	$vld = 1;
	include( 'procedures/' . $procedure_path . '/api_' . $procedure . '.php' );

	//disconnect
	svc_disconnect( $connection );
	
}


//no procedure available
else {
	echo svc_error( 'api/index.php', 'Error 106 | procedure: ' . $procedure );
	die();
}





?>


