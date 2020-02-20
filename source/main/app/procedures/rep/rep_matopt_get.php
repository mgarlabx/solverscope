<?php

if ( $vld != 1 ) die();

$MATOPT_ID = svc_sanitize_post( $post['matopt_id'] );

$sql = "
	
	SELECT
		MATOPT_ID,
		MATOPT_ORDERBY,
		MATOPT_COMMENTS,
		MATOPT_LEFT_NUM,
		MATOPT_LEFT_TXTITE_ID,
		MATOPT_RIGHT_NUM,
		MATOPT_RIGHT_TXTITE_ID
	FROM
		REP_MATOPT

	WHERE
		MATOPT_ID = " . $MATOPT_ID . "
		AND MATOPT_DOMAIN_ID = " . $DOMAIN_ID . "
	
	ORDER BY
	 	MATOPT_ORDERBY
	
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );



?>





