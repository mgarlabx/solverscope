<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		OBJTYP_ID,
		OBJTYP_NAME,
		OBJTYP_ICON
	FROM
		REP_OBJTYP
	ORDER BY
		OBJTYP_ORDERBY
	";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





