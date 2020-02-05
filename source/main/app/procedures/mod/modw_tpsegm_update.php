<?php

if ( $vld != 1 ) die();

$TPSEGM_ID = svc_sanitize_post( $post['tpsegm_id'] );
$TPSEGM_ORDERBY = svc_sanitize_post( $post['tpsegm_orderby'] );
$TPSEGM_NAME = svc_sanitize_post( $post['tpsegm_name'] );
$TPSEGM_DESCRIPTION = svc_sanitize_post( $post['tpsegm_description'] );
$TPSEGM_LENGTH = svc_sanitize_post( $post['tpsegm_length'] );
$TPSEGM_ALLOW_UPLOAD = svc_sanitize_post( $post['tpsegm_allow_upload'] );
$TPSEGM_MANUAL_GRADING = svc_sanitize_post( $post['tpsegm_manual_grading'] );
$TPSEGM_TPPHAS_ID = svc_sanitize_post( $post['tpsegm_tpphas_id'] );
$TPSEGM_WEIGHT = svc_sanitize_post( $post['tpsegm_weight'] );

if ( $TPSEGM_TPPHAS_ID == 0 ) $TPSEGM_TPPHAS_ID = 'NULL';

$sql = "
	UPDATE
		MOD_TPSEGM
	SET
		TPSEGM_ORDERBY = ". $TPSEGM_ORDERBY . ",
		TPSEGM_NAME = '". $TPSEGM_NAME . "',
		TPSEGM_DESCRIPTION = '". $TPSEGM_DESCRIPTION . "',
		TPSEGM_LENGTH = ". $TPSEGM_LENGTH . ",
		TPSEGM_ALLOW_UPLOAD = ". $TPSEGM_ALLOW_UPLOAD . ",
		TPSEGM_MANUAL_GRADING = ". $TPSEGM_MANUAL_GRADING . ",
		TPSEGM_TPPHAS_ID = ". $TPSEGM_TPPHAS_ID . ",
		TPSEGM_WEIGHT = ". $TPSEGM_WEIGHT . "
	WHERE
		TPSEGM_ID = " . $TPSEGM_ID . "
		AND TPSEGM_DOMAIN_ID = " . $DOMAIN_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>


	

	

