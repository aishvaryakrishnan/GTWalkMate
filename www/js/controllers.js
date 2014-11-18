angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, user) {
    })
    .controller('MapCtrl', function($scope, $cordovaGeolocation) {
	$scope.coords = [0,0];
        $scope.mapVisible = true;
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
                var marker = new google.maps.Marker({
                                                    position: new google.maps.LatLng(myLat, myLong),
                                                    map: map,
                                                    title:"Hello World!"
                                                    });

            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }

            
        
			moveMarker( map, marker );

			function moveMarker( map, marker ) {
    
    //delayed so you can see it move
    setTimeout( function(){ 
    
        marker.setPosition( new google.maps.LatLng( 0, 0 ) );
        map.panTo( new google.maps.LatLng( 0, 0 ) );
        
    }, 1500 );

};
     navigator.geolocation.getCurrentPosition(onSuccess, onError);

    })


    .controller('FriendsCtrl', function($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function($scope) {
    });
