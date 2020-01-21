<?php

if ( $vld != 1 ) die();

$TPSEGM_ID = svc_sanitize_post( $post['tpsegm_id'] );

$sql = "
	DELETE FROM MOD_TPSEGM
	WHERE
		TPSEGM_ID = " . $TPSEGM_ID . "
		AND TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





