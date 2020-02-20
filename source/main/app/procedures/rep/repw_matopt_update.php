<?php

if ( $vld != 1 ) die();

$MATOPT_ID = svc_sanitize_post( $post['matopt_id'] );
$MATOPT_ORDERBY  = svc_sanitize_post( $post['matopt_orderby'] );
$MATOPT_COMMENTS = svc_sanitize_post( $post['matopt_comments'] );
$MATOPT_LEFT_NUM = svc_sanitize_post( $post['matopt_left_num'] );
$MATOPT_RIGHT_NUM = svc_sanitize_post( $post['matopt_right_num'] );

$sql = "
	UPDATE
		REP_MATOPT
	SET
		MATOPT_ORDERBY = " . $MATOPT_ORDERBY . ",
		MATOPT_COMMENTS = '" . $MATOPT_COMMENTS . "',
		MATOPT_LEFT_NUM = " . $MATOPT_LEFT_NUM . ",
		MATOPT_RIGHT_NUM = " . $MATOPT_RIGHT_NUM . "
	WHERE
		MATOPT_ID = " . $MATOPT_ID . "
		AND MATOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MATOPT_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





