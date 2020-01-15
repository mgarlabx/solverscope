<?php

if ( $vld != 1 ) die();

$res = svc_procedure_permission( 'repw_folder_insert' ) * svc_procedure_permission( 'repw_object_insert' );

svc_show_result( $res );

?>





