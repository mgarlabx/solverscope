/******************************************************************************************************************/
/********** DATA EXAMPLES *****************************************************************************************/
/******************************************************************************************************************/



/********** SYS ************************************************************************************************/


# Dump of table SYS_LANGUA
# ------------------------------------------------------------

INSERT INTO `SYS_LANGUA` (`LANGUA_ID`, `LANGUA_NAME`, `LANGUA_ACRONYM`)
VALUES
	(1,'English','EN'),
	(2,'Português','PT'),
	(3,'Español','ES');



# Dump of table SYS_DOMAIN
# ------------------------------------------------------------

INSERT INTO `SYS_DOMAIN` (`DOMAIN_ID`, `DOMAIN_LANGUA_ID`, `DOMAIN_NAME`, `DOMAIN_SECRET`)
VALUES
	(1,3,'El Chavo del Ocho',719198561),
	(2,1,'Wayne Corporation',479929474),
	(3,2,'Turma da Mônica',176575655);



# Dump of table SYS_PERSON
# ------------------------------------------------------------

INSERT INTO `SYS_PERSON` (`PERSON_ID`, `PERSON_NAME`, `PERSON_EMAIL`, `PERSON_LAST_DOMAIN_ID`)
VALUES
	(1,'Bruce Wayne','batman@wayne.com',2),
	(2,'Dick Grayson','robin@wayne.com',2),
	(3,'Barbara Gordon','batgirl@wayne.com',2),
	(4,'Selina Kyle','catwoman@wayne.com',2),
	(5,'Dark Knight','joker@wayne.com',2),
	(6,'M&ocirc;nica','monica@turmadamonica.com.br',3),
	(7,'Cebolinha','cebolinha@turmadamonica.com.br',3),
	(8,'Magali','magali@turmadamonica.com.br',3),
	(9,'Casc&atilde;o','cascao@turmadamonica.com.br',3),
	(10,'Franjinha','franjinha@turmadamonica.com.br',3),
	(11,'El Chavo del Ocho','chavo@elchavo8.com.mx',1),
	(12,'La Chilindrina','chilindrina@elchavo8.com.mx',1),
	(13,'Don Ram&oacute;n','ramon@elchavo8.com.mx',1),
	(14,'Do&ntilde;a Florinda','florinda@elchavo8.com.mx',1),
	(15,'Quico','quico@elchavo8.com.mx',1);



# Dump of table SYS_PROFIL
# ------------------------------------------------------------

INSERT INTO `SYS_PROFIL` (`PROFIL_ID`, `PROFIL_NAME`)
VALUES
	(1,'Autor'),
	(2,'Master'),
	(3,'Gestor');



# Dump of table SYS_PERPRO
# ------------------------------------------------------------

INSERT INTO `SYS_PERPRO` (`PERPRO_ID`, `PERPRO_DOMAIN_ID`, `PERPRO_PERSON_ID`, `PERPRO_PROFIL_ID`)
VALUES
	(1,2,1,2),
	(2,2,2,3),
	(3,2,3,1),
	(4,2,4,3),
	(5,2,5,3),
	(6,3,6,2),
	(7,3,7,3),
	(9,3,8,3),
	(8,3,9,1),
	(10,3,10,3),
	(11,1,11,2),
	(12,1,12,3),
	(13,1,13,1),
	(14,1,14,3),
	(15,1,15,3),
	(16,3,1,1),
	(17,1,1,1),
	(18,2,6,1),
	(19,1,6,1),
	(20,2,11,1),
	(21,3,11,1);



# Dump of table SYS_PROFM0
# ------------------------------------------------------------

INSERT INTO `SYS_PROFM0` (`PROFM0_ID`, `PROFM0_LABEL`, `PROFM0_LEVEL`, `PROFM0_ICON`, `PROFM0_ORDERBY`, `PROFM0_ACTIVE`, `PROFM0_PARENT_ID`, `PROFM0_COMMENTS`)
VALUES
	(2,'HOME',1,'home',2,1,0,''),
	(3,'DASHBOARD',1,'dashboard',3,0,0,''),
	(11,'REPOSITORY',2,'library_books',11,1,0,''),
	(12,'REPOSITORY_FULL_ACCESS',3,'',1,1,11,''),
	(13,'REPOSITORY_MY_FOLDERS',3,'',2,1,11,''),
	(14,'TAGS',3,'',3,1,11,''),
	(21,'STRUCTURE',2,'layers',21,1,0,''),
	(22,'MODULES',3,'',1,1,21,''),
	(23,'PRODUCTS',3,'',2,1,21,''),
	(81,'SETTINGS',2,'settings',81,1,0,''),
	(82,'USERS',3,'',2,1,81,''),
	(83,'PROFILES',3,'',1,1,81,''),
	(91,'DEVELOPER',2,'developer_mode',91,1,0,''),
	(92,'TOGGLE_ID',3,'',1,1,91,''),
	(93,'DOMAINS',3,'',3,1,81,'');


# Dump of table SYS_PROFM1
# ------------------------------------------------------------

INSERT INTO `SYS_PROFM1` (`PROFM1_ID`, `PROFM1_PROFM0_ID`, `PROFM1_PROFIL_ID`)
VALUES
	(1,2,2),
	(2,3,2),
	(3,11,2),
	(4,12,2),
	(5,13,2),
	(6,14,2),
	(7,21,2),
	(8,22,2),
	(9,23,2),
	(10,81,2),
	(11,82,2),
	(12,91,2),
	(13,92,2),
	(14,2,3),
	(15,3,3),
	(16,11,3),
	(17,12,3),
	(18,13,3),
	(19,14,3),
	(20,21,3),
	(21,22,3),
	(22,23,3),
	(23,2,1),
	(24,11,1),
	(25,13,1),
	(26,83,2),
	(27,93,2);





# Dump of table SYS_PROFP0
# ------------------------------------------------------------

INSERT INTO `SYS_PROFP0` (`PROFP0_ID`, `PROFP0_NAME`, `PROFP0_COMMENTS`, `PROFP0_OPEN`)
VALUES
	(2,'%%','Master Full - BE CAREFUL',0),
	(11,'rep%','Repository read and write',0),
	(12,'rep\\_%','Repository read only',0),
	(21,'mod%','Module read and write',0),
	(22,'mod\\_%','Module read only',0),
	(90,'sys_person_domain_list','List of persons of the current domain',0),
	(91,'sys_person_name_get','Get name of current user',1),
	(92,'sys_domain_last_get','Get last domain visited',1),
	(93,'sys_domain_list','List of user domains',1),
	(94,'sys_lngstr\\_%','Dictionary',1),
	(95,'sysw_domain_last_set','Set last domain visited',1),
	(96,'sys_profm0_list','List of user menu (sidebar) items',1),
	(97,'sys_aaa','For test and debug',1);



# Dump of table SYS_PROFP1
# ------------------------------------------------------------

INSERT INTO `SYS_PROFP1` (`PROFP1_ID`, `PROFP1_PROFP0_ID`, `PROFP1_PROFIL_ID`)
VALUES
	(1,2,2),
	(2,12,3),
	(3,22,3),
	(4,11,1);












/********** REP ************************************************************************************************/




# Dump of table REP_TXTITE
# ------------------------------------------------------------

INSERT INTO `REP_TXTITE` (`TXTITE_ID`, `TXTITE_DOMAIN_ID`, `TXTITE_DELETED`, `TXTITE_CREATED_BY`, `TXTITE_CREATED_DATE`)
VALUES
	(1,1,0,1,'2020-01-05 21:27:46'),
	(2,3,0,9,'2020-01-12 14:54:22'),
	(3,3,0,9,'2020-01-12 14:54:22'),
	(4,3,0,9,'2020-01-12 14:54:22'),
	(5,3,0,9,'2020-01-12 14:54:22'),
	(6,3,0,9,'2020-01-12 14:54:22'),
	(7,3,0,9,'2020-01-12 14:54:22'),
	(8,3,0,9,'2020-01-12 14:54:22'),
	(9,3,0,9,'2020-01-12 17:41:16'),
	(10,3,0,9,'2020-01-12 17:41:16'),
	(11,3,0,9,'2020-01-12 17:41:16'),
	(12,3,0,9,'2020-01-12 17:41:16'),
	(13,3,0,9,'2020-01-12 17:41:16'),
	(14,3,0,9,'2020-01-12 17:41:16'),
	(15,3,0,9,'2020-01-12 17:41:16'),
	(16,3,0,9,'2020-01-12 17:45:18'),
	(17,3,0,9,'2020-01-12 17:45:18'),
	(18,3,0,9,'2020-01-12 17:45:18'),
	(19,3,0,9,'2020-01-12 17:45:19'),
	(20,3,0,9,'2020-01-12 17:45:19'),
	(21,3,0,9,'2020-01-12 17:45:19'),
	(22,3,0,9,'2020-01-12 17:45:19'),
	(23,3,0,9,'2020-01-12 17:48:37'),
	(24,3,0,9,'2020-01-12 17:48:37'),
	(25,3,0,9,'2020-01-12 17:48:37'),
	(26,3,0,9,'2020-01-12 17:48:38'),
	(27,3,0,9,'2020-01-12 17:48:38'),
	(28,3,0,9,'2020-01-12 17:48:38'),
	(29,3,0,9,'2020-01-12 17:48:38'),
	(30,3,0,9,'2020-01-12 17:51:56'),
	(31,3,0,9,'2020-01-12 17:51:57'),
	(32,3,0,9,'2020-01-12 17:51:57'),
	(33,3,0,9,'2020-01-12 17:51:57'),
	(34,3,0,9,'2020-01-12 17:51:57'),
	(35,3,0,9,'2020-01-12 17:51:57'),
	(36,3,0,9,'2020-01-12 17:51:57');



# Dump of table REP_TXTSEG
# ------------------------------------------------------------

INSERT INTO `REP_TXTSEG` (`TXTSEG_ID`, `TXTSEG_DOMAIN_ID`, `TXTSEG_TXTITE_ID`, `TXTSEG_ORDERBY`, `TXTSEG_TYPE`, `TXTSEG_STYLE`, `TXTSEG_CONTENT`, `TXTSEG_CREATED_BY`, `TXTSEG_CREATED_DATE`)
VALUES
	(1,1,1,1,'TXT','paragraph','',1,'2020-01-05 21:24:09'),
	(2,3,2,1,'IMG','600','IMG17200002020010031412803200072.png',9,'2020-01-12 17:33:48'),
	(3,3,2,2,'TXT','footnote','<div>PICASSO, P. <b>Cabe&ccedil;a de touro</b>. Bronze, 33,5 cm x 43,5 cm x 19 cm. Mus&eacute;e Picasso, Paris. Fran&ccedil;a, 1945.</div><div>JANSON, H. W. <b>Inicia&ccedil;&atilde;o &agrave; hist&oacute;ria da arte</b>. S&atilde;o Paulo: Martins Fontes, 1988.</div>',9,'2020-01-12 17:34:15'),
	(4,3,2,3,'TXT','paragraph','Na obra Cabe&ccedil;a de touro, o material descartado torna-se objeto de arte por meio da',9,'2020-01-12 17:34:48'),
	(5,3,4,1,'TXT','paragraph','reciclagem da mat&eacute;ria-prima original.',9,'2020-01-12 17:35:34'),
	(6,3,5,1,'TXT','paragraph','complexidade da combina&ccedil;&atilde;o de formas abstratas.',9,'2020-01-12 17:35:44'),
	(7,3,6,1,'TXT','paragraph','perenidade dos elementos que constituem a escultura.',9,'2020-01-12 17:35:54'),
	(8,3,7,1,'TXT','paragraph','mudan&ccedil;a da funcionalidade pela integra&ccedil;&atilde;o dos objetos.',9,'2020-01-12 17:36:04'),
	(9,3,8,1,'TXT','paragraph','fragmenta&ccedil;&atilde;o da imagem no uso de elementos diversificados.',9,'2020-01-12 17:36:26'),
	(10,3,9,1,'TXT','heading-2','TEXTO I',9,'2020-01-12 17:41:36'),
	(11,3,9,2,'IMG','600','IMG37210002030010011412404400011.png',9,'2020-01-12 17:41:44'),
	(12,3,9,3,'TXT','footnote','Fotografia de Jackson Pollock pintando em seu ateli&ecirc;, realizada por Hans Namuth em 1951.<br>CHIPP, H. <b>Teorias da arte moderna</b>. S&atilde;o Paulo: Martins Fontes, 1988.',9,'2020-01-12 17:41:59'),
	(13,3,9,4,'TXT','heading-2','TEXTO II',9,'2020-01-12 17:42:11'),
	(14,3,9,5,'IMG','600','IMG97210002040010021212904900084.png',9,'2020-01-12 17:42:29'),
	(15,3,9,6,'TXT','footnote','MUNIZ, V. <b>Action Photo </b>(segundo Hans Namuth em Pictures in Chocolate). Impress&atilde;o fotogr&aacute;fica, 152,4 cm x 121,92 cm, The Museum of Modern Art, Nova Iorque, 1977.<br>NEVES, A. <b>Hist&oacute;ria da arte 4</b>. Vit&oacute;ria: Ufes &ndash; Nead, 2011.',9,'2020-01-12 17:42:56'),
	(16,3,9,7,'TXT','paragraph','Utilizando chocolate derretido como mat&eacute;ria-prima, essa obra de Vick Muniz reproduz a c&eacute;lebre fotografia do processo de cria&ccedil;&atilde;o de Jackson Pollock. A originalidade dessa releitura reside na',9,'2020-01-12 17:43:04'),
	(17,3,11,1,'TXT','paragraph','apropria&ccedil;&atilde;o parod&iacute;stica das t&eacute;cnicas e materiais utilizados.',9,'2020-01-12 17:43:47'),
	(18,3,12,1,'TXT','paragraph','reflex&atilde;o acerca dos sistemas de circula&ccedil;&atilde;o da arte.',9,'2020-01-12 17:44:00'),
	(19,3,13,1,'TXT','paragraph','simplifica&ccedil;&atilde;o dos tra&ccedil;os da composi&ccedil;&atilde;o pict&oacute;rica.',9,'2020-01-12 17:44:12'),
	(20,3,14,1,'TXT','paragraph','contraposi&ccedil;&atilde;o de linguagens art&iacute;sticas distintas.',9,'2020-01-12 17:44:25'),
	(21,3,15,1,'TXT','paragraph','cr&iacute;tica ao advento do abstracionismo.',9,'2020-01-12 17:44:37'),
	(22,3,16,1,'TXT','paragraph','Muitos dos superpoderes do querido Homem- -Aranha de fato se assemelham &agrave;s habilidades biol&oacute;gicas das aranhas e s&atilde;o objeto de estudo para produ&ccedil;&atilde;o de novos materiais.<br>O &ldquo;sentido-aranha&rdquo; adquirido por Peter Parker funciona quase como um sexto sentido, uma esp&eacute;cie de habilidade premonit&oacute;ria e, por isso, soa como um mero elemento ficcional. No entanto, as aranhas realmente t&ecirc;m um sentido mais agu&ccedil;ado. Na verdade, elas t&ecirc;m um dos sistemas sensoriais mais impressionantes da natureza.<br>Os pelos sensoriais das aranhas, que est&atilde;o espalhados por todo o corpo, funcionam como uma forma muito boa de perceber o mundo e captar informa&ccedil;&otilde;es do ambiente. Em muitas esp&eacute;cies, esse tato por meio dos pelos tem papel mais importante que a pr&oacute;pria vis&atilde;o, uma vez que muitas aranhas conseguem prender e atacar suas presas na completa escurid&atilde;o. E por que os pelos humanos n&atilde;o s&atilde;o t&atilde;o eficientes como &oacute;rg&atilde;os sensoriais como os das aranhas? Primeiro, porque um ser humano tem em m&eacute;dia 60 fios de pelo em cada cm2 do corpo, enquanto algumas esp&eacute;cies de aranha podem chegar a ter 40 mil pelos por cm2; segundo, porque cada pelo das aranhas possui at&eacute; 3 nervos para fazer a comunica&ccedil;&atilde;o entre a sensa&ccedil;&atilde;o percebida e o c&eacute;rebro, enquanto n&oacute;s, seres humanos, temos apenas 1 nervo por pelo.',9,'2020-01-12 17:45:49'),
	(23,3,16,2,'TXT','footnote','<div>Dispon&iacute;vel em: http://cienciahoje.org.br. Acesso em: 11 dez. 2018 (adaptado).</div>',9,'2020-01-12 17:46:05'),
	(24,3,16,3,'TXT','paragraph','Como estrat&eacute;gia de progress&atilde;o do texto, o autor simula uma interlocu&ccedil;&atilde;o com o p&uacute;blico leitor ao recorrer &agrave;',9,'2020-01-12 17:46:19'),
	(25,3,18,1,'TXT','paragraph','revela&ccedil;&atilde;o do &ldquo;sentido-aranha&rdquo; adquirido pelo super- -her&oacute;i como um sexto sentido.',9,'2020-01-12 17:46:49'),
	(26,3,19,1,'TXT','paragraph','caracteriza&ccedil;&atilde;o do afeto do p&uacute;blico pelo super-her&oacute;i marcado pela palavra &ldquo;querido&rdquo;.',9,'2020-01-12 17:47:02'),
	(27,3,20,1,'TXT','paragraph','compara&ccedil;&atilde;o entre os poderes do super-her&oacute;i e as habilidades biol&oacute;gicas das aranhas.',9,'2020-01-12 17:47:12'),
	(28,3,21,1,'TXT','paragraph','pergunta ret&oacute;rica na introdu&ccedil;&atilde;o das causas da efici&ecirc;ncia do sistema sensorial das aranhas.',9,'2020-01-12 17:47:28'),
	(29,3,22,1,'TXT','paragraph','comprova&ccedil;&atilde;o das diferen&ccedil;as entre a constitui&ccedil;&atilde;o f&iacute;sica do homem e da aranha por meio de dados num&eacute;ricos.',9,'2020-01-12 17:47:38'),
	(30,3,23,1,'IMG','600','IMG47230002030010081512904300010.png',9,'2020-01-12 17:48:59'),
	(31,3,23,2,'TXT','footnote','<div>Dispon&iacute;vel em: www.tecmundo.com.br. Acesso em: 10 dez. 2018 (adaptado).</div>',9,'2020-01-12 17:49:14'),
	(32,3,23,3,'TXT','paragraph','O texto tem o formato de uma carta de jogo e apresenta dados a respeito de Marcelo Gleiser, premiado pesquisador brasileiro da atualidade. Essa apresenta&ccedil;&atilde;o subverte um g&ecirc;nero textual ao',9,'2020-01-12 17:49:22'),
	(33,3,25,1,'TXT','paragraph','vincular &aacute;reas distintas do conhecimento.',9,'2020-01-12 17:49:41'),
	(34,3,26,1,'TXT','paragraph','evidenciar a forma&ccedil;&atilde;o acad&ecirc;mica do pesquisador.',9,'2020-01-12 17:49:51'),
	(35,3,27,1,'TXT','paragraph','relacionar o universo l&uacute;dico a informa&ccedil;&otilde;es biogr&aacute;ficas.',9,'2020-01-12 17:50:05'),
	(36,3,28,1,'TXT','paragraph','especificar as contribui&ccedil;&otilde;es mais conhecidas do pesquisador.',9,'2020-01-12 17:50:17'),
	(37,3,29,1,'TXT','paragraph','destacar o nome do pesquisador e sua imagem no in&iacute;cio do texto.',9,'2020-01-12 17:50:30'),
	(38,3,30,1,'IMG','600','IMG37230002050010031012005500048.png',9,'2020-01-12 17:53:00'),
	(39,3,30,2,'TXT','footnote','<div>Dispon&iacute;vel em: www.ibge.gov.br. Acesso em: 11 dez. 2018 (adaptado).</div>',9,'2020-01-12 17:53:21'),
	(40,3,30,3,'TXT','paragraph','A gera&ccedil;&atilde;o de imagens por meio da tecnologia ilustrada depende da varia&ccedil;&atilde;o do(a):',9,'2020-01-12 17:53:30'),
	(41,3,32,1,'TXT','paragraph','Albedo dos corpos f&iacute;sicos.',9,'2020-01-12 17:56:39'),
	(42,3,33,1,'TXT','paragraph','Profundidade do len&ccedil;ol fre&aacute;tico.',9,'2020-01-12 17:56:49'),
	(43,3,34,1,'TXT','paragraph','Campo de magnetismo terrestre.',9,'2020-01-12 17:56:59'),
	(44,3,35,1,'TXT','paragraph','Qualidade dos recursos minerais.',9,'2020-01-12 17:57:11'),
	(45,3,36,1,'TXT','paragraph','Movimento de transla&ccedil;&atilde;o planet&aacute;ria.',9,'2020-01-12 17:57:20');





# Dump of table REP_FOLDER
# ------------------------------------------------------------

INSERT INTO `REP_FOLDER` (`FOLDER_ID`, `FOLDER_DOMAIN_ID`, `FOLDER_PARENT_ID`, `FOLDER_NAME`, `FOLDER_AUTHOR_ID`, `FOLDER_REVIEWER1_ID`, `FOLDER_REVIEWER2_ID`, `FOLDER_REVIEWER3_ID`, `FOLDER_REVIEWER4_ID`, `FOLDER_REVIEWER5_ID`, `FOLDER_CREATED_BY`, `FOLDER_CREATED_DATE`)
VALUES
	(1,3,0,'Enem 2019 - 1o. dia - Caderno 1 Azul',9,8,7,0,0,0,7,'2020-01-12 14:54:10'),
	(2,3,0,'Teste',0,0,0,0,0,0,7,'2020-01-15 09:04:34'),
	(3,3,0,'Importa&ccedil;&atilde;o questionbank',0,0,0,0,0,0,7,'2020-01-23 12:03:52'),
	(4,3,4,'M&uacute;ltipla escolha (8)',0,0,0,0,0,0,7,'2020-01-23 12:04:17'),
	(5,3,5,'Sub1',0,0,0,0,0,0,7,'2020-01-23 13:12:18'),
	(6,3,0,'Pasta sem quest&otilde;es',0,0,0,0,0,0,7,'2020-01-25 12:22:33');






# Dump of table REP_OBJTYP
# ------------------------------------------------------------

INSERT INTO `REP_OBJTYP` (`OBJTYP_ID`, `OBJTYP_NAME`, `OBJTYP_ORDERBY`, `OBJTYP_ICON`, `OBJTYP_ACTIVE`)
VALUES
	(1,'OBJ_QUIZ',10,'check-square-o',1),
	(2,'OBJ_ESSAY',20,'pencil-square-o',1),
	(3,'OBJ_TEXT',35,'file-text-o',1),
	(10,'OBJ_QUIZ_ASM',30,'th-list',1);



# Dump of table REP_OBJECT
# ------------------------------------------------------------

INSERT INTO `REP_OBJECT` (`OBJECT_ID`, `OBJECT_DOMAIN_ID`, `OBJECT_FOLDER_ID`, `OBJECT_OBJTYP_ID`, `OBJECT_NAME`, `OBJECT_ACTIVE`, `OBJECT_CREATED_BY`, `OBJECT_CREATED_DATE`, `OBJECT_REV_1`, `OBJECT_REV_2`, `OBJECT_REV_3`, `OBJECT_REV_4`, `OBJECT_REV_5`, `OBJECT_REV_COMMENT_1`, `OBJECT_REV_COMMENT_2`, `OBJECT_REV_COMMENT_3`, `OBJECT_REV_COMMENT_4`, `OBJECT_REV_COMMENT_5`, `OBJECT_LEGACY_ID`)
VALUES
	(2,3,2,1,'Quest&atilde;o 31',1,9,'2020-01-12 14:54:22',0,0,0,0,0,'','','','','',NULL),
	(3,3,2,1,'Quest&atilde;o 36',1,9,'2020-01-12 17:41:16',0,0,0,0,0,'','','','','',NULL),
	(4,3,2,1,'Quest&atilde;o 42',1,9,'2020-01-12 17:45:18',0,0,0,0,0,'','','','','',NULL),
	(5,3,2,1,'Quest&atilde;o 43',1,9,'2020-01-12 17:48:37',0,0,0,0,0,'','','','','',NULL),
	(6,3,2,1,'Quest&atilde;o 47',1,9,'2020-01-12 17:51:56',0,0,0,0,0,'','','','','',NULL),
	(7,3,2,10,'Prova simulada Enem',1,9,'2020-01-12 17:58:23',0,0,0,0,0,'','','','','',NULL);



# Dump of table REP_QUIITE
# ------------------------------------------------------------

INSERT INTO `REP_QUIITE` (`QUIITE_ID`, `QUIITE_DOMAIN_ID`, `QUIITE_OBJECT_ID`, `QUIITE_TXTITE_ID_COMMAND`, `QUIITE_TXTITE_ID_FEEDBACK`, `QUIITE_CREATED_BY`, `QUIITE_CREATED_DATE`)
VALUES
	(2,3,2,2,3,9,'2020-01-12 14:54:22'),
	(3,3,3,9,10,9,'2020-01-12 17:41:16'),
	(4,3,4,16,17,9,'2020-01-12 17:45:19'),
	(5,3,5,23,24,9,'2020-01-12 17:48:38'),
	(6,3,6,30,31,9,'2020-01-12 17:51:57');


# Dump of table REP_QUIOPT
# ------------------------------------------------------------

INSERT INTO `REP_QUIOPT` (`QUIOPT_ID`, `QUIOPT_DOMAIN_ID`, `QUIOPT_QUIITE_ID`, `QUIOPT_TXTITE_ID`, `QUIOPT_ORDERBY`, `QUIOPT_CORRECT`, `QUIOPT_CREATED_BY`, `QUIOPT_CREATED_DATE`)
VALUES
	(2,3,2,4,1,0,9,'2020-01-12 14:54:22'),
	(3,3,2,5,2,0,9,'2020-01-12 14:54:22'),
	(4,3,2,6,3,0,9,'2020-01-12 14:54:22'),
	(5,3,2,7,4,1,9,'2020-01-12 14:54:22'),
	(6,3,2,8,5,0,9,'2020-01-12 14:54:22'),
	(7,3,3,11,1,1,9,'2020-01-12 17:41:17'),
	(8,3,3,12,2,0,9,'2020-01-12 17:41:17'),
	(9,3,3,13,3,0,9,'2020-01-12 17:41:17'),
	(10,3,3,14,4,0,9,'2020-01-12 17:41:17'),
	(11,3,3,15,5,0,9,'2020-01-12 17:41:17'),
	(12,3,4,18,1,0,9,'2020-01-12 17:45:19'),
	(13,3,4,19,2,0,9,'2020-01-12 17:45:19'),
	(14,3,4,20,3,0,9,'2020-01-12 17:45:19'),
	(15,3,4,21,4,1,9,'2020-01-12 17:45:19'),
	(16,3,4,22,5,0,9,'2020-01-12 17:45:19'),
	(17,3,5,25,1,0,9,'2020-01-12 17:48:38'),
	(18,3,5,26,2,0,9,'2020-01-12 17:48:38'),
	(19,3,5,27,3,1,9,'2020-01-12 17:48:38'),
	(20,3,5,28,4,0,9,'2020-01-12 17:48:38'),
	(21,3,5,29,5,0,9,'2020-01-12 17:48:38'),
	(22,3,6,32,1,1,9,'2020-01-12 17:51:57'),
	(23,3,6,33,2,0,9,'2020-01-12 17:51:57'),
	(24,3,6,34,3,0,9,'2020-01-12 17:51:57'),
	(25,3,6,35,4,0,9,'2020-01-12 17:51:57'),
	(26,3,6,36,5,0,9,'2020-01-12 17:51:57');





# Dump of table REP_QUIASM
# ------------------------------------------------------------

INSERT INTO `REP_QUIASM` (`QUIASM_ID`, `QUIASM_DOMAIN_ID`, `QUIASM_OBJECT_ID`, `QUIASM_MAX_ITEMS`, `QUIASM_RANDOM_ITEMS`, `QUIASM_RANDOM_OPTIONS`, `QUIASM_CREATED_BY`, `QUIASM_CREATED_DATE`)
VALUES
	(2,3,7,3,1,1,9,'2020-01-12 17:58:23');




# Dump of table REP_QUIAIT
# ------------------------------------------------------------

INSERT INTO `REP_QUIAIT` (`QUIAIT_ID`, `QUIAIT_DOMAIN_ID`, `QUIAIT_QUIASM_ID`, `QUIAIT_QUIITE_ID`, `QUIAIT_ORDERBY`, `QUIAIT_CREATED_BY`, `QUIAIT_CREATED_DATE`)
VALUES
	(2,3,2,2,1,9,'2020-01-12 18:00:13'),
	(3,3,2,3,2,9,'2020-01-12 18:00:16'),
	(4,3,2,4,3,9,'2020-01-12 18:00:21'),
	(5,3,2,5,4,9,'2020-01-12 18:00:25'),
	(6,3,2,6,5,9,'2020-01-12 18:00:29');


























# Dump of table TAG_TARTYP
# ------------------------------------------------------------

INSERT INTO `TAG_TARTYP` (`TARTYP_ID`, `TARTYP_TABLE_NAME`)
VALUES
	(1,'REP_OBJECT'),
	(2,'MOD_MODULE');




# Dump of table MOD_MODLBL
# ------------------------------------------------------------

INSERT INTO `MOD_MODLBL` (`MODLBL_ID`, `MODLBL_DOMAIN_ID`, `MODLBL_NAME`)
VALUES
	(1,3,'Disciplina'),
	(2,3,'Curso'),
	(3,3,'Livro'),
	(4,3,'Capítulo');



# Dump of table MOD_MODTYP
# ------------------------------------------------------------

INSERT INTO `MOD_MODTYP` (`MODTYP_ID`, `MODTYP_DOMAIN_ID`, `MODTYP_MODLBL_ID`, `MODTYP_NAME`)
VALUES
	(1,3,1,'Disciplina regular'),
	(2,3,1,'Trabalho de conclusão'),
	(3,3,1,'Atividade complementar'),
	(4,3,1,'Estágio supervisionado'),
	(5,3,1,'Projeto'),
	(6,3,2,'Curso de extensão');



	
	
	
	
