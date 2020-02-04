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


//read post
$post = json_decode( file_get_contents( 'php://input' ), true );
if ( sizeof( $post ) == 0 ) {
	$post = $_POST;
}


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

//get API token
if ( $procedure == 'get_token' ) {
	
	if ( file_exists( 'procedures/' . '/api_' . $procedure . '.php' ) ) {
		$vld = 1;
		include( 'procedures/' . $procedure_path . '/api_' . $procedure . '.php' );
	}
	else {
		echo svc_error( 'api/index.php', 'Error 102' );
	}
	die();
	
}


//get DOMAIN token
if ( !isset( $headers['Tk'] ) && !isset( $headers['tk'] ) ) {
	echo svc_error( 'api/index.php', 'Error 103' );
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

//procedures
if ( file_exists( 'procedures/' . '/api_' . $procedure . '.php' ) ) {
	
	$DOMAIN_ID = svc_decryp( $tk, $cryp_api_key, 24 ); //hours // $cryp_api_key @ svc_settings.php
	
	if ( $DOMAIN_ID <  1 ) {
		echo svc_error( 'api/index.php', 'Error 105 | procedure: ' . $procedure );
		die();
	}

	//connect databases
	$connection = svc_connect( $host, $login, $password, $database );
	
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


