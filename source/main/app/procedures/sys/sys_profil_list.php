<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT 
		PROFIL_ID,
		PROFIL_NAME
	FROM
		SYS_PROFIL
	ORDER BY
		FN_REMOVE_ACCENTS( PROFIL_NAME )
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





