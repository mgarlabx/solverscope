<?php

if ( $vld != 1 ) die();

if ( isset( $post['domain_id'] ) ){
	$DOMAIN_ID = $post['domain_id'];
}
else {
	echo svc_error( 'api/index.php', 'Error 201' );
	die();
}
if ( isset( $post['domain_secret'] ) ){
	$DOMAIN_SECRET = $post['domain_secret'];
}
else {
	echo svc_error( 'api/index.php', 'Error 202' );
	die();
}

$api_tk = svc_encryp( $DOMAIN_ID, $cryp_api_key ); // $cryp_api_key @ svc_settings.php

svc_show_result( $api_tk );

?>





