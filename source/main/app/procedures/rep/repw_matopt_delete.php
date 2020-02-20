<?php

if ( $vld != 1 ) die();

$MATOPT_ID = svc_sanitize_post( $post['matopt_id'] );


$sql = "
	SELECT
		MATOPT_LEFT_TXTITE_ID
	FROM
		REP_MATOPT
	WHERE
		MATOPT_ID = " . $MATOPT_ID . "
		AND MATOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MATOPT_CREATED_BY = " . $PERSON_ID . "
	";
$MATOPT_LEFT_TXTITE_ID = svc_get_var( $connection, $sql );

$sql = "
	SELECT
		MATOPT_RIGHT_TXTITE_ID
	FROM
		REP_MATOPT
	WHERE
		MATOPT_ID = " . $MATOPT_ID . "
		AND MATOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MATOPT_CREATED_BY = " . $PERSON_ID . "
	";
$MATOPT_RIGHT_TXTITE_ID = svc_get_var( $connection, $sql );

$sql = "
	DELETE FROM
		REP_MATOPT
	WHERE
		MATOPT_ID = " . $MATOPT_ID . "
		AND MATOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MATOPT_CREATED_BY = " . $PERSON_ID . "
	";
$resp = svc_query( $connection, $sql );


$sql = "
	DELETE FROM
		REP_TXTITE
	WHERE
		TXTITE_ID = " . $MATOPT_LEFT_TXTITE_ID . "
		AND TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTITE_CREATED_BY = " . $PERSON_ID . "
	";
$resp = svc_query( $connection, $sql );


$sql = "
	DELETE FROM
		REP_TXTITE
	WHERE
		TXTITE_ID = " . $MATOPT_RIGHT_TXTITE_ID . "
		AND TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTITE_CREATED_BY = " . $PERSON_ID . "
	";
$resp = svc_query( $connection, $sql );


svc_show_result( $resp );


?>





