<?php

if ( $vld != 1 ) die();

$PROFIL_ID = svc_sanitize_post( $post['profil_id'] );

$sql = "
	SELECT
		PROFP0_ID,
		PROFP1_ID,
		PROFP0_NAME,
		PROFP0_COMMENTS
	FROM
		SYS_PROFIL
		INNER JOIN SYS_PROFP1
		ON PROFP1_PROFIL_ID = PROFIL_ID
		INNER JOIN SYS_PROFP0
		ON PROFP1_PROFP0_ID = PROFP0_ID
	WHERE
		PROFIL_ID = " . $PROFIL_ID . "
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





