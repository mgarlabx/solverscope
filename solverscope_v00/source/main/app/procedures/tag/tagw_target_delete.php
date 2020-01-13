<?php

if ( $vld != 1 ) die();

$TARGET_ID = svc_sanitize_post( $post['target_id'] );
$TARGET_RECORD_ID = svc_sanitize_post( $post['target_record_id'] );
$TARTYP_TABLE_NAME = svc_sanitize_post( $post['tartyp_table_name'] );

//check OBJECT ownership
if ( $TARTYP_TABLE_NAME == 'REP_OBJECT' ) {
	if ( svc_is_object_owner( $TARGET_RECORD_ID ) == 0 ) {
		echo svc_error( 'tagw_target_delete.php', 'Error 101' );
		die();
	}
}


$sql = "
	DELETE
	FROM
		TAG_TARGET
	WHERE
		TARGET_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TARGET_RECORD_ID = " . $TARGET_RECORD_ID ."
		AND TARGET_ID = '" . $TARGET_ID . "'
	";

$res = svc_query( $connection, $sql );

svc_show_result( $res );



?>





