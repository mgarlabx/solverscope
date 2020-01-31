<?php

if ( $vld != 1 ) die();


$TXTITE_ID = svc_sanitize_post( $post['txtite_id'] );
$style = svc_sanitize_post( $post['style'] );
$orderby = svc_sanitize_post( $post['orderby'] );


//allow HTML tags
$content = $post['content']; 
$content = str_replace('"','|||34|||', $content);
$content = str_replace('<','|||60|||', $content);
$content = str_replace('=','|||61|||', $content);
$content = str_replace('>','|||62|||', $content);
$content = svc_sanitize_post( $content );
$content = str_replace('|||34|||', '"', $content);
$content = str_replace('|||60|||', '<', $content);
$content = str_replace('|||61|||', '=', $content);
$content = str_replace('|||62|||', '>', $content);

//insert SEG
$sql = "
	INSERT INTO REP_TXTSEG (
		TXTSEG_DOMAIN_ID,
		TXTSEG_CREATED_BY,
		TXTSEG_TXTITE_ID,
		TXTSEG_CONTENT,
		TXTSEG_STYLE,
		TXTSEG_ORDERBY
	) VALUES (
		" . $DOMAIN_ID . ",
		" . $PERSON_ID . ",
		" . $TXTITE_ID . ",
		'" . $content . "',
		'" . $style . "',
		" . $orderby . "
	)
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp ); 

?>





