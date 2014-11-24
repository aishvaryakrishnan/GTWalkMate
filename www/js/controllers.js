angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, user) {
    })
    .controller('MapCtrl', function($scope, $cordovaGeolocation) {
	$scope.clientSideList = [
    { text: "Atlantic Square", value: "Atlantic Square" },
    { text: "Park District", value: "Park District" },
    { text: "Curran Street", value: "Curran Street" },
    { text: "North Avenue", value: "North Avenue" }
  ];
  
  
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


    .controller('FriendsCtrl', function($scope, $http) {
	$http.get('https://stormy-badlands-7597.herokuapp.com/mas/api/v1.0/tasks/getwalkers').success(function(data) {
	alert("here");
	$scope.friends = data.walkers;
     });
        
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function($scope) {
    });
