<?php

if ( $vld != 1 ) die();

$TPUNIT_ID = svc_sanitize_post( $post['tpunit_id'] );

$permission = svc_procedure_permission( 'modw_tpsegm_update' );

$sql = "
	SELECT
		TPSEGM_ID,
		TPSEGM_NAME,
		" . $permission . " AS PERMISSION,
		COALESCE(TPSEGM_OBJECT_ID, 0) AS TPSEGM_OBJECT_ID,
		OBJTYP_ICON
	FROM
		MOD_TPSEGM
		LEFT JOIN REP_OBJECT
		ON OBJECT_ID = TPSEGM_OBJECT_ID
		LEFT JOIN REP_OBJTYP
		ON OBJTYP_ID = OBJECT_OBJTYP_ID
	WHERE
		TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPSEGM_TPUNIT_ID = " . $TPUNIT_ID . "
	ORDER BY
		TPSEGM_ORDERBY
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>



