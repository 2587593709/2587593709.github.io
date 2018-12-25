app.config(['$httpProvider', function($httpProvider) {
$httpProvider.defaults.withCredentials = true;
$httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"};
$httpProvider.defaults.transformRequest = function(data) {    
                var str = [];    
                for (var p in data) {    
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));    
                }    
                return str.join("&");    
        };
//console.log($httpProvider)
 
}])

var HTTP='http://47.97.196.94:8080/wms/';
//全剧配置$http



 
   