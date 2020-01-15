<?php

if ( $vld != 1 ) die();

$folder_id = svc_sanitize_post( $post['folder_id'] );

$sql = "
	SELECT
		FOLDER_AUTHOR_ID,
		FOLDER_REVIEWER1_ID,
		FOLDER_REVIEWER2_ID,
		FOLDER_REVIEWER3_ID,
		FOLDER_REVIEWER4_ID,
		FOLDER_REVIEWER5_ID,
		FN_PERSON_NAME_GET(FOLDER_AUTHOR_ID) AS AUTHOR_NAME,
		FN_PERSON_NAME_GET(FOLDER_REVIEWER1_ID) AS REVIEWER1_NAME,
		FN_PERSON_NAME_GET(FOLDER_REVIEWER2_ID) AS REVIEWER2_NAME,
		FN_PERSON_NAME_GET(FOLDER_REVIEWER3_ID) AS REVIEWER3_NAME,
		FN_PERSON_NAME_GET(FOLDER_REVIEWER4_ID) AS REVIEWER4_NAME,
		FN_PERSON_NAME_GET(FOLDER_REVIEWER5_ID) AS REVIEWER5_NAME
	FROM
		REP_FOLDER
	WHERE
		FOLDER_ID = " . $folder_id . "
		AND FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );


?>




