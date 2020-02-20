<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );
$MATOPT_ORDERBY  = svc_sanitize_post( $post['matopt_orderby'] );
$MATOPT_COMMENTS = svc_sanitize_post( $post['matopt_comments'] );
$MATOPT_LEFT_NUM = svc_sanitize_post( $post['matopt_left_num'] );
$MATOPT_RIGHT_NUM = svc_sanitize_post( $post['matopt_right_num'] );

$sql = "
	SELECT
		MATTEX_ID
	FROM
		REP_MATTEX
	WHERE
		MATTEX_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MATTEX_CREATED_BY = " . $PERSON_ID . "
		AND MATTEX_OBJECT_ID = " . $OBJECT_ID . "
	";
$MATTEX_ID = svc_get_var( $connection, $sql );


$sql = "INSERT INTO REP_TXTITE (TXTITE_DOMAIN_ID, TXTITE_CREATED_BY) VALUES (" . $DOMAIN_ID . ", " . $PERSON_ID . ")";
svc_query( $connection, $sql );
$MATOPT_LEFT_TXTITE_ID = svc_get_var( $connection, "SELECT MAX(TXTITE_ID) FROM REP_TXTITE" );

$sql = "INSERT INTO REP_TXTITE (TXTITE_DOMAIN_ID, TXTITE_CREATED_BY) VALUES (" . $DOMAIN_ID . ", " . $PERSON_ID . ")";
svc_query( $connection, $sql );
$MATOPT_RIGHT_TXTITE_ID = svc_get_var( $connection, "SELECT MAX(TXTITE_ID) FROM REP_TXTITE" );


$sql = "
	INSERT INTO REP_MATOPT (
		MATOPT_DOMAIN_ID,
		MATOPT_CREATED_BY,
		MATOPT_MATTEX_ID,
		MATOPT_ORDERBY,
		MATOPT_COMMENTS,
		MATOPT_LEFT_NUM,
		MATOPT_LEFT_TXTITE_ID,
		MATOPT_RIGHT_NUM,
		MATOPT_RIGHT_TXTITE_ID
	) VALUES (
		" . $DOMAIN_ID . ",
		" . $PERSON_ID . ",
		" . $MATTEX_ID . ",
		" . $MATOPT_ORDERBY . ",
		'" . $MATOPT_COMMENTS . "',
		" . $MATOPT_LEFT_NUM . ",
		" . $MATOPT_LEFT_TXTITE_ID . ",
		" . $MATOPT_RIGHT_NUM . ",
		" . $MATOPT_RIGHT_TXTITE_ID . "
	)
	";

$resp = svc_query( $connection, $sql );

//$resp = $sql;

svc_show_result( $resp );


?>





