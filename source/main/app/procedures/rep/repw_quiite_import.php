<?php

include( '../../../../svc_settings.php' );
include( '../../app_data.php' );
include( '../../app_functions.php' );

//https://github.com/shuchkin/simplexlsx
include( '../../app_simple_xlsx.php' );


$DOMAIN_ID = $_POST['domain_id'];
$PERSON_ID = $_POST['person_id'];
$FOLDER_ID = $_POST['folder_id'];

$my_file = $_FILES['excel_file']['tmp_name'];



//check file format

$die = false;

if ( $xlsx = SimpleXLSX::parse( $my_file ) ) {
	
	$rows = $xlsx->rows();
	if ( count( $rows ) < 2 ) {
		$die = true;
		$msg = 'Too small file.';
	}
	else if ( count( $rows ) > 501 ) {
		$die = true;
		$msg = 'Too large file, max. 500 rows.';
	}
	else if ( count( $rows[0] ) != 11 ) {
		$die = true;
		$msg = 'Invalid number of columns.';
	}
	else if ( $rows[0][0] != 'QUESTION_ID' ) {
		$die = true;
		$msg = 'Invalid column 0.';
	}
	else if ( $rows[0][1] != 'QUESTION_NAME' ) {
		$die = true;
		$msg = 'Invalid column 1.';
	}
	else if ( $rows[0][2] != 'QUESTION_FEEDBACK' ) {
		$die = true;
		$msg = 'Invalid column 3.';
	}
	else if ( $rows[0][3] != 'QUESTION_COMMAND' ) {
		$die = true;
		$msg = 'Invalid column 2.';
	}
	else if ( $rows[0][4] != 'QUESTION_CORRECT' ) {
		$die = true;
		$msg = 'Invalid column 4.';
	}
	else if ( $rows[0][5] != 'QUESTION_OPT_1' ) {
		$die = true;
		$msg = 'Invalid column 5.';
	}
	else if ( $rows[0][6] != 'QUESTION_OPT_2' ) {
		$die = true;
		$msg = 'Invalid column 6.';
	}
	else if ( $rows[0][7] != 'QUESTION_OPT_3' ) {
		$die = true;
		$msg = 'Invalid column 7.';
	}
	else if ( $rows[0][8] != 'QUESTION_OPT_4' ) {
		$die = true;
		$msg = 'Invalid column 8.';
	}
	else if ( $rows[0][9] != 'QUESTION_OPT_5' ) {
		$die = true;
		$msg = 'Invalid column 9.';
	}
	else if ( $rows[0][10] != 'QUESTION_OPT_6' ) {
		$die = true;
		$msg = 'Invalid column 10.';
	}
	
	foreach ( $rows as $row ) {
		if ( count( $row ) != 11 ) {
			$die = true;
			$msg = 'Invalid row';
			break;
		}
	}
	
}

else {
	$die = true;
	$msg = SimpleXLSX::parseError();
}
	


//abort
if ( $die ) {
	echo 'ABORTED 0 - ' . $msg;
	die();
}




//open connection
$connection = svc_connect( $host, $login, $password, $database );


//import
if ( $xlsx = SimpleXLSX::parse( $my_file ) ) {
	
	$r = 0;
	foreach ( $xlsx->rows() as $row ) {
		if ( $r > 0 && trim( $row[1] ) != '' ) {
			
		
			//1 - INSERT OBJECT
			$sql = "
				INSERT INTO REP_OBJECT (
					OBJECT_DOMAIN_ID,
					OBJECT_FOLDER_ID,
					OBJECT_OBJTYP_ID,
					OBJECT_NAME,
					OBJECT_ACTIVE,
					OBJECT_CREATED_BY,
					OBJECT_LEGACY_ID
				) VALUES (
					" . $DOMAIN_ID . ",	
					" . $FOLDER_ID . ",	
					1,
					'" . svc_sanitize_post( $row[1] ) . "',
					1,
					" . $PERSON_ID . ",
					'" . $row[0] . "'
				)
				";
			$res = svc_query( $connection, $sql );
			if ( $res != 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 1 - row ' . $r . ' - ' . $res;
				die();
			}


			//2 - GET OBJECT_ID
			$sql = "
				SELECT
					MAX(OBJECT_ID)
				FROM
					REP_OBJECT
				WHERE
					OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
					AND OBJECT_FOLDER_ID = " . $FOLDER_ID . "
					AND OBJECT_OBJTYP_ID = 1
					AND OBJECT_NAME = '" . svc_sanitize_post( $row[1] ) . "'
					AND OBJECT_ACTIVE = 1
					AND OBJECT_CREATED_BY = " . $PERSON_ID . "
					AND OBJECT_LEGACY_ID = '" . $row[0] . "'
				";
			$res = svc_get_var( $connection, $sql );
			if ( strpos( $res, 'rror 80' ) == 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 2 - row ' . $r . ' - ' . $res;
				die();
			}
			$OBJECT_ID = $res;



			//3 - INSERT TXTITE FOR FEEDBACK
			$sql = "
				INSERT INTO REP_TXTITE (
					TXTITE_DOMAIN_ID,
					TXTITE_CREATED_BY
				) VALUES (
					" . $DOMAIN_ID . ",	
					" . $PERSON_ID . "
				)
			";
			$res = svc_query( $connection, $sql );
			if ( $res != 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 3 - row ' . $r . ' - ' . $res;
				die();
			}
			
			
			//4 - GET TXTITE_ID FOR FEEDBACK
			$sql = "
				SELECT
					MAX(TXTITE_ID)
				FROM
					REP_TXTITE
				WHERE
					TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
					AND TXTITE_CREATED_BY = " . $PERSON_ID . "
				";
			$res = svc_get_var( $connection, $sql );
			if ( strpos( $res, 'rror 80' ) == 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 4 - row ' . $r . ' - ' . $res;
				die();
			}
			$TXTITE_FEEDBACK_ID = $res;
			

			//5 - INSERT TXTSEG FOR FEEDBACK
			$content = svc_sanitize_post( $row[2] );
			$content = str_replace( '&amp;#34;', '&quot;', $content );
			$content = str_replace( '&amp;#39;', '&apos;', $content );
			$content = str_replace( '&amp;#61;', '=', $content );
			$sql = "
				INSERT INTO REP_TXTSEG (
					TXTSEG_DOMAIN_ID,
					TXTSEG_TXTITE_ID,
					TXTSEG_ORDERBY,
					TXTSEG_TYPE,
					TXTSEG_STYLE,
					TXTSEG_CONTENT,
					TXTSEG_CREATED_BY
				) VALUES (
					" . $DOMAIN_ID . ",
					" . $TXTITE_FEEDBACK_ID . ",
					1,
					'TXT',
					'paragraph',
					'" . $content . "',
					" . $PERSON_ID . "
				)
				";
			$res = svc_query( $connection, $sql );
			if ( $res != 1 ){
				svc_disconnect( $connection );
				echo $sql;
				//echo 'ABORTED 5 - row ' . $r . ' - ' . $res;
				die();
			}
			
			

			//6 - INSERT TXTITE FOR COMMAND
			$sql = "
				INSERT INTO REP_TXTITE (
					TXTITE_DOMAIN_ID,
					TXTITE_CREATED_BY
				) VALUES (
					" . $DOMAIN_ID . ",	
					" . $PERSON_ID . "
				)
			";
			$res = svc_query( $connection, $sql );
			if ( $res != 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 6 - row ' . $r . ' - ' . $res;
				die();
			}


			//7 - GET TXTITE_ID FOR COMMAND
			$sql = "
				SELECT
					MAX(TXTITE_ID)
				FROM
					REP_TXTITE
				WHERE
					TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
					AND TXTITE_CREATED_BY = " . $PERSON_ID . "
				";
			$res = svc_get_var( $connection, $sql );
			if ( strpos( $res, 'rror 80' ) == 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 7 - row ' . $r . ' - ' . $res;
				die();
			}
			$TXTITE_ID = $res;

			
			//8 - INSERT TXTSEG FOR COMMAND
			$content = svc_sanitize_post( $row[3] );
			$content = str_replace( '&amp;#34;', '&quot;', $content );
			$content = str_replace( '&amp;#39;', '&apos;', $content );
			$content = str_replace( '&amp;#61;', '=', $content );
			$sql = "
				INSERT INTO REP_TXTSEG (
					TXTSEG_DOMAIN_ID,
					TXTSEG_TXTITE_ID,
					TXTSEG_ORDERBY,
					TXTSEG_TYPE,
					TXTSEG_STYLE,
					TXTSEG_CONTENT,
					TXTSEG_CREATED_BY
				) VALUES (
					" . $DOMAIN_ID . ",
					" . $TXTITE_ID . ",
					1,
					'TXT',
					'paragraph',
					'" . $content . "',
					" . $PERSON_ID . "
				)
				";
			$res = svc_query( $connection, $sql );
			if ( $res != 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 8 - row ' . $r . ' - ' . $res;
				die();
			}
			
			
			//9 - INSERT QUIITE
			$sql = "
				INSERT INTO REP_QUIITE (
					QUIITE_DOMAIN_ID,
					QUIITE_OBJECT_ID,
					QUIITE_TXTITE_ID_COMMAND,
					QUIITE_TXTITE_ID_FEEDBACK,
					QUIITE_CREATED_BY
				) VALUES (
					" . $DOMAIN_ID . ",
					" . $OBJECT_ID . ",
					" . $TXTITE_ID . ",
					" . $TXTITE_FEEDBACK_ID . ",
					" . $PERSON_ID . "
				)
				";
			$res = svc_query( $connection, $sql );
			if ( $res != 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 9 - row ' . $r . ' - ' . $res;
				die();
			}
		

			//10 - GET QUIITE_ID
			$sql = "
				SELECT
					MAX(QUIITE_ID)
				FROM
					REP_QUIITE
				WHERE
					QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
					AND QUIITE_OBJECT_ID = " . $OBJECT_ID . "
					AND QUIITE_TXTITE_ID_COMMAND = " . $TXTITE_ID . "
					AND QUIITE_CREATED_BY = " . $PERSON_ID . "
				";
			$res = svc_get_var( $connection, $sql );
			if ( strpos( $res, 'rror 80' ) == 1 ){
				svc_disconnect( $connection );
				echo 'ABORTED 10 - row ' . $r . ' - ' . $res;
				die();
			}
			$QUIITE_ID = $res;
		
		
		
		
		
		
			//OPTIONS 1 TO 6 ---------------------------------------------------------------

			for ( $i=1; $i < 7; $i++ ) {


				if ( $row[ 4 + $i ] != '' ) {

					//101 - INSERT TXTITE FOR OPT
					$sql = "
						INSERT INTO REP_TXTITE (
							TXTITE_DOMAIN_ID,
							TXTITE_CREATED_BY
						) VALUES (
							" . $DOMAIN_ID . ",	
							" . $PERSON_ID . "
						)
					";
					$res = svc_query( $connection, $sql );
					if ( $res != 1 ){
						svc_disconnect( $connection );
						echo 'ABORTED 101 (' . $i . ') - row ' . $r . ' - ' . $res;
						die();
					}


					//102 - GET TXTITE_ID
					$sql = "
						SELECT
							MAX(TXTITE_ID)
						FROM
							REP_TXTITE
						WHERE
							TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
							AND TXTITE_CREATED_BY = " . $PERSON_ID . "
						";
					$res = svc_get_var( $connection, $sql );
					if ( strpos( $res, 'rror 80' ) == 1 ){
						svc_disconnect( $connection );
						echo 'ABORTED 102 (' . $i . ') - row ' . $r . ' - ' . $res;
						die();
					}
					$TXTITE_ID = $res;

			
					//103 - INSERT TXTSEG
					$content = svc_sanitize_post( $row[ 4 + $i ] );
					$content = str_replace( '&amp;#34;', '&quot;', $content );
					$content = str_replace( '&amp;#39;', '&apos;', $content );
					$content = str_replace( '&amp;#61;', '=', $content );
					$sql = "
						INSERT INTO REP_TXTSEG (
							TXTSEG_DOMAIN_ID,
							TXTSEG_TXTITE_ID,
							TXTSEG_ORDERBY,
							TXTSEG_TYPE,
							TXTSEG_STYLE,
							TXTSEG_CONTENT,
							TXTSEG_CREATED_BY
						) VALUES (
							" . $DOMAIN_ID . ",
							" . $TXTITE_ID . ",
							1,
							'TXT',
							'paragraph',
							'" . $content . "',
							" . $PERSON_ID . "
						)
						";
					$res = svc_query( $connection, $sql );
					if ( $res != 1 ){
						svc_disconnect( $connection );
						echo 'ABORTED 103 (' . $i . ') - row ' . $r . ' - ' . $res;
						die();
					}
			
			
					//104 - INSERT QUIOPT
					$CORRECT = 0;
					if ( $row[4] == $i ) $CORRECT = 1;

					$sql = "
						INSERT INTO REP_QUIOPT (
							QUIOPT_DOMAIN_ID,
							QUIOPT_QUIITE_ID,
							QUIOPT_TXTITE_ID,
							QUIOPT_ORDERBY,
							QUIOPT_CORRECT,
							QUIOPT_CREATED_BY
						) VALUES (
							" . $DOMAIN_ID . ",
							" . $QUIITE_ID . ",
							" . $TXTITE_ID . ",
							" . $i .",
							" . $CORRECT .",
							" . $PERSON_ID . "
						)
						";
					$res = svc_query( $connection, $sql );
					if ( $res != 1 ){
						echo 'ABORTED 104 (' . $i . ') - row ' . $r . ' - ' . $res;
						svc_disconnect( $connection );
						die();
					}

				}

			}

		}
		$r++;
	}
	
	echo 'OK';
		
} else {
	echo SimpleXLSX::parseError();
}

svc_disconnect( $connection );

?>





