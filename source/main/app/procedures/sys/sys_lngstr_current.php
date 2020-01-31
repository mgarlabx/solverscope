<?php

if ( $vld != 1 ) die();

if ( $LANGUA_ID == 3 ) {
	$sql = "SELECT LNGSTR_KEY AS LKEY, LNGSTR_EN AS LSTR FROM SYS_LNGSTR";
}
else if ( $LANGUA_ID == 1 ) {
	$sql = "SELECT LNGSTR_KEY AS LKEY, LNGSTR_PT AS LSTR FROM SYS_LNGSTR";
}
else if ( $LANGUA_ID == 2 ) {
	$sql = "SELECT LNGSTR_KEY AS LKEY, LNGSTR_ES AS LSTR FROM SYS_LNGSTR";
}
else {
	$sql = "SELECT LNGSTR_KEY AS LKEY, LNGSTR_KEY AS LSTR FROM SYS_LNGSTR";
}	


$rows = svc_get_rows( $connection, $sql );

svc_show_result_encoded( $rows );

	
	
?>





