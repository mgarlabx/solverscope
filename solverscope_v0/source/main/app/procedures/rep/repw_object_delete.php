<?php

if ( $vld != 1 ) die();

$OBJECT_ID = svc_sanitize_post( $post['object_id'] );

$resp = 'ini';

/* WORK_IN_PROGRESS - Checar se esse objeto está sendo usado em algum segmento */


//get object type id
$sql = "
	SELECT
		OBJTYP_NAME
	FROM
		REP_OBJECT
		INNER JOIN REP_OBJTYP
		ON OBJECT_OBJTYP_ID = OBJTYP_ID
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND OBJECT_CREATED_BY = " . $PERSON_ID . "
	";

$OBJTYP_NAME = svc_get_var( $connection, $sql );




/********* OBJ_QUIZ **************************************************************************/

if  ( $OBJTYP_NAME == 'OBJ_QUIZ' ) {
	
	//get QUIITE_ID
	$sql = "
		SELECT
			QUIITE_ID
		FROM
			REP_QUIITE 
		WHERE
			QUIITE_OBJECT_ID = " . $OBJECT_ID . "
			AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND QUIITE_CREATED_BY = " . $PERSON_ID . "
		";
	$QUIITE_ID = svc_get_var( $connection, $sql );
	
	
	//flag REP_TXTITE to delete
	$sql = "
		UPDATE REP_TXTITE SET TXTITE_DELETED = 1
		WHERE TXTITE_ID IN
			(SELECT QUIITE_TXTITE_ID_COMMAND FROM REP_QUIITE WHERE
				QUIITE_OBJECT_ID = " . $OBJECT_ID . "
				AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
				AND QUIITE_CREATED_BY = " . $PERSON_ID . "
			)
		";
	$resp = svc_query( $connection, $sql );
	$sql = "
		UPDATE REP_TXTITE SET TXTITE_DELETED = 1
		WHERE TXTITE_ID IN
			(SELECT QUIITE_TXTITE_ID_FEEDBACK FROM REP_QUIITE WHERE
				QUIITE_OBJECT_ID = " . $OBJECT_ID . "
				AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
				AND QUIITE_CREATED_BY = " . $PERSON_ID . "
			)
		";
	$resp = svc_query( $connection, $sql );
	$sql = "
		UPDATE REP_TXTITE SET TXTITE_DELETED = 1
		WHERE TXTITE_ID IN
			(SELECT QUIOPT_TXTITE_ID FROM REP_QUIOPT WHERE
				QUIOPT_QUIITE_ID = " . $QUIITE_ID . "
				AND QUIOPT_DOMAIN_ID = " . $DOMAIN_ID . "
				AND QUIOPT_CREATED_BY = " . $PERSON_ID . "
			)
		";
	$resp = svc_query( $connection, $sql );
	
	
	//delete REP_QUIITE
	//REP_QUIOPT will be deleted by CASCADE
	$sql = "
		DELETE FROM 
			REP_QUIITE 
		WHERE
			QUIITE_OBJECT_ID = " . $OBJECT_ID . "
			AND QUIITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND QUIITE_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	
	
	//delete REP_TXTITE
	//REP_TXTSEG will be deleted by CASCADE
	$sql = "
		DELETE FROM 
			REP_TXTITE 
		WHERE
			TXTITE_DELETED = 1
			AND TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND TXTITE_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	//WORK_IN_PROGRESS --- excluir arquivos de imagens em REP_TXTSEG

}

/********* OBJ_QUIZ_ASM **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_QUIZ_ASM' ) {

	//delete REP_QUIASM
	//REP_QUIAIT will be deleted by CASCADE
	$sql = "
		DELETE FROM 
			REP_QUIASM 
		WHERE
			QUIASM_OBJECT_ID = " . $OBJECT_ID . "
			AND QUIASM_DOMAIN_ID = " . $DOMAIN_ID . "
			AND QUIASM_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	

}



/********* OBJ_ESSAY **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_ESSAY' ) {

	//get ESSITE_ID
	$sql = "
		SELECT
			ESSITE_ID
		FROM
			REP_ESSITE 
		WHERE
			ESSITE_OBJECT_ID = " . $OBJECT_ID . "
			AND ESSITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND ESSITE_CREATED_BY = " . $PERSON_ID . "
		";
	$ESSITE_ID = svc_get_var( $connection, $sql );
	
	
	//flag REP_TXTITE to delete
	$sql = "
		UPDATE REP_TXTITE SET TXTITE_DELETED = 1
		WHERE TXTITE_ID IN
			(SELECT ESSITE_TXTITE_ID_COMMAND FROM REP_ESSITE WHERE
				ESSITE_OBJECT_ID = " . $OBJECT_ID . "
				AND ESSITE_DOMAIN_ID = " . $DOMAIN_ID . "
				AND ESSITE_CREATED_BY = " . $PERSON_ID . "
			)
		";
	$resp = svc_query( $connection, $sql );
	$sql = "
		UPDATE REP_TXTITE SET TXTITE_DELETED = 1
		WHERE TXTITE_ID IN
			(SELECT ESSITE_TXTITE_ID_FEEDBACK FROM REP_ESSITE WHERE
				ESSITE_OBJECT_ID = " . $OBJECT_ID . "
				AND ESSITE_DOMAIN_ID = " . $DOMAIN_ID . "
				AND ESSITE_CREATED_BY = " . $PERSON_ID . "
			)
		";
	$resp = svc_query( $connection, $sql );

	
	//delete REP_ESSITE
	$sql = "
		DELETE FROM 
			REP_ESSITE 
		WHERE
			ESSITE_OBJECT_ID = " . $OBJECT_ID . "
			AND ESSITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND ESSITE_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	
	
	//delete REP_TXTITE
	//REP_TXTSEG will be deleted by CASCADE
	$sql = "
		DELETE FROM 
			REP_TXTITE 
		WHERE
			TXTITE_DELETED = 1
			AND TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND TXTITE_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	//WORK_IN_PROGRESS --- excluir arquivos de imagens em REP_TXTSEG
}



/********* OBJ_TEXT **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_TEXT' ) {

	//get HTMOBJ_ID
	$sql = "
		SELECT
			HTMOBJ_ID
		FROM
			REP_HTMOBJ 
		WHERE
			HTMOBJ_OBJECT_ID = " . $OBJECT_ID . "
			AND HTMOBJ_DOMAIN_ID = " . $DOMAIN_ID . "
			AND HTMOBJ_CREATED_BY = " . $PERSON_ID . "
		";
	$HTMOBJ_ID = svc_get_var( $connection, $sql );
	
	
	//flag REP_TXTITE to delete
	$sql = "
		UPDATE REP_TXTITE SET TXTITE_DELETED = 1
		WHERE TXTITE_ID IN
			(SELECT HTMOBJ_TXTITE_ID FROM REP_HTMOBJ WHERE
				HTMOBJ_OBJECT_ID = " . $OBJECT_ID . "
				AND HTMOBJ_DOMAIN_ID = " . $DOMAIN_ID . "
				AND HTMOBJ_CREATED_BY = " . $PERSON_ID . "
			)
		";
	$resp = svc_query( $connection, $sql );

	
	//delete REP_HTMOBJ
	$sql = "
		DELETE FROM 
			REP_HTMOBJ 
		WHERE
			HTMOBJ_OBJECT_ID = " . $OBJECT_ID . "
			AND HTMOBJ_DOMAIN_ID = " . $DOMAIN_ID . "
			AND HTMOBJ_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	
	
	//delete REP_TXTITE
	//REP_TXTSEG will be deleted by CASCADE
	$sql = "
		DELETE FROM 
			REP_TXTITE 
		WHERE
			TXTITE_DELETED = 1
			AND TXTITE_DOMAIN_ID = " . $DOMAIN_ID . "
			AND TXTITE_CREATED_BY = " . $PERSON_ID . "
		";
	$resp = svc_query( $connection, $sql );
	//WORK_IN_PROGRESS --- excluir arquivos de imagens em REP_TXTSEG

}



/********* OBJ_BOT **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_BOT' ) {

	/* WORK_IN_PROGRESS */

}



/********* OBJ_FILE **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_FILE' ) {

	/* WORK_IN_PROGRESS */

}



/********* OBJ_LTI **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_LTI' ) {

	/* WORK_IN_PROGRESS */

}



/********* OBJ_URL **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_URL' ) {

	/* WORK_IN_PROGRESS */

}



/********* OBJ_VIDEO **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_VIDEO' ) {

	/* WORK_IN_PROGRESS */

}



/********* OBJ_AUDIO **************************************************************************/

else if  ( $OBJTYP_NAME == 'OBJ_AUDIO' ) {

	/* WORK_IN_PROGRESS */

}










//delete OBJECT
$sql = "
	DELETE FROM 
		REP_OBJECT 
	WHERE
		OBJECT_ID = " . $OBJECT_ID . "
		AND OBJECT_DOMAIN_ID = " . $DOMAIN_ID . "
		AND OBJECT_CREATED_BY = " . $PERSON_ID . "
	";

$resp = svc_query( $connection, $sql );

svc_show_result( $resp );


?>





