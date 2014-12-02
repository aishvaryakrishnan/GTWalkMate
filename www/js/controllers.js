angular.module('starter.controllers', ['angular.filter','ngAnimate','ngUnderscore'])

    .controller('DashCtrl', function($scope, $rootScope,$window,$http) {
	$scope.invalid = false;
	$scope.$root.tabsHidden = "tabs-hide";
	
	$scope.login = function() {
	var name = document.getElementById('name').value;
	var pwd = document.getElementById('pwd').value;
	$http({
    method: 'POST',
    url: 'https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/userlogin',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {gt_id : name,password: pwd}
}).success(function (data, status, headers, config) {
if(data.success == 'true'){
$scope.invalid = false;
$window.location.href = '#/tab/map';
$rootScope.name = document.getElementById('name').value;
} else{
$scope.invalid = true;
}
	   });   
	   
    };	
	
    })
    .controller('MapCtrl', function($scope, $cordovaGeolocation, $http,$window,$rootScope) {
	document.getElementById('name').value = $rootScope.name;
	$scope.$root.tabsHidden = "tabs-hide";
	//MAP
	var latlng = new google.maps.LatLng(33.777061, -84.3902);
                var mapOptions = {
                    center: latlng,
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

            var map = new google.maps.Map(document.getElementById("map"),
                                              mapOptions);
 $scope.map = map;
                var marker = new google.maps.Marker({
                                                    position: latlng,
                                                    map: map,
													draggable:true,
													raiseOnDrag: true,
                                                    });
													
	function clearMarker(){
	marker.setMap(null);
	}
	$rootScope.loc = [];
	$http.get('https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/getlocations').success(function(data,loc) {
	$scope.clientSideList = data.locations;
	$rootScope.loc = data.locations;
     });
  
	$scope.coords = [0,0];
        $scope.mapVisible = true;
		
		clientSideValue.onchange = function(evnt){
    document.getElementById('address').value =  evnt.target.value;
	for (item in $rootScope.loc){
	if($rootScope.loc[item].loc_name == evnt.target.value){
	var lat = $rootScope.loc[item].lat;
	var lng = $rootScope.loc[item].long;
	latlng = new google.maps.LatLng(lat, lng);
	clearMarker();
	marker = new google.maps.Marker({
                                                    position: latlng,
                                                    map: map,
													draggable:true,
													raiseOnDrag: true,
                                                    });
	map.setCenter(latlng);
	}
	}
	};
  
		var geocoder = new google.maps.Geocoder();
		function geocodePosition(pos) {
		geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      updateMarkerAddress(responses[0].formatted_address);
    } else {
      updateMarkerAddress('Cannot determine address at this location');
    }
  });
  }
  
  function updateMarkerAddress(str) {
  document.getElementById('address').value = str;
}
        var onSuccess = function(position) {
                var myLat = position.coords.latitude;
                var myLong = position.coords.longitude;
      
 latlng = new google.maps.LatLng(myLat, myLong);
clearMarker();
                marker = new google.maps.Marker({
                                                    position: latlng,
                                                    map: map,
													draggable:true,
													raiseOnDrag: true,
                                                    });
google.maps.event.addListener(marker, "dragend", function() {
    geocodePosition(marker.getPosition());
  });

            };

			 
            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }

         navigator.geolocation.getCurrentPosition(onSuccess, onError);
        
		 $scope.newWalker = function() {
		 $rootScope.loc = document.getElementById('address').value;
		 $rootScope.time = document.getElementById('time').value;
	   $window.location.href = '#/tab/friends';
    };	
    })
    .controller('FriendsCtrl', function($scope, $http,underscore,$rootScope,$location) {
	var maxGrp = 0;
	$scope.initFirst=function(){
	$scope.showJoin = false;
	$scope.$root.tabsHidden = "tabs-hide";
	$scope.name = $rootScope.name;
	$http.get('https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/getwalkers').success(function(data) {
	var d = data.walkers;
	angular.forEach(d, function(x , key){
	angular.forEach(x, function(y , k){
	if (maxGrp < x["grp_id"]){
	maxGrp = x["grp_id"];
	}
	if (k == "gt_id" && y == $rootScope.name){
		$scope.grp_id = x["grp_id"];
		$scope.gt_id = y;
		}
	else if (k == "start_time"){
	d[key][k] = new Date(y);
	alert(y);
	}
	});
     });
	 
	$scope.walkers = data.walkers;
	var result = underscore.chain(d).filter(function(x){return x.grp_id !=null;}).groupBy("grp_id").value();
	$scope.friends = result;
	
	 if ($scope.grp_id == null){
		$scope.showJoin = true;
		}
	});
	}
	$scope.initFirst();
		$scope.joinGroup = function(key) {
		$http({
    method: 'POST',
    url: 'https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/joingroup',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {grp_id:key, gt_id: $scope.gt_id}
}).success(function () {$scope.initFirst();});
	   
    };	
	$scope.leaveGroup = function(key) {
	$http({
    method: 'POST',
    url: 'https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/leavegroup',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {gt_id: $scope.gt_id, grp_id:key}
}).success(function () {$scope.initFirst();});
	   
    };	
	$scope.joinWalker = function(key) {
	
	$http({
    method: 'POST',
    url: 'https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/addgroup',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {grp_id: (maxGrp + 1), name: "Group" + (maxGrp +1), dest_id : 1}
}).success(function () {$scope.initFirst();});   

$http({
    method: 'POST',
    url: 'https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/joingroup',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {grp_id:(maxGrp + 1), gt_id: $scope.gt_id}
}).success(function () {$scope.initFirst();});

$http({
    method: 'POST',
    url: 'https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/joingroup',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {grp_id:(maxGrp + 1), gt_id: key}
}).success(function () {$scope.initFirst();});
    };	
		
        
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function($scope) {
    })
	.animation('.slideDown', function() {
	return {
		addClass: function(element, className, done) {
            jQuery(element).slideDown(done);
		},
		removeClass: function(element, className, done) {
			jQuery(element).slideUp(done);
		}
	}
});
