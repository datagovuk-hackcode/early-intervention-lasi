<?php require_once('includes/header.php'); ?>

	<main role="main" class="container">	
		<h1>Lorem ipsum</h1>
		<ul class="nav nav-tabs" style="margin-bottom: 15px;">
			<li class="active"><a href="#crime" data-toggle="tab">Crime</a></li>
			<li><a href="#education" data-toggle="tab">Education and skills</a></li>
			<li><a href="#employment" data-toggle="tab">Employment and Economy</a></li>
			<li><a href="#fire" data-toggle="tab">Fire</a></li>
			<li><a href="#health" data-toggle="tab">Health</a></li>
			<li><a href="#housing" data-toggle="tab">Housing</a></li>
			<li><a href="#social" data-toggle="tab">Social services</a></li>
			<li class="disabled"><a>My categories</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade active in" id="crime">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
				<table class="table table-striped table-hover ">
					<thead>
						<tr>
							<th>Cost code</th>
							<th>Outcome detail</th>
							<th>Cost / saving detail</th>
							<th>Cost bearing agency</th>
							<th>Unit</th>
							<th>Estimated saving</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>CR1.0</td>
							<td><a href="asb.php">Anti-social behaviour</a></td>
							<td>Anti-social behaviour further action necessary (cost of dealing with incident)</td>
							<td>Police</td>
							<td>Per incident</td>
							<td class="danger">£500</td>
						</tr>
						<tr>
							<td>CR7.0</td>
							<td>Proceedings</td>
							<td>Homicide (average total cost)</td>
							<td>Multiple</td>
							<td>Per incident</td>
							<td class="success">£174,363</td>
						</tr>
						<tr>
							<td>CR6.0</td>
							<td>Proceedings</td>
							<td>Criminal proceedings: Arrest - detailed</td>
							<td>Police</td>
							<td>Each</td>
							<td class="danger">£593</td>
						</tr>
						<tr>
							<td>CR6.1</td>
							<td>Proceedings</td>
							<td>Criminal proceedings: Arrest - with no further action (simple caution)</td>
							<td>Police</td>
							<td>Each</td>
							<td class="warning">£285</td>
						</tr>
						<tr>
							<td>CR7.1</td>
							<td>Proceedings</td>
							<td>Serious Wounding (average total cost)</td>
							<td>Multiple</td>
							<td>Per incident</td>
							<td class="success">£18,608</td>
						</tr>
						<tr>
							<td>CR7.5</td>
							<td>Proceedings</td>
							<td>Robbery (average total cost)</td>
							<td>Multiple</td>
							<td>Per incident</td>
							<td class="success">£3,604</td>
						</tr>
					</tbody>
				</table>
				<p>Filter unit costs by agency</p>
				<ul class="nav nav-pills">
					<li class="active"><a href="#">Police</a></li>
					<li><a href="#">Young Offenders Institution</a></li>
					<li class="active"><a href="#">Court</a></li>
					<li><a href="#">Prison</a></li>
					<li class="disabled"><a href="#">HM Treasury</a></li>
				</ul>
			</div>
			<div class="tab-pane fade" id="education">
				<p>Edu</p>
			</div>
			<div class="tab-pane fade" id="employment">
				<p>Emp</p>
			</div>
			<div class="tab-pane fade" id="fire">
				<p>Fire</p>
			</div>
			<div class="tab-pane fade" id="health">
				<p>Health</p>
			</div>
			<div class="tab-pane fade" id="housing">
				<p>Housing</p>
			</div>
			<div class="tab-pane fade" id="social">
				<p>Social services</p>
			</div>
		</div>
	</main>
	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.js"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	<script src="build/script.min.js"></script>
</body>
</html>
