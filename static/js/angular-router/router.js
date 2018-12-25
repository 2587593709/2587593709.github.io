var app = angular.module('app', ['ngRoute','ng-pagination'])
app.controller('HomeController', function ($scope, $route) { $scope.$route = $route;})
	.controller('IkjhController', function ($scope, $route) { $scope.$route = $route;})
	.controller('IkrwController', function ($scope, $route) { $scope.$route = $route;})
	.controller('IkzyController', function ($scope, $route) { $scope.$route = $route;})	
	.controller('CkjhController', function ($scope, $route) { $scope.$route = $route;})
	.controller('CkrwController', function ($scope, $route) { $scope.$route = $route;})
	.controller('CkzyController', function ($scope, $route) { $scope.$route = $route;})
	.controller('CqController', function ($scope, $route) { $scope.$route = $route;})
	.controller('HuoweiController', function ($scope, $route) { $scope.$route = $route;})
	.controller('HuoweixiangweihuController', function ($scope, $route) { $scope.$route = $route;})
	.controller('XiangbiaoweihuController', function ($scope, $route) { $scope.$route = $route;})
	.controller('HuoweixianshiController', function ($scope, $route) { $scope.$route = $route;})
	.controller('kucunchaxunController', function ($scope, $route) { $scope.$route = $route;})
	.controller('ShuaxinController', function ($scope, $route) { $scope.$route = $route;})
	.controller('KucunqingkuangchaxunController', function ($scope, $route) { $scope.$route = $route;})
	.controller('AnniuController', function ($scope, $route) { $scope.$route = $route;})
	.controller('CaidanController', function ($scope, $route) { $scope.$route = $route;})
	.controller('JiaoseController', function ($scope, $route) { $scope.$route = $route;})
	.controller('YonghuController', function ($scope, $route) { $scope.$route = $route;})
	.controller('XitongyunxinController', function ($scope, $route) { $scope.$route = $route;})
	.controller('YingxiaoshangchuanController', function ($scope, $route) { $scope.$route = $route;})
	.controller('JichushujuController', function ($scope, $route) { $scope.$route = $route;})
	.controller('WuliaojibenxinxiController', function ($scope, $route) { $scope.$route = $route;})
	.controller('ChangjiaxinxiController', function ($scope, $route) { $scope.$route = $route;})
	.controller('BaojingleixinController', function ($scope, $route) { $scope.$route = $route;})
	.controller('XitongcaozuoController', function ($scope, $route) { $scope.$route = $route;})
	.controller('XitongwaibujiaohuController', function ($scope, $route) { $scope.$route = $route;})
	.config(function ($routeProvider) {
	    $routeProvider.
	    when('/home', {
	        templateUrl: 'component/shouye.html',
	        controller: 'HomeController'    //首页
	    }).
	    when('/iostore.instorePlanList', {
	        templateUrl: 'component/rukuguanli/rukujihua.html',
	        controller: 'IkjhController'  //入库计划
	    }).
	    when('/iostore.instoreTaskList', {
	        templateUrl: 'component/rukuguanli/rukurenwu.html',
	        controller: 'IkrwController'  //入库任务
	    }).
	    when('/iostore.instoreWorkList', {
	        templateUrl: 'component/rukuguanli/rukuzuoye.html',
	        controller: 'IkzyController'  //入库作业
	    }).
	    when('/iostore.outstorePlanList', {
	        templateUrl: 'component/ckc/ckjh.html',
	        controller: 'CkjhController'  //出库计划
	    }).
	    when('/iostore.outstoreTaskList', {
	        templateUrl: 'component/ckc/ckrw.html',
	        controller: 'CkrwController'  //出库任务
	    }).
	    when('/iostore.outstoreWorkList', {
	        templateUrl: 'component/ckc/ckzy.html',
	        controller: 'CkzyController'  //出库作业
	    }).
	    when('/wh.area.areaList', {
	        templateUrl: 'component/kfc/cq.html',
	        controller: 'CqController'  //库区管理
	    }).
	    when('/wh.loc.locList', {
	        templateUrl: 'component/kfc/huowei.html',
	        controller: 'HuoweiController'  //货位管理
	    }).
	    when('/wh.locBox.locBoxList', {
	        templateUrl: 'component/kfc/huoweixiangweihu.html',
	        controller: 'HuoweixiangweihuController'      //货位箱维护
	    }).
	    when('/wh.boxMtr.boxMtrList', {
	        templateUrl: 'component/kfc/xiangbiaoweihu.html',
	        controller: 'XiangbiaoweihuController'  //箱表维护
	    }).
	    when('/wh.store.storeRowPanel', {
	        templateUrl: 'component/kfc/huoweixianshi.html',
	        controller: 'HuoweixianshiController'  //货位显示
	    }).
	    when('/ShowReport.wxPAGEIDStoreQuery', {
	        templateUrl: 'component/kfc/kucunchaxun.html',
	        controller: 'kucunchaxunController'      //库存查询
	    }).
	    when('/ShowReport.wxACTIONTYPEupdateconfig', {
	        templateUrl: 'component/baobiaotongji/shuaxin.html',
	        controller: 'ShuaxinController'  //刷新
	    }).
	    when('/ShowReport.wxPAGEIDStoreInfoQuery', {
	        templateUrl: 'component/baobiaotongji/kucunqingkuangchaxun.html',
	        controller: 'KucunqingkuangchaxunController'      //库存情况查询
	    }).
	    when('/sys.btn.btnList', {
	        templateUrl: 'component/xitongguanli/anniuguanli.html',
	        controller: 'AnniuController'      //按钮管理
	    }).
	    when('/sys.childMenu.MenuList', {
	        templateUrl: 'component/xitongguanli/caidanguanli.html',
	        controller: 'CaidanController'  //菜单管理
	    }).
	    when('/sys.role.RoleList', {
	        templateUrl: 'component/xitongguanli/jiaose.html',
	        controller: 'JiaoseController'  //角色管理
	    }).
	    when('/sys.user.UserList', {
	        templateUrl: 'component/xitongguanli/yonghu.html',
	        controller: 'YonghuController'      //用户管理
	    }).
	    when('/sys.configdata.configdataList', {
	        templateUrl: 'component/xitongguanli/xitongyunxincanshu.html',
	        controller: 'XitongyunxinController'  //系统运行参数
	    }).
	    when('/sys.preserve.preserveList', {
	        templateUrl: 'component/xitongguanli/yingxiaoshangchuan.html',
	        controller: 'YingxiaoshangchuanController'      //营销上传维护
	    }).
	    when('/base.codeData.codeList', {
	        templateUrl: 'component/jichuguanli/jichushuju.html',
	        controller: 'JichushujuController'      //基础数据管理
	    }).
	    when('/base.mtrDet.mtrDetList', {
	        templateUrl: 'component/jichuguanli/wuliaojibenxinxi.html',
	        controller: 'WuliaojibenxinxiController'  //物料基本信息管理
	    }).
	    when('/base.supplier.supplierList', {
	        templateUrl: 'component/jichuguanli/changjiaxinxi.html',
	        controller: 'ChangjiaxinxiController'  //厂家信息管理
	    }).
	    when('/base.warnType.warnTypeList', {
	        templateUrl: 'component/jichuguanli/baojingleixin.html',
	        controller: 'BaojingleixinController'      //报警类型管理
	    }).
	    when('/log.systemLog.systemLogList', {
	        templateUrl: 'component/rizhiguanli/xitongcaozuo.html',
	        controller: 'XitongcaozuoController'  //系统操作日志
	    }).
	    when('/log.wmsServiceLog.wmsServiceLogList', {
	        templateUrl: 'component/rizhiguanli/xitongwaibujiaohu.html',
	        controller: 'XitongwaibujiaohuController'      //系统外部交互日志
	    }).
	    otherwise({
	      redirectTo: '/home'  //首页
	    });
	});