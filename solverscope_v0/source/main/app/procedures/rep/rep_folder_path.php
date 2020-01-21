<?php

if ( $vld != 1 ) die();

$FOLDER_ID = svc_sanitize_post( $post['folder_id'] );

$folders = array();

for ( $i = 1; $i < 20; $i++ ) {
	
	$sql = "
		SELECT
			FOLDER_ID,
			FOLDER_NAME,
			FOLDER_PARENT_ID
		FROM
			REP_FOLDER
		WHERE
			FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
			AND FOLDER_ID = " . $FOLDER_ID ."
		LIMIT 1
		";

	$rows = svc_get_rows( $connection, $sql );

	$folders[] = $rows[0];
	$folder_id = $rows[0]['FOLDER_PARENT_ID'];
	if ( $folder_id == 0 ) break;

}

svc_show_result_encoded( $folders );

?>





