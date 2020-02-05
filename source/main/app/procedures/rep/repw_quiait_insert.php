<?php

if ( $vld != 1 ) die();

$QUIASM_ID = svc_sanitize_post( $post['quiasm_id'] );
$OBJECT_ID = svc_sanitize_post( $post['object_id'] );


//find QUIITE_ID
$sql = "
	SELECT
		QUIITE_ID
	FROM
		REP_QUIITE
	WHERE
		QUIITE_OBJECT_ID = " . $OBJECT_ID . "
		AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIITE_CREATED_BY = " . $PERSON_ID . "
	";
$QUIITE_ID = svc_get_var( $connection, $sql );
	

//find ORDERBY
$sql = "
	SELECT
		MAX(QUIAIT_ORDERBY)
	FROM 
		REP_QUIAIT
	WHERE
		QUIAIT_QUIASM_ID  = " . $QUIASM_ID . "
		AND QUIAIT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIAIT_CREATED_BY = " . $PERSON_ID . "
	";
$oderby = svc_get_var( $connection, $sql );
$oderby = $oderby + 1;


//insert
$sql = "
	INSERT INTO REP_QUIAIT (
		QUIAIT_DOMAIN_ID,
		QUIAIT_CREATED_BY,
		QUIAIT_QUIITE_ID,
		QUIAIT_QUIASM_ID,
		QUIAIT_ORDERBY
		) VALUES (
		" . $DOMAIN_ID . ",
		" . $PERSON_ID . ",
		" . $QUIITE_ID . ",
		" . $QUIASM_ID . ", 
		" . $oderby ."
		)
		";
$res = svc_query( $connection, $sql );
	
svc_show_result( $res ); 


?>





