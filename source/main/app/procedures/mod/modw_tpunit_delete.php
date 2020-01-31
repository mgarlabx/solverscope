<?php

if ( $vld != 1 ) die();

$TPUNIT_ID = svc_sanitize_post( $post['tpunit_id'] );

$sql = "
	DELETE FROM MOD_TPUNIT
	WHERE
		TPUNIT_ID = " . $TPUNIT_ID . "
		AND TPUNIT_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





