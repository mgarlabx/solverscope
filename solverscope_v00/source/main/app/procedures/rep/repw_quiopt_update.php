<?php

if ( $vld != 1 ) die();

$QUIOPT_ID = svc_sanitize_post( $post['quiopt_id'] );
$orderby = svc_sanitize_post( $post['orderby'] );
$correct = svc_sanitize_post( $post['correct'] );

if ( $correct == 1 ) {

	//get QUIITE_ID
	$sql = "
		SELECT
			QUIOPT_QUIITE_ID
		FROM
			REP_QUIOPT
		WHERE
			QUIOPT_ID = " . $QUIOPT_ID . "
			AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
			AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
		";
	$QUIITE_ID = svc_get_var( $connection, $sql );

	//update all options as correct = 0
	$sql = "
		UPDATE
			REP_QUIOPT
		SET
			QUIOPT_CORRECT = 0
		WHERE
			QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
			AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
			AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );

}

//update actual data
$sql = "
	UPDATE
		REP_QUIOPT
	SET
		QUIOPT_ORDERBY = " . $orderby . ",
		QUIOPT_CORRECT = " . $correct . "
	WHERE
		QUIOPT_ID = " . $QUIOPT_ID . "
		AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





