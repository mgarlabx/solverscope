<?php

if ( $vld != 1 ) die();

$FOLDER_ID = svc_sanitize_post( $post['folder_id'] );
$name = svc_sanitize_post( $post['name'] );

$sql = "
	UPDATE
		REP_FOLDER
	SET
		FOLDER_NAME = '" . $name . "'
	WHERE
		FOLDER_ID = " . $FOLDER_ID . "
		AND FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
		AND FOLDER_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





