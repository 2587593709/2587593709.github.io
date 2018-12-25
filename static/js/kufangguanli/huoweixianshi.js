app.controller('HuoweixianshiController', function($scope, $http, $timeout, $rootScope) {
	$timeout(function() {
		$rootScope.maxCol //货位显示列	
		$rootScope.maxLevel //货位显示层
		$rootScope.maxRow //货位显示排

		$scope.list_col = [];
		for(var q = 1; q <= $rootScope.maxCol; q++) {
			$scope.list_col.push(q)
		}
		//快速排序列
		$scope.quickSort = function(arr) {　　
			if(arr.length <= 1) {
				return arr;
			}　　
			var pivotIndex = Math.floor(arr.length / 2);　　
			var pivot = arr.splice(pivotIndex, 1)[0];　　
			var left = [];　　
			var right = [];　　
			for(var k = 0; k < arr.length; k++) {　　　　
				if(arr[k].ST_COL < pivot.ST_COL) {　　　　　　
					left.push(arr[k]);　　　　
				} else {　　　　　　
					right.push(arr[k]);　　　　
				}　　
			}　　
			return $scope.quickSort(left).concat(pivot, $scope.quickSort(right));
		};

		$scope.lists = [];
		$scope.list = [];
		$scope.list_level = [];
		$scope.list_l = [];
		for(var i = 1; i <= $rootScope.maxRow; i++) {
			$http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/wh/store/getRowStoreList',
				data: {
					'st_row': i
				}
			}).then(function successCallback(response) {

				console.log(response)

				$scope.list = response.data;

				for(var h = $rootScope.maxLevel; h > 0; h--) {
					for(var j = 0; j < $scope.list.length; j++) {
						if($scope.list[j].ST_LEVEL == h) {
							$scope.list_level.push($scope.list[j])
						}
					}
					$scope.list_l.push($scope.quickSort($scope.list_level))

					$scope.list_level = [];

				}

				$scope.lists.push($scope.list_l)
				$scope.list_l = [];
				console.log($scope.lists)
				$scope.lists2 = $scope.sortarr($scope.lists) //确保排
			}, function errorCallback(response) {
				console.log(response)
			});
		}

		//冒泡排序排
		$scope.sortarr=function(arr){
			console.log(arr.length)
		    for(var i=0;i<arr.length-1;i++){
		    	
		        for(var j=0;j<arr.length-1-i;j++){
		        	
		            if(arr[j][0][0].ST_ROW>arr[j+1][0][0].ST_ROW){
		            	console.log(arr[j][0][0].ST_ROW)
		                var temp=arr[j];
		                arr[j]=arr[j+1];
		                arr[j+1]=temp;
		            }
		        }
		    }
		    return arr;
		}
		

		console.log($scope.lists2)

	}, 100)

	$scope.sty0 = {
		"background-color": "#fbe3e4"
	}
	$scope.sty1 = {
		"background-color": "#2874ce",
		'color': '#ffffff'
	}
	$scope.sty2 = {
		"background-color": "#c00000",
		'color': '#ffffff'
	}

	//点击获取列表
	$scope.hw_xx = '';
	$scope.hw_id = '';

	$scope.butt = function($event) {

		console.log($event);
		$scope.hw_xx = $event.target.id;

		$scope.currentId = $event.target.id;

		$scope.hw_id = $event.target.attributes.name.nodeValue
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/store/getLocMtrList',
			data: {
				'start': 0,
				'limit': 8,
				'locCode': $scope.hw_xx
			}
		}).then(function successCallback(response) {

			console.log(response)
			$scope.lists_right = response.data.root
			$scope.pageCount = Math.ceil(response.data.totalProperty / 8);
			console.log(response.data)

		}, function errorCallback(response) {
			console.log(response)
		});
	}
	//分页跳转
	$scope.onPageChange = function() {
		console.log($scope.hw_xx)
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/store/getLocMtrList',
			data: {
				'start': 8 * $scope.currentPage - 8,
				'limit': 8,
				'locCode': $scope.hw_xx
			},
		}).then(function successCallback(response) {
			console.log(response)
			$scope.lists_right = response.data.root

			//  console.log($scope.currentPage)
		}, function errorCallback(response) {
			console.log(response)
		})
	}
	//刷新
	$scope.ref = function() {
		$scope.lists = [];
		$scope.list = [];
		$scope.list_level = [];
		$scope.list_l = [];
		for(var i = 1; i <= $rootScope.maxRow; i++) {
			$http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/wh/store/getRowStoreList',
				data: {
					'st_row': i
				}
			}).then(function successCallback(response) {

				console.log(response)

				$scope.list = response.data;

				for(var i = $rootScope.maxLevel; i > 0; i--) {
					for(var j = 0; j < $scope.list.length; j++) {
						if($scope.list[j].ST_LEVEL == i) {
							$scope.list_level.push($scope.list[j])
						}
					}
					$scope.list_l.push($scope.quickSort($scope.list_level))

					$scope.list_level = [];

				}

				$scope.lists.push($scope.list_l)
				$scope.list_l = [];
				console.log($scope.lists)

			}, function errorCallback(response) {
				console.log(response)
			});
		}
	}
	//人工出库
	$scope.rengong_chuku = function() {
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/store/locOut',
			data: {
				'locId': $scope.hw_id
			}
		}).then(function successCallback(response) {
			console.log(response)
			if(response.data.success){
					layer.msg(response.data.data, {icon: 6});
						
			}else{
				layer.msg(response.data.data, {icon: 5});
			}
		}, function errorCallback(response) {
			console.log(response)
			layer.msg(response.data.data, {icon: 5});
		});
	}
})