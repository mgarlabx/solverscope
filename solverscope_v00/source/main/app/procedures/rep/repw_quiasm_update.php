<?php

if ( $vld != 1 ) die();

$QUIASM_ID = svc_sanitize_post( $post['quiasm_id'] );
$quiasm_max_items = svc_sanitize_post( $post['quiasm_max_items'] );
$quiasm_random_items = svc_sanitize_post( $post['quiasm_random_items'] );
$quiasm_random_options = svc_sanitize_post( $post['quiasm_random_options'] );

$sql = "
	UPDATE
		REP_QUIASM
	SET
		QUIASM_MAX_ITEMS = " . $quiasm_max_items . ",
		QUIASM_RANDOM_ITEMS = " . $quiasm_random_items . ",
		QUIASM_RANDOM_OPTIONS = " . $quiasm_random_options . "
	WHERE
		QUIASM_ID = " . $QUIASM_ID . "
		AND QUIASM_DOMAIN_ID = " . $DOMAIN_ID . "
		AND QUIASM_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





