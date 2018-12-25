//核心js文件
app.controller('HomeController_main', function ($scope,$http,$timeout,$rootScope) {	
	//设置
	$scope.shezhi=function(options){
		
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/sys/configData/getConfigDataByKeys',
			data:{
				'dataKeys':'OUTWAY,ISMANUE,ws_username,ws_password'
			},			
			}).then(function successCallback(response){
				console.log(response)
				$scope.shezhi_data=angular.fromJson(response.data.data)
				console.log($scope.shezhi_data)
				for(var i=0;i<$scope.shezhi_data.length;i++){
					if($scope.shezhi_data[i].DATA_KEY=="ws_username"){
						$scope.yingxiao_zhanghao=$scope.shezhi_data[i].DATA_VALUE;
					}
					if($scope.shezhi_data[i].DATA_KEY=="ws_password"){
						$scope.yingxiao_mima=$scope.shezhi_data[i].DATA_VALUE;
					}
					if($scope.shezhi_data[i].DATA_KEY=="ISMANUE"){
						$scope.suo=$scope.shezhi_data[i].DATA_VALUE;
					}

				}
				
			},function errorCallback(response) {
				
				console.log(response)
			})

		$('#shezhi').modal(options)
	}
	//设置保存
	$scope.shezhi_save=function(options){
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/sys/configData/setUp',
			data:{
				'ISMANUE':$scope.suo,
				'ws_username':$scope.yingxiao_zhanghao,
				'ws_password':$scope.yingxiao_mima
			},			
			}).then(function successCallback(response){
				console.log(response)
				//alert()
			},function errorCallback(response) {
				
				console.log(response)
			})

	}
	
	//修改密码
	$scope.xiugaimima=function(options){
//		alert(1)
		$('#xiugaimima').modal(options)
	}
	//密码保存
	$scope.mima_save=function(){
		if($scope.mima1==''||$scope.mima2==''||$scope.mima3==''){
			alert('不能为空')
			$scope.red='red'
			return
		}
		if($scope.mima2==$scope.mima3){
			$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/sys/user/modifyKey',
			data:{
				'form_oldpassword':$scope.mima1,
				'form_newpassword':$scope.mima2,
				'form_repassword':$scope.mima3
			},			
			}).then(function successCallback(response){
				//console.log(response)
				alert(response.data.data)
				$('#xiugaimima').modal('hide')//隐藏模态框		  
			},function errorCallback(response) {
				alert(response.data.data)
				//console.log(response)
			})
		}else{
			alert('两次密码输入不一致')
		}
		
	}
	//密码重置
	$scope.mima_rest=function(){
			$scope.mima1='';
			$scope.mima2='';
			$scope.mima3='';
	}
	
	
	$rootScope.jsonValue_s=[];
	
	$http({
    method: 'GET',
  //  withCredentials: true,
    url: HTTP+'jf/sys/user/getUserAndMenus'
	}).then(function successCallback(response) {	
	        console.log(response);	        
	        $scope.data=response.data;
	       // console.log($scope.data);
	        $scope.user=$scope.data.user.NAME; //用户
	        $scope.menu=$scope.data.menu;  //菜单	
	        $scope.btns=$scope.data.btns;  //按钮	
	        
	        $rootScope.btns=$scope.data.btns;  //全局按钮	
	        $rootScope.maxCol=$scope.data.maxCol;  //货位显示列	
	        $rootScope.maxLevel=$scope.data.maxLevel;  //货位显示层
	        $rootScope.maxRow=$scope.data.maxRow;  //货位显示排
	        
	        $rootScope.jsonValue=$scope.data.jsonValue//静态数据
			for(var i=0;i<$rootScope.jsonValue.length;i++){
				$rootScope.jsonValue_s.push(angular.fromJson($rootScope.jsonValue[i]))
			}
	       	 console.log($rootScope.jsonValue_s)    
			var tb = [];
			var narr = [];//遍历菜单
			for (var i = 0; i < $scope.menu.length; i++) {
			    var n = tb.indexOf($scope.menu[i].FATHERMENU_NAME);
			    if (n==-1) {
			        tb.push($scope.menu[i].FATHERMENU_NAME);
			        narr.push({HREF : [$scope.menu[i].HREF.replace('?','').replace('=','')], CHILDMENU_NAME : [$scope.menu[i].CHILDMENU_NAME] , FATHERMENU_NAME : $scope.menu[i].FATHERMENU_NAME,FATHERMENU_ID : $scope.menu[i].FATHERMENU_ID});
			    } else {
			        narr[n].CHILDMENU_NAME.push($scope.menu[i].CHILDMENU_NAME);
			        narr[n].HREF.push($scope.menu[i].HREF.replace('?','').replace('=',''));
			    }
			}
			$scope.narr=narr;		
			console.log(narr)
			//console.log(tb)			
//			var tb2 = [];
//			var narr2 = [];  //遍历按钮
//			for (var i = 0; i < $scope.btns.length; i++) {
//			    var n = tb2.indexOf($scope.btns[i].HREF);
//			    if (n==-1) {
//			        tb2.push($scope.btns[i].HREF);
//			        narr2.push({HREF : [$scope.btns[i].HREF], BTN_NAME : [$scope.btns[i].BTN_NAME] , BTN_FUN_LINK :[$scope.btns[i].BTN_FUN_LINK] });
//			    } else {
//			        narr2[n].BTN_NAME.push($scope.btns[i].BTN_NAME);
//			        narr2[n].BTN_FUN_LINK.push($scope.btns[i].BTN_FUN_LINK);
//			    }
//			}
//			$scope.narr2=narr2;	
			
	    }, function errorCallback(response) {
	        console.log('error'+response)
	});
	
	
	
	
	
	

})
//数组便利玩再执行
app.directive('metis', function ($timeout) {
    return function ($scope, $element, $attrs) {
        if ($scope.$last == true) {
            $timeout(function () {
                $('#side-menu').metisMenu();
            }, 250)
        }
    };
});
//状态过滤器-任务
app.filter('status', function() { //可以注入依赖
    return function(text) {
    	if(text==0){
    		text='未执行'
    	}
    	if(text==1){
    		text='执行中'
    	}
    	if(text==2){
    		text='完成'
    	}
        return text
    }
});

//状态过滤器-作业
app.filter('status2', function() { //可以注入依赖
    return function(text) {
    	if(text==0){
    		text='未执行'
    	}
    	if(text==1){
    		text='等待执行'
    	}
    	if(text==2){
    		text='执行中'
    	}
    	if(text==5){
    		text='完成'
    	}
        return text
    }
});
//状态过滤器-日志
app.filter('status3', function() { //可以注入依赖
    return function(text) {
    	if(text==0){
    		text='失败'
    	}
    	if(text==1){
    		text='成功'
    	}
    	
        return text
    }
});
//状态过滤器-库房-运行
app.filter('status_run', function() { //可以注入依赖
    return function(text) {
    	switch(text){
          case 'E':
                text='待用';
                break;
          case 'S':
                text='选中';
                break;
          case 'R':
                text='运行';
                break;
          case 'D':
               text='禁用';
                break;     
          default :
            console.log(text);
                break;
        }       
    	
        return text
    }
});
//状态过滤器-库房-存储
app.filter('status_Store', function() { //可以注入依赖
    return function(text) {
    	switch(text){
          case '0':
                text='空货位';
                break;
          case '1':
                text='有货位';
                break;
          case '2':
                text='异常货位';
                break;
          
          default :
            console.log(text);
                break;
        }       
    	
        return text
    }
});
//状态过滤器-库房-类型
app.filter('status_Loc', function() { //可以注入依赖
    return function(text) {
    	switch(text){
          case '0':
                text='储位';
                break;
          case '1':
                text='站台';
                break;
          case '2':
                text='倒货';
                break;
          case '3':
                text='人工货位';
                break;
          default :
            console.log(text);
                break;
        }       
    	
        return text
    }
});
//状态过滤器-库房-物料
app.filter('status_Rack', function() { //可以注入依赖
    return function(text) {
    	switch(text){
          case '0':
                text='正常货位';
                break;
          case '1':
                text='一月预警';
                break;
          case '2':
                text='二月预警';
                break;
          case '3':
                text='超期货位';
                break;
          default :
            console.log(text);
                break;
        }       
    	
        return text
    }
});

