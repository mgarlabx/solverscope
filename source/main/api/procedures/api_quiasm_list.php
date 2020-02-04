<?php

if ( $vld != 1 ) die();

$PERSON_ID = svc_sanitize_post( $post['person_id'] );

$sql = "
	SELECT
		QUIASM_ID,
		FOLDER_NAME,
		OBJECT_NAME
	FROM
		REP_QUIASM
		INNER JOIN REP_OBJECT
		ON OBJECT_ID = QUIASM_OBJECT_ID
		INNER JOIN REP_FOLDER
		ON FOLDER_ID = OBJECT_FOLDER_ID
	WHERE
		QUIASM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIASM_CREATED_BY = " . $PERSON_ID . "
		AND OBJECT_ACTIVE = 1
	ORDER BY
		FOLDER_NAME,
		OBJECT_NAME
	";


$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>