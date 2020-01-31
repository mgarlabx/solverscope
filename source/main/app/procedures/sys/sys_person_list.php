<?php

if ( $vld != 1 ) die();

$sql = "
	SELECT
		PERSON_ID,
		PERSON_NAME,
		DOMAIN_NAME,
		PROFIL_NAME
	FROM
		SYS_PERSON
		INNER JOIN SYS_PERPRO
		ON PERPRO_PERSON_ID = PERSON_ID
		INNER JOIN SYS_PROFIL
		ON PERPRO_PROFIL_ID = PROFIL_ID
		INNER JOIN SYS_DOMAIN
		ON PERPRO_DOMAIN_ID = DOMAIN_ID
	ORDER BY
		FN_REMOVE_ACCENTS( PERSON_NAME ),
		FN_REMOVE_ACCENTS( DOMAIN_NAME ),
		FN_REMOVE_ACCENTS( PROFIL_NAME )
";

$query = mysqli_query( $connection, $sql );

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





