app.controller('XiangbiaoweihuController', function($scope, $http, $timeout,$rootScope) {	
	$timeout(function(){
		//遍历按钮选出该页按钮
		var narr2 = [];  //遍历按钮
		for (var i = 0; i < $scope.btns.length; i++) {
			if($scope.btns[i].HREF=='wh.boxMtr.boxMtrList'){
				narr2.push($scope.btns[i])
			}
		}
		$scope.narr2=narr2;
	},100)
	
	
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
          default :
            console.log(id);
                break;
        }
        
   };	
	
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
	
	
	$scope.xiang_code='';
	$scope.biao_code='';
	$scope.shebei_lei='';
	$scope.beizhu='';
	
	//重置
	$scope.submitcl=function(){
		$scope.xiang_code='';
		$scope.biao_code='';
		$scope.shebei_lei='';
		$scope.beizhu='';
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
			url: HTTP + 'jf/wh/box/getList',
			data:{
				'start':0,
				'limit':8,
				's_like_BOX_BAR_CODE':'',
				's_like_BAR_CODE':'',
				's_eq_EQUIP_CATEG':'',
				's_like_REMARK':''
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
			url: HTTP + 'jf/wh/box/getList',
			data:{
				'start':0,
				'limit':8,
				's_like_BOX_BAR_CODE':$scope.xiang_code,
				's_like_BAR_CODE':$scope.biao_code,
				's_eq_EQUIP_CATEG':$scope.shebei_lei,
				's_like_REMARK':$scope.beizhu
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
			url: HTTP + 'jf/wh/box/getList',
			data:{
				'start':8*$scope.currentPage-8,
				'limit':8,
				's_like_BOX_BAR_CODE':$scope.xiang_code,
				's_like_BAR_CODE':$scope.biao_code,
				's_eq_EQUIP_CATEG':$scope.shebei_lei,
				's_like_REMARK':$scope.beizhu
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
			$scope.formId='';
		$('#chakan').modal(options)
	};
	//修改
	$scope.edit = function(options){
		$scope.red='';
		if($scope.idList3.length==1){
			$scope.m1=$scope.lists.root[$scope.idList3[0]].BOX_BAR_CODE;
			$scope.m2=$scope.lists.root[$scope.idList3[0]].BAR_CODE;
			$scope.m3=$scope.lists.root[$scope.idList3[0]].EQUIP_CATEG;
			$scope.m4=$scope.lists.root[$scope.idList3[0]].NO;
			$scope.m5=$scope.lists.root[$scope.idList3[0]].REMARK;
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
				url: HTTP + 'jf/wh//box/delBoxMtr',
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
		if($scope.m1==''||$scope.m2==''||$scope.m3==''){
			layer.msg('不能为空', {icon: 5});
			$scope.red='red'
			return
		}
		$http({
			method: 'POST',
			//  withCredentials: true,
			url: HTTP + 'jf/wh/box/updateBoxMtr',
			data:{
				'form_ID':$scope.formId,
				'form_BOX_BAR_CODE':$scope.m1,
				'form_BAR_CODE':$scope.m2,
				'form_EQUIP_CATEG':$scope.m3,
				'form_NO':$scope.m4,
				'form_REMARK':$scope.m5
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
				alert(response.data.data)
				$('#chakan').modal('hide')//隐藏模态框
				
			})
	}
	//重置2
	$scope.submitcl2=function(){
			$scope.m1='';
			$scope.m2='';
			$scope.m3='';
			$scope.m4='';
			$scope.m5='';		
	}
	
      
   	    
})





