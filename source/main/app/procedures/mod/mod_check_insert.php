<?php

if ( $vld != 1 ) die();

$res = svc_procedure_permission( 'modw_module_insert' );

svc_show_result( $res );

?>





