<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );

$sql = "
	SELECT
		OBJECT_NAME,
		QUIASM_ID,
		QUIASM_MAX_ITEMS,
		QUIASM_RANDOM_ITEMS,
		QUIASM_RANDOM_OPTIONS,
		PERSON_NAME AS AUTHOR_NAME,
		CASE
			WHEN QUIASM_CREATED_BY = " . $PERSON_ID . " THEN 1
			ELSE 0
		END AS PERMISSION

	FROM
		REP_QUIASM
		
		INNER JOIN REP_OBJECT
		ON QUIASM_OBJECT_ID = OBJECT_ID
		
		INNER JOIN SYS_PERSON
		ON OBJECT_CREATED_BY = PERSON_ID
		
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





