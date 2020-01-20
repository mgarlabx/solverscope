<?php

if ( $vld != 1 ) die();

$MODULE_ID = svc_sanitize_post( $post['module_id'] );


$sql = "
	INSERT INTO MOD_TEMPLA (
		TEMPLA_DOMAIN_ID,
		TEMPLA_MODULE_ID
		) VALUE (
		" . $DOMAIN_ID . ",	
		" . $MODULE_ID . "
		)
	";
$resp = svc_query( $connection, $sql );

svc_show_result( $MODULE_ID );


?>





