<?php



if ( $vld != 1 ) die();

$TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );
$TEMPLA_DATE = svc_sanitize_post( $post['templa_date'] );
$TEMPLA_ACTIVE = svc_sanitize_post( $post['templa_active'] );

//de-format and check valid date
$TEMPLA_DATE = svc_date_deformat( $TEMPLA_DATE );
if ( $TEMPLA_DATE == 0 ) {
	svc_show_result( 0 );
	die();
}


$sql = "
	UPDATE
		MOD_TEMPLA
	SET 
		TEMPLA_DATE = '" . $TEMPLA_DATE . "',
		TEMPLA_ACTIVE = " . $TEMPLA_ACTIVE . "
	WHERE
		TEMPLA_ID = " . $TEMPLA_ID . "
		AND TEMPLA_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );

?>





