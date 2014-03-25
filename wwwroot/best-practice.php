<?php require_once('includes/header.php'); ?>

<main class="container" role="main">
	<div class="col-md-4 well best-practice-filters">
		<h2>Share an example</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
		<form role="form" action="step-one.php">
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
			</div>
			<div class="checkbox">
				<label>
					<input type="checkbox"> I consent to my details being shared with other commissioners
				</label>
			</div>
			<button type="submit" class="btn btn-default">Submit</button>
		</form>
	</div>
	<div class="col-md-8">
		<h1>Best practice examples</h1>
		<ul class="nav nav-tabs" style="margin-bottom: 15px;">
			<li class="active"><a href="#crime" data-toggle="tab">Crime (58)</a></li>
			<li><a href="#education" data-toggle="tab">Education (12)</a></li>
			<li><a href="#employment" data-toggle="tab">Employment (3)</a></li>
			<li><a href="#fire" data-toggle="tab">Fire</a></li>
			<li><a href="#health" data-toggle="tab">Health</a></li>
			<li class="disabled"><a>My favourites</a></li>
		</ul>
	</div>
</main>