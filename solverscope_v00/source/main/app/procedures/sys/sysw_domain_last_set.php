<?php

if ( $vld != 1 ) die();

$DOMAIN_ID2 = svc_sanitize_post( $post['domain_id'] );

//check if it is a valid domain
$sql = "
	SELECT
		COUNT(*)
	FROM
		SYS_PERPRO
	WHERE
		PERPRO_DOMAIN_ID = " . $DOMAIN_ID2 . "
		AND PERPRO_PERSON_ID = " . $PERSON_ID . "
	";
$resp = svc_get_var( $connection, $sql );

if ( $resp > 0 ) {
	$sql = "UPDATE SYS_PERSON SET PERSON_LAST_DOMAIN_ID = " . $DOMAIN_ID2 . " WHERE PERSON_ID = " . $PERSON_ID;
	$resp = svc_query( $connection, $sql );
	svc_show_result( $resp );
	$DOMAIN_ID = $DOMAIN_ID2;
}
else {
	svc_show_result( 0 );
}


?>





