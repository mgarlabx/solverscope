<?php

if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );

$permission = svc_procedure_permission( 'modw_templa_update' );

$sql = "
	SELECT
		TEMPLA_DATE,
		TEMPLA_ACTIVE,
		" . $permission . " AS PERMISSION
	FROM
		MOD_TEMPLA
	WHERE
		TEMPLA_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TEMPLA_ID = " . $TEMPLA_ID ."
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );


?>





