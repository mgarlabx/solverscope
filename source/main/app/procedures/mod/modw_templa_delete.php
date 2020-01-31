<?php

if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );

$sql = "
	DELETE FROM MOD_TEMPLA
	WHERE
		TEMPLA_ID = " . $TEMPLA_ID . "
		AND TEMPLA_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





