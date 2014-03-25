<?php require_once('includes/header.php'); ?>

<main role="main" class="container">	
	<div class="col-md-8">
		<h1>Register for the Local Authority Stress Index (LASI)</h1>
		<div class="well">
			<form role="form" action="step-one.php" method="get">
				<div class="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" required>
				</div>
				<div class="form-group">
					<label for="exampleNameInput">Name</label>
					<input type="text" class="form-control" id="exampleNameInput" name="name" placeholder="Enter name" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox"> Remember me on this computer
					</label>
				</div>
				<button type="submit" class="btn btn-default">Submit</button>
			</form>
		</div>
	</div>
	<div class="col-md-4">
		<h2>About LASI</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
	</div>
</main>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<script src="build/script.min.js"></script>
</body>
</html>
