<?php

if ( $vld != 1 ) die();

$TXTITE_ID = svc_sanitize_post( $post['txtite_id'] );

$sql = "
	
	SELECT
		TXTSEG_ID,
		TXTSEG_TYPE,
		TXTSEG_STYLE,
		TXTSEG_ORDERBY,
		CASE
			WHEN TXTSEG_TYPE = 'IMG' THEN CONCAT('" . $path_img . "', TXTSEG_CONTENT)
			ELSE TXTSEG_CONTENT
		END AS TXTSEG_CONTENT,
		CASE
			WHEN TXTSEG_CREATED_BY = " . $PERSON_ID . " THEN 1
			ELSE 0
		END AS PERMISSION
	FROM
		REP_TXTSEG

	WHERE
		TXTSEG_TXTITE_ID = " . $TXTITE_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
	
	ORDER BY
	 	TXTSEG_ORDERBY
	
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





