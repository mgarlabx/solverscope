<?php

if ( $vld != 1 ) die();

$MODULE_ID = svc_sanitize_post( $post['module_id'] );

$permission = svc_procedure_permission( 'modw_templa_update' );

$sql = "
	SELECT
		TEMPLA_ID,
		TEMPLA_DATE,
		TEMPLA_ACTIVE,
		" . $permission . " AS PERMISSION
	FROM
		MOD_TEMPLA
	WHERE
		TEMPLA_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TEMPLA_MODULE_ID = " . $MODULE_ID . "
	ORDER BY
		TEMPLA_DATE DESC
	";
	

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





