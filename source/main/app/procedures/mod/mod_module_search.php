<?php

if ( $vld != 1 ) die();

$STR_SEARCH = svc_sanitize_post( $post['str_search'] );
$STR_SEARCH = svc_remove_accents( $STR_SEARCH );

$sql = "
	SELECT
		MODULE_ID,
		MODULE_CODE,
		MODULE_NAME,
		MODLBL_NAME
	FROM
		MOD_MODULE
		INNER JOIN MOD_MODLBL
		ON MODULE_MODLBL_ID = MODLBL_ID
	WHERE
		MODULE_DOMAIN_ID = " . $DOMAIN_ID . "
		AND (
			LOWER( FN_REMOVE_ACCENTS( MODULE_NAME ) ) LIKE '%" . $STR_SEARCH . "%' COLLATE latin1_general_ci
			OR LOWER( FN_REMOVE_ACCENTS( MODULE_CODE ) ) LIKE '%" . $STR_SEARCH . "%' COLLATE latin1_general_ci
		)
	ORDER BY
		FN_REMOVE_ACCENTS( MODULE_CODE ),
		FN_REMOVE_ACCENTS( MODULE_NAME )
	LIMIT 100
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





