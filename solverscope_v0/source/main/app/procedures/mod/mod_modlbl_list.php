<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		MODLBL_ID,
		MODLBL_NAME
	FROM
		MOD_MODLBL
	WHERE
		MODLBL_DOMAIN_ID = " . $DOMAIN_ID . "
	ORDER BY
		FN_REMOVE_ACCENTS( MODLBL_NAME )
	";


$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





