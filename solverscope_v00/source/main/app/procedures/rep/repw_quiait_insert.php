<?php

if ( $vld != 1 ) die();

$QUIASM_ID = svc_sanitize_post( $post['quiasm_id'] );
$QUIITE_ID = svc_sanitize_post( $post['quiite_id'] );

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





