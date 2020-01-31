<?php

if ( $vld != 1 ) die();

$PROFIL_NAME = svc_sanitize_post( $post['input_name'] );

$sql = "
	INSERT INTO SYS_PROFIL (
		PROFIL_NAME
		) VALUE (
		'" . $PROFIL_NAME . "'	
		)
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





