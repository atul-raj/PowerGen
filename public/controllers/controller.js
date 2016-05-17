var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/contactlist').success(function(response) {
   // console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";
    var myTotal = 0;  // Variable to hold your total
    var totalTurbines = 0;
    var totalActiveTurbines = 0;
    var totalInactiveTurbines = 0;
    var latestTurbineList = [];
    var inactiveTurbineList = [];
    var inEfficientTurbines = [];
    $scope.turbinelist = [];
    turbinelist = response;
    $scope.totalTurbines = turbinelist.length;
   // console.log(totalTurbines);
  /*  var date =  new Date().getTime()  - (1000*60*60);
  //  date = date.ISTDAte();
*/    for(var i = 0; i <turbinelist.length;  i++) {
   
    	if(turbinelist[i].status == 1){
    		totalActiveTurbines++;
    		 myTotal = parseInt(myTotal) + parseInt(turbinelist[i].powerGenerated);	
    		 if(parseInt(turbinelist[i].powerGenerated) < 10){
    			 inEfficientTurbines.push(turbinelist[i]); 
    		 }
    	}else{
    		inactiveTurbineList.push(turbinelist[i]);
    		totalInactiveTurbines++;
    	}
         // Iterate over your first array and then grab the second element add the values up
    }
    $scope.inactiveTurbineList = inactiveTurbineList;
    $scope.inEfficientTurbines = inEfficientTurbines;
    $scope.totalInactiveTurbines = totalInactiveTurbines;
    $scope.totalActiveTurbines = totalActiveTurbines;
    $scope.latestTurbineList = turbinelist;
    $scope.myTotal = myTotal;
 //  console.log(myTotal);
   // console.log(response);
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist').success(function(response) {
    console.log(response);
    refresh();
  });
};


/*$scope.prediction = function() {
	 //console.log("In prediction");
	  $http.get('/contactlist/predict').success(function(response) {
		  console.log("I got the data I requested in prediction");
	     $scope.totalturbinelist = response;
	     var totalTurbines1 = 0;
	     $scope.turbinelist1 = [];
	     turbinelist1 = response;
	     $scope.totalTurbines1 = turbinelist1.length;
	     
	 
	     console.log("totalTurbines==>"+totalTurbines1);
	     
	  });
	};*/

	$scope.prediction = function() {
		 //console.log("In prediction");
		
		var count = 0;
		var avgttlprdctdpower = 0;
		var  predictedOnlineTurbinesTotal = 0;
		var  predictedOfflineTurbinesTotal = 0;
		var  reportedinefficentTurbinesTotal = 0;
		 var predictedOnlineTurbines = [];
		 var predictedOfflineTurbines = [];
		 var reportedinefficentTurbines = [];
		
		for (count = 1; count <= 46 ; count++){
			 $http.get('/contactlist/predict/'+count).success(function(response) {	
				 $scope.turbinelist = [];
				 var averagePower = 0;
				 turbinelist = response;
				  var myTotal = 0;  // Variable to hold your total
				    var totalTurbines = 0;
				    var totalActiveTurbines = 0;
				    var totalInactiveTurbines = 0;
				    var turbine = turbinelist[1];
		for(var i = 0; i <turbinelist.length;  i++) {
					
				    	if(turbinelist[i].status == 1){
				    		totalActiveTurbines++;
				    		 myTotal = parseInt(myTotal) + parseInt(turbinelist[i].powerGenerated);	
				    		} 
				    }	
		
    	averagePower =  myTotal / totalActiveTurbines;
    	console.log("myTotal==>"+ myTotal+"totalActiveTurbines==>"+totalActiveTurbines+"averagePower==>"+averagePower);
    	turbine.powerGenerated = averagePower;
    	
    	 
		    if (totalActiveTurbines > 18){	//17	   
		    	avgttlprdctdpower = parseInt(avgttlprdctdpower) + parseInt(averagePower);	
		    	console.log("avgttlprdctdpower===>"+avgttlprdctdpower);
		    	predictedOnlineTurbines.push(turbine);		      	    	
		    }else{
		    	predictedOfflineTurbines.push(turbine);
		    }
		 	if (myTotal < 250){  //200
	    		reportedinefficentTurbines.push(turbine);
	    	}
       // console.log(response);
		 	
		 	 $scope.avgttlprdctdpower = avgttlprdctdpower;
		 });
		}
		
		
		
	
		    
		    $scope.predictedOnlineTurbines = predictedOnlineTurbines;
		    $scope.reportedinefficentTurbines = reportedinefficentTurbines;
		    $scope.predictedOfflineTurbines = predictedOfflineTurbines;	
		    
		
		    
		    $scope.predictedOnlineTurbinesTotal = predictedOnlineTurbines.length;
		    $scope.predictedOfflineTurbinesTotal = predictedOfflineTurbines.length;
		    $scope.reportedinefficentTurbinesTotal = reportedinefficentTurbines.length;
	     	
		};
		
/*	$scope.predictTotal = function() {
		var avgttlprdctdpower = 0;
		var predictedOnlineTurbines = [];
		sleep(6000);
		 $scope.predictedOnlineTurbines = predictedOnlineTurbines;
		for (var j = 0;j <predictedOnlineTurbines.length;  j++  ){
			console.log("inside for loop");
			avgttlprdctdpower = parseInt(avgttlprdctdpower) + parseInt(predictedOnlineTurbines[j].powerGenerated);	
		}
		 $scope.avgttlprdctdpower = avgttlprdctdpower;
		
			};*/	
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿