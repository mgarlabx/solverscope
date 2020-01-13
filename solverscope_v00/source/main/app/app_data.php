<?php 
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Solverscope Database Library                                       │ \\
// │ Connects and access MySQL servers                                  │ \\
// │ Returns and perform queries                                        │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2020 Maurício Garcia                                   │ \\
// │ Solvertank                                                         │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

ini_set( 'display_errors', false );

//connect database
function svc_connect( $host, $login, $password, $database ) {
	$connection = mysqli_connect( $host, $login, $password, $database );
	if ( !$connection ) {
		return 'Error 801';
	}
	else {
		return $connection;
	}
}


//disconnect database
function svc_disconnect( $connection ) {
	mysqli_close( $connection );
}


//return STRING with one row of one field
function svc_get_var( $connection, $sql ) {
	$query = mysqli_query( $connection, $sql );
	if ( !$query ) {
		return 'Error 802';
	    die();
	}
	$row = mysqli_fetch_array( $query );
	$rows = array_map( 'utf8_encode', $row );
	mysqli_free_result( $query );
	return $rows[0]; 
}


//returns ARRAY with several rows and columns
function svc_get_rows( $connection, $sql ) {
	$query = mysqli_query( $connection, $sql );
	if ( !$query ) {
		return 'Error 803';
	    die();
	}
	$rows = array();
	while ( $row = mysqli_fetch_assoc( $query ) ) {
		$rows[] = array_map( 'utf8_encode', $row );
	}	
	mysqli_free_result( $query );
	return $rows;
}



//execute query
function svc_query( $connection, $sql ) {
	$query = mysqli_query( $connection, $sql );
	if ( !$query ) {
		return 'Error 804';
	}
	else {
		$stmt = $sql;
		$stmt = str_replace( "'", '`', $stmt );
		$stmt = str_replace( '"', '`', $stmt );
		$sql2 = "
			INSERT INTO SYS_LOGSQL (
				LOGSQL_DOMAIN_ID,
				LOGSQL_PERSON_ID,
				LOGSQL_STATEMENT
				) VALUES (
					" . $GLOBALS[ 'DOMAIN_ID' ] . ",
					" . $GLOBALS[ 'PERSON_ID' ] . ",
					'" . $stmt . "'
				)
		";
		//mysqli_query( $GLOBALS[ 'connection' ], $sql2 ); //WORK_IN_PROGRESS - fazer log das queries SQL
		return 1;
	}
}


//format date
function svc_date_format( $dt_column, $LANG_ID ) {
	if ( $LANG_ID == 2 ) {
		$dt = "DATE_FORMAT(" . $dt_column . ",'%m/%d/%Y')";
	}
	else {
		$dt = "DATE_FORMAT(" . $dt_column . ",'%d/%m/%Y')";
	}
	return $dt;
}







?>