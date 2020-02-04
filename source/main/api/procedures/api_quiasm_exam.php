<?php

if ( $vld != 1 ) die();

$QUIASM_ID = svc_sanitize_post( $post['quiasm_id'] );

//get settings
$sql = "
	SELECT
		QUIASM_MAX_ITEMS, QUIASM_RANDOM_ITEMS, QUIASM_RANDOM_OPTIONS
	FROM
		REP_QUIASM
	WHERE
		QUIASM_ID = " . $QUIASM_ID . "
		AND QUIASM_DOMAIN_ID = " . $DOMAIN_ID ."
	";
$settings = svc_get_rows( $connection, $sql );
$QUIASM_MAX_ITEMS = $settings[0]['QUIASM_MAX_ITEMS'];
$QUIASM_RANDOM_ITEMS = $settings[0]['QUIASM_RANDOM_ITEMS'];
$QUIASM_RANDOM_OPTIONS = $settings[0]['QUIASM_RANDOM_OPTIONS'];


//get questions
$questions = api_quiait_list();


//prepare exam
$ct = 0;
foreach ( $questions as $question ) {

	$options_tmp = api_quiopt_list( $question['QUIAIT_QUIITE_ID'] );
	$cy = 0;
	foreach ( $options_tmp as $option ){
		$options[$cy]['correct'] = $options_tmp[$cy]['QUIOPT_CORRECT'];
		$options[$cy]['option'] = api_txtite_get( $options_tmp[$cy]['QUIOPT_TXTITE_ID'] );
		$cy++;
	}
	
	$rows[$ct]['id'] = $question['QUIAIT_QUIITE_ID'];
	$rows[$ct]['command'] = api_txtite_get( $question['QUIITE_TXTITE_ID_COMMAND'] );
	$rows[$ct]['options'] = $options;
	
	$ct++;
}


svc_show_result_encoded( $rows );





/******* FUNCTIONS *******************************************************************************/


function api_quiait_list() {
	
	//list questions
	$sql = "
		SELECT
			QUIAIT_QUIITE_ID,
			QUIITE_TXTITE_ID_COMMAND
		FROM
			REP_QUIAIT
			INNER JOIN REP_QUIITE
			ON QUIAIT_QUIITE_ID = QUIITE_ID
		WHERE
			QUIAIT_QUIASM_ID = " . $GLOBALS['QUIASM_ID'] . "
			AND QUIAIT_DOMAIN_ID = " . $GLOBALS['DOMAIN_ID'] . "
		ORDER BY
			CASE
				WHEN " . $GLOBALS['QUIASM_RANDOM_ITEMS'] . " > 0 THEN RAND()
				ELSE QUIAIT_ORDERBY
			END
		";
	if ( $GLOBALS['QUIASM_MAX_ITEMS'] > 0 ) {
		$sql .= " LIMIT " . $GLOBALS['QUIASM_MAX_ITEMS'];
	
	}
	return svc_get_rows( $GLOBALS['connection'], $sql );

}




function api_quiopt_list( $QUIITE_ID ) {
	$sql = "
		SELECT
			QUIOPT_CORRECT,
			QUIOPT_TXTITE_ID
		FROM
			REP_QUIOPT
		WHERE
			QUIOPT_DOMAIN_ID = " . $GLOBALS['DOMAIN_ID'] . "
			AND QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
		ORDER BY
			CASE
				WHEN " . $GLOBALS['QUIASM_RANDOM_OPTIONS'] . " = 1 THEN RAND()
				ELSE QUIOPT_ORDERBY
			END
		";
	
	return svc_get_rows( $GLOBALS['connection'], $sql );

}




function api_txtite_get( $TXTITE_ID ) {

	$path = 'files/DOM' . substr( '0000000000' . $GLOBALS['DOMAIN_ID'], -10 ) . '/IMG/';

	$sql = "
		SELECT
			TXTSEG_TYPE as type,
			TXTSEG_STYLE as style,
			CASE
				WHEN TXTSEG_TYPE = 'IMG' THEN CONCAT( '" . $path . "', TXTSEG_CONTENT )
				ELSE TXTSEG_CONTENT
			END AS content
		FROM
			REP_TXTSEG
		WHERE
			TXTSEG_TXTITE_ID = " . $TXTITE_ID . "
			AND TXTSEG_DOMAIN_ID = " . $GLOBALS['DOMAIN_ID'] . "
		ORDER BY
			TXTSEG_ORDERBY
		";
		
	$rows_tmp = svc_get_rows( $GLOBALS['connection'], $sql );
	
	$rows = $rows_tmp;
	
	//WORK_IN_PROGRESS: precisa realmente remover as quebras de linha?
	// $ct = 0;
	// foreach ( $rows_tmp as $row ) {
	// 	$rows[$ct]['type'] = $row['type'];
	// 	$rows[$ct]['style'] = $row['style'];
	//
	// 	$content = $row['content'];
	//
	// 	$content = str_replace("\r", '|BREAK-R|', $content );
	// 	$content = str_replace("\n", '|BREAK-N|', $content );
	//
	// 	$rows[$ct]['content'] = $content;
	// 	$ct++;
	// }
	
	return $rows;

}




?>






