<?php

if ( $vld != 1 ) die();

$parent = svc_sanitize_post( $post['parent'] );

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
			AND FOLDER_ID = " . $parent ."
		LIMIT 1
		";

	$rows = svc_get_rows( $connection, $sql );

	$folders[] = $rows[0];
	$parent = $rows[0]['FOLDER_PARENT_ID'];
	if ( $parent == 0 ) break;

}

svc_show_result_encoded( $folders );

?>





