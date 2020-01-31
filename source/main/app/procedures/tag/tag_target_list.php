<?php

if ( $vld != 1 ) die();

$TARGET_RECORD_ID = svc_sanitize_post( $post['target_record_id'] );
$TARTYP_TABLE_NAME = svc_sanitize_post( $post['tartyp_table_name'] );

$sql = "
	SELECT
		TARGET_ID,
		ENTITY_CODE,
		ENTITY_DESCRIPTION
	FROM
		TAG_TARGET
		INNER JOIN TAG_ENTITY
		ON TARGET_ENTITY_ID = ENTITY_ID
		INNER JOIN TAG_TARTYP
		ON TARGET_TARTYP_ID = TARTYP_ID
	WHERE
		TARGET_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TARGET_RECORD_ID = " . $TARGET_RECORD_ID ."
		AND TARTYP_TABLE_NAME = '" . $TARTYP_TABLE_NAME . "'
	ORDER BY
		FN_REMOVE_ACCENTS( ENTITY_CODE )
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );



?>





