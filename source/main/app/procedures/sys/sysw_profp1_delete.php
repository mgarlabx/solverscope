<?php

if ( $vld != 1 ) die();

$PROFP1_ID = svc_sanitize_post( $post['profp1_id'] );

$sql = "
	DELETE FROM
		SYS_PROFP1
	WHERE
		PROFP1_ID = " . $PROFP1_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





