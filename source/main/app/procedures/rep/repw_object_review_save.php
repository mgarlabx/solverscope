<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );
$reviewer = svc_sanitize_post( $post['reviewer'] );
$rev = svc_sanitize_post( $post['rev'] );
$comment = svc_sanitize_post( $post['comment'] );

$sql = "
	UPDATE
		REP_OBJECT
	SET 
		OBJECT_REV_" . $reviewer . " = " . $rev . ",
		OBJECT_REV_COMMENT_" . $reviewer . " = '" . $comment . "'
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
	";


$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





