<?php

if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );

$permission = svc_procedure_permission( 'modw_tpunit_update' );

$sql = "
	SELECT
		TPUNIT_ID,
		TPUNIT_NAME,
		" . $permission . " AS PERMISSION
	FROM
		MOD_TPUNIT
	WHERE
		TPUNIT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPUNIT_TEMPLA_ID = " . $TEMPLA_ID . "
	ORDER BY
		TPUNIT_ORDERBY
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





