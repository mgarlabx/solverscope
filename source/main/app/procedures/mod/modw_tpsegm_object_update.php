<?php

if ( $vld != 1 ) die();

$TPSEGM_ID = svc_sanitize_post( $post['tpsegm_id'] );
$OBJECT_ID = svc_sanitize_post( $post['object_id'] );


if ( $OBJECT_ID == 0 ) {

	$sql = "
		UPDATE
			MOD_TPSEGM
		SET
			TPSEGM_OBJECT_ID = NULL
		WHERE
			TPSEGM_ID = " . $TPSEGM_ID . "
			AND TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		";

	$resp = svc_query( $connection, $sql );

	svc_show_result( 1 );
	
}

else {

	//check if OBJECT_ID is valid
	$sql = "
		SELECT
			OBJTYP_ICON
		FROM
			REP_OBJECT
			INNER JOIN REP_OBJTYP
			ON OBJECT_OBJTYP_ID = OBJTYP_ID
		WHERE
			OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
			AND OBJECT_ID = " . $OBJECT_ID . "
			AND OBJECT_ACTIVE = 1;
		";
	$OBJTYP_ICON = svc_get_var( $connection, $sql );

	if ( $OBJTYP_ICON == null ) {
		svc_show_result( 0 );
		die();
	}

	$sql = "
		UPDATE
			MOD_TPSEGM
		SET
			TPSEGM_OBJECT_ID = ". $OBJECT_ID . "
		WHERE
			TPSEGM_ID = " . $TPSEGM_ID . "
			AND TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
		";

	$resp = svc_query( $connection, $sql );

	svc_show_result( $OBJTYP_ICON );

}

?>


	

	

