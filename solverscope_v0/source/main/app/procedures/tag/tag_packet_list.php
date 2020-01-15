<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		PACKET_ID,
		PACKET_PARENT_ID,
		PACKET_NAME
	FROM
		TAG_PACKET
	WHERE
		PACKET_DOMAIN_ID = " . $DOMAIN_ID . "
	ORDER BY
		PACKET_PARENT_ID,
		PACKET_ORDERBY
	";
	

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





