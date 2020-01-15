<?php

if ( $vld != 1 ) die();

$folder_id = svc_sanitize_post( $post['folder_id'] );



//check if is empty / FOLDERS
$count_f = 0;
$sql = "
	
	SELECT
		COUNT(*)
	FROM
		REP_FOLDER 
	WHERE
		FOLDER_PARENT_ID = " . $folder_id . "
		AND FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
	";
$count_f = svc_get_var( $connection, $sql );


//check if is empty / OBJECTS
$count_o = 0;
$sql = "
	
	SELECT
		COUNT(*)
	FROM
		REP_OBJECT
	WHERE
		FOLDER_ID = " . $folder_id . "
		AND DOMAIN_ID = " . $DOMAIN_ID . "
	";
$count_o = svc_get_var( $connection, $sql );



if ( $count_f == 0 && $count_o == 0 ) {
	
	$sql = "
	
	DELETE FROM 
		REP_FOLDER 
	WHERE
		FOLDER_ID = " . $folder_id . "
		AND FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
		AND FOLDER_CREATED_BY = " . $PERSON_ID . "	
	";

	$resp = svc_query( $connection, $sql );

}
else {
	
	$resp = 'not_empty';
}

svc_show_result( $resp );

?>





