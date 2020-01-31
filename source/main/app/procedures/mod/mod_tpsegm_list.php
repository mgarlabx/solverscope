<?php

if ( $vld != 1 ) die();

$TPUNIT_ID = svc_sanitize_post( $post['tpunit_id'] );

$permission = svc_procedure_permission( 'modw_tpsegm_update' );

$sql = "
	SELECT
		TPSEGM_ID,
		TPSEGM_NAME,
		" . $permission . " AS PERMISSION
	FROM
		MOD_TPSEGM
	WHERE
		TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPSEGM_TPUNIT_ID = " . $TPUNIT_ID . "
	ORDER BY
		TPSEGM_ORDERBY
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>



