<?php

if ( $vld != 1 ) die();

$TXTSEG_ID = svc_sanitize_post( $post['txtseg_id'] );
//$orderby = svc_sanitize_post( $post['orderby'] ); //<---- WORK_IN_PROGRESS
$content = $post['content'];
$content = str_replace( '\\', '\\\\', $content );


//update SEG
$sql = "
	UPDATE
		REP_TXTSEG
	SET
		TXTSEG_CONTENT = '" . $content . "'
	WHERE
		TXTSEG_ID = " . $TXTSEG_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTSEG_CREATED_BY = " . $PERSON_ID . "
	";
$res = svc_query( $connection, $sql );

svc_show_result( $res ); 

?>





