<?php

if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );

$sql = "
	SELECT
		TPPHAS_ORDERBY,
		TPPHAS_WEIGHT,
		TPPHAS_ID,
		TPUNIT_NAME,
		TPSEGM_NAME,
		TPSEGM_WEIGHT
	FROM
		MOD_TPPHAS
		LEFT JOIN MOD_TPSEGM 
		ON TPPHAS_ID = TPSEGM_TPPHAS_ID
		LEFT JOIN MOD_TPUNIT
		ON TPUNIT_ID = TPSEGM_TPUNIT_ID
	WHERE
		TPPHAS_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TPPHAS_TEMPLA_ID = " . $TEMPLA_ID . "
	ORDER BY
		TPPHAS_ORDERBY,
		TPUNIT_ORDERBY,
		TPSEGM_ORDERBY	
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





