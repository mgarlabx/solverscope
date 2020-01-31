<?php
/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/



/* MAIN/APP/INDEX.PHP */

include( '../../svc_settings.php' );
include( 'app_functions.php' );
include( 'app_cryp.php' );
include( 'app_data.php' );


//read headers
$headers = apache_request_headers();

//header procedure
if ( !isset( $headers['Procedure'] ) && !isset( $headers['procedure'] ) ){
	echo svc_error( 'app/index.php', 'Error 101' );
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
$procedure_path = substr( $procedure, 0, 3 );


//read post
$post = json_decode( file_get_contents( 'php://input' ), true );
if ( sizeof( $post ) == 0 ) {
	$post = $_POST;
}


//connect databases
$connection = svc_connect( $host, $login, $password, $database );


//login
if ( $procedure == 'sysw_login' ) {
	$vld = 1; 
	include( 'procedures/' . $procedure_path . '/' . $procedure . '.php' );
	svc_disconnect( $connection );
	die();
}



//header token
if ( !isset( $headers['Tk'] ) && !isset( $headers['tk'] ) ) {
	echo svc_error( 'app/index.php', 'Error 102' );
	svc_disconnect( $connection );
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

//token size
if ( strlen( $tk ) != 29 ){
	echo svc_error( 'app/index.php', 'Error 103' );
	svc_disconnect( $connection );
	die();
}











//procedures
if ( file_exists( 'procedures/' . $procedure_path . '/' . $procedure . '.php' ) ) {
	
	//decryp person
	$PERSON_ID = svc_decryp( $tk, $cryp_key, 24 ); //hours // $cryp_key @ svc_settings.php
	
	//get current domain and language
	$sql = "
		SELECT
			DOMAIN_ID,
			DOMAIN_LANGUA_ID
		FROM
			SYS_PERSON
			INNER JOIN SYS_DOMAIN
			ON PERSON_LAST_DOMAIN_ID = DOMAIN_ID
		WHERE
			PERSON_ID = " . $PERSON_ID . "
		";
	$rows = svc_get_rows( $connection, $sql );
	$DOMAIN_ID = $rows[0]['DOMAIN_ID'];
	$LANGUA_ID = $rows[0]['DOMAIN_LANGUA_ID'];
	$path_img = 'files/DOM' . str_pad( $DOMAIN_ID, 10, '0', STR_PAD_LEFT ) . '/IMG/' ;
	
	
	//check permissions for this procedure
	$vld = svc_procedure_permission( $procedure );
	
	if ( $vld == 0 ) {
		echo svc_error( 'app/index.php', 'Error 105 | procedure: ' . $procedure );
		svc_disconnect( $connection );
		die();
	}
	
	//run procedure
	include( 'procedures/' . $procedure_path . '/' . $procedure . '.php' );
	
}


//no procedure available
else {
	echo svc_error( 'app/index.php', 'Error 106 | procedure: ' . $procedure );
	svc_disconnect( $connection );
	die();
}


//disconnect
svc_disconnect( $connection );



?>


