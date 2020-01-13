<?php

if ( $vld != 1 ) die();

$sql = "

	SELECT
		PROFM1_PROFM0_ID,
		PROFM0_LABEL,
		PROFM0_LEVEL,
		PROFM0_ICON,
		PROFM0_PARENT_ID,
		PROFM0_ORDERBY
	FROM
		SYS_PROFM1
		INNER JOIN SYS_PROFM0
		ON PROFM1_PROFM0_ID = PROFM0_ID
	WHERE
		PROFM0_ACTIVE = 1
		AND PROFM1_PROFIL_ID IN 	
			(SELECT
				PERPRO_PROFIL_ID
			FROM
				SYS_PERPRO
			WHERE
				PERPRO_PERSON_ID = " . $PERSON_ID . "
				AND PERPRO_DOMAIN_ID = " . $DOMAIN_ID ."
			)
	ORDER BY
		PROFM0_ORDERBY
";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





