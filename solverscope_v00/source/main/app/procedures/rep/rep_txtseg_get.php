<?php

if ( $vld != 1 ) die();

$TXTSEG_ID = svc_sanitize_post( $post['txtseg_id'] );

$sql = "
	
	SELECT
		TXTSEG_ID,
		TXTSEG_TYPE,
		TXTSEG_STYLE,
		CASE
			WHEN TXTSEG_TYPE = 'IMG' THEN CONCAT('" . $path_img . "', TXTSEG_CONTENT)
			ELSE TXTSEG_CONTENT
		END AS TXTSEG_CONTENT,
		TXTSEG_ORDERBY,
		CASE
			WHEN TXTSEG_CREATED_BY = " . $PERSON_ID . " THEN 1
			ELSE 0
		END AS PERMISSION
	FROM
		REP_TXTSEG

	WHERE
		TXTSEG_ID = " . $TXTSEG_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		
	LIMIT 1
	
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );

?>





