<?php

if ( $vld != 1 ) die();

$parent = svc_sanitize_post( $post['parent'] );

$sql = "
	SELECT
		FOLDER_ID,
		FOLDER_NAME,
		FOLDER_PARENT_ID,
		CASE
			WHEN FOLDER_CREATED_BY = " . $PERSON_ID . " THEN 1
			ELSE 0
		END AS PERMISSION
	FROM
		REP_FOLDER
	WHERE
		FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
		AND FOLDER_PARENT_ID = " . $parent ."
	ORDER BY
		FN_REMOVE_ACCENTS( FOLDER_NAME )
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );




?>





