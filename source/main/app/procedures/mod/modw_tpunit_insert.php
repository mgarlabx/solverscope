<?php

if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );
$TPUNIT_NAME = svc_sanitize_post( $post['tpunit_name'] );
$TPUNIT_NAME = trim( $TPUNIT_NAME );

$sql = "
	SELECT
		MAX(TPUNIT_ORDERBY)
	FROM
		MOD_TPUNIT
	WHERE
		TPUNIT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPUNIT_TEMPLA_ID = " . $TEMPLA_ID . "
	";
$TPUNIT_ORDERBY = svc_get_var( $connection, $sql );
$TPUNIT_ORDERBY = $TPUNIT_ORDERBY + 1;

$sql = "
	INSERT INTO MOD_TPUNIT (
		TPUNIT_DOMAIN_ID,
		TPUNIT_TEMPLA_ID,
		TPUNIT_ORDERBY,
		TPUNIT_NAME
		) VALUE (
		" . $DOMAIN_ID . ",	
		" . $TEMPLA_ID . ",	
		" . $TPUNIT_ORDERBY . ",	
		'" . $TPUNIT_NAME . "'
		)
	";
$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





