<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );

$sql = "
	
	SELECT
		MATTEX_ID,
		MATOPT_ID,
		MATOPT_ORDERBY,
		MATOPT_COMMENTS,
		MATOPT_LEFT_NUM,
		MATOPT_LEFT_TXTITE_ID,
		MATOPT_RIGHT_NUM,
		MATOPT_RIGHT_TXTITE_ID
	FROM
		REP_MATTEX
		INNER JOIN REP_MATOPT
		ON MATOPT_MATTEX_ID = MATTEX_ID

	WHERE
		MATTEX_OBJECT_ID = " . $OBJECT_ID . "
		AND MATTEX_DOMAIN_ID = " . $DOMAIN_ID . "
	
	ORDER BY
	 	MATOPT_ORDERBY
	
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );



?>





