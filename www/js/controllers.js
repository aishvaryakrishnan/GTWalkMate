angular.module('starter.controllers', ['angular.filter','ngAnimate'])

    .controller('DashCtrl', function($scope) {
    })
    .controller('MapCtrl', function($scope, $cordovaGeolocation, $http) {
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
        
			
    })


    .controller('FriendsCtrl', function($scope, $http,_) {
	$http.get('https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/getwalkers').success(function(data) {
	var d = data.walkers;
	var result = _.chain(d)
    .groupBy("grp_id")
    .value();
	$scope.friends = result;
     });
        
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
