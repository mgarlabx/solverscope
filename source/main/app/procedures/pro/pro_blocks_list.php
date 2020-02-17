<?php

if ( $vld != 1 ) die();

$SCHEMA_ID = svc_sanitize_post( $post['schema_id'] );

$permission = svc_procedure_permission( 'prow_blocks_update' );

$sql = "
	SELECT
		BLOCKS_ID,
		BLOCKS_NAME,
		BLOMOD_ID,
		MODULE_ID,
		MODULE_CODE,
		MODULE_NAME,
		" . $permission . " AS PERMISSION
	FROM
		PRO_BLOCKS
		LEFT JOIN PRO_BLOMOD
		ON BLOMOD_BLOCKS_ID = BLOCKS_ID
		LEFT JOIN MOD_MODULE
		ON BLOMOD_MODULE_ID = MODULE_ID
	WHERE
		BLOCKS_DOMAIN_ID = " . $DOMAIN_ID . "
		AND BLOCKS_SCHEMA_ID = " . $SCHEMA_ID . "	
	ORDER BY
		BLOCKS_ORDERBY,
		BLOMOD_ORDERBY
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





