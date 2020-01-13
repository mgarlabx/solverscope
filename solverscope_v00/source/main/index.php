<?php
/* ┌────────────────────────────────────────┐ 
   │ Solverscope                            │ 
   │ Copyright © 2020 Maurício Garcia       │ 
   │ SOLVERTANK                             │ 
   └───────────────────────────────────--───┘ 
*/


/* MAIN/INDEX.PHP */

if ( !isset( $_GET['tk'] ) ) {
	echo 'Error...';
	die();
}
$ntk = $_GET['tk'];

include( '../svc_settings.php' );
include( 'app/app_cryp.php' );
include( 'app/app_functions.php' );

$appurl = $base_url . 'main/app/';

?>

<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="description" content="Digital Education" />
    <meta name="author" content="Solvertank" />
    <title>Solverscope</title>
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="../fonts/material-design-icons/material-icon.css" rel="stylesheet" type="text/css" />
	<link href="../assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<link href="../assets/plugins/summernote/summernote.css" rel="stylesheet">
	<link rel="stylesheet" href="../assets/plugins/material/material.min.css">
	<link rel="stylesheet" href="../assets/css/material_style.css">
	<link href="../assets/css/pages/animate_page.css" rel="stylesheet">
    <link href="../assets/css/pages/inbox.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/plugins.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/responsive.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/theme-color.css" rel="stylesheet" type="text/css" />
	<link href="../assets/css/pages/formlayout.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="../assets/img/favicon.ico" /> 
	
    <script src="../assets/plugins/jquery/jquery.min.js" ></script>

	<script>var tk='<?=$ntk?>'</script>

    <script src="js/solverscope.js?<?php echo time(); ?>" ></script>

    <script src="js/solverscope_home.js?<?php echo time(); ?>" ></script>

    <script src="js/solverscope_rep.js?<?php echo time(); ?>" ></script>
    <script src="js/solverscope_repw.js?<?php echo time(); ?>" ></script>
    <script src="js/solverscope_repw_editor.js?<?php echo time(); ?>" ></script>

    <script src="js/solverscope_sysw.js?<?php echo time(); ?>" ></script>

    <link href="solverscope.css?<?php echo time(); ?>" rel="stylesheet" type="text/css" />
	

	
 </head>

 
<body class="page-header-fixed sidemenu-closed-hidelogo page-content-white page-md header-white dark-sidebar-color logo-dark" style="background-color:#222C3C">

    <div class="page-wrapper">
		
		
        <div class="page-header navbar navbar-fixed-top">
			
            <div class="page-header-inner ">
				
                <div class="page-logo">
                    <img alt="" src="../assets/img/logo.png">
                    <span class="logo-default" style="color:white;font-size:140%;">&nbsp;&nbsp;Solverscope</span>
                </div>
				
				<ul class="nav navbar-nav navbar-left in">
					<li><a href="#" class="menu-toggler sidebar-toggler"><i class="icon-menu"></i></a></li>
				</ul>

                <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                    <span></span>
                </a>

                <div class="top-menu">
                    <ul class="nav navbar-nav pull-right">
 						<li class="dropdown dropdown-user">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <span class="username username-hide-on-mobile" id="svc-domain-name"></span>
								<i class="fa fa-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-default " id="svc-domain-menu"></ul>
                        </li>
                    </ul>
                </div>
				
            </div>
			
        </div>
		
	    
        <div class="page-container">
 			<div class="sidebar-container">
 				<div class="sidemenu-container navbar-collapse collapse fixed-menu">
	                <div id="remove-scroll">
	                    <ul class="sidemenu  page-header-fixed" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px" id="svc-side-bar"></ul>
	                </div>
                </div>
            </div>
            <div class="page-content-wrapper">
                <div class="page-content">
                	
                    <div class="page-bar">
                        <div class="page-title-breadcrumb">
                            <div class=" pull-left">
                                <div class="page-title" id="main-title"></div>
								<div id="svc-master-info"></div>
                            </div>
                        </div>
                    </div>
					
					
 	                <div class="row" id="svc-main-content-0"></div>
						
						
 	                <div class="row svc-main-content" id="svc-main-content-1">
						<div class="svc-main-content-close" onclick="main_display( 0 )"><button class="btn btn-danger btn-xs" > X </button></div>
						<div class="svc-main-content-header" id="svc-main-content-header-1"></div><p>
						<div class="svc-main-content-body" id="svc-main-content-body-1"></div>
					</div>

 	                <div class="row svc-main-content" id="svc-main-content-2">
						<div class="svc-main-content-close" onclick="main_display( 1 )"><button class="btn btn-danger btn-xs" > X </button></div>
						<div class="svc-main-content-header" id="svc-main-content-header-2"></div><p>
						<div class="svc-main-content-body" id="svc-main-content-body-2"></div>
					</div>
					
                </div>
            </div>
        </div>
		

        <div class="page-footer">
            <div class="page-footer-inner"> 2020 &copy;
            <a href="http://www.solvertank.com" target="_blank" class="makerCss">Solvertank</a>
            </div>
            <div class="scroll-to-top"><i class="icon-arrow-up"></i></div>
        </div>

    </div>
	
	
	<!-- Modal Tags -->
	<div class="modal fade" id="svc-tag-modal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title" id="svc-tag-modal-header"></h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body" id="svc-tag-modal-body">
	      </div>
	      <div class="modal-footer" id="svc-tag-modal-button">
	      </div>
	    </div>
	  </div>
	</div>
	
	

	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title" id="myModalTitle"></h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body" id="myModalBody">
	      </div>
	      <div class="modal-footer" id="myModalButton">
	      </div>
	    </div>
	  </div>
	</div>
	
	
	<!-- Modal Editor -->
	<div class="modal fade" id="svc-editor-modal" tabindex="-1" role="dialog" aria-labelledby="svc-editor-modal" aria-hidden="true">
	  <div id="svc-editor-id"></div>
	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header" id="svc-editor-modal-header">
	        <h2 class="modal-title" id="svc-editor-modal-title"><?=svc_translate( 'TEXT_EDITOR' );?></h2>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
			<div id="svc-editor-colors">
				<button class="svc-editor-color" style="background-color:white" onclick="svc_editor_color('no')">X</button><br>
				<button class="svc-editor-color" style="background-color:red" onclick="svc_editor_color('red')">&nbsp;</button><br>
			 	<button class="svc-editor-color" style="background-color:green" onclick="svc_editor_color('green')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:blue" onclick="svc_editor_color('blue')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:cyan" onclick="svc_editor_color('cyan')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:purple" onclick="svc_editor_color('purple')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:yellow" onclick="svc_editor_color('yellow')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:grey" onclick="svc_editor_color('grey')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:black" onclick="svc_editor_color('black')">&nbsp;</button><br>
				<button class="svc-editor-color" style="background-color:white" onclick="svc_editor_color('white')">&nbsp;</button><br>
			</div>
			<div id="svc-editor-symbols"></div>
			<div>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'BOLD' );?>" onclick="svc_editor_format('bold')"><i class="fa fa-bold"></i></button>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'ITALIC' );?>" onclick="svc_editor_format('italic');"><i class="fa fa-italic"></i></button>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'UNDERLINED' );?>" onclick="svc_editor_format('underline');"><i class="fa fa-underline"></i></button>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'SUPERSCRIPT' );?>" onclick="svc_editor_format('superscript');"><i class="fa fa-superscript"></i></button>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'SUBSCRIPT' );?>" onclick="svc_editor_format('subscript');"><i class="fa fa-subscript"></i></button>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'COLORS' );?>" onclick="svc_editor_format('colors');" id="svc-editor-button-colors"><span style="color:yellow">I</span><span style="color:blue">I</span><span style="color:red">I</span></button>
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'SYMBOLS' );?>" onclick="svc_editor_format('symbols');" id="svc-editor-button-symbols">&#937;</button>&nbsp;&nbsp;&nbsp;
				<button class="btn btn-circle btn-default svc-editor-button" title="<?=svc_translate( 'CLEAR_FORMAT' );?>" onclick="svc_editor_format('removeFormat');"><i class="fa fa-eraser"></i></button>
			</div>
			<div id="svc-editor-text" contenteditable="true" tabindex="-1"></div>
	      </div>
	      <div class="modal-footer">
		  <div id="svc-editor-orderby-label"><?=svc_translate( 'ORDER_BY' );?></div>
		  <input id="svc-editor-orderby-value">
		  <div id="svc-editor-style-label"><?=svc_translate( 'STYLE' );?></div>
		  <select id="svc-editor-style-value">
			<option value="paragraph"><?=svc_translate( 'PARAGRAPH' );?></option>
			<option value="heading-1"><?=svc_translate( 'HEADER' );?> 1</option>
			<option value="heading-2"><?=svc_translate( 'HEADER' );?> 2</option>
			<option value="footnote"><?=svc_translate( 'FOOTNOTE' );?></option>
		  </select>  
	      	<div class="inline-block" id="svc-editor-modal-button"></div>
		  </div>
	    </div>
	  </div>
	</div>

	
    <script src="../assets/plugins/popper/popper.min.js" ></script>
    <script src="../assets/plugins/jquery-blockui/jquery.blockui.min.js" ></script>
	<script src="../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="../assets/plugins/bootstrap/js/bootstrap.min.js" ></script>
    <script src="../assets/plugins/sparkline/jquery.sparkline.min.js" ></script>
	<script src="../assets/js/pages/sparkline/sparkline-data.js" ></script>
	<script src="../assets/js/app.js" ></script>
    <script src="../assets/js/layout.js" ></script>
    <script src="../assets/js/theme-color.js" ></script>
    <script src="../assets/plugins/material/material.min.js"></script>
    <script src="../assets/js/pages/ui/animations.js" ></script>
    <script src="../assets/plugins/chart-js/Chart.bundle.js" ></script>
    <script src="../assets/plugins/chart-js/utils.js" ></script>
    <script src="../assets/js/pages/chart/chartjs/home-data.js" ></script>
    <script src="../assets/plugins/summernote/summernote.min.js" ></script>
    <script src="../assets/js/pages/summernote/summernote-data.js" ></script>
	
	
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>
	

  </body>
</html>