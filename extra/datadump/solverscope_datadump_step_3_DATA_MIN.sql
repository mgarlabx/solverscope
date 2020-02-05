/******************************************************************************************************************/
/********** DATA MIN **********************************************************************************************/
/******************************************************************************************************************/

# Dump of table SYS_PROFIL
# ------------------------------------------------------------

INSERT INTO `SYS_PROFIL` (`PROFIL_ID`, `PROFIL_NAME`)
VALUES
	(1,'Desenvolvedor'),
	(2,'Administrador'),
	(3,'Gestor'),
	(4,'Autor');




# Dump of table SYS_PROFP0
# ------------------------------------------------------------

INSERT INTO `SYS_PROFP0` (`PROFP0_ID`, `PROFP0_NAME`, `PROFP0_COMMENTS`, `PROFP0_OPEN`)
VALUES
	(2,'%%','Master Full - BE CAREFUL',0),
	(11,'rep%','Repository read and write',0),
	(12,'rep\\_%','Repository read only',0),
	(13,'repwr\\_%','Repository review write',0),
	(21,'mod%','Module read and write',0),
	(22,'mod\\_%','Module read only',0),
	(90,'sys_person_domain_list','List of persons of the current domain',0),
	(91,'sys_person_name_get','Get name of current user',1),
	(92,'sys_domain_last_get','Get last domain visited',1),
	(93,'sys_domain_list','List of user domains',1),
	(94,'sys_lngstr\\_%','Dictionary',1),
	(95,'sysw_domain_last_set','Set last domain visited',1),
	(96,'sys_profm0_list','List of user menu (sidebar) items',1),
	(97,'sys_domain_id_get','Get current domain id',1);



# Dump of table SYS_PROFP1
# ------------------------------------------------------------

INSERT INTO `SYS_PROFP1` (`PROFP1_PROFP0_ID`, `PROFP1_PROFIL_ID`)
VALUES
	(2,1),
	(2,2),
	(21,2),
	(12,3),
	(13,3),
	(22,3);


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
	(84,'DOMAINS',3,'',3,1,81,''),
	(91,'DEVELOPER',2,'developer_mode',91,1,0,''),
	(92,'TOGGLE_ID',3,'',1,1,91,'');



# Dump of table SYS_PROFM1
# ------------------------------------------------------------

INSERT INTO `SYS_PROFM1` (`PROFM1_PROFM0_ID`, `PROFM1_PROFIL_ID`)
VALUES

	(2,1),
	(3,1),
	(11,1),
	(12,1),
	(13,1),
	(14,1),
	(21,1),
	(22,1),
	(23,1),
	(81,1),
	(82,1),
	(83,1),
	(84,1),
	(91,1),
	(92,1),

	(2,2),
	(3,2),
	(11,2),
	(12,2),
	(13,2),
	(14,2),
	(21,2),
	(22,2),
	(23,2),
	(81,2),
	(82,2),
	(83,2),
	(84,2),

	(2,3),
	(3,3),
	(11,3),
	(12,3),
	(13,3),
	(14,3),
	(21,3),
	(22,3),
	(23,3),
	
	(2,4),
	(11,4),
	(13,4);




# Dump of table SYS_LANGUA
# ------------------------------------------------------------

INSERT INTO `SYS_LANGUA` (`LANGUA_ID`, `LANGUA_NAME`, `LANGUA_ACRONYM`)
VALUES
	(1,'Português','PT'),
	(2,'Español','ES'),
	(3,'English','EN');



# Dump of table SYS_DOMAIN
# ------------------------------------------------------------

INSERT INTO `SYS_DOMAIN` (`DOMAIN_ID`, `DOMAIN_LANGUA_ID`, `DOMAIN_NAME`, `DOMAIN_SECRET`)
VALUES
	(1,1,'Turma da Mônica',176575655),
	(2,2,'El Chavo del Ocho',719198561),
	(3,3,'Wayne Corporation',479929474);



# Dump of table SYS_PERSON
# ------------------------------------------------------------

INSERT INTO `SYS_PERSON` (`PERSON_ID`, `PERSON_NAME`, `PERSON_EMAIL`, `PERSON_LAST_DOMAIN_ID`)
VALUES

	(1,'M&ocirc;nica','monica@turmadamonica.com.br',1),
	(2,'Cebolinha','cebolinha@turmadamonica.com.br',1),
	(3,'Casc&atilde;o','cascao@turmadamonica.com.br',1),
	(4,'Magali','magali@turmadamonica.com.br',1),
	(5,'Franjinha','franjinha@turmadamonica.com.br',1),

	(6,'El Chavo del Ocho','chavo@elchavo8.com.mx',2),
	(7,'La Chilindrina','chilindrina@elchavo8.com.mx',2),
	(8,'Don Ram&oacute;n','ramon@elchavo8.com.mx',2),
	(9,'Do&ntilde;a Florinda','florinda@elchavo8.com.mx',2),
	(10,'Quico','quico@elchavo8.com.mx',2),

	(11,'Bruce Wayne','batman@wayne.com',3),
	(12,'Dick Grayson','robin@wayne.com',3),
	(13,'Barbara Gordon','batgirl@wayne.com',3),
	(14,'Selina Kyle','catwoman@wayne.com',3),
	(15,'Dark Knight','joker@wayne.com',3);




# Dump of table SYS_PERPRO
# ------------------------------------------------------------

INSERT INTO `SYS_PERPRO` (`PERPRO_DOMAIN_ID`, `PERPRO_PERSON_ID`, `PERPRO_PROFIL_ID`)
VALUES

	(1,1,2),
	(2,1,3),
	(3,1,4),

	(1,2,3),
	(1,3,4),
	(1,4,4),
	(1,5,4),

	(1,6,4),
	(2,6,2),
	(3,6,3),
	
	(2,7,3),
	(2,8,4),
	(2,9,4),
	(2,10,4),

	(1,11,3),
	(2,11,4),
	(3,11,2),
	
	(3,12,3),
	(3,13,4),
	(3,14,4),
	(3,15,4);




# Dump of table REP_OBJTYP
# ------------------------------------------------------------

INSERT INTO `REP_OBJTYP` (`OBJTYP_ID`, `OBJTYP_NAME`, `OBJTYP_ORDERBY`, `OBJTYP_ICON`, `OBJTYP_ACTIVE`)
VALUES
	(1,'OBJ_QUIZ',10,'check-square-o',1),
	(2,'OBJ_ESSAY',20,'pencil-square-o',1),
	(3,'OBJ_TEXT',30,'file-text-o',1),
	(4,'OBJ_QUIZ_ASM',40,'th-list',1);




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
	(1,1,'Disciplina'),
	(2,1,'Curso'),
	(3,1,'Livro'),
	(4,1,'Capítulo');




# Dump of table MOD_MODTYP
# ------------------------------------------------------------

INSERT INTO `MOD_MODTYP` (`MODTYP_ID`, `MODTYP_DOMAIN_ID`, `MODTYP_MODLBL_ID`, `MODTYP_NAME`)
VALUES
	(1,1,1,'Disciplina regular'),
	(2,1,1,'Trabalho de conclusão'),
	(3,1,1,'Atividade complementar'),
	(4,1,1,'Estágio supervisionado'),
	(5,1,1,'Projeto'),
	(6,1,2,'Curso de extensão'),
	(7,1,2,'Curso livre'),
	(8,1,3,'Livro básico'),
	(9,1,3,'Livro complementar'),
	(10,1,4,'Capítulo regular'),
	(12,1,4,'Anexo');








# Dump of table SYS_LNGSTR
# ------------------------------------------------------------

INSERT INTO `SYS_LNGSTR` (`LNGSTR_ID`, `LNGSTR_KEY`, `LNGSTR_EN`, `LNGSTR_PT`, `LNGSTR_ES`)
VALUES
	(1,'LANGUA_ID','3','1','2'),
	(2,'INSTITUTIONS','Institutions','Instituições','Instituciones'),
	(3,'COURSES','Courses','Disciplinas','Materias'),
	(4,'COURSE','Course','Disciplina','Materia'),
	(5,'INSTITUTION','Institution','Instituição','Institución'),
	(6,'PROGRAM','Program','Curso','Programa'),
	(7,'LOCATION','Location','Campus','Plantel'),
	(8,'LOCATIONS','Locations','Campi','Planteles'),
	(9,'ONLINE','Online','Online','En línea'),
	(10,'ONSITE_SM','Onsite','Presencial','Escolarizado'),
	(11,'ONSITE_SF','Onsite','Presencial','Escolarizada'),
	(12,'ONSITE_PM','Onsite','Presenciais','Escolarizados'),
	(13,'ONSITE_PF','Onsite','Presenciais','Escolarizadas'),
	(14,'COURSE_MAP','Course map','Matriz curricular','Malla curricular'),
	(15,'COURSE_MAPS','Course maps','Matrizes curriculares','Mallas curriculares'),
	(16,'SECTION','Section','Turma','Clase'),
	(17,'SECTIONS','Sections','Turmas','Clases'),
	(18,'YES','Yes','Sim','Sí'),
	(19,'NO','No','Não','No'),
	(20,'PROFESSOR','Faculty member','Professor','Profesor'),
	(21,'PROFESSORS','Faculty','Professores','Profesores'),
	(22,'HOUR','Hour','Hora','Hora'),
	(23,'HOURS','Hours','Horas','Horas'),
	(24,'CREDIT','Credit','Crédito','Crédito'),
	(25,'CREDITS','Credits','Créditos','Créditos'),
	(26,'HOURS_CONTACT','Contact hours','Horas supervisionadas','Horas con docente'),
	(27,'HOURS_INDEPENDENT','Independent hours','Horas independentes','Horas independientes'),
	(28,'REQUISITES','Requistes','Pré-requisitos','Seriación'),
	(29,'HOURS_TOTAL','Total hours','Horas totais','Horas totales'),
	(30,'TYPE','Type','Tipo','Tipo'),
	(31,'THEMES','Themes','Temas','Temas'),
	(32,'OBJECTIVES','Objectives','Objetivos','Objetivos'),
	(33,'THEMES_SUB','Sub-themes','Subtemas','Subtemas'),
	(34,'REPOSITORY','Repository','Repositório','Repositorio'),
	(35,'OBJ_QUIZ','Quiz item','Questão objetiva','Cuestión objetiva'),
	(36,'OBJ_ESSAY','Essay item','Questão dissertativa','Ensayo'),
	(37,'OBJ_TEXT','Text','Texto','Texto'),
	(38,'OBJ_BOT','Chatbot','Chatbot','Chatbot'),
	(39,'OBJ_FILE','File','Arquivo','Archivo'),
	(40,'OBJ_LTI','LTI','LTI','LTI'),
	(41,'OBJ_URL','Link (URL)','Link (URL)','Liga (URL)'),
	(42,'OBJ_VIDEO','Video','Vídeo','Video'),
	(43,'OBJ_AUDIO','Audio','Áudio','Audio'),
	(44,'HOME','Home','Início','Inicio'),
	(45,'MY_DASHBOARD','My dashboard','Meu painel','Mi tablero'),
	(46,'MY_COURSES','My courses','Minhas disciplinas','Mis materias'),
	(47,'MY_CLASSES','My classes','Minhas turmas','Mis clases'),
	(48,'MY_GROUPS','My groups','Meus grupos','Mis grupos'),
	(49,'ACADEMICS','Academics','Acadêmico','Académico'),
	(50,'OPERATIONS','Operations','Operações','Operaciones'),
	(51,'ADMISSIONS','Admissions','Admissões','Admisiones'),
	(52,'SCHEDULING','Scheduling','Enturmação','Programación'),
	(53,'FINANCIAL','Financial','Financeiro','Financiero'),
	(54,'SETTINGS','Settings','Configurações','Configuraciones'),
	(55,'USERS','Users','Usuários','Usuarios'),
	(56,'FACULTY','Faculty','Professores','Profesores'),
	(57,'STUDENTS','Students','Alunos','Alumnos'),
	(58,'ADMIN','Admin','Admin','Admin'),
	(59,'DOMAINS','Domains','Domínios','Dominios'),
	(60,'LANGUAGES','Languages','Idiomas','Idiomas'),
	(61,'LOGOUT','Logout','Sair','Salir'),
	(62,'FOLDER','Folder','Pasta','Carpeta'),
	(63,'OBJECT','Object','Objeto','Objeto'),
	(65,'CONFIRM_FOLDER_DEL','Confirm folder delete?','Confirma a exclusão da pasta?','¿Confirma eliminación de la carpeta?'),
	(66,'FOLDER_NOT_EMPTY','The folder cannot be deleted because it is not empty.','A pasta não pode ser excluída porque não está vazia.','La carpeta no se puede eliminar porque no está vacía.'),
	(67,'WORK_IN_PROGRESS','Work in progress...','Em desenvolvimento...','En desarrollo...'),
	(68,'CONFIRM_OBJECT_DEL','Confirm object delete?','Confirma a exclusão do objeto?','¿Confirma eliminación del objeto?'),
	(69,'SAVE','Save','Salvar','Salvar'),
	(70,'PROMPT_OBJECT_DATA','Please enter the object data:','Por favor, insira os dados do objeto:','Por favor, introduzca los datos del objeto:'),
	(71,'NAME','Name','Nome','Nombre'),
	(72,'ACTIVE','Active','Ativo','Activo'),
	(73,'INACTIVE','Inactive','Inativo','Inactivo'),
	(74,'OBJECT_NOT_EMPTY','The object cannot be deleted because it is not empty.','O objeto não pode ser excluído porque não está vazio.','El objeto no se puede eliminar porque no está vacío.'),
	(75,'COMMAND','Command','Comando','Comando'),
	(76,'FEEDBACK','Feedback','Feedback','Feedback'),
	(77,'OPTION','Option','Opção','Opción'),
	(78,'IMAGE','Image','Imagem','Imagen'),
	(79,'TEXT','Text','Texto','Texto'),
	(80,'EQUATION','Equation','Equação','Ecuación'),
	(81,'TEXT_EDITOR','Text editor','Editor de texto','Editor de texto'),
	(82,'ORDER_BY','Order by','Ordenação','Ordenación'),
	(83,'STYLE','Style','Estilo','Estilo'),
	(84,'BOLD','Bold','Negrito','Negrito'),
	(85,'ITALIC','Italic','Itálico','Itálico'),
	(86,'UNDERLINED','Underlined','Sublinhado','Subrayado'),
	(87,'SUPERSCRIPT','Superscript','Sobrescrito','Sobrescrito'),
	(88,'SUBSCRIPT','Subscript','Subescrito','Subescrito'),
	(89,'CLEAR_FORMAT','Clear format','Limpar formatação','Eliminar formato'),
	(90,'SYMBOLS','Symbols','Símbolos','Símbolos'),
	(91,'COLORS','Colors','Cores','Colores'),
	(92,'CORRECT','Correct','Correta','Correcta'),
	(93,'PROMPT_FOLDER_NAME','Please enter the folder name:','Por favor informe o nome da pasta:','Por favor ingrese el nombre de la carpeta:'),
	(94,'PROMPT_OPTION_INFO','Please enter data of this option:','Por favor informe os dados dessa opção:','Por favor ingrese los datos de esta opción:'),
	(95,'CONFIRM_OPTION_DEL','Confirm option delete?','Confirma a exclusão da opção?','¿Confirma eliminación de la opción?'),
	(96,'PARAGRAPH','Paragraph','Parágrafo','Párrafo'),
	(97,'HEADER','Header','Cabeçalho','Encabezado'),
	(98,'FOOTNOTE','Footnote','Rodapé','Pie de página'),
	(101,'PROMPT_FILE_NAME','Please enter the file name:','Por favor informe o nome do arquivo:','Por favor ingrese el nombre del archivo:'),
	(102,'PROMPT_EQUATION','Please enter the equation (TeX):','Por favor informe a equação (TeX):','Por favor ingrese el ecuación (TeX):'),
	(103,'OBJ_QUIZ_ASM','Quiz assessment','Prova questões objetivas','Evaluación cuestiónes objetivas'),
	(104,'QUIZ_ASM_MAX_ITEMS','Max items','Número máximo de questões','Numero maximo de cuestións'),
	(105,'QUIZ_ASM_RANDOM_ITEMS','Randomize items','Randomizar questões','Aleatorizar cuestiones'),
	(106,'QUIZ_ASM_RANDOM_OPTIONS','Randomize options','Randomizar opções','Aleatorizar opciones'),
	(107,'ITEM','Item','Questão','Cuestión'),
	(108,'ITEMS','Items','Questões','Cuestiones'),
	(109,'TAG_ALL','Tag all items','Vincular todas','Vincular todo'),
	(110,'PROMPT_ID','Please enter the ID:','Por favor informe o ID:','Por favor ingrese el ID:'),
	(111,'CONFIRM_QUIAIT_REM','Confirm quiz removal?','Confirma a remoção da questão?','¿Confirma remoción de la cuestión?'),
	(112,'QUESTION','Question','Questão','Cuestión'),
	(113,'PROMPT_FOLDER_INFO','Please enter data of this folder:','Por favor informe os dados dessa pasta:','Por favor ingrese los datos de esta carpeta:'),
	(114,'AUTHOR','Author','Autor','Autor'),
	(115,'REVIEWER','Reviewer','Revisor','Revisor'),
	(116,'REPOSITORY_FULL_ACCESS','Full access','Acesso pleno','Acceso completo'),
	(117,'REPOSITORY_MY_FOLDERS','My folders','Minhas pastas','Mis carpetas'),
	(118,'APPROVED','Approved','Aprovado','Aprovado'),
	(119,'NOT_APPROVED','Not approved','Não aprovado','No aprobado'),
	(120,'NOT_VERIFIED','Not verified','Não verificado','No verificado'),
	(121,'DISCLAIMER_1','This is a testing and prototyping environment. Not for use as a production environment.','Esse é um ambiente de testes e prototipagem. Não deve ser usado como ambiente de produção.','Este es un entorno de prueba y creación de prototipos. No debe usarse como entorno de producción.'),
	(122,'DISCLAIMER_2','Solvertank assumes no responsibility for any instability, data loss or any other damage that may occur during its use.','A Solvertank não assume responsabilidades por qualquer instabilidade, perda de dados ou qualquer outro dano que eventualmente possa ocorrer durante sua utilização.','Solvertank no asume ninguna responsabilidad por cualquier inestabilidad, pérdida de datos o cualquier otro daño que pueda ocurrir durante su uso.'),
	(123,'DISCLAIMER_3','Use at your own risk.','Use ao seu próprio risco.','Use bajo su propio riesgo.'),
	(124,'FEED','Feed','Feed','Feed'),
	(125,'TAGS','Tags','Etiquetas','Etiquetas'),
	(126,'CONFIRM_TAG_REM','Confirm tag removal?','Confirma a remoção da etiqueta?','¿Confirma remoción de la etiqueta?'),
	(127,'TAG_LINK','Link tag','Associar etiqueta','Enlazar etiqueta'),
	(128,'CODE','Code','Código','Código'),
	(129,'TAG_LINK_BY_CODE','Link by code','Associar pelo código','Enlace por código'),
	(130,'TAG_LINK_BY_SEARCH','Link by search','Associar por busca','Enlace por búsqueda'),
	(131,'TAG_LINK_BY_PACKET','Link by folder','Associar pela pasta','Enlace por carpeta'),
	(132,'TAG_NOT_FOUND','Tag not found','Etiqueta não encontrada','Etiqueta no encontrada'),
	(133,'TAG_ALL_FILTERS','All filters','Todos filtros','Todos filtros'),
	(134,'TAG_MAX_50','Max 50 tags ...','Máx 50 etiquetas','Máx 50 etiquetas'),
	(135,'PROMPT_VIDEO_ID','Please enter the video ID:','Por favor informe o ID do vídeo:','Por favor ingrese el ID del vídeo:'),
	(136,'SCHEMA','Schema','Esquema','Esquema'),
	(137,'SCHEMAS','Schemas','Esquemas','Esquemas'),
	(138,'BLOCK','Block','Bloco','Bloque'),
	(139,'BLOCKS','Blocks','Blocos','Bloques'),
	(140,'MODULE','Module','Módulo','Modulo'),
	(141,'MODULES','Modules','Módulos','Modulos'),
	(142,'UNIT','Unit','Unidade','Unidad'),
	(143,'UNITS','Units','Unidades','Unidades'),
	(144,'SEGMENT','Segment','Segmento','Segmento'),
	(145,'SEGMENTS','Segments','Segmentos','Segmentos'),
	(146,'DEVELOPER','Developer','Desenvolvedor','Desarrollador'),
	(147,'TOGGLE_ID','Toggle IDs','Alternar IDs','Alternar IDs'),
	(148,'LABEL','Label','Rótulo','Rótulo'),
	(149,'LENGTH','Length','Tamanho','Tamaño'),
	(150,'SUMMARY','Summary','Resumo','Resumen'),
	(151,'DESCRIPTION','Description','Descrição','Descripción'),
	(152,'PROMPT_MODULE_DATA','Please enter the module data:','Por favor, insira os dados do módulo:','Por favor, introduzca los datos del modulo:'),
	(153,'MODULE_CODE','Code','Código','Código'),
	(154,'MODULE_NAME','Name','Nome','Nombre'),
	(155,'MODLBL_NAME','Label','Rótulo','Rótulo'),
	(156,'MODTYP_NAME','Type','Tipo','Tipo'),
	(157,'MODULE_LENGTH','Length','Tamanho','Tamaño'),
	(158,'MODULE_SUMMARY','Summary','Resumo','Resumen'),
	(159,'MODULE_DESCRIPTION','Description','Descrição','Descripción'),
	(160,'MODULE_DATA','Module data','Dados do módulo','Datos del modulo'),
	(161,'TEMPLATE','Template','Modelo','Plantilla'),
	(162,'TEMPLATES','Templates','Modelos','Plantillas'),
	(163,'PROMPT_MODULE_CODE','Please enter the module code:','Por favor, insira o código do módulo:','Por favor, introduzca el código del modulo:'),
	(164,'CONFIRM_MODULE_DEL','Confirm module delete?','Confirma a exclusão do módulo?','¿Confirma eliminación del modulo?'),
	(165,'MODULE_NOT_EMPTY','The module cannot be deleted because it is being used.','O módulo não pode ser excluído porque ele está sendo usado.','El módulo no se puede eliminar porque se está utilizando.'),
	(167,'PROGRAMS','Programs','Cursos','Programas'),
	(168,'DELETE','Delete','Excluir','Eliminar'),
	(169,'CONFIRM_TEMPLA_DEL','Confirm template delete?','Confirma a exclusão do modelo?','¿Confirma eliminación de la plantilla?'),
	(170,'TPUNIT_NOT_EMPTY','The unit cannot be deleted because it is being used.','A unidade não pode ser excluída porque está sendo usada.','La unidad no se puede eliminar porque se está utilizando.'),
	(171,'CONFIRM_TPUNIT_DEL','Confirm unit delete?','Confirma a exclusão da unidade?','¿Confirma eliminación de la unidad?'),
	(172,'TEMPLA_NOT_EMPTY','The template cannot be deleted because it is being used.','O modelo não pode ser excluído porque está sendo usado.','La plantilla no se puede eliminar porque se está utilizando.'),
	(173,'PROMPT_TPUNIT_NAME','Please enter the unit name:','Por favor informe o nome da unidade:','Por favor ingrese el nombre de la unidad:'),
	(174,'PROMPT_UNIT_DATA','Please enter the unit data:','Por favor, insira os dados da unidade:','Por favor, introduzca los datos de la unidad:'),
	(175,'PROMPT_TEMPLA_INFO','Please enter data of this template:','Por favor informe os dados desse modelo:','Por favor ingrese los datos de esta plantilla:'),
	(176,'DATE','Date','Data','Fecha'),
	(177,'DASHBOARD','Dashboard','Painel de controle','Panel de control'),
	(178,'STRUCTURE','Structure','Estrutura','Estructura'),
	(179,'PRODUCT','Product','Produto','Producto'),
	(180,'PRODUCTS','Products','Produtos','Productos'),
	(181,'PHASE','Phase','Fase','Fase'),
	(182,'PHASES','Phases','Fases','Fases'),
	(183,'PROMPT_TPSEGM_NAME','Please enter the segment name:','Por favor informe o nome do segmento:','Por favor ingrese el nombre del segmento:'),
	(184,'PART','Part','Parte','Parte'),
	(185,'CONFIRM_PART_DEL','Confirm part delete?','Confirma a exclusão da parte?','¿Confirma eliminación de la parte?'),
	(186,'CONFIRM_TPSEGM_DEL','Confirm segment delete?','Confirma a exclusão do segmento?','Confirma a exclusão do segmento?'),
	(187,'TPSEGM_NOT_EMPTY','The segment cannot be deleted because it is being used.','O segmento não pode ser excluído porque está sendo usado.','El segmento no se puede eliminar porque se está utilizando.'),
	(188,'TPSEGM_NAME','Name','Nome','Nombre'),
	(189,'TPSEGM_DESCRIPTION','Description','Descrição','Descripción'),
	(190,'TPSEGM_LENGTH','Length','Tamanho','Tamaño'),
	(191,'TPSEGM_ORDERBY','Sequence','Sequência','Secuencia'),
	(192,'TPSEGM_ALLOW_UPLOAD','Allow upload','Permite upload','Permite upload'),
	(193,'TPSEGM_MANUAL_GRADING','Manual grading','Nota manual','Calificación manual'),
	(194,'TPSEGM_TPPHAS_ID','Phase','Fase','Fase'),
	(195,'TPSEGM_WEIGHT','Weight','Peso','Peso'),
	(196,'TPSEGM_OBJECT_ID','Object','Objeto','Objeto'),
	(197,'TPSEGM_FORUNS_ID','Forum','Fórum','Foro'),
	(198,'PROMPT_IMAGE_DATA','Please enter the image data:','Por favor, insira os dados da imagem:','Por favor, introduzca los datos de la imagen:'),
	(199,'MAX_WIDTH','Max width','Largura máxima','Ancho máximo'),
	(200,'PROMPT_VIDEO_DATA','Please enter the video data:','Por favor informe os dados do vídeo:','Por favor ingrese los datos del vídeo:'),
	(201,'VIDEO_ID','Video ID','ID do vídeo','ID del video'),
	(202,'PROFILE','Profile','Perfil','Perfil'),
	(203,'PROFILES','Profiles','Perfis','Perfiles'),
	(204,'USER','User','Usuário','Usuario'),
	(205,'PROMPT_NAME','Please enter the name:','Por favor informe o nome:','Por favor ingrese el nombre:'),
	(206,'CONFIRM_DEL','Confirm delete?','Confirma a exclusão?','¿Confirma eliminación?'),
	(207,'RECORD_NOT_EMPTY','The record cannot be deleted because it is being used.','O registro não pode ser excluído porque ele está sendo usado.','El registro no se puede eliminar porque se está utilizando.'),
	(208,'PROMPT_FOLDER_FLOW','Please enter author and reviewers of this folder:','Por favor informe autor e revisores dessa pasta:','Por favor ingrese autor y revisores de esta carpeta:'),
	(209,'INVALID_FORMAT','Invalid format.','Formato não permitido.','Ancho máximo'),
	(210,'IMG_INVALID_SIZE','The file is too large. The maximum is 1 Mb.','O arquivo é muito grande. O máximo é 1 Mb.','El archivo es demasiado grande. El máximo es de 1 Mb.'),
	(211,'IMPORT','Import','Importar','Importar'),
	(212,'CONFIRM_QUIITE_IMPORT','WARNING. This is a routine for mass importing of quiz items and should be used with caution. Confirm?','ATENÇÃO. Essa é uma rotina para importação em massa de questões objetivas e deve ser usada com cautela. Confirma?','ADVERTENCIA Esta es una rutina para importación masiva de cuestiones objetivas y debe usarse con precaución. Confirmar?'),
	(213,'MAX_IMPORT_ALLOWED','The maximum number of items allowed for import is 500.','A quantidade máxima de questões permitidas para importação é 500.','El número máximo de cuestiones permitidas para la importación es de 500.'),
	(214,'ERROR_QUIITE_IMPORT','Error importing data.','Erro ao importar dados.','Error al importar datos.'),
	(215,'THIS_FOLDER','This folder','Essa pasta','Esta carpeta'),
	(216,'OTHER_FOLDER','Another folder','Outra pasta','Otra carpeta'),
	(217,'QUESTION_ID','Question ID','ID da questão','ID de la cuestión'),
	(218,'SELECT_ITEMS','Select items','Items a selecionar','Cuestiones para seleccionar'),
	(219,'ALL_ITEMS','All items','Todos itens','Todas cuestiones'),
	(220,'SELECT_FOLDER','Select folder','Escolha a pasta','Elegir carpeta'),
	(221,'NOT_SUB_FOLDER','There are no folders in that folder','Não há pastas nessa pasta','No hay carpetas en esa carpeta'),
	(223,'VIEW_FOLDER','View folder','Ver pasta','Ver carpeta'),
	(224,'PROMPT_PHASE_NUMBER','Please enter the phase number:','Por favor digite o número da fase:','Por favor, introduzca el número de la fase:'),
	(225,'PROMPT_PHASE_WEIGHT','Please enter the phase weight:','Por favor digite o peso da fase:','Por favor, introduzca el peso de la fase:'),
	(226,'ASSESSMENT_PHASES','Assessment phases','Fases de avaliação','Fases de evaluación'),
	(228,'ASSESSMENT_PHASE','Assessment phase','Fase de avaliação','Fase de evaluación'),
	(229,'TPPHAS_NOT_EMPTY','The phase cannot be deleted because it is being used.','A fase não pode ser excluída porque está sendo usada.','La fase no se puede eliminar porque se está utilizando.'),
	(231,'OBJECT_ID','Object ID','ID do Objeto','ID del Objeto'),
	(232,'OBJECT_LINKED','Linked object','Objeto vinculado','Objeto vinculado'),
	(233,'ASSESSMENT','Assessment','Avaliação','Calificación'),
	(234,'RELATIONSHIP','Relationship','Relacionamento','Relación');
