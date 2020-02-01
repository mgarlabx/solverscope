<?php

//WORK_IN_PROGRESS: criar interface no front end para essa procedure. No momento, apenas pelo Postman

if ( $vld != 1 ) die();

$QUIITE_ID = svc_sanitize_post( $post['quiite_id'] );

$PERSON2_ID = svc_sanitize_post( $post['person2_id'] );


//check if person2_id belongs to this domain

$sql = "
	SELECT
		COUNT(*)
	FROM
		SYS_PERSON
		INNER JOIN SYS_PERPRO
		ON PERPRO_PERSON_ID = PERSON_ID
	WHERE
		PERSON_ID = " . $PERSON2_ID . "
		AND PERPRO_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$n = svc_get_var( $connection, $sql );
if ( $n < 1 ) {
	svc_show_result( 'Error: person_id not found' );
	die();
}



//get object ID
$sql = "
	SELECT
		QUIITE_OBJECT_ID
	FROM
		REP_QUIITE
	WHERE
		QUIITE_ID = " . $QUIITE_ID . "
		AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$OBJECT_ID = svc_get_var( $connection, $sql );





//get command txtite
$sql = "
	SELECT
		QUIITE_TXTITE_ID_COMMAND
	FROM
		REP_QUIITE
	WHERE
		QUIITE_ID = " . $QUIITE_ID . "
		AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$TXTITE_ID_COMMAND = svc_get_var( $connection, $sql );


//get feedback txtite
$sql = "
	SELECT
		QUIITE_TXTITE_ID_FEEDBACK
	FROM
		REP_QUIITE
	WHERE
		QUIITE_ID = " . $QUIITE_ID . "
		AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$TXTITE_ID_FEEDBACK = svc_get_var( $connection, $sql );



//transfer object
$sql = "
	UPDATE
		REP_OBJECT
	SET
		OBJECT_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$resp = svc_query( $connection, $sql );


//transfer quiite
$sql = "
	UPDATE
		REP_QUIITE
	SET
		QUIITE_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		QUIITE_ID = " . $QUIITE_ID . "
		AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$resp = svc_query( $connection, $sql );


//transfer quiopt
$sql = "
	UPDATE
		REP_QUIOPT
	SET
		QUIOPT_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
		AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$resp = svc_query( $connection, $sql );



//transfer txtite

$sql = "
	UPDATE
		REP_TXTITE
	SET 
		TXTITE_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTITE_ID = " . $TXTITE_ID_COMMAND . "
	";
$resp = svc_query( $connection, $sql );

$sql = "
	UPDATE
		REP_TXTITE
	SET 
		TXTITE_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTITE_ID = " . $TXTITE_ID_FEEDBACK . "
	";
$resp = svc_query( $connection, $sql );

$sql = "
	UPDATE
		REP_TXTITE
		INNER JOIN REP_QUIOPT
		ON QUIOPT_TXTITE_ID = TXTITE_ID
	SET
		TXTITE_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
	";
$resp = svc_query( $connection, $sql );



//transfer txtseg

$sql = "
	UPDATE
		REP_TXTSEG
	SET 
		TXTSEG_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTSEG_TXTITE_ID = " . $TXTITE_ID_COMMAND . "
	";
$resp = svc_query( $connection, $sql );

$sql = "
	UPDATE
		REP_TXTSEG
	SET 
		TXTSEG_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTSEG_TXTITE_ID = " . $TXTITE_ID_FEEDBACK . "
	";
$resp = svc_query( $connection, $sql );


$sql = "
	UPDATE
		REP_TXTSEG
		INNER JOIN REP_QUIOPT
		ON QUIOPT_TXTITE_ID = TXTSEG_TXTITE_ID
	SET
		TXTSEG_CREATED_BY = " . $PERSON2_ID . "
	WHERE
		TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
	";
$resp = svc_query( $connection, $sql );




svc_show_result( $resp );


?>





