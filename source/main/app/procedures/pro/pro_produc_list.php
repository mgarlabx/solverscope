<?php

if ( $vld != 1 ) die();

$permission = svc_procedure_permission( 'prow_produc_update' );

$sql = "
	SELECT
		PRODUC_ID,
		PROLBL_NAME,
		PROTYP_NAME,
		PROARE_NAME,
		PRODUC_NAME,
		" . $permission . " AS PERMISSION
	FROM
		PRO_PRODUC
		INNER JOIN PRO_PROLBL
		ON PRODUC_PROLBL_ID = PROLBL_ID
		INNER JOIN PRO_PROTYP
		ON PRODUC_PROTYP_ID = PROTYP_ID
		INNER JOIN PRO_PROARE
		ON PRODUC_PROARE_ID = PROARE_ID
	WHERE
		PRODUC_DOMAIN_ID = " . $DOMAIN_ID . "
	ORDER BY
		FN_REMOVE_ACCENTS( PROLBL_NAME ),
		FN_REMOVE_ACCENTS( PROARE_NAME ),
		FN_REMOVE_ACCENTS( PROTYP_NAME ),
		PRODUC_ORDERBY,
		FN_REMOVE_ACCENTS( PRODUC_NAME )

	";
	
$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

?>





