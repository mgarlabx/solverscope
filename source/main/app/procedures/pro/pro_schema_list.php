<?php

if ( $vld != 1 ) die();

$PRODUC_ID = svc_sanitize_post( $post['produc_id'] );

$permission = svc_procedure_permission( 'prow_schema_update' );

$sql = "
	SELECT
		SCHEMA_ID,
		SCHEMA_DATE,
		SCHEMA_COMMENTS,
		" . $permission . " AS PERMISSION
	FROM
		PRO_SCHEMA
	WHERE
		SCHEMA_DOMAIN_ID = " . $DOMAIN_ID . "
		AND SCHEMA_PRODUC_ID = " . $PRODUC_ID . "	
	ORDER BY
		SCHEMA_DATE DESC
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





