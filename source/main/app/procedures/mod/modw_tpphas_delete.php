<?php

if ( $vld != 1 ) die();

$TPPHAS_ID = svc_sanitize_post( $post['tpphas_id'] );

$sql = "
	DELETE FROM
		MOD_TPPHAS
	WHERE
		TPPHAS_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPPHAS_ID = " . $TPPHAS_ID . "
	";

$res = svc_query( $connection, $sql );

svc_show_result( $res );


?>





