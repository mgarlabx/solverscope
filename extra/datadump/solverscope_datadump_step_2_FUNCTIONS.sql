/******************************************************************************************************************/
/********** FUNCTIONS ************************************************************************************************/
/******************************************************************************************************************/



DELIMITER $$


CREATE FUNCTION FN_PERSON_NAME_GET( vID INT ) RETURNS VARCHAR(100)

BEGIN

	DECLARE vRET VARCHAR(100);
	
	SELECT 
		PERSON_NAME INTO vRET
	FROM
		SYS_PERSON
	WHERE
		PERSON_ID = vID;
		
	RETURN vRET;

END $$



CREATE FUNCTION FN_REMOVE_ACCENTS( vSTR TEXT ) RETURNS TEXT

BEGIN

	SET vSTR = REPLACE( vSTR, 'Š', 'S' );
    SET vSTR = REPLACE( vSTR, 'š', 's' );
    SET vSTR = REPLACE( vSTR, 'Ð', 'Dj' );
    SET vSTR = REPLACE( vSTR, 'Ž', 'Z' );
    SET vSTR = REPLACE( vSTR, 'ž', 'z' );
    SET vSTR = REPLACE( vSTR, 'À', 'A' );
    SET vSTR = REPLACE( vSTR, 'Á', 'A' );
    SET vSTR = REPLACE( vSTR, 'Â', 'A' );
    SET vSTR = REPLACE( vSTR, 'Ã', 'A' );
    SET vSTR = REPLACE( vSTR, 'Ä', 'A' );
    SET vSTR = REPLACE( vSTR, 'Å', 'A' );
    SET vSTR = REPLACE( vSTR, 'Æ', 'A' );
    SET vSTR = REPLACE( vSTR, 'Ç', 'C' );
    SET vSTR = REPLACE( vSTR, 'È', 'E' );
    SET vSTR = REPLACE( vSTR, 'É', 'E' );
    SET vSTR = REPLACE( vSTR, 'Ê', 'E' );
    SET vSTR = REPLACE( vSTR, 'Ë', 'E' );
    SET vSTR = REPLACE( vSTR, 'Ì', 'I' );
    SET vSTR = REPLACE( vSTR, 'Í', 'I' );
    SET vSTR = REPLACE( vSTR, 'Î', 'I' );
    SET vSTR = REPLACE( vSTR, 'Ï', 'I' );
    SET vSTR = REPLACE( vSTR, 'Ñ', 'N' );
    SET vSTR = REPLACE( vSTR, 'Ò', 'O' );
    SET vSTR = REPLACE( vSTR, 'Ó', 'O' );
    SET vSTR = REPLACE( vSTR, 'Ô', 'O' );
    SET vSTR = REPLACE( vSTR, 'Õ', 'O' );
    SET vSTR = REPLACE( vSTR, 'Ö', 'O' );
    SET vSTR = REPLACE( vSTR, 'Ø', 'O' );
    SET vSTR = REPLACE( vSTR, 'Ù', 'U' );
    SET vSTR = REPLACE( vSTR, 'Ú', 'U' );
    SET vSTR = REPLACE( vSTR, 'Û', 'U' );
    SET vSTR = REPLACE( vSTR, 'Ü', 'U' );
    SET vSTR = REPLACE( vSTR, 'Ý', 'Y' );
    SET vSTR = REPLACE( vSTR, 'Þ', 'B' );
    SET vSTR = REPLACE( vSTR, 'ß', 'Ss' );
    SET vSTR = REPLACE( vSTR, 'à', 'a' );
    SET vSTR = REPLACE( vSTR, 'á', 'a' );
    SET vSTR = REPLACE( vSTR, 'â', 'a' );
    SET vSTR = REPLACE( vSTR, 'ã', 'a' );
    SET vSTR = REPLACE( vSTR, 'ä', 'a' );
    SET vSTR = REPLACE( vSTR, 'å', 'a' );
    SET vSTR = REPLACE( vSTR, 'æ', 'a' );
    SET vSTR = REPLACE( vSTR, 'ç', 'c' );
    SET vSTR = REPLACE( vSTR, 'è', 'e' );
    SET vSTR = REPLACE( vSTR, 'é', 'e' );
    SET vSTR = REPLACE( vSTR, 'ê', 'e' );
    SET vSTR = REPLACE( vSTR, 'ë', 'e' );
    SET vSTR = REPLACE( vSTR, 'ì', 'i' );
    SET vSTR = REPLACE( vSTR, 'í', 'i' );
    SET vSTR = REPLACE( vSTR, 'î', 'i' );
    SET vSTR = REPLACE( vSTR, 'ï', 'i' );
    SET vSTR = REPLACE( vSTR, 'ð', 'o' );
    SET vSTR = REPLACE( vSTR, 'ñ', 'n' );
    SET vSTR = REPLACE( vSTR, 'ò', 'o' );
    SET vSTR = REPLACE( vSTR, 'ó', 'o' );
    SET vSTR = REPLACE( vSTR, 'ô', 'o' );
    SET vSTR = REPLACE( vSTR, 'õ', 'o' );
    SET vSTR = REPLACE( vSTR, 'ö', 'o' );
    SET vSTR = REPLACE( vSTR, 'ø', 'o' );
    SET vSTR = REPLACE( vSTR, 'ù', 'u' );
    SET vSTR = REPLACE( vSTR, 'ú', 'u' );
    SET vSTR = REPLACE( vSTR, 'û', 'u' );
    SET vSTR = REPLACE( vSTR, 'ý', 'y' );
    SET vSTR = REPLACE( vSTR, 'ý', 'y' );
    SET vSTR = REPLACE( vSTR, 'þ', 'b' );
    SET vSTR = REPLACE( vSTR, 'ÿ', 'y' );
    SET vSTR = REPLACE( vSTR, 'ƒ', 'f' );

    SET vSTR = REPLACE( vSTR, '&Atilde;', 'A' );
    SET vSTR = REPLACE( vSTR, '&atilde;', 'a' );
    SET vSTR = REPLACE( vSTR, '&Aacute;', 'A' );
    SET vSTR = REPLACE( vSTR, '&aacute;', 'a' );
    SET vSTR = REPLACE( vSTR, '&Acirc;', 'A' );
    SET vSTR = REPLACE( vSTR, '&acirc;', 'a' );
    SET vSTR = REPLACE( vSTR, '&Eacute;', 'E' );
    SET vSTR = REPLACE( vSTR, '&eacute;', 'e' );
    SET vSTR = REPLACE( vSTR, '&Ecirc;', 'E' );
    SET vSTR = REPLACE( vSTR, '&ecirc;', 'e' );
    SET vSTR = REPLACE( vSTR, '&Iacute;', 'I' );
    SET vSTR = REPLACE( vSTR, '&iacute;', 'i' );
    SET vSTR = REPLACE( vSTR, '&Otilde;', 'O' );
    SET vSTR = REPLACE( vSTR, '&otilde;', 'o' );
    SET vSTR = REPLACE( vSTR, '&Oacute;', 'O' );
    SET vSTR = REPLACE( vSTR, '&oacute;', 'o' );
    SET vSTR = REPLACE( vSTR, '&Ocirc;', 'O' );
    SET vSTR = REPLACE( vSTR, '&ocirc;', 'o' );
    SET vSTR = REPLACE( vSTR, '&Uacute;', 'U' );
    SET vSTR = REPLACE( vSTR, '&uacute;', 'u' );
    SET vSTR = REPLACE( vSTR, '&Ccedil;', 'C' );
    SET vSTR = REPLACE( vSTR, '&ccedil;', 'c' );
    SET vSTR = REPLACE( vSTR, '&Ntilde;', 'N' );
    SET vSTR = REPLACE( vSTR, '&ntilde;', 'n' );

	RETURN vSTR;

END $$


DELIMITER ;


