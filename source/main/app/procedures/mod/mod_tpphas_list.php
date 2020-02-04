<?php

if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );

$sql = "
	SELECT
		TPPHAS_ID,
		TPPHAS_WEIGHT,
		TPPHAS_ORDERBY
	FROM
		MOD_TPPHAS
	WHERE
		TPPHAS_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPPHAS_TEMPLA_ID = " . $TEMPLA_ID . "
	ORDER BY
		TPPHAS_ORDERBY
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





