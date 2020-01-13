<?php

if ( $vld != 1 ) die();

$QUIITE_ID = svc_sanitize_post( $post['quiite_id'] );

$sql = "INSERT INTO REP_TXTITE (TXTITE_DOMAIN_ID) VALUES (" . $DOMAIN_ID . ")";
svc_query( $connection, $sql );
$sql = "SELECT MAX(TXTITE_ID) FROM REP_TXTITE";
$TXTITE_ID = svc_get_var( $connection, $sql );

$sql = "
	SELECT
		MAX(QUIOPT_ORDERBY)
	FROM 
		REP_QUIOPT
	WHERE
		QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
		AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
	";
$oderby = svc_get_var( $connection, $sql );
$oderby = $oderby + 1;

$sql = "
	INSERT INTO REP_QUIOPT (
		QUIOPT_DOMAIN_ID,
		QUIOPT_CREATED_BY,
		QUIOPT_QUIITE_ID,
		QUIOPT_TXTITE_ID,
		QUIOPT_ORDERBY,
		QUIOPT_CORRECT
		) VALUES (
		" . $DOMAIN_ID . ",
		" . $PERSON_ID . ",
		" . $QUIITE_ID . ",
		" . $TXTITE_ID . ", 
		" . $oderby .",
		0)
		";
		
$res = svc_query( $connection, $sql );
	
svc_show_result( $res ); 


?>





