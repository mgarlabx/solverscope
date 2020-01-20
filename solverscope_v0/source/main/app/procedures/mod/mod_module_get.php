<?php

if ( $vld != 1 ) die();

$MODULE_ID = svc_sanitize_post( $post['module_id'] );

$permission = svc_procedure_permission( 'modw_module_update' );

$sql = "
	SELECT
		MODULE_ID,
		MODULE_CODE,
		MODULE_NAME,
		MODULE_SUMMARY,
		MODULE_DESCRIPTION,
		MODULE_LENGTH,
		MODLBL_NAME,
		MODLBL_ID,
		MODTYP_NAME,
		" . $permission . " AS PERMISSION
	FROM
		MOD_MODULE
		LEFT JOIN MOD_MODLBL
		ON MODLBL_ID = MODULE_MODLBL_ID
		LEFT JOIN MOD_MODTYP
		ON MODTYP_ID = MODULE_MODTYP_ID
	WHERE
		MODULE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MODULE_ID = " . $MODULE_ID ."
	";


$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );


?>





