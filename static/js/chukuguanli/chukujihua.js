app.controller('CkjhController', function($scope, $http, $timeout,$rootScope) {	
	$timeout(function(){
		//遍历按钮选出该页按钮
		var narr2 = [];  //遍历按钮
		for (var i = 0; i < $scope.btns.length; i++) {
			if($scope.btns[i].HREF=='iostore.outstorePlanList'){
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
          case 'synch':
                $scope.tongburuku();
                break;
          case 'start':
                $scope.kaishi();
                break;
          case 'selectOut':
                $scope.selectOut();
                break;  
          default :
            console.log(id);
                break;
        }        
   };	
	//日期时间组件
	laydate.render({
	  elem: '#time_b',
	  type: 'datetime',
	  done: function(value, date, endDate){		   
		    $scope.time_b=value;		    
	    }
	});
	laydate.render({
	  elem: '#time_s',
	  type: 'datetime',
	  done: function(value, date, endDate){		   
		    $scope.time_s=value;	    
	    }
	});
	//设备类别
	$http({
		method: 'POST',
		//  withCredentials: true,
		url: HTTP + 'jf/base/codeData/getEquipCategs',
		data:{}
	}).then(function successCallback(response){
		console.log(response)
		$scope.shebeimenu=response.data;
	},function errorCallback(response) {
		console.log('error' + response)
	})
	
	
	$scope.yingxiao_code='';
	$scope.shebei_lei='';
	$scope.time_b='';
	$scope.time_s='';
	$scope.status='';
	
	
	//重置
	$scope.submitcl=function(){
		$scope.yingxiao_code='';
		$scope.shebei_lei='';
		$scope.time_b='';
		$scope.time_s='';
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
			url: HTTP + 'jf/iostore/plan/getList',
			data:{
				'start':0,
				'limit':8,
				's_eq_IO_FLAG':'01',
				'status':'',
				's_like_APP_NO':'',
				's_eq_EQUIP_CATEG':'',
				's_gte_CREAT_DATE':'',
				's_lte_CREAT_DATE':''
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
			url: HTTP + 'jf/iostore/plan/getList',
			data:{
				'start':0,
				'limit':8,
				's_eq_IO_FLAG':'01',
				'status':$scope.status,
				's_like_APP_NO':$scope.yingxiao_code,
				's_eq_EQUIP_CATEG':$scope.shebei_lei,
				's_gte_CREAT_DATE':$scope.time_b,
				's_lte_CREAT_DATE':$scope.time_s
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
			url: HTTP + 'jf/iostore/plan/getList',
			data:{
				'start':8*$scope.currentPage-8,
				'limit':8,
				's_eq_IO_FLAG':'01',
				'status':$scope.status,
				's_like_APP_NO':$scope.yingxiao_code,
				's_eq_EQUIP_CATEG':$scope.shebei_lei,
				's_gte_CREAT_DATE':$scope.time_b,
				's_lte_CREAT_DATE':$scope.time_s
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
	
	
	$scope.xiang_code2='';
	$scope.biao_code2='';
	//提交查询2
	$scope.submitf2 = function(){
		//加载层-默认风格
		layer.load();		
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/iostore/plan/getPlanBox',
			data:{
				'start':0,
				'limit':8,
				'planNo':$scope.lists.root[$scope.idList3[0]].PLAN_NO,
				'planStatus':$scope.lists.root[$scope.idList3[0]].STATUS,
				'boxBarCode':$scope.xiang_code2,
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
					url: HTTP + 'jf/iostore/plan/getPlanBox',
					data:{
						'start':8*$scope.currentPage2-8,
						'limit':8,
						'planNo':$scope.lists.root[$scope.idList3[0]].PLAN_NO,
						'planStatus':$scope.lists.root[$scope.idList3[0]].STATUS,
						'boxBarCode':$scope.xiang_code2,
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
	
	$scope.zhuangtai2=''
	//查看
	$scope.view = function(options){
		
		if($scope.idList3.length==1){
			
			$scope.yingxiao_code2=$scope.lists.root[$scope.idList3[0]].APP_NO;
			$scope.renwu_code2=$scope.lists.root[$scope.idList3[0]].TASK_ID;
			$scope.jihua_code2=$scope.lists.root[$scope.idList3[0]].PLAN_NO;
			$scope.churuyuanying2=$scope.lists.root[$scope.idList3[0]].IO_WH_REASON_NAME;
			$scope.shebei_lei2=$scope.lists.root[$scope.idList3[0]].EQUIP_CATEG_NAME;
			$scope.jiexianfangshi2=$scope.lists.root[$scope.idList3[0]].WIRING_MODE_NAME;
			$scope.leixing2=$scope.lists.root[$scope.idList3[0]].TYPE_NAME;
			$scope.dianliu2=$scope.lists.root[$scope.idList3[0]].RATED_CURRENT_NAME;
			$scope.dianya2=$scope.lists.root[$scope.idList3[0]].VOLT_NAME;
			$scope.dianliubianbi2=$scope.lists.root[$scope.idList3[0]].RC_RATIO_NAME;
			$scope.zhizaodanwei2=$scope.lists.root[$scope.idList3[0]].MANUFACTURER_NAME;
			$scope.jihuashuliang2=$scope.lists.root[$scope.idList3[0]].BOX_QTY;
			$scope.wanchengshuliang2=$scope.lists.root[$scope.idList3[0]].FINISHED_NUM;
			$scope.zhuangtai2=$scope.lists.root[$scope.idList3[0]].STATUS;
			$scope.zhidingshijian2=$scope.lists.root[$scope.idList3[0]].CREAT_DATE;
			$scope.wanchengshijian2=$scope.lists.root[$scope.idList3[0]].FINISHED_TIME;
															
			$http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/iostore/plan/getPlanBox',
				data:{
					'start':0,
					'limit':8,
					'planNo':$scope.lists.root[$scope.idList3[0]].PLAN_NO,
					'planStatus':$scope.lists.root[$scope.idList3[0]].STATUS,
					'boxBarCode':$scope.xiang_code2,
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
				url: HTTP + 'jf/iostore/plan/delete',
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
//			url: HTTP + 'jf/iostore/plan/save',
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

      //同步入库计划
      $scope.liucheng_danhao='';
      $scope.tongburuku=function(options){
      	$scope.liucheng_danhao='';
      	$('#tongbujihua').modal(options);
      }
      
      $scope.tongburuku_save=function(){
      	if($scope.liucheng_danhao==''){
      		layer.msg('流程单号不能为空', {icon: 5});
      	}else{
      		//加载层-默认风格
			layer.load();
      		$http({
				method: 'POST',
				//  withCredentials: true,
				url: HTTP + 'jf/iostore/plan/synchPlan',
				data:{
					'appNo':$scope.liucheng_danhao,
					'ioFlag':'01'
				},
				
			}).then(function successCallback(response){
				layer.closeAll('loading');
				console.log(response)
				if(response.data.success){
					layer.msg(response.data.data, {icon: 6});
					$('#tongbujihua').modal('hide') //隐藏模态框
				}else{
					layer.msg(response.data.data, {icon: 5});
				}
			},function errorCallback(response) {
				layer.closeAll('loading');
				console.log(response)
				layer.msg(response.data.data, {icon: 5});
			})	
			
      	}
      	
      }
      
      //开始
      $scope.kaishi=function(){
      	if($scope.idList3.length==1){
      		layer.msg('你确定要启动计划吗？', {
      		icon: 3,
			  time: 0 //不自动关闭
			  ,btn: ['时间早先出','时间晚先出','取消']
			  ,yes: function(index){
			    layer.close(index);			    
			    	$http({
					method: 'POST',
					//  withCredentials: true,
					url: HTTP + 'jf/iostore/plan/startPlan',
					data:{
						'id':$scope.idList[0],
						'ioFlag':'01',
						'sort':'asc'    //正序asc
										//倒序：desc
					},					
					}).then(function successCallback(response){
						console.log(response)
						if(response.data.success){
							layer.msg(response.data.data, {icon: 6});
							
						}else{
							layer.msg(response.data.data, {icon: 5});
						}
											
					},function errorCallback(response) {
						console.log(response)
						layer.msg(response.data.data, {icon: 5});					
					})				    			    
			 },
			 btn2: function(index){
			    $http({
					method: 'POST',
					//  withCredentials: true,
					url: HTTP + 'jf/iostore/plan/startPlan',
					data:{
						'id':$scope.idList[0],
						'ioFlag':'01',
						'sort':'desc'    //正序asc
										//倒序：desc
					},					
					}).then(function successCallback(response){
						console.log(response)
						if(response.data.success){
							layer.msg(response.data.data, {icon: 6});
							
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
      		layer.msg('请选择一条记录', {icon: 5});
      	}      		
      }

 //捡选出库     
 $scope.selectOut=function(options){
 	$scope.mm1=''
 	$scope.list_no=[];
 	$scope.num=0;
 	$scope.pr1='';
 	$('#jian_ck').modal(options);
 }
 
 $scope.list_no=[];
 $scope.num=0;
 $scope.pr1='';
 $scope.clickEvent = function() {
        	$http({
					method: 'POST',
					//  withCredentials: true,
					url: HTTP + 'jf/select/selectCode/checkMtr',
					data:{
						'BAR_CODE':$scope.mm1
					},					
					}).then(function successCallback(response){
						console.log(response)
						if(response.data.success){
							if($scope.list_no.indexOf($scope.mm1)==-1){
								$scope.list_no.push($scope.mm1)
								$scope.num=$scope.list_no.length;
								$scope.pr1='【'+response.data.data.APP_NO+'】'+'【'+response.data.data.PICK_NUM+'/'+response.data.data.PICK_TOTAL_NUM+'】'


							}else{
								layer.msg('表条码已存在', {icon: 0});
							}
							
						}else{
							layer.msg(response.data.data, {icon: 5});
						}
											
					},function errorCallback(response) {
						console.log(response)
						//alert(response.data.data)						
					})	
    }
 
 $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.clickEvent();
        }
    }
 //移除表条码
 $scope.yichu_code=function(){
 	//console.log($scope.btnSelect)
   	for(var i=0;i<$scope.btnSelect.length;i++){
   		$scope.list_no.splice($scope.list_no.indexOf($scope.btnSelect[i]),1)
   	}
   	$scope.num=$scope.list_no.length;
   	if($scope.list_no.length==0){
   		$scope.pr1='';
   	}
 }
 
 //拣选出库保存
 $scope.jian_ck=function(){
 	if($scope.list_no.length>0){
 			$http({
					method: 'POST',
					//  withCredentials: true,
					url: HTTP + 'jf/select/selectCode/selectOut',
					data:{
						'BAR_CODE':$scope.list_no
					},					
					}).then(function successCallback(response){
						console.log(response)
						if(response.data.success){
							layer.msg(response.data.data, {icon: 6});
							
						}else{
							layer.msg(response.data.data, {icon: 5});
						}
											
					},function errorCallback(response) {
						console.log(response)
											
					})	
 	}else{
 		layer.msg('没有数据，不能拣选出库', {icon: 5});
 	}
 			
 }
})





