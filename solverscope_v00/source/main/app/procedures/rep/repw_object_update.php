<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );
$OBJECT_NAME = svc_sanitize_post( $post['object_name'] );
$OBJECT_ACTIVE = svc_sanitize_post( $post['object_active'] );

$sql = "
	UPDATE
		REP_OBJECT
	SET
		OBJECT_NAME = '" . $OBJECT_NAME . "',
		OBJECT_ACTIVE = " . $OBJECT_ACTIVE . "
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND OBJECT_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





