<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		PERSON_ID,
		PERSON_NAME,
		DOMAIN_NAME,
		PERACC_DATE,
		N
	FROM
		SYS_PERSON
		INNER JOIN SYS_DOMAIN
		ON PERSON_LAST_DOMAIN_ID = DOMAIN_ID
		LEFT JOIN (
			SELECT
				MAX(PERACC_DATE) AS PERACC_DATE,
				PERACC_PERSON_ID,
				COUNT(*) AS N
			FROM
				SYS_PERACC
			GROUP BY
				PERACC_PERSON_ID
			) A
		ON PERACC_PERSON_ID = PERSON_ID
	ORDER BY
		FN_REMOVE_ACCENTS( PERSON_NAME ),
		FN_REMOVE_ACCENTS( DOMAIN_NAME )
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





