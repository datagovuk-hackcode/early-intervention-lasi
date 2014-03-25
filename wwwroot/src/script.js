$(function(){
	$('#yearLastWorkedNotInEmployment').text(apiResponse.yearLastWorkedNotInEmployment.result); 
	$('#yearLastWorkedNeverWorked').text(apiResponse.yearLastWorkedNeverWorked.result);
	$('#yearLastWorkedByAge').text(apiResponse.yearLastWorkedByAge.result);
	$('#highestLevelOfQualification').text(apiResponse.highestLevelOfQualification.result);
	$('#adultsNotInEmployment').text(apiResponse.adultsNotInEmployment.result);
	$('#establishmentsWithPersonsSleepingRough').text(apiResponse.establishmentsWithPersonsSleepingRough.result);
});

