<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		FILTER_ID,
		FILTER_NAME
	FROM
		TAG_FILTER
	WHERE
		FILTER_DOMAIN_ID = " . $DOMAIN_ID . "
	ORDER BY
		FILTER_ORDERBY
	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





