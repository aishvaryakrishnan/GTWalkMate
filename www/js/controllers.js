angular.module('starter.controllers', ['angular.filter','ngAnimate','ngUnderscore'])

    .controller('DashCtrl', function($scope, $rootScope,$window) {
	$scope.$root.tabsHidden = "tabs-hide";
	$scope.login = function() {
	   $window.location.href = '#/tab/map';
	   $rootScope.name = document.getElementById('name').value;
    };	
	
    })
    .controller('MapCtrl', function($scope, $cordovaGeolocation, $http,$window,$rootScope) {
	document.getElementById('name').value = $rootScope.name;
	$scope.$root.tabsHidden = "tabs-hide";
	$http.get('https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/getlocations').success(function(data) {
	$scope.clientSideList = data.locations;
     });
  
	$scope.coords = [0,0];
        $scope.mapVisible = true;
		
		clientSideValue.onchange = function(evnt){
    document.getElementById('address').value =  evnt.target.value;};
  
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

                //MAP
                var mapOptions = {
                    center: new google.maps.LatLng(myLat, myLong),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

            var map = new google.maps.Map(document.getElementById("map"),
                                              mapOptions);
 $scope.map = map;
 var latlng = new google.maps.LatLng(myLat, myLong);
                var marker = new google.maps.Marker({
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
		 $rootscope.loc = document.getElementById('address').value;
		 $rootscope.time = document.getElementById('time').value;
	   $window.location.href = '#/tab/friends';
    };	
    })


    .controller('FriendsCtrl', function($scope, $http,underscore,$rootScope) {
	$scope.$root.tabsHidden = "tabs-hide";
	$http.get('https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/getwalkers').success(function(data) {
	var d = data.walkers;
	$scope.walkers = data.walkers;
	var result = underscore.chain(d).filter(function(x){return x.grp_id !=null;}).groupBy("grp_id").value();
	$scope.friends = result;
	angular.forEach(result, function(x , key){
	alert(x + " " + key);
	angular.forEach(x, function(y , k){
	alert(y + " "+ k);
	if (k == "gt_id" && y == $rootScope.name){
		$scope.grp_id = x;
		}
	});
     });
	 if ($rootScope.grp_id != null){
		$scope.showJoin = 'True';
		}
        $scope.joinGroup = function() {
		 $rootscope.loc = document.getElementById('address').value;
		 $rootscope.time = document.getElementById('time').value;
	   $window.location.href = '#/tab/friends';
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
