<?php

if ( $vld != 1 ) die();

$TPPHAS_TEMPLA_ID = svc_sanitize_post( $post['templa_id'] );
$TPPHAS_ORDERBY = svc_sanitize_post( $post['phase_number'] );
$TPPHAS_WEIGHT = svc_sanitize_post( $post['phase_weight'] );

$sql = "
	INSERT INTO MOD_TPPHAS (
		TPPHAS_DOMAIN_ID,
		TPPHAS_TEMPLA_ID,
		TPPHAS_ORDERBY,
		TPPHAS_WEIGHT
	) VALUES (
		" . $DOMAIN_ID . ",
		" . $TPPHAS_TEMPLA_ID . ",
		" . $TPPHAS_ORDERBY . ",
		" . $TPPHAS_WEIGHT . "
	)
	";

$res = svc_query( $connection, $sql );

svc_show_result( $res );


?>





