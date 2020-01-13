<?php

if ( $vld != 1 ) die();

$QUIOPT_ID = svc_sanitize_post( $post['quiopt_id'] );


$sql = "
	SELECT
		QUIOPT_TXTITE_ID
	FROM
		REP_QUIOPT
	WHERE
		QUIOPT_ID = " . $QUIOPT_ID . "
		AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
	";
$TXTITE_ID = svc_get_var( $connection, $sql );


$sql = "
	DELETE FROM
		REP_QUIOPT
	WHERE
		QUIOPT_ID = " . $QUIOPT_ID . "
		AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
	";
$resp = svc_query( $connection, $sql );


$sql = "
	DELETE FROM
		REP_TXTITE
	WHERE
		TXTITE_ID = " . $TXTITE_ID . "
		AND TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTITE_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





