<?php

if ( $vld != 1 ) die();

$QUIAIT_ID = svc_sanitize_post( $post['quiait_id'] );
$orderby = svc_sanitize_post( $post['orderby'] );

$sql = "
	UPDATE
		REP_QUIAIT
	SET
		QUIAIT_ORDERBY = " . $orderby . "
	WHERE
		QUIAIT_ID = " . $QUIAIT_ID . "
		AND QUIAIT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIAIT_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $sql );


?>





