<?php

if ( $vld != 1 ) die();

$PROFIL_ID = svc_sanitize_post( $post['profil_id'] );
$PROFIL_NAME = svc_sanitize_post( $post['input_name'] );

$sql = "
	UPDATE
		SYS_PROFIL
	SET
		PROFIL_NAME = '" . $PROFIL_NAME . "'
	WHERE
		PROFIL_ID = " . $PROFIL_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





