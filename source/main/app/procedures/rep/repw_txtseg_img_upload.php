<?php

//upload image file and return new random file name

$DOMAIN_ID = $_POST['domain_id'];

//check folders
$server_path = getcwd();
$server_path = str_replace( 'app/procedures/rep', '', $server_path );
$server_path .= 'files/DOM';
$server_path .= str_pad( $DOMAIN_ID, 10, '0', STR_PAD_LEFT );

if ( !file_exists( $server_path ) ) {
	mkdir( $server_path );
}
$server_path .= '/IMG';
if ( !file_exists( $server_path ) ) {
	mkdir( $server_path );
}

//file SOURCE
$name = $_FILES['img_file']['name'];
$tmp_name = $_FILES['img_file']['tmp_name'];
$type = pathinfo( $name, PATHINFO_EXTENSION );

//print_r( $_FILES );

if ( $name != '' ) {

	//file TARGET
	$num1 = rand( 123456789012345678, 923456789012345678 );
	$num2 = rand( 12345678901, 92345678901 );
	$file_name = 'IMG' . $num1 . $num2 . '.' . $type;

	//save file
	$target_file = $server_path . '/' . $file_name;
	move_uploaded_file( $tmp_name, $target_file );

	echo $file_name;
}

else {
	echo 0;
}

	
?>


