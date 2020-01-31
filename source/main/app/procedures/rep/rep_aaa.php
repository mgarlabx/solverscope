<?php
//para testes

$server_path = getcwd();
$server_path = str_replace( 'app', '', $server_path );
$server_path .= 'files/DOM';
$server_path .= str_pad( $DOMAIN_ID, 10, '0', STR_PAD_LEFT );
$server_path .= '/IMG/';

$files = scandir( $server_path );

foreach ( $files as $file ) {

	if ( $file != '.' && $file != '..' ){
		$sql = "SELECT COUNT(*) FROM REP_TXTSEG WHERE TXTSEG_CONTENT = '" . $file . "'";
		$query = mysqli_query( $connection, $sql );
		$row = mysqli_fetch_array( $query );
		if ( $row[0] == 0 ) {
			unlink( $server_path . $file );
		}
	}

}




?>