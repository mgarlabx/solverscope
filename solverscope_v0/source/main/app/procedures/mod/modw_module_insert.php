<?php

if ( $vld != 1 ) die();

$MODULE_INPUT = svc_sanitize_post( $post['module_input'] );

$MODULE_INPUT = trim( $MODULE_INPUT );

if ( strlen( $MODULE_INPUT ) < 3 ) { //min 3 chars for code
	svc_show_result( 0 );
	die();
}

$sql = "
	INSERT INTO MOD_MODULE (
		MODULE_DOMAIN_ID,
		MODULE_CODE
		) VALUE (
		" . $DOMAIN_ID . ",	
		'" . $MODULE_INPUT . "'
		)
	";
$resp = svc_query( $connection, $sql );

$sql = "
	SELECT
		MAX(MODULE_ID)
	FROM
		MOD_MODULE
	WHERE
		MODULE_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$MODULE_ID =  svc_get_var( $connection, $sql );


svc_show_result( $MODULE_ID );


?>





