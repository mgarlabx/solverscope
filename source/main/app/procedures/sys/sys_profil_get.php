<?php

if ( $vld != 1 ) die();

$PROFIL_ID = svc_sanitize_post( $post['profil_id'] );

$sql = "
	SELECT 
		PROFIL_NAME
	FROM
		SYS_PROFIL
	WHERE
		PROFIL_ID = " . $PROFIL_ID . "
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows[0] );

?>





