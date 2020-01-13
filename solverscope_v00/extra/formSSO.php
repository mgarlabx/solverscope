<?php
/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/*
This script is a simple suggestion on how to implement a SSO for Solverscope.
It is not part of the application and can be developed in any language.
*/

$base_url = 'http://localhost/...../'; //<-------- TO BE CONFIGURED 

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Mônica', 'monica@turmadamonica.com.br', 2 );
$url_monica = $base_url . 'main/?tk=' . $tk;

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Cebolinha', 'cebolinha@turmadamonica.com.br', 3 );
$url_cebolinha = $base_url . 'main/?tk=' . $tk;

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Cascão', 'cascao@turmadamonica.com.br', 4 );
$url_cascao = $base_url . 'main/?tk=' . $tk;

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Magali', 'magali@turmadamonica.com.br', 5 );
$url_magali = $base_url . 'main/?tk=' . $tk;

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Franjinha', 'franjinha@turmadamonica.com.br', 6 );
$url_franjinha = $base_url . 'main/?tk=' . $tk;


$secret = '479929474'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Bruce Wayne', 'batman@wayne.com', 2 );
$url_batman = $base_url . 'main/?tk=' . $tk;

$secret = '719198561'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'El Chavo del Ocho', 'chavo@elchavo8.com.mx', 2 );
$url_chavo = $base_url . 'main/?tk=' . $tk;


?>
<html>

	<head>
	    <title>Solversope SSO</title>
	</head>
 
	<body>
		<a href="<?=$url_monica?>">M&ocirc;nica</a><p>
		<a href="<?=$url_cebolinha?>">Cebolinha</a><p>
		<a href="<?=$url_cascao?>">Casc&atilde;o</a><p>
		<a href="<?=$url_magali?>">Magali</a><p>
		<a href="<?=$url_franjinha?>">Franjinha</a><p>

		<hr>
		<a href="<?=$url_batman?>">Bruce Wayne</a><p>
		<a href="<?=$url_chavo?>">El Chavo del Ocho</a><p>
	</body>

</html>

<?php
	
	
//This function checks if this user is already in the system.
//If not, the function creates the record and set the profile.
//The key to find the user is the e-mail.
//After that, returns user's token.
function get_token( $base_url, $secret, $name, $email, $profile ) {

	$appurl = $base_url . 'main/app/'; 

	$data = '{
		"secret": "' . $secret . '",
		"name": "' . $name . '",
		"email": "' . $email . '",
		"profile": "' . $profile . '"
		}';

	$curl = curl_init();
	
	curl_setopt_array($curl, array(
		CURLOPT_URL => $appurl,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => $data,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json',
			'procedure: sysw_login'
		),
	));
	
	$response = curl_exec($curl);
	$response = str_replace( "\xEF\xBB\xBF", '', $response );  //remove first invalid characters
	$response = str_replace( "\n", '', $response ); 
	
	curl_close( $curl );
	
	return $response;
	
}	
	
?>