app.controller('HuoweiController', function($scope, $http, $timeout,$rootScope) {	
	$timeout(function(){
		//遍历按钮选出该页按钮
		var narr2 = [];  //遍历按钮
		for (var i = 0; i < $scope.btns.length; i++) {
			if($scope.btns[i].HREF=='wh.loc.locList'){
				narr2.push($scope.btns[i])
			}
		}
		$scope.narr2=narr2;
		for(var j=0;j<$rootScope.jsonValue_s.length;j++){
			if($rootScope.jsonValue_s[j].key=='RunStatus'){
				$scope.RunStatus=$rootScope.jsonValue_s[j].values;
			}
			if($rootScope.jsonValue_s[j].key=='StoreStatus'){
				$scope.StoreStatus=$rootScope.jsonValue_s[j].values;
			}
			if($rootScope.jsonValue_s[j].key=='LocType'){
				$scope.LocType=$rootScope.jsonValue_s[j].values;
			}
			if($rootScope.jsonValue_s[j].key=='RackSort'){
				$scope.RackSort=$rootScope.jsonValue_s[j].values;
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
          case 'batchUpdate':
                $scope.pl_edit();
                break; 
          case 'initLoc':
                $scope.hw_ref();
                break;      
          default :
            console.log(id);
                break;
        }       
  };	
  //父菜单
	$http({
		method: 'POST',
		//  withCredentials: true,
		url: HTTP + 'jf/wh/loc/getAreas',
		data:{
				'query':''	
			}
	}).then(function successCallback(response){
		console.log(response)
		$scope.fmenu1=response.data;
	},function errorCallback(response) {
		console.log(response)
	});
	$http({
		method: 'POST',
		//  withCredentials: true,
		url: HTTP + 'jf/wh/loc/getLocRow',
		data:{
				'query':''	
			}
	}).then(function successCallback(response){
		console.log(angular.fromJson(response))
		$scope.fmenu2=response.data;
	},function errorCallback(response) {
		console.log(response)
	});
	
	
	
	$http({
		method: 'POST',
		//  withCredentials: true,
		url: HTTP + 'jf/wh/loc/getLocCol',
		data:{
				'query':''		
			}
	}).then(function successCallback(response){
		//console.log(response)
		$scope.fmenu3=response.data;
	},function errorCallback(response) {
		console.log(response)
	});
	$http({
		method: 'POST',
		//  withCredentials: true,
		url: HTTP + 'jf/wh/loc/getLocLevel',
		data:{
				'query':''		
			}
	}).then(function successCallback(response){
		//console.log(response)
		$scope.fmenu4=response.data;
	},function errorCallback(response) {
		console.log(response)
	});
	
 //初始化 
  
	$scope.kq='';
	$scope.pai='';
	$scope.lie='';
	$scope.ceng='';
	$scope.huowei_no='';
	$scope.yunxing_state='';
	$scope.cunchu_state='';
	$scope.huowei_lei='';
	$scope.wuliao_state='';
	
	//重置
	$scope.submitcl=function(){
		$scope.kq='';
		$scope.pai='';
		$scope.lie='';
		$scope.ceng='';
		$scope.huowei_no='';
		$scope.yunxing_state='';
		$scope.cunchu_state='';
		$scope.huowei_lei='';
		$scope.wuliao_state='';
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
			url: HTTP + 'jf/wh/loc/getList',
			data:{
				'start':0,
				'limit':8,
				'form_WH_ID':'',
				's_eq_st_row':'',
				's_eq_st_col':'',
				's_eq_st_level':'',
				's_like_wh_loc_code':'',
				's_eq_run_status':'',
				's_eq_store_status':'',
				's_eq_LOC_TYPE':'',
				'form_RACK_SORT':''
			},
			
		}).then(function successCallback(response){
			layer.closeAll('loading');
			//console.log(response)
			$scope.lists=response.data	
			$scope.pageCount = Math.ceil(response.data.totalProperty/8);
		  //console.log($scope.pageCount)
		},function errorCallback(response) {
			layer.closeAll('loading');
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
			url: HTTP + 'jf/wh/loc/getList',
			data:{
				'start':0,
				'limit':8,
				'form_WH_ID':$scope.kq,
				's_eq_st_row':$scope.pai,
				's_eq_st_col':$scope.lie,
				's_eq_st_level':$scope.ceng,
				's_like_wh_loc_code':$scope.huowei_no,
				's_eq_run_status':$scope.yunxing_state,
				's_eq_store_status':$scope.cunchu_state,
				's_eq_LOC_TYPE':$scope.huowei_lei,
				'form_RACK_SORT':$scope.wuliao_state
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
			url: HTTP + 'jf/wh/loc/getList',
			data:{
				'start':8*$scope.currentPage-8,
				'limit':8,
				'form_WH_ID':$scope.kq,
				's_eq_st_row':$scope.pai,
				's_eq_st_col':$scope.lie,
				's_eq_st_level':$scope.ceng,
				's_like_wh_loc_code':$scope.huowei_no,
				's_eq_run_status':$scope.yunxing_state,
				's_eq_store_status':$scope.cunchu_state,
				's_eq_LOC_TYPE':$scope.huowei_lei,
				'form_RACK_SORT':$scope.wuliao_state
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
		
	//添加
	$scope.add = function(options) {		     	
			$scope.red='';
			$scope.m1='';
			$scope.m2='';
			$scope.m3='';
			$scope.m4='';
			$scope.m5='';
			$scope.m6='';
			$scope.m7='';
			$scope.m8='';
			$scope.formId='';
		$('#chakan').modal(options)
	};
	//修改
	$scope.edit = function(options){
		$scope.red='';
		if($scope.idList3.length==1){
			$scope.m1=$scope.lists.root[$scope.idList3[0]].TUNNEL;
			$scope.m2=$scope.lists.root[$scope.idList3[0]].ST_ROW;
			$scope.m3=$scope.lists.root[$scope.idList3[0]].ST_COL;
			$scope.m4=$scope.lists.root[$scope.idList3[0]].ST_LEVEL;
			$scope.m5=$scope.lists.root[$scope.idList3[0]].RUN_STATUS;
			$scope.m6=$scope.lists.root[$scope.idList3[0]].STORE_STATUS;
			$scope.m7=$scope.lists.root[$scope.idList3[0]].LOC_TYPE;
			$scope.m8=$scope.lists.root[$scope.idList3[0]].RACK_SORT;
			$scope.formId=$scope.idList[0];
			$('#chakan').modal(options);			
		}else{
			layer.msg('请选择一条记录', {icon: 5});
		}		
	};
	
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
				url: HTTP + 'jf/wh/loc/delete',
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
	
	//保存
	$scope.save=function(){
		if($scope.m1==''||$scope.m2==''||$scope.m3==''||$scope.m4==''){
			layer.msg('不能为空', {icon: 5});
			$scope.red='red'
			return
		}
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/loc/save',
			data:{
				'form_ID':$scope.formId,
				'form_WH_ID':$scope.m1,
				'form_ST_ROW':$scope.m2,
				'form_ST_COL':$scope.m3,
				'form_ST_LEVEL':$scope.m4,
				'form_RUN_STATUS':$scope.m5,
				'form_STORE_STATUS':$scope.m6,
				'form_LOC_TYPE':$scope.m7,
				'form_RACK_SORT':$scope.m8
			},			
			}).then(function successCallback(response){
				console.log(response)
				if(response.data.success){
						layer.msg(response.data.data, {icon: 6});
						$('#chakan').modal('hide')//隐藏模态框
						$scope.ref();//重载数据
				}else{
						layer.msg(response.data.data, {icon: 5});
				}
							  
			},function errorCallback(response) {
				console.log(response)
				layer.msg(response.data.data, {icon: 5});								
			})
	}
	//重置2
	$scope.submitcl2=function(){
			$scope.m1='';
			$scope.m2='';
			$scope.m3='';
			$scope.m4='';
			$scope.m5='';
			$scope.m6='';
			$scope.m7='';
			$scope.m8='';
	}
	//批量修改
	$scope.pl_edit = function(options){
			$scope.red='';
			$scope.m12='';
			$scope.m9='';
			$scope.m10='';
			$scope.m11='';
			$scope.formIds='';
		if($scope.idList3.length>=1){
			
			$scope.formIds=$scope.idList;
			$('#piliangxiugai').modal(options);			
		}else{
			layer.msg('请选择一条或多条记录', {icon: 5});
		}		
	};
	//批量保存
	$scope.pl_save=function(){
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/loc/saveLocBatch',
			data:{
				'form_RUN_STATUS':$scope.m9,
				'form_STORE_STATUS':$scope.m10,
				'form_LOC_TYPE':$scope.m11,
				'form_RACK_SORT':$scope.m12,
				'form_IDS':$scope.formIds
			},			
			}).then(function successCallback(response){
				console.log(response)
				if(response.data.success){
						layer.msg(response.data.data, {icon: 6});
						$('#piliangxiugai').modal('hide')//隐藏模态框
						$scope.ref();//重载数据
					}else{
						layer.msg(response.data.data, {icon: 5});
					}
				
			  
			},function errorCallback(response) {
				console.log(response)
				layer.msg(response.data.data, {icon: 5});		
				
			})
	}
     //货位初始化 
     $scope.hw_ref = function(options){
			$scope.red='';
			$scope.m13='';
			$scope.m14='';
			$scope.m15='';
			$scope.m16='';
					
			$('#huoweichushihua').modal(options);			
		
	};
	//货位初始化保存
	$scope.huowei_ref_save=function(){
		if($scope.m13==''||$scope.m14==''||$scope.m15==''||$scope.m16==''){
			layer.msg('不能为空', {icon: 5});
			$scope.red='red'
			return
		}
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/loc/initLoc',
			data:{
				'WH_ID':$scope.m13,
				'ST_ROW':$scope.m14,
				'ST_COL':$scope.m15,
				'ST_LEVEL':$scope.m16
			},			
			}).then(function successCallback(response){
				console.log(response)
				if(response.data.success){
						layer.msg(response.data.data, {icon: 6});
						$('#huoweichushihua').modal('hide')//隐藏模态框
						$scope.ref();//重载数据
					}else{
						layer.msg(response.data.data, {icon: 5});
					}
				
			  
			},function errorCallback(response) {
				console.log(response)
				layer.msg(response.data.data, {icon: 5});
				
			})
	}
   	    
})





