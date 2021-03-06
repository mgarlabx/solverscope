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
		COALESCE(TPSEGM_TPPHAS_ID, 0) AS TPSEGM_TPPHAS_ID,
		COALESCE(TPPHAS_ORDERBY, 0) AS TPPHAS_ORDERBY,
		TPSEGM_WEIGHT,
		COALESCE(TPSEGM_OBJECT_ID, 0) AS TPSEGM_OBJECT_ID
	FROM
		MOD_TPSEGM
		LEFT JOIN MOD_TPPHAS
		ON TPPHAS_ID = TPSEGM_TPPHAS_ID
	WHERE
		TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPSEGM_ID = " . $TPSEGM_ID ."
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );


?>





