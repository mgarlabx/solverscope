<?php

if ( $vld != 1 ) die();

$FOLDER_ID = svc_sanitize_post( $post['folder_id'] );
$PERSON2_ID = svc_sanitize_post( $post['person2_id'] );
$op = svc_sanitize_post( $post['op'] );

//get name
if ( $PERSON2_ID == 0 ) {
	$name = '';
}
else {
	$sql = "
		SELECT
			PERSON_NAME
		FROM
			SYS_PERSON
			INNER JOIN SYS_PERPRO
			ON PERSON_ID = PERPRO_PERSON_ID
		WHERE
			PERPRO_PERSON_ID = " . $PERSON2_ID . "
			AND PERPRO_DOMAIN_ID = " . $DOMAIN_ID . "
		";
	
	$name = svc_get_var( $connection, $sql );

	if ( $name == '' )  {
		echo svc_error( 'repw_folder_share_save.php', 'Error 404' );
		die();
	}
}

$sql = "
	UPDATE
		REP_FOLDER
	SET ";

if ( $op == 0 ) $sql .= "FOLDER_AUTHOR_ID";
else $sql .= "FOLDER_REVIEWER" . $op . "_ID";

$sql .= "
		= " . $PERSON2_ID . "
	WHERE
		FOLDER_ID = " . $FOLDER_ID . "
		AND FOLDER_DOMAIN_ID = " . $DOMAIN_ID . "
		AND FOLDER_CREATED_BY = " . $PERSON_ID . "		
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $name );


?>





