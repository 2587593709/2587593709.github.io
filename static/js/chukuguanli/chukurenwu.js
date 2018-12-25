app.controller('CkrwController', function($scope, $http, $timeout,$rootScope) {	
	$timeout(function(){
		//遍历按钮选出该页按钮
		var narr2 = [];  //遍历按钮
		for (var i = 0; i < $scope.btns.length; i++) {
			if($scope.btns[i].HREF=='iostore.outstoreTaskList'){
				narr2.push($scope.btns[i])
			}
		}
		$scope.narr2=narr2;
		for(var j=0;j<$rootScope.jsonValue_s.length;j++){
			if($rootScope.jsonValue_s[j].key=='PlanStatus'){
				$scope.PlanStatus=$rootScope.jsonValue_s[j].values;
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
	
	$scope.yingxiao_code='';
	$scope.jihua_code='';
	$scope.renwu_code='';
	$scope.xiang_code='';
	$scope.status='';
	
	//重置
	$scope.submitcl=function(){
		$scope.yingxiao_code='';
		$scope.jihua_code='';
		$scope.renwu_code='';
		$scope.xiang_code='';
		$scope.status='';
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
			url: HTTP + 'jf/iostore/task/getList',
			data:{
				'start':0,
				'limit':8,
				's_eq_task.IO_FLAG':'01',
				'status':'',
				's_like_p.APP_NO':'',
				's_like_p.PLAN_NO':'',
				's_like_task.TASK_NO':'',
				's_like_task.BAR_CODE':''
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
			url: HTTP + 'jf/iostore/task/getList',
			data:{
				'start':0,
				'limit':8,
				's_eq_task.IO_FLAG':'01',
				'status':$scope.status,
				's_like_p.APP_NO':$scope.yingxiao_code,
				's_like_p.PLAN_NO':$scope.jihua_code,
				's_like_task.TASK_NO':$scope.renwu_code,
				's_like_task.BAR_CODE':$scope.xiang_code
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
	//初始化，设置为第一页，每页显示8条
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
			url: HTTP + 'jf/iostore/task/getList',
			data:{
				'start':8*$scope.currentPage-8,
				'limit':8,
				's_eq_task.IO_FLAG':'01',
				'status':$scope.status,
				's_like_p.APP_NO':$scope.yingxiao_code,
				's_like_p.PLAN_NO':$scope.jihua_code,
				's_like_task.TASK_NO':$scope.renwu_code,
				's_like_task.BAR_CODE':$scope.xiang_code
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
	
	$scope.biao_code2='';
	//提交查询2
	$scope.submitf2 = function(){
		//加载层-默认风格
		layer.load();		
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/iostore/task/getTaskBox',
			data:{
				'start':0,
				'limit':8,
				'taskNo':$scope.lists.root[$scope.idList3[0]].TASK_NO,
				'taskStatus':$scope.lists.root[$scope.idList3[0]].STATUS,
				'barCode':$scope.biao_code2
			},
			
		}).then(function successCallback(response){
			layer.closeAll('loading');
			$scope.lists2=response.data	
			$scope.pageCount2 = Math.ceil(response.data.totalProperty/8);//页数		 
		},function errorCallback(response) {
			layer.closeAll('loading');
			console.log(response)
		})
	};
	//分页跳转2
	$scope.onPageChange2=function(){
			
				$http({
					method: 'POST',
					//  withCredentials: true,
					url: HTTP + 'jf/iostore/task/getTaskBox',
					data:{
						'start':8*$scope.currentPage2-8,
						'limit':8,
						'taskNo':$scope.lists.root[$scope.idList3[0]].TASK_NO,
						'taskStatus':$scope.lists.root[$scope.idList3[0]].STATUS,
						'barCode':$scope.biao_code2
					},
				}).then(function successCallback(response){
					console.log(response)
					$scope.lists2=response.data						
				//  console.log($scope.currentPage)
				},function errorCallback(response) {
					console.log(response)
				})
	}
	//查看
	$scope.view = function(options){
		
		if($scope.idList3.length==1){
			
			$scope.yingxiao_code2=$scope.lists.root[$scope.idList3[0]].APP_NO;			
			$scope.jihua_code2=$scope.lists.root[$scope.idList3[0]].PLAN_NO;
			$scope.renwu_code2=$scope.lists.root[$scope.idList3[0]].TASK_NO;
			$scope.churuku2='入库';
			$scope.churuyuanying2=$scope.lists.root[$scope.idList3[0]].REASON_NAME;
			$scope.shebei_lei2=$scope.lists.root[$scope.idList3[0]].EQUIP_CATEG_NAME;			
			$scope.huowei2=$scope.lists.root[$scope.idList3[0]].LOC_BAR_CODE;
			$scope.xiangtiaoma2=$scope.lists.root[$scope.idList3[0]].BAR_CODE;
			$scope.renwushuliang2=$scope.lists.root[$scope.idList3[0]].IO_QTY;
			$scope.zhuangtai2=$scope.lists.root[$scope.idList3[0]].STATUS;
			$scope.kaishishijian2=$scope.lists.root[$scope.idList3[0]].ST_TIME;
			$scope.wanchengshijian2=$scope.lists.root[$scope.idList3[0]].END_TIME;
															
			$http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/iostore/task/getTaskBox',
				data:{
					'start':0,
					'limit':8,
					'taskNo':$scope.lists.root[$scope.idList3[0]].TASK_NO,
					'taskStatus':$scope.lists.root[$scope.idList3[0]].STATUS,
					'barCode':$scope.biao_code2
				},
				
			}).then(function successCallback(response){		
				console.log(response)
				$scope.lists2=response.data	
				$scope.pageCount2 = Math.ceil(response.data.totalProperty/8);//页数
			  
			},function errorCallback(response) {
				console.log(response)
			})
																
			$('#chakans').modal(options);			
		}else{
				layer.msg('请选择一条记录', {icon: 5});
		}	
			
	};
	//更新状态
	$scope.update_status=function(){
		$http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/iostore/task/updateStatus',
				data:{
					'ID':$scope.lists.root[$scope.idList3[0]].ID,
					'STATUS':$scope.zhuangtai2
				},
				
			}).then(function successCallback(response){		
				console.log(response)
				if(response.data.success){
						layer.msg(response.data.data, {icon: 6});
						$('#chakans').modal('hide')//隐藏模态框
						$scope.ref();//重载数据
				}else{
						layer.msg(response.data.data, {icon: 5});
				}
											  
			},function errorCallback(response) {
				console.log(response)
				layer.msg(response.data.data, {icon: 5});
			})
	}
//	//添加
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
	//删除
	$scope.delet=function(){
		
		if($scope.idList.length>=1){
			layer.msg('你确定删除么？', {
				icon: 3,
			  time: 0 //不自动关闭
			  ,btn: ['确定', '取消']
			  ,yes: function(index){
			    layer.close(index);
			    $http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/iostore/task/delete',
				data:{
					ids:$scope.idList
				},
				
				}).then(function successCallback(response){
					console.log(response)
					if(response.data.success){
						layer.msg(response.data.data, {icon: 6});
						$scope.ref();//重载数据
						
					}else{
						layer.msg(response.data.data, {icon: 5});
					}
					
				},function errorCallback(response) {
					console.log(response)
					layer.msg(response.data.data, {icon: 5});
					
				})	
			 }
			});
			
			
		}else{
			layer.msg('请选择一条或多条记录', {icon: 5});
		}		
		
	}
	
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
//			url: HTTP + 'jf/iostore/task/save',
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





