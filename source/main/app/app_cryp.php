<?php 
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Encrypt / Decrypt Library                                          │ \\
// │ Encrypts numbers up to 11 characters                               │ \\
// │ Does not encrypt zero or negative numbers                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2019 Maurício Garcia                                   │ \\
// │ Solvertank                                                         │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

date_default_timezone_set('America/Sao_Paulo');


function svc_encryp( $num, $key ) {

	//concatenating time with num
	$now = (new \DateTime())->format('YmdHis');
	$tx0 = $now . substr( '00000000000' . $num, -11 );

	//creating array 
	$arr0 = array();
	for ( $i = 0; $i < 25 ; $i++ ) {
		$arr0[] = substr( $tx0, $i, 1 );
	}

	//storing consistency
	$chk = 
		$arr0[0]+
		$arr0[1]*2+
		$arr0[2]+
		$arr0[3]+
		$arr0[4]*13+
		$arr0[5]+
		$arr0[6]+
		$arr0[7]+
		$arr0[8]*7+
		$arr0[9]+
		$arr0[10]+
		$arr0[11]+
		$arr0[12]+
		$arr0[13]*45+
		$arr0[14]+
		$arr0[15]+
		$arr0[16]+
		$arr0[17]*11+
		$arr0[18]-
		$arr0[19]-
		$arr0[20]-
		$arr0[21]-
		$arr0[22]-
		$arr0[23]+
		$arr0[24];
	
	$chk = $chk * $key;

	//concatenating with check for consistency		
	$tx0 = $tx0 . substr( '000' . $chk, -3 );

	//creating new array 
	$arr1 = array();
	for ( $i = 0; $i < 28 ; $i++ ) {
		$arr1[] = substr( $tx0, $i, 1 );
	}

	//creating new array and changin positions
	$arr2 = array();
	$arr2[] = $arr1[9];
	$arr2[] = $arr1[0];
	$arr2[] = $arr1[23];
	$arr2[] = $arr1[4];
	$arr2[] = $arr1[17];
	$arr2[] = $arr1[1];
	$arr2[] = $arr1[7];
	$arr2[] = $arr1[14];
	$arr2[] = $arr1[27];
	$arr2[] = $arr1[15];
	$arr2[] = $arr1[19];
	$arr2[] = $arr1[5];
	$arr2[] = $arr1[20];
	$arr2[] = $arr1[16];
	$arr2[] = $arr1[11];
	$arr2[] = $arr1[6];
	$arr2[] = $arr1[12];
	$arr2[] = $arr1[8];
	$arr2[] = $arr1[2];
	$arr2[] = $arr1[13];
	$arr2[] = $arr1[22];
	$arr2[] = $arr1[10];
	$arr2[] = $arr1[26];
	$arr2[] = $arr1[18];
	$arr2[] = $arr1[21];
	$arr2[] = $arr1[3];
	$arr2[] = $arr1[25];
	$arr2[] = $arr1[24];
	
	//concatenating
	$tx1 = rand( 1, 9 ); //first character = dummy
	for ( $i = 0; $i < 28 ; $i++ ) {
		$tx1 = $tx1 . $arr2[$i];
	}

	return $tx1;
	
}



function svc_decryp( $num, $key, $hours ) {
	
	$seconds = $hours*60*60;
	
	if ( strlen($num) != 29 ) {
		$ret = -1;
	}
	
	else {
	
		$num = substr( $num, -28 );	
	
		//creating array 
		$arr1 = array();
		for ( $i = 0; $i < 28 ; $i++ ) {
			$arr1[] = substr( $num, $i, 1 );
		}

		//creating new array and changin positions
		$arr2 = array();
		$arr2[] = $arr1[1];
		$arr2[] = $arr1[5];
		$arr2[] = $arr1[18];
		$arr2[] = $arr1[25];
		$arr2[] = $arr1[3];
		$arr2[] = $arr1[11];
		$arr2[] = $arr1[15];
		$arr2[] = $arr1[6];
		$arr2[] = $arr1[17];
		$arr2[] = $arr1[0];
		$arr2[] = $arr1[21];
		$arr2[] = $arr1[14];
		$arr2[] = $arr1[16];
		$arr2[] = $arr1[19];
		$arr2[] = $arr1[7];
		$arr2[] = $arr1[9];
		$arr2[] = $arr1[13];
		$arr2[] = $arr1[4];
		$arr2[] = $arr1[23];
		$arr2[] = $arr1[10];
		$arr2[] = $arr1[12];
		$arr2[] = $arr1[24];
		$arr2[] = $arr1[20];
		$arr2[] = $arr1[2];
		$arr2[] = $arr1[27];
		$arr2[] = $arr1[26];
		$arr2[] = $arr1[22];
		$arr2[] = $arr1[8];

		//concatenating
		$tx1 = '';
		for ( $i = 0; $i < 28 ; $i++ ) {
			$tx1 = $tx1 . $arr2[$i];
		}

		//spliting parts
		$now = 1 * substr( $tx1, 0, 14);
		$num = 1 * substr( $tx1, 14, 11);
		$chk = 1 * substr( $tx1, 25, 3);

		//checking time
		$now1 = (new \DateTime())->format('YmdHis');
		$dif = $now1 - $now;
		if ( $dif > $seconds ) {
			$ret = -1;
		}
		else {
			//checking consistency
			$chk1 = 
				$arr2[0]+
				$arr2[1]*2+
				$arr2[2]+
				$arr2[3]+
				$arr2[4]*13+
				$arr2[5]+
				$arr2[6]+
				$arr2[7]+
				$arr2[8]*7+
				$arr2[9]+
				$arr2[10]+
				$arr2[11]+
				$arr2[12]+
				$arr2[13]*45+
				$arr2[14]+
				$arr2[15]+
				$arr2[16]+
				$arr2[17]*11+
				$arr2[18]-
				$arr2[19]-
				$arr2[20]-
				$arr2[21]-
				$arr2[22]-
				$arr2[23]+
				$arr2[24];
	
			$chk1 = $chk1 * $key;
			$chk1 = 1 * substr( '000' . $chk1, -3 );
			
			if ( $chk != $chk1 ) {
				$ret = -1;
			}
			else {
				$ret = $num;
				if ( $ret < 1 ) $ret = -1;
			}
			
		}
		
	}

	return $ret;
}

?>