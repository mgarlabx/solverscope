<?php

if ( $vld != 1 ) die();

$QUIASM_ID = svc_sanitize_post( $post['quiasm_id'] );

$sql = "CALL SP_REP_EXAM(" . $QUIASM_ID . ", " . $DOMAIN_ID . ");";

$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );


?>





