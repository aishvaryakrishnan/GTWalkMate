angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope, user) {
    })
    .controller('MapCtrl', function($scope, $cordovaGeolocation) {
	var marker = = new google.maps.Marker({
                                                    position: new google.maps.LatLng(0, 0),
                                                    map: map,
                                                    title:"Hello World!",
													draggable:true
                                                    });
	geocoder = new google.maps.Geocoder();
	$scope.coords = [0,0];
        $scope.mapVisible = true;
        var onSuccess = function(position) {
                var myLat = position.coords.latitude;
                var myLong = position.coords.longitude;

        google.maps.event.addListener(marker, "dragend", function(event) {

            var lat = event.latLng.lat()
            var lng = event.latLng.lng()

            var infowindow = new google.maps.InfoWindow({
                content: '<b><?php _e('Latitude:');?></b>' + lat + '<br><b><?php _e('Longitude:');?></b>' + lng
             });
            infowindow.open(map, marker);

            google.maps.event.addListener(marker, "dragstart", function() {

                infowindow.close();
             });


        });
                //MAP
                var mapOptions = {
                    center: new google.maps.LatLng(myLat, myLong),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

            var map = new google.maps.Map(document.getElementById("map"),
                                              mapOptions);
 $scope.map = map;
                marker = new google.maps.Marker({
                                                    position: new google.maps.LatLng(myLat, myLong),
                                                    map: map,
                                                    title:"Hello World!",
													draggable:true
                                                    });

            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        
		

           function findAddress(address) {

var address = document.getElementById("address").value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var pos = results[0].geometry.location;
		marker.setPosition(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " +   status);
      }
    });

     

    })


    .controller('FriendsCtrl', function($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function($scope) {
    });
