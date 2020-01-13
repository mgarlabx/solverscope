<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );
$FOLDER_TO_ID = svc_sanitize_post( $post['folder_to_id'] );


if ( $FOLDER_TO_ID != 0 ) {

	//check if targer folder belongs to the same domain
	$sql = "
		SELECT
			DOMAIN_ID
		FROM
			REP_FOLDER
		WHERE
			FOLDER_ID = " . $FOLDER_TO_ID ."
		";
	$dom = svc_get_var( $connection, $sql );

	if ( $dom != $DOMAIN_ID ) {
		echo svc_error( 'repw_object_move.php', 'Error 101' );
		die();
	}

}

$sql = "
	UPDATE
		REP_OBJECT
	SET
		OBJECT_FOLDER_ID = " . $FOLDER_TO_ID . "
	WHERE
		OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
		OBJECT_CREATED_BY = " . $PERSON_ID . "
		AND OBJECT_ID = " . $OBJECT_ID ."
	";
$res = svc_query( $connection, $sql );

svc_show_result( $res );

?>





