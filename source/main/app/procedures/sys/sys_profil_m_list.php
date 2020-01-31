<?php

if ( $vld != 1 ) die();

$PROFIL_ID = svc_sanitize_post( $post['profil_id'] );

$sql = "
	SELECT
		PROFM0_ID,
		PROFM1_ID,
		PROFM0_LABEL,
		PROFM0_LEVEL,
		PROFM0_COMMENTS
	FROM
		SYS_PROFIL
		INNER JOIN SYS_PROFM1
		ON PROFM1_PROFIL_ID = PROFIL_ID
		INNER JOIN SYS_PROFM0
		ON PROFM1_PROFM0_ID = PROFM0_ID
	WHERE
		PROFIL_ID = " . $PROFIL_ID . "
		AND PROFM0_ACTIVE = 1
	ORDER BY
		PROFM0_ID
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





