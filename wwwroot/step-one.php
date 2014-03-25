<?php require_once('includes/header.php'); ?>

<main role="main" class="container">	
	<?php 

		require_once('includes/stressapi.php');
		$request = new stressAPI("yearLastWorkedNotInEmployment", $area);
		$yearLastWorkedNotInEmployment = $request->fetchData();

		$request = new stressAPI("yearLastWorkedNeverWorked", $area);
		$yearLastWorkedNeverWorked = $request->fetchData();

		$request = new stressAPI("yearLastWorkedByAge", $area);
		$yearLastWorkedByAge = $request->fetchData();

		$request = new stressapi("highestLevelOfQualification", $area);
		$highestLevelOfQualification = $request->fetchData();

		$request = new stressapi("adultsNotInEmployment", $area);
		$adultsNotInEmployment = $request->fetchData();

		$request = new stressapi("establishmentsWithPersonsSleepingRough", $area);
		$establishmentsWithPersonsSleepingRough = $request->fetchData();

	?>
	<h1><?php echo(ucfirst($area)) ?></h1>

	<script>
	var apiResponse = {};
	apiResponse.yearLastWorkedNotInEmployment = <?php printf("%s", $yearLastWorkedNotInEmployment); ?>; 
	apiResponse.yearLastWorkedNeverWorked = <?php printf("%s", $yearLastWorkedNeverWorked); ?>;  
	apiResponse.yearLastWorkedByAge = <?php printf("%s", $yearLastWorkedByAge); ?>;  
	apiResponse.highestLevelOfQualification = <?php printf("%s", $highestLevelOfQualification); ?>;  	
	apiResponse.adultsNotInEmployment = <?php printf("%s", $adultsNotInEmployment); ?>; 	
	apiResponse.establishmentsWithPersonsSleepingRough = <?php printf("%s", $establishmentsWithPersonsSleepingRough); ?>; 	
	</script>

	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th scope="col">Description</th>
				<th scope="col">Current value</th>
				<th scope="cole">Projections (%)</th>
			</tr>
		</thead>
		<tbody>
				<tr>
					<th scope="row">In the last year, number of people who reported themselves as not having worked at the time of the 2011 census</th>
					<td id="yearLastWorkedNotInEmployment" class="currentValue"></td>
					<td>
						<form action="#" class="post-values">
							<input type="number" step="1" class="6m" placeholder="2014 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNotInEmployment/%s/2014/3/", $area);?>"/>
							<input type="number" step="1" class="12m" placeholder="2014 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNotInEmployment/%s/2015/1/", $area);?>"/>
							<input type="number" step="1" class="18m" placeholder="2015 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNotInEmployment/%s/2015/3/", $area);?>"/>
							<input type="number" step="1" class="24m" placeholder="2015 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNotInEmployment/%s/2016/1/", $area);?>"/>
							<input type="submit" class="btn btn-success" value="Submit" />
						</form>
					</td>						
				</tr>
			<tr>
			<th scope="row">In the last year, number of people who reported themselves as never having
				worked at the time of the 2011 census</th>
				<td id="yearLastWorkedNeverWorked" class="currentValue"></td>
				<td>
					<form action="#" class="post-values">
						<input type="number" step="1" class="6m" placeholder="2014 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNeverWorked/%s/2014/3/", $area);?>"/>
						<input type="number" step="1" class="12m" placeholder="2014 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNeverWorked/%s/2015/1/", $area);?>"/>
						<input type="number" step="1" class="18m" placeholder="2015 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNeverWorked/%s/2015/3/", $area);?>"/>
						<input type="number" step="1" class="24m" placeholder="2015 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedNeverWorked/%s/2016/1/", $area);?>"/>
						<input type="submit" class="btn btn-success" value="Submit" />
					</form>
				</td>
			</tr>
			<tr>
			<th scope="row">In the last year, number of people who reported themselves as not in
				employment and over the age of 16 at the time of the 2011 census</th>
				<td id="yearLastWorkedByAge" class="currentValue"></td>
				<td>
					<form action="#" class="post-values">
						<input type="number" step="1" class="6m" placeholder="2014 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedByAge/%s/2014/3/", $area);?>"/>
						<input type="number" step="1" class="12m" placeholder="2014 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedByAge/%s/2015/1/", $area);?>"/>
						<input type="number" step="1" class="18m" placeholder="2015 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedByAge/%s/2015/3/", $area);?>"/>
						<input type="number" step="1" class="24m" placeholder="2015 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/yearLastWorkedByAge/%s/2016/1/", $area);?>"/>
						<input type="submit" class="btn btn-success" value="Submit" />
					</form>
				</td>
			</tr>

			<tr><th scope="row">In the last year, number of people who left education without any
				qualifications at the time of the 2011 census</th>
				<td id="highestLevelOfQualification" class="currentValue"></td>
				<td>
					<form action="#" class="post-values">
						<input type="number" step="1" class="6m" placeholder="2014 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/highestLevelOfQualification/%s/2014/3/", $area);?>"/>
						<input type="number" step="1" class="12m" placeholder="2014 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/highestLevelOfQualification/%s/2015/1/", $area);?>"/>
						<input type="number" step="1" class="18m" placeholder="2015 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/highestLevelOfQualification/%s/2015/3/", $area);?>"/>
						<input type="number" step="1" class="24m" placeholder="2015 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/highestLevelOfQualification/%s/2016/1/", $area);?>"/>
						<input type="submit" class="btn btn-success" value="Submit" />
					</form>
				</td>
			</tr>
			<tr><th scope="row">In the last year, number of adults who reported themselves as not in
				employment at the time of the 2011 census</th>
				<td id="adultsNotInEmployment" class="currentValue"></td>
				<td>
					<form action="#" class="post-values">
						<input type="number" step="1" class="6m" placeholder="2014 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/adultsNotInEmployment/%s/2014/3/", $area);?>"/>
						<input type="number" step="1" class="12m" placeholder="2014 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/adultsNotInEmployment/%s/2015/1/", $area);?>"/>
						<input type="number" step="1" class="18m" placeholder="2015 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/adultsNotInEmployment/%s/2015/3/", $area);?>"/>
						<input type="number" step="1" class="24m" placeholder="2015 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/adultsNotInEmployment/%s/2016/1/", $area);?>"/>
						<input type="submit" class="btn btn-success" value="Submit" />
					</form>
				</td>
			</tr>
			<tr><th scope="row">In the last year, number of people identified as sleeping rough at the time of the 2011 census</th>
				<td id="establishmentsWithPersonsSleepingRough" class="currentValue"></td>
				<td>
					<form action="#" class="post-values">
						<input type="number" step="1" class="6m" placeholder="2014 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/establishmentsWithPersonsSleepingRough/%s/2014/3/", $area);?>"/>
						<input type="number" step="1" class="12m" placeholder="2014 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/establishmentsWithPersonsSleepingRough/%s/2015/1/", $area);?>"/>
						<input type="number" step="1" class="18m" placeholder="2015 Q2" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/establishmentsWithPersonsSleepingRough/%s/2015/3/", $area);?>"/>
						<input type="number" step="1" class="24m" placeholder="2015 Q4" data-post-location="<?php printf("http://172.16.39.33:8080/setParameter/establishmentsWithPersonsSleepingRough/%s/2016/1/", $area);?>"/>
						<input type="submit" class="btn btn-success" value="Submit" />
					</form>
				</td>
			</tr>

				</tbody>
			</table>

		</main>
		<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.js"></script>
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
		<script src="build/script.min.js"></script>
		<script>
			$('.post-values').on('submit', function(e){
				e.preventDefault();
				var currentValue = $(this).parent().parent().find('.currentValue').text();
				$(this).find('input[type=number]').each(function(){
					var expectation = parseInt(currentValue * ((100 + parseInt($(this).val())) / 100));
					if(expectation) {
						var requestString = $(this).data('postLocation') + expectation;
						console.log(requestString);
						// Make request
					}
				});

			});
		</script>
	</body>
	</html>