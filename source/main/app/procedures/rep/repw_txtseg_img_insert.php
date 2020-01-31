<?php

if ( $vld != 1 ) die();

$TXTITE_ID = svc_sanitize_post( $post['txtite_id'] );
$ORDERBY = svc_sanitize_post( $post['orderby'] );
$CONTENT = svc_sanitize_post( $post['content'] );


//insert SEG
$sql = "
	INSERT INTO REP_TXTSEG (
		TXTSEG_DOMAIN_ID,
		TXTSEG_CREATED_BY,
		TXTSEG_TXTITE_ID,
		TXTSEG_CONTENT,
		TXTSEG_STYLE,
		TXTSEG_TYPE,
		TXTSEG_ORDERBY
	) VALUES (
		" . $DOMAIN_ID . ",
		" . $PERSON_ID . ",
		" . $TXTITE_ID . ",
		'" . $CONTENT . "',
		'1200',
		'IMG',
		" . $ORDERBY . "
	)
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp ); 


?>





