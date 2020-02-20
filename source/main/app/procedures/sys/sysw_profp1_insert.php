<?php

if ( $vld != 1 ) die();

$PROFIL_ID = svc_sanitize_post( $post['profil_id'] );
$PROFP0_ID = svc_sanitize_post( $post['profp0_id'] );

$sql = "
	INSERT INTO SYS_PROFP1 (
		PROFP1_PROFIL_ID,
		PROFP1_PROFP0_ID
	) VALUE (
		" . $PROFIL_ID . ",	
		" . $PROFP0_ID . "	
	)
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





