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

$base_url = 'http://www.solvertank.com/solverscope/'; //<-------- TO BE CONFIGURED 


$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Monica', 'monica@turmadamonica.com.br', 2 );
$url_monica = $base_url . 'main/?tk=' . $tk;

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Cebolinha', 'cebolinha@turmadamonica.com.br', 3 );
$url_cebolinha = $base_url . 'main/?tk=' . $tk;

$secret = '176575655'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Cascão', 'cascao@turmadamonica.com.br', 4 );
$url_cascao = $base_url . 'main/?tk=' . $tk;

$secret = '479929474'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'Bruce Wayne', 'batman@wayne.com', 2 );
$url_batman = $base_url . 'main/?tk=' . $tk;

$secret = '719198561'; //<-------- DOMAIN_SECRET @ SYS_DOMAIN
$tk = get_token( $base_url, $secret, 'El Chavo del Ocho', 'chavo@elchavo8.com.mx', 2 );
$url_chavo = $base_url . 'main/?tk=' . $tk;


?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="description" content="Digital Education" />
    <meta name="author" content="Solvertank" />
    <title>Solverscope Login</title>
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" type="text/css" />
    <link href="../fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="../fonts/material-design-icons/material-icon.css" rel="stylesheet" type="text/css" />
	<link href="../assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../assets/css/pages/extra_pages.css">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" /> 
</head>
<body>
    <div class="form-title">
        <h1>Login para testes</h1>
    </div>
    <!-- Login Form-->
    <div class="login-form text-center">
        <div class="toggle"></div>
        <div class="form formLogin">
			<h3><a href="<?=$url_monica?>">USU&Aacute;RIO MASTER</a></h3><p>&nbsp;<p>
			<h3><a href="<?=$url_cebolinha?>">USU&Aacute;RIO GESTOR</a></h3><p>&nbsp;<p>
			<h3><a href="<?=$url_cascao?>">USU&Aacute;RIO AUTOR</a></h3><p>&nbsp;<p>
			<hr>
			<h3><a href="<?=$url_chavo?>">ESPA&Ntilde;OL</a></h3><p>&nbsp;<p>
			<h3><a href="<?=$url_batman?>">ENGLISH</a></h3><p>&nbsp;<p>
        </div>
    </div>
    <script src="../assets/plugins/jquery/jquery.min.js" ></script>
    <script src="../assets/js/pages/extra_pages/pages.js" ></script>
</body>
</html>

<?php
	
	
//This function checks if this user is already in the system.
//If not, the function creates the record and set the profile.
//The key to find the user is the e-mail.
//After that, returns user's token.
function get_token( $base_url, $secret, $name, $email, $profile ) {

	$appurl = $base_url . 'main/api/'; 

	$data = '{
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
			'procedure: login',
			'tk: ' . $secret
		),
	));
	
	$response = curl_exec($curl);
	$response = str_replace( "\xEF\xBB\xBF", '', $response );  //remove first invalid characters
	$response = str_replace( "\n", '', $response ); 
	
	curl_close( $curl );
	
	return $response;
	
}	
	
?>