<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		ENTITY_ID,
		ENTITY_PACKET_ID,
		ENTITY_CODE,
		ENTITY_DESCRIPTION
	FROM
		TAG_ENTITY
	WHERE
		ENTITY_DOMAIN_ID = " . $DOMAIN_ID . "
	ORDER BY
		FN_REMOVE_ACCENTS( ENTITY_CODE )
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





