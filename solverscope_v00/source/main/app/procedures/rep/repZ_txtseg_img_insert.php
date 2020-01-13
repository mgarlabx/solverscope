<?php
include( '../../../../svc_settings.php' );
include( '../../app_functions.php' );
include( '../../app_cryp.php' );
include( '../../app_data.php' );

//WORK_IN_PROGRESS: não acessar o banco de dados dessa forma, deveria usar o app/index.php
	
//request post
$TXTITE_ID = $_POST['txtite_id'];
$maxseg = $_POST['maxseg'];
$tk = $_POST['tk'];


//descrypt person_id
$PERSON_ID = svc_decryp( $tk, $cryp_key, 24 ); //hours // $cryp_key @ svc_settings.php


//connect databases
$connection = svc_connect( $host, $login, $password, $database );


//get current domain 
$sql = "
	SELECT
		DOMAIN_ID
	FROM
		SYS_PERSON
		INNER JOIN SYS_DOMAIN
		ON PERSON_LAST_DOMAIN_ID = DOMAIN_ID
	WHERE
		PERSON_ID = " . $PERSON_ID . "
	";
$rows = svc_get_rows( $connection, $sql );
$DOMAIN_ID = $rows[0]['DOMAIN_ID'];



//check permissions
$permission = svc_procedure_permission( 'repZ_txtseg_img_insert' );
if ( $permission < 1 ){
	svc_show_result( 'permission denied' );
	die();
} 

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



//file POST
$name = $_FILES['image-name']['name'];
$tmp_name = $_FILES['image-name']['tmp_name'];
$type = pathinfo( $name, PATHINFO_EXTENSION );


//id and file name
$sql = "SELECT MAX(TXTSEG_ID) FROM REP_TXTSEG";
$max_id = svc_get_var( $connection, $sql );
$max_id = $max_id + 1;
$file_name = 'IMG' . svc_encryp( $max_id, 2645413 ) . '.' . $type;


//save file
$target_file = $server_path . '/' . $file_name;
move_uploaded_file( $tmp_name, $target_file );


//insert SEG
$sql = "
	INSERT INTO REP_TXTSEG (
		TXTSEG_ID,
		TXTSEG_DOMAIN_ID,
		TXTSEG_CREATED_BY,
		TXTSEG_TXTITE_ID,
		TXTSEG_CONTENT,
		TXTSEG_STYLE,
		TXTSEG_TYPE,
		TXTSEG_ORDERBY
	) VALUES (
		" . $max_id . ",
		" . $DOMAIN_ID . ",
		" . $PERSON_ID . ",
		" . $TXTITE_ID . ",
		'" . $file_name . "',
		'',
		'IMG',
		" . ($maxseg+1) . "
	)
	";


svc_query( $connection, $sql );




//disconnect
svc_disconnect( $connection );


svc_show_result( '<script>window.close();</script>' );


?> 



