<?php

if ( $vld != 1 ) die();

$ENTITY_ID = svc_sanitize_post( $post['entity_id'] );
$TARGET_RECORD_ID = svc_sanitize_post( $post['target_record_id'] );
$TARTYP_TABLE_NAME = svc_sanitize_post( $post['tartyp_table_name'] );


//check OBJECT ownership
if ( $TARTYP_TABLE_NAME == 'REP_OBJECT' ) {
	if ( svc_is_object_owner( $TARGET_RECORD_ID ) == 0 ) {
		echo svc_error( 'tagw_target_insert.php', 'Error 101' );
		die();
	}
}




//check TAG permission
$sql = "
	SELECT
		COUNT(*)
	FROM
		TAG_ENTITY
	WHERE
		ENTITY_DOMAIN_ID = " . $DOMAIN_ID . "
		AND ENTITY_ID = " . $ENTITY_ID . "
	";
$n = svc_get_var( $connection, $sql );
if ( $n < 1 ) {
	echo svc_error( 'tagw_target_insert.php', 'Error 102' );
	die();
}



//get TARTYP_ID
$sql = "
	SELECT
		TARTYP_ID
	FROM
		TAG_TARTYP
	WHERE
		TARTYP_TABLE_NAME = '" . $TARTYP_TABLE_NAME . "'
	";
$TARTYP_ID = svc_get_var( $connection, $sql );


//insert
$sql = "
	INSERT INTO TAG_TARGET (
			TARGET_DOMAIN_ID,
			TARGET_TARTYP_ID,
			TARGET_RECORD_ID,
			TARGET_ENTITY_ID
		) VALUES (
			" . $DOMAIN_ID . ",
			" . $TARTYP_ID . ",
			" . $TARGET_RECORD_ID . ",
			" . $ENTITY_ID . "
		)
	";


	
	
$res = svc_query( $connection, $sql );

svc_show_result( $res );


?>





