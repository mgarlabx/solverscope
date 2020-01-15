<?php

if ( $vld != 1 ) die();

$sql = "SELECT PERSON_LAST_DOMAIN_ID FROM SYS_PERSON WHERE PERSON_ID = " . $PERSON_ID;

$resp = svc_get_var( $connection, $sql );

svc_show_result( $resp );

?>





