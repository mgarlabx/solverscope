<?php

if ( $vld != 1 ) die();

$parent = svc_sanitize_post( $post['parent'] );
$name = svc_sanitize_post( $post['name'] );

$sql = "
	
	INSERT INTO REP_FOLDER (
		FOLDER_NAME,
		FOLDER_PARENT_ID,
		FOLDER_CREATED_BY,
		FOLDER_DOMAIN_ID
	) VALUES (
		'" . $name . "',
		" . $parent . ",
		" . $PERSON_ID . ",
		" . $DOMAIN_ID . "
	)
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





