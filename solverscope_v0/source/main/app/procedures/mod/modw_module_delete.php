<?php

if ( $vld != 1 ) die();

$MODULE_ID = svc_sanitize_post( $post['module_id'] );

$sql = "
	DELETE FROM MOD_MODULE
	WHERE
		MODULE_ID = " . $MODULE_ID . "
		AND MODULE_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





