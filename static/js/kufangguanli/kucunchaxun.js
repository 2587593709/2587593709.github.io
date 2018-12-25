
app.controller('kucunchaxunController', function($scope, $http, $timeout,$rootScope,$window) {
//	$http({
//		method: 'GET',
//		//  withCredentials: true,
//		url: HTTP + 'ShowReport.wx?PAGEID=StoreQuery',
//		data:{
//				'PAGEID':'StoreQuery'	
//			}
//		}).then(function successCallback(response){
//			
//			console.log(response)			
//									
//		},function errorCallback(response) {
//			console.log(response)
//		});
	$scope.changeFrameHeight=function(){
		 var ifm= document.getElementById("iframepage"); 
	    ifm.height=document.documentElement.clientHeight-160 || document.body.clientHeight-160;
	}
	$scope.changeFrameHeight()
	$window.onresize=function(){  
	     $scope.changeFrameHeight();  
	} 
})



	


