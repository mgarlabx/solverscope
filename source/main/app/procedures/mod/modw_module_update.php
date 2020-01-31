<?php

if ( $vld != 1 ) die();

$MODULE_ID = svc_sanitize_post( $post['module_id'] );
$COLUMN = svc_sanitize_post( $post['column'] );
$MODULE_INPUT = svc_sanitize_post( $post['module_input'] );


$MODULE_INPUT = trim( $MODULE_INPUT );
if ( $COLUMN == 'MODULE_CODE' && strlen( $MODULE_INPUT ) < 3 ) { //min 3 chars for code
	svc_show_result( 0 );
	die();
}


$sql = "
	UPDATE
		MOD_MODULE
	SET ";

if ( $COLUMN == 'MODLBL_NAME' ) {
	$sql .= "MODULE_MODLBL_ID = " . $MODULE_INPUT;
}
else if ( $COLUMN == 'MODTYP_NAME' ) {
	$sql .= "MODULE_MODTYP_ID = " . $MODULE_INPUT;
}
else {
	$sql .= $COLUMN . " = '" . $MODULE_INPUT . "'";
}

$sql .= "
	WHERE
		MODULE_ID = " . $MODULE_ID . "
		AND MODULE_DOMAIN_ID = " . $DOMAIN_ID . "
	";


$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





