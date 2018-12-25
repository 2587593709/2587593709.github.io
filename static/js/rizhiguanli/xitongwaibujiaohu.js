app.controller('XitongwaibujiaohuController', function($scope, $http, $timeout,$rootScope) {	
	$timeout(function(){
		//遍历按钮选出该页按钮
		var narr2 = [];  //遍历按钮
		for (var i = 0; i < $scope.btns.length; i++) {
			if($scope.btns[i].HREF=='log.wmsServiceLog.wmsServiceLogList'){
				narr2.push($scope.btns[i])
			}
		}
		$scope.narr2=narr2;
		for(var j=0;j<$rootScope.jsonValue_s.length;j++){
			if($rootScope.jsonValue_s[j].key=='WebServiceStatus'){
				$scope.WebServiceStatus=$rootScope.jsonValue_s[j].values;
			}
			
		}
	},300)
	
	
		//按钮函数	
	$scope.do = function(id){

        switch(id){
          case 'add':
                $scope.add();
                break;
          case 'edit':
                $scope.edit();
                break;
          case 'delete':
                $scope.delet();
                break;
          case 'view':
                $scope.view();
                break;
          default :
            console.log(id);
                break;
        }        
   };	
	//日期时间组件
	laydate.render({
	  elem: '#riqi',
	  format: 'yyyyMMdd',
	  done: function(value, date, endDate){		   
		    $scope.riqi=value;		    
	    }
	});
	
	
	$scope.fuwu_name='';
	$scope.riqi='';
	$scope.rucan='';
	$scope.chucan='';
	$scope.fasong='';
	$scope.jieshou='';
	
	//重置
	$scope.submitcl=function(){
		$scope.fuwu_name='';
		$scope.riqi='';
		$scope.rucan='';
		$scope.chucan='';
		$scope.fasong='';
		$scope.jieshou='';
	}
	//刷新表格
	$scope.ref = function(){		
		//加载层-默认风格
		layer.load();
		$scope.submitcl();
		$scope.idList=[];
		$scope.idList2=[];
		$scope.idList3=[];
		$scope.idList4=[];
		$scope.currentPage=1;
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/log/wmsServiceLog/getWmsServiceLog',
			data:{
				'start':0,
				'limit':8,
				's_like_service_name':'',
				's_like_day':'',
				's_like_in_param':'',
				's_like_out_param':'',
				's_like_msg_from':'',
				's_like_msg_to':''
			},		
		}).then(function successCallback(response){
			layer.closeAll('loading');
			//console.log(response)
			$scope.lists=response.data	
			$scope.pageCount = Math.ceil(response.data.totalProperty/8);
		  //console.log($scope.pageCount)
		},function errorCallback(response) {
			console.log(response)
		})
	};
	//提交查询
	$scope.submitf = function(){
		$scope.idList=[];
		$scope.idList2=[];
		$scope.idList3=[];
		$scope.idList4=[];
		//加载层-默认风格
		layer.load();
			
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/log/wmsServiceLog/getWmsServiceLog',
			data:{
				'start':0,
				'limit':8,
				's_like_service_name':$scope.fuwu_name,
				's_like_day':$scope.riqi,
				's_like_in_param':$scope.rucan,
				's_like_out_param':$scope.chucan,
				's_like_msg_from':$scope.fasong,
				's_like_msg_to':$scope.jieshou
			},
			
		}).then(function successCallback(response){
			layer.closeAll('loading');
			console.log(response)
			$scope.lists=response.data	
			$scope.pageCount = Math.ceil(response.data.totalProperty/8);//页数
		  console.log($scope.pageCount)
		},function errorCallback(response) {
			layer.closeAll('loading');
			console.log(response)
		})
	};
	//初始化，设置为第一页，每页显示4条
	$scope.submitf();
	//分页跳转
	$scope.onPageChange=function(){
		$scope.all=false;
		$scope.idList=[];
		$scope.idList2=[];
		$scope.idList3=[];
		$scope.idList4=[];
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/log/wmsServiceLog/getWmsServiceLog',
			data:{
				'start':8*$scope.currentPage-8,
				'limit':8,
				's_like_service_name':$scope.fuwu_name,
				's_like_day':$scope.riqi,
				's_like_in_param':$scope.rucan,
				's_like_out_param':$scope.chucan,
				's_like_msg_from':$scope.fasong,
				's_like_msg_to':$scope.jieshou
			},
		}).then(function successCallback(response){
			console.log(response)
			$scope.lists=response.data	
			
		//  console.log($scope.currentPage)
		},function errorCallback(response) {
			console.log(response)
		})
	}
	
	
	//复选框
	$scope.idList=[];
	$scope.idList2=[];
	$scope.idList3=[];
	$scope.idList4=[];
	//单机选
	$scope.idlist=function($event){
		console.log($event)						
		var idy = $scope.idList3.indexOf(parseInt($event.target.attributes.value.nodeValue)); //为了修改功能
		 if (idy> -1) {
		 	$scope.idList3.splice(idy, 1);
		 }	else{
		 	$scope.idList3.push(parseInt($event.target.attributes.value.nodeValue))
		 }
		console.log($scope.idList3)
		var idx = $scope.idList.indexOf(parseInt($event.target.attributes.name.nodeValue));
		 if (idx> -1) {
		 	$scope.idList.splice(idx, 1);
		 }	else{
		 	$scope.idList.push(parseInt($event.target.attributes.name.nodeValue))//为了删除功能
		 }	
		console.log($scope.idList)
	}
	//全选
	$scope.alllist=function($event){
		console.log($event)	
		if($scope.all){
			for(var i=0;i<$scope.lists.root.length;i++){
				$scope.idList2.push($scope.lists.root[i].ID)
			}	
			$scope.idList=$scope.idList2;
			for(var i=0;i<$scope.lists.root.length;i++){
				$scope.idList4.push(i)
			}	
			$scope.idList3=$scope.idList4;
		}else{
			$scope.idList=[];
			$scope.idList2=[];
			$scope.idList3=[];
			$scope.idList4=[];
		}
		console.log($scope.idList3)	
		console.log($scope.idList)
	}
		//查看
		$scope.view = function(options){
		$scope.red='';
		if($scope.idList3.length==1){
			$scope.m1=$scope.lists.root[$scope.idList3[0]].SERVICE_NAME;
			$scope.m2=$scope.lists.root[$scope.idList3[0]].MONTH;
			$scope.m3=$scope.lists.root[$scope.idList3[0]].DAY;
			$scope.m4=$scope.lists.root[$scope.idList3[0]].ST_TIME;
			$scope.m5=$scope.lists.root[$scope.idList3[0]].END_TIME;
			$scope.m6=$scope.lists.root[$scope.idList3[0]].IN_PARAM;
			$scope.m7=$scope.lists.root[$scope.idList3[0]].OUT_PARAM;
			$scope.m8=$scope.lists.root[$scope.idList3[0]].STATUS;
			$scope.m9=$scope.lists.root[$scope.idList3[0]].MSG_FROM;
			$scope.m10=$scope.lists.root[$scope.idList3[0]].MSG_TO;
			$scope.formId=$scope.idList[0];
			$('#chakan').modal(options);			
		}else{
			layer.msg('请选择一条记录', {icon: 5});
		}		
	};
	//添加
//	$scope.add = function(options) {
//		
//    	
//		$scope.red='';
//			$scope.m1='';
//			$scope.m2='';
//			$scope.m3='';
//			$scope.m4='';
//			$scope.m5='';
//			$scope.m6='';	
//			$scope.formId='';
//		$('#chakan').modal(options)
//	};
//	//修改
//	$scope.edit = function(options){
//		$scope.red='';
//		if($scope.idList3.length==1){
//			$scope.m1=$scope.lists.root[$scope.idList3[0]].BTN_NAME;
//			$scope.m2=$scope.lists.root[$scope.idList3[0]].BTN_FUN_LINK;
//			$scope.m3=$scope.lists.root[$scope.idList3[0]].BTN_IMG_LINK;
//			$scope.m4=$scope.lists.root[$scope.idList3[0]].BTN_ORDER;
//			$scope.m5=$scope.lists.root[$scope.idList3[0]].BTN_GROUP;
//			$scope.m6=$scope.lists.root[$scope.idList3[0]].NOTE;	
//			$scope.formId=$scope.idList[0];
//			$('#chakan').modal(options);			
//		}else{
//			alert('请选择一条记录')
//		}		
//	};
//	//删除
//	$scope.delet=function(){
//		
//		if($scope.idList.length>=1){
//			layer.msg('你确定删除么？', {
//			  time: 0 //不自动关闭
//			  ,btn: ['确定', '取消']
//			  ,yes: function(index){
//			    layer.close(index);
//			    $http({
//				method: 'POST',
//				//  withCredentials: true,
//				url: HTTP + 'jf/sys/btn/delete',
//				data:{
//					ids:$scope.idList
//				},
//				
//				}).then(function successCallback(response){
//					console.log(response)
//					alert(response.data.data)
//					$scope.ref();//重载数据
//					
//				},function errorCallback(response) {
//					console.log(response)
//					alert(response.data.data)
//					
//				})	
//			 }
//			});
//			
//			
//		}else{
//			alert('请选择一条或多条记录')
//		}		
//		
//	}
//	
//	//保存
//	$scope.save=function(){
//		if($scope.m1==''||$scope.m2==''||$scope.m3==''||$scope.m4==''){
//			alert('不能为空')
//			$scope.red='red'
//			return
//		}
//		$http({
//			method: 'POST',
//			//  withCredentials: true,
//			url: HTTP + 'jf/sys/btn/save',
//			data:{
//				'form_ID':$scope.formId,
//				'form_BTN_NAME':$scope.m1,
//				'form_BTN_FUN_LINK':$scope.m2,
//				'form_BTN_IMG_LINK':$scope.m3,
//				'form_BTN_ORDER':$scope.m4,
//				'form_BTN_GROUP':$scope.m5,
//				'form_NOTE':$scope.m6
//			},			
//			}).then(function successCallback(response){
//				console.log(response)
//				alert(response.data.data)
//				$('#chakan').modal('hide')//隐藏模态框
//				$scope.ref();//重载数据
//			  
//			},function errorCallback(response) {
//				console.log(response)
//				alert(response.data.data)
//				$('#chakan').modal('hide')//隐藏模态框
//				
//			})
//	}
//	//重置2
//	$scope.submitcl2=function(){
//			$scope.m1='';
//			$scope.m2='';
//			$scope.m3='';
//			$scope.m4='';
//			$scope.m5='';
//			$scope.m6='';
//	}

      
   	    
})





