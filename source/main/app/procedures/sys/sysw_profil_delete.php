<?php

if ( $vld != 1 ) die();

$PROFIL_ID = svc_sanitize_post( $post['profil_id'] );

$sql = "
	DELETE FROM
		SYS_PROFIL
	WHERE
		PROFIL_ID = " . $PROFIL_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





