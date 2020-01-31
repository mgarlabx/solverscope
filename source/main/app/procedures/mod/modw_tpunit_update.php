<?php

if ( $vld != 1 ) die();

$TPUNIT_ID = svc_sanitize_post( $post['tpunit_id'] );
$TPUNIT_NAME = svc_sanitize_post( $post['tpunit_name'] );
$TPUNIT_ORDERBY = svc_sanitize_post( $post['tpunit_orderby'] );

$sql = "
	UPDATE
		MOD_TPUNIT
	SET 
		TPUNIT_NAME = '" . $TPUNIT_NAME . "',
		TPUNIT_ORDERBY = " . $TPUNIT_ORDERBY . "
	WHERE
		TPUNIT_ID = " . $TPUNIT_ID . "
		AND TPUNIT_DOMAIN_ID = " . $DOMAIN_ID . "
	";


$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





