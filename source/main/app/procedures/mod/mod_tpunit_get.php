<?php

if ( $vld != 1 ) die();

$TPUNIT_ID = svc_sanitize_post( $post['tpunit_id'] );

$sql = "
	SELECT
		TPUNIT_NAME,
		TPUNIT_ORDERBY
	FROM
		MOD_TPUNIT
	WHERE
		TPUNIT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPUNIT_ID = " . $TPUNIT_ID ."
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );


?>





