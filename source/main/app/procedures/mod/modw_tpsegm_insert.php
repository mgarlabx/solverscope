<?php

if ( $vld != 1 ) die();

$TPUNIT_ID = svc_sanitize_post( $post['tpunit_id'] );
$TPSEGM_NAME = svc_sanitize_post( $post['tpsegm_name'] );
$TPSEGM_NAME = trim( $TPSEGM_NAME );

$sql = "
	SELECT
		MAX(TPSEGM_ORDERBY)
	FROM
		MOD_TPSEGM
	WHERE
		TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPSEGM_TPUNIT_ID = " . $TPUNIT_ID . "
	";
$TPSEGM_ORDERBY = svc_get_var( $connection, $sql );
$TPSEGM_ORDERBY = $TPSEGM_ORDERBY + 1;

$sql = "
	INSERT INTO MOD_TPSEGM (
		TPSEGM_DOMAIN_ID,
		TPSEGM_TPUNIT_ID,
		TPSEGM_ORDERBY,
		TPSEGM_NAME
		) VALUE (
		" . $DOMAIN_ID . ",	
		" . $TPUNIT_ID . ",	
		" . $TPSEGM_ORDERBY . ",	
		'" . $TPSEGM_NAME . "'
		)
	";
$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





