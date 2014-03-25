<?php 
	$area = "westminster";
	$name = ucfirst(strtolower($_GET['name']));

	if($name == "Mark") {
		$area = "lewisham";
	} else if($name == "Gwyn") {
		$area = "blackpool";
	}
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Local Authority Stress Index (LASI)</title>
	<!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"> -->
	<link rel="stylesheet" href="build/bootstrap.min.css">
	<link rel="stylesheet" href="build/main.css">
</head>
<body>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<a href="index.php" class="navbar-brand">Local Authority Stress Index</a>
			</div>
			<div class="navbar-collapse collapse" id="navbar-main">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#" id="themes">Categories<span class="caret"></span></a>
						<ul class="dropdown-menu" aria-labelledby="themes">
							<li><a href="#">Information about outcome categories</a></li>
							<li class="divider"></li>
							<li><a href="#">Crime</a></li>
							<li><a href="#">Education and skills</a></li>
							<li><a href="#">Employment and economy</a></li>
							<li><a href="#">Fire</a></li>
							<li><a href="#">Health</a></li>
							<li><a href="#">Housing</a></li>
							<li><a href="#">Social services</a></li>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<?php if($name):?>
						<li><a href="profile.php"><?php printf("%s's profile", $name) ?><span class="glyphicon glyphicon-user btn-sm"></span></a></li>
					<?php endif; ?>
					<li><a href="unit-cost-database.php">Unit Cost Database<span class="glyphicon glyphicon-star btn-sm"></span></a></li>          	
					<li><a href="best-practice.php">Best practice knowledgebase<span class="glyphicon glyphicon-ok btn-sm"></span></a></li>
				</ul>
			</div>
		</div>
	</nav>