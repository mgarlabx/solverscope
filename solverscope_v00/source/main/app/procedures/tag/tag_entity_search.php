<?php

if ( $vld != 1 ) die();

$FILTER_ID = svc_sanitize_post( $post['filter_id'] );
$STR_SEARCH = svc_sanitize_post( $post['str_search'] );
$STR_SEARCH = svc_remove_accents( $STR_SEARCH );

$sql = "
	SELECT
		ENTITY_ID,
		ENTITY_CODE,
		ENTITY_DESCRIPTION
	FROM
		TAG_ENTITY
		INNER JOIN TAG_ENTFIL
		ON ENTFIL_ENTITY_ID = ENTITY_ID
		INNER JOIN TAG_FILTER
		ON ENTFIL_FILTER_ID = FILTER_ID
	WHERE
		ENTITY_DOMAIN_ID = " . $DOMAIN_ID . "
		AND ( " . $FILTER_ID . " = 0 OR FILTER_ID = " . $FILTER_ID . " )
		AND ( '" . $STR_SEARCH . "' = '' OR FN_REMOVE_ACCENTS( ENTITY_CODE ) LIKE '%" . $STR_SEARCH . "%' COLLATE latin1_general_ci OR FN_REMOVE_ACCENTS( ENTITY_DESCRIPTION ) LIKE '%" . $STR_SEARCH . "%' COLLATE latin1_general_ci )
	ORDER BY
		FN_REMOVE_ACCENTS( ENTITY_CODE ) 
	LIMIT
		50
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





