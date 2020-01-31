<?php

if ( $vld != 1 ) die();

$TXTSEG_ID = svc_sanitize_post( $post['txtseg_id'] );

$sql = "
	DELETE FROM
		REP_TXTSEG
	WHERE
		TXTSEG_ID = " . $TXTSEG_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$res = svc_query( $connection, $sql );

svc_show_result( $res ); 

?>





