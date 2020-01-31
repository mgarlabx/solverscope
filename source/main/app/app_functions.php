<?php



//deformat date according to language
function svc_date_deformat( $str ) {
	if ( strlen( $str ) != 10 ) {
		$dat = 0;
	}
	else {
		if ( $GLOBALS['LANGUA_ID'] == 2 ){
			$m = substr( $str, 0, 2 ); 
			$d = substr( $str, 3, 2 ); 
			$y = substr( $str, 6, 4 ); 
		}
		else {
			$d = substr( $str, 0, 2 ); 
			$m = substr( $str, 3, 2 ); 
			$y = substr( $str, 6, 4 ); 
		}
		if ( checkdate( $m, $d, $y ) ) {
			$dat = $y . '-' . $m . '-' . $d;
		}	
		else {
			$dat = 0;
		}
	}
	return $dat;
}





//prevent SQL injection
function svc_sanitize_post( $str ) {
	$ret = filter_var( $str, FILTER_SANITIZE_STRING );
	$ret = htmlentities( $ret );
	$ret = str_replace( '=', '&#61;', $ret );
	$ret = str_replace( '"', '&#34;', $ret );
	$ret = str_replace( "'", '&#39;', $ret );
	$ret = trim( $ret );
	return $ret;
}


//check permissions for a procedure
function svc_procedure_permission( $procedure_name ) {

	$sql = "
		SELECT
			CASE
				WHEN COUNT(*) > 0 THEN 1 
				ELSE 0
			END AS N
		FROM
			SYS_PROFP0
			LEFT JOIN SYS_PROFP1
			ON PROFP1_PROFP0_ID = PROFP0_ID
		WHERE
			'" . $procedure_name . "' LIKE PROFP0_NAME
			AND ( 
					PROFP0_OPEN = 1 OR
					PROFP1_PROFIL_ID IN 	
					(SELECT
						PERPRO_PROFIL_ID
					FROM
						SYS_PERPRO
					WHERE
						PERPRO_PERSON_ID = " . $GLOBALS['PERSON_ID'] . "
						AND PERPRO_DOMAIN_ID = " . $GLOBALS['DOMAIN_ID'] . "
					)
				)
		";

	return svc_get_var( $GLOBALS['connection'], $sql );

}



//check if is object owner
function svc_is_object_owner( $OBJECT_ID ) {
	
	$sql = "
		SELECT
			CASE
				WHEN COUNT(*) > 0 THEN 1 
				ELSE 0
			END AS N
		FROM
			REP_OBJECT
		WHERE
			OBJECT_DOMAIN_ID = " . $GLOBALS['DOMAIN_ID'] . "
			AND OBJECT_CREATED_BY = " . $GLOBALS['PERSON_ID'] . "
			AND OBJECT_ID = " . $OBJECT_ID . "
		";	
		
	return svc_get_var( $GLOBALS['connection'], $sql );
		
}


//save error and send back message
function svc_error( $file, $msg ) {

	//WORK_IN_PROGRESS - fazer log das mensagens de erro

	if ( 1 == 1 )
		$err_msg = $msg . ' @ ' . $file;
	else
		$err_msg = 'Error...';

	return $err_msg;
	
}



//echo response
function svc_show_result( $res ) {
	
	echo $res;
	
}




//echo response encoded
function svc_show_result_encoded( $res ) {
	
	echo json_encode( $res );
	
}



//translate
function svc_translate( $str ) {
	
	if ( !isset ( $GLOBALS['arr_language'] ) ) {
		return $str;
	}
	
	else {
		$lng = $GLOBALS['LANGUA_ID'];
		$arr = $GLOBALS['arr_language']; 

		foreach ( $arr as $row ) {
			if ( $row['LNGSTR_KEY'] ==  $str ) {
				if ( $lng == 2 )
					return $row['LNGSTR_EN'];
				else if ( $lng == 3 )
					return $row['LNGSTR_PT'];
				else if ( $lng == 4 )
					return $row['LNGSTR_ES'];
				else
					return $row['LNGSTR_KEY'] . '?';
				break;
			}
		}
	}
	
}



//clean CURL response
function svc_clean_response( $response ) {
	$response = str_replace( "\xEF\xBB\xBF", '', $response );  //remove first invalid characters
	$response = str_replace( "\n", '', $response ); 
	return $response;
}





//remove accents
function svc_remove_accents( $str ) {

	$str = str_replace( 'ç', 'c', $str );
	$str = str_replace( 'Ç', 'C', $str );

	$str = str_replace( 'ñ', 'n', $str );
	$str = str_replace( 'Ñ', 'N', $str );

	$str = str_replace( 'á', 'a', $str );
	$str = str_replace( 'à', 'a', $str );
	$str = str_replace( 'â', 'a', $str );
	$str = str_replace( 'ã', 'a', $str );
	$str = str_replace( 'Á', 'A', $str );
	$str = str_replace( 'À', 'A', $str );
	$str = str_replace( 'Â', 'A', $str );
	$str = str_replace( 'Ã', 'A', $str );
	
	$str = str_replace( 'é', 'e', $str );
	$str = str_replace( 'ê', 'e', $str );
	$str = str_replace( 'É', 'E', $str );
	$str = str_replace( 'Ê', 'E', $str );
	
	$str = str_replace( 'í', 'i', $str );
	$str = str_replace( 'Í', 'I', $str );
	
	$str = str_replace( 'ó', 'o', $str );
	$str = str_replace( 'ô', 'o', $str );
	$str = str_replace( 'õ', 'o', $str );
	$str = str_replace( 'Ó', 'O', $str );
	$str = str_replace( 'Ô', 'O', $str );
	$str = str_replace( 'Õ', 'O', $str );

	$str = str_replace( 'ú', 'u', $str );
	$str = str_replace( 'ü', 'u', $str );
	$str = str_replace( 'Ú', 'u', $str );
	$str = str_replace( 'Ü', 'U', $str );
	

	$str = str_replace( '&ccedil;', 'c', $str );
	$str = str_replace( '&Ccedil;', 'C', $str );
	
	$str = str_replace( '&ncedil;', 'n', $str );
	$str = str_replace( '&Ncedil;', 'N', $str );

	$str = str_replace( '&aacute;', 'a', $str );
	$str = str_replace( '&agrave;', 'a', $str );
	$str = str_replace( '&acirc;', 'a', $str );
	$str = str_replace( '&atilde;', 'a', $str );
	$str = str_replace( '&Aacute;', 'A', $str );
	$str = str_replace( '&Agrave;', 'A', $str );
	$str = str_replace( '&Acirc;', 'A', $str );
	$str = str_replace( '&Atilde;', 'A', $str );
	
	$str = str_replace( '&eacute;', 'e', $str );
	$str = str_replace( '&ecirc;', 'e', $str );
	$str = str_replace( '&Eacute;', 'E', $str );
	$str = str_replace( '&Ecirc;', 'E', $str );
	
	$str = str_replace( '&iacute;', 'i', $str );
	$str = str_replace( '&Iacute;', 'I', $str );
	
	$str = str_replace( '&oacute;', 'o', $str );
	$str = str_replace( '&ocirc;', 'o', $str );
	$str = str_replace( '&otilde;', 'o', $str );
	$str = str_replace( '&Oacute;', 'O', $str );
	$str = str_replace( '&Ocirc;', 'O', $str );
	$str = str_replace( '&Otilde;', 'O', $str );

	$str = str_replace( '&uacute;', 'u', $str );
	$str = str_replace( '&uuml;', 'u', $str );
	$str = str_replace( '&Uacute;', 'u', $str );
	$str = str_replace( '&Uuml;', 'U', $str );

	return $str;

}


?>


