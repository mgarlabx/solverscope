<?php

if ( $vld != 1 ) die();

$TPSEGM_ID = svc_sanitize_post( $post['tpsegm_id'] );

$sql = "
	SELECT
		TPSEGM_NAME,
		TPSEGM_DESCRIPTION,
		TPSEGM_LENGTH,
		TPSEGM_ORDERBY,
		TPSEGM_ALLOW_UPLOAD,
		TPSEGM_MANUAL_GRADING,
		TPSEGM_TPPHAS_ID,
		TPSEGM_WEIGHT,
		TPSEGM_OBJECT_ID,
		TPSEGM_FORUNS_ID
	FROM
		MOD_TPSEGM
	WHERE
		TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPSEGM_ID = " . $TPSEGM_ID ."
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );


?>





