<?php

if ( $vld != 1 ) die();

$TXTSEG_ID = svc_sanitize_post( $post['txtseg_id'] );
$TXTSEG_ORDERBY = svc_sanitize_post( $post['img_orderby'] ); 
$TXTSEG_STYLE = svc_sanitize_post( $post['img_maxwidth'] ); 

//update SEG
$sql = "
	UPDATE
		REP_TXTSEG
	SET
		TXTSEG_STYLE = " . $TXTSEG_STYLE . ",
		TXTSEG_ORDERBY = ". $TXTSEG_ORDERBY . "
	WHERE
		TXTSEG_ID = " . $TXTSEG_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTSEG_CREATED_BY = " . $PERSON_ID . "
	";
$res = svc_query( $connection, $sql );

svc_show_result( $res ); 

?>





