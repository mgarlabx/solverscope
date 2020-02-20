<?php

if ( $vld != 1 ) die();

$sql = "

	SELECT
		PROFP0_ID,
		PROFP0_NAME,
		PROFP0_COMMENTS
	FROM
		SYS_PROFP0
	WHERE
		PROFP0_OPEN = 0
";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





