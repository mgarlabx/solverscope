<?php

if ( $vld != 1 ) die();

$QUIASM_ID = svc_sanitize_post( $post['quiasm_id'] );

$sql = "
	
	SELECT
		QUIAIT_ORDERBY,
		OBJECT_FOLDER_ID,
		FOLDER_NAME,
		FOLDER_PARENT_ID,
		OBJECT_NAME,
		OBJECT_ACTIVE,
		QUIAIT_ID,
		QUIAIT_QUIITE_ID,
		OBJECT_ID
	
	FROM
		REP_QUIAIT 

		INNER JOIN REP_QUIITE
		ON QUIAIT_QUIITE_ID = QUIITE_ID

		INNER JOIN REP_OBJECT
		ON QUIITE_OBJECT_ID = OBJECT_ID
	
		INNER JOIN REP_FOLDER
		ON OBJECT_FOLDER_ID = FOLDER_ID
	
	WHERE
		QUIAIT_QUIASM_ID = " . $QUIASM_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "

	ORDER BY
		QUIAIT_ORDERBY

	";


$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





