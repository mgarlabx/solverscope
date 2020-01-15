<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT DISTINCT
		PERPRO_DOMAIN_ID,
		DOMAIN_NAME,
		DOMAIN_LANGUA_ID,
		CASE
			WHEN PERPRO_DOMAIN_ID = " . $DOMAIN_ID ." THEN 1
			ELSE 0
		END AS CURRENT
	FROM
		SYS_PERPRO
		INNER JOIN SYS_DOMAIN
		ON PERPRO_DOMAIN_ID = DOMAIN_ID
	WHERE
		PERPRO_PERSON_ID = " . $PERSON_ID . "
	ORDER BY
		FN_REMOVE_ACCENTS( DOMAIN_NAME )
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





