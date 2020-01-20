<?php

if ( $vld != 1 ) die();

$MODLBL_ID = svc_sanitize_post( $post['modlbl_id'] );

$sql = "
	SELECT
		MODTYP_ID,
		MODTYP_NAME
	FROM
		MOD_MODTYP
	WHERE
		MODTYP_DOMAIN_ID = " . $DOMAIN_ID . "
		AND MODTYP_MODLBL_ID = " . $MODLBL_ID . "
	ORDER BY
		FN_REMOVE_ACCENTS( MODTYP_NAME )
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





