<?php

//	API METHODS 
// 	'yearLastWorkedNotInEmployment',
// 	'yearLastWorkedNeverWorked',
// 	'yearLastWorkedByAge',
// 	'highestLevelOfQualification',
// 	'adultsNotInEmployment',
// 	'establishmentsWithPersonsSleepingRough'

class stressAPI {
	private $urlAndPort = 'http://172.16.39.33:8080/';
	private $apiName = 'getParameter/';
	private $callURL;
	private $response;
	private $locality;  

	public function fetchData() {
		$this->response = file_get_contents($this->callURL);
		// echo $this->callURL; echo "<br/>"; // Use for debugging
		return $this->response;
	}

	function __construct($apiMethod, $locality){ // Constructor
		$this->callURL = $this->urlAndPort . $this->apiName . $apiMethod . '/' . $locality;
	}
}

?>