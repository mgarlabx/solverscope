<?php

if ( $vld != 1 ) die();


$TXTSEG_ID = svc_sanitize_post( $post['txtseg_id'] );
$style = svc_sanitize_post( $post['style'] );
$orderby = svc_sanitize_post( $post['orderby'] );

//allow HTML tags
$content = $post['content'];
$content = str_replace('"', '|||34|||', $content);
$content = str_replace('<', '|||60|||', $content);
$content = str_replace('=', '|||61|||', $content);
$content = str_replace('>', '|||62|||', $content);
$content = svc_sanitize_post( $content );
$content = str_replace('|||34|||', '"', $content);
$content = str_replace('|||60|||', '<', $content);
$content = str_replace('|||61|||', '=', $content);
$content = str_replace('|||62|||', '>', $content);

$content = str_replace('&amp;nbsp;', ' ', $content);
$content = str_replace('  ', ' ', $content);
$content = str_replace('  ', ' ', $content);
$content = str_replace('  ', ' ', $content);


//update SEG
$sql = "
	UPDATE
		REP_TXTSEG
	SET
		TXTSEG_CONTENT = '" . $content . "',
		TXTSEG_STYLE = '" . $style . "',
		TXTSEG_ORDERBY = " . $orderby . "
	WHERE
		TXTSEG_ID = " . $TXTSEG_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTSEG_CREATED_BY = " . $PERSON_ID . "
	";
svc_query( $connection, $sql );

//get TXTITE_ID
$sql = "
	SELECT
		TXTSEG_TXTITE_ID
	FROM
		REP_TXTSEG
	WHERE
		TXTSEG_ID = " . $TXTSEG_ID . "
		AND TXTSEG_DOMAIN_ID = " . $DOMAIN_ID . "
		AND TXTSEG_CREATED_BY = " . $PERSON_ID . "
	";
$TXTITE_ID = svc_get_var( $connection, $sql );


//return TXTITE_ID
svc_show_result(  $TXTITE_ID );

?>





