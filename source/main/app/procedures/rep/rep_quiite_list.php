<?php

if ( $vld != 1 ) die();

$FOLDER_ID = svc_sanitize_post( $post['folder_id'] );

$sql = "
	SELECT
		QUIITE_ID,
		OBJECT_NAME
	FROM
		REP_OBJECT
		INNER JOIN REP_QUIITE
		ON QUIITE_OBJECT_ID = OBJECT_ID
	WHERE
		OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND OBJECT_FOLDER_ID = " . $FOLDER_ID . "
		AND OBJECT_OBJTYP_ID IN ( 1 )
		AND OBJECT_ACTIVE = 1
	ORDER BY
		FN_REMOVE_ACCENTS( OBJECT_NAME )

	";


$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );



?>





