<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );

$sql = "
	
	SELECT
		OBJECT_NAME,
		OBJECT_FOLDER_ID,
		OBJECT_REV_1,
		HTMOBJ_TXTITE_ID,
		HTMOBJ_ID,
		CASE
			WHEN OBJECT_CREATED_BY = " . $PERSON_ID . " THEN 1
			ELSE 0
		END AS PERMISSION

	FROM
		REP_OBJECT 

		INNER JOIN REP_OBJTYP
		ON OBJECT_OBJTYP_ID = OBJTYP_ID

		INNER JOIN REP_HTMOBJ
		ON HTMOBJ_OBJECT_ID = OBJECT_ID
	
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJTYP_NAME = 'OBJ_TEXT'
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
	

	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





