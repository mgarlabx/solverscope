<?php

if ( $vld != 1 ) die();

$res = svc_procedure_permission( 'prow_produc_insert' );

svc_show_result( $res );

?>





