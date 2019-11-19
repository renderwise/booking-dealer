var app=angular.module("app",[])

app.controller('mapController', function($scope) {
  
	$.post('MapServlet', {

	}, function(responseText) {
		$scope.addressesJsonArrayOriginal = JSON.parse(responseText);
		$scope.findCities($scope.addressesJsonArrayOriginal);
		$scope.findNames($scope.addressesJsonArrayOriginal);
		calculateLatLng($scope.addressesJsonArrayOriginal,$scope.addressesJsonArrayOriginal[0]);
	});

	var geocoder = new google.maps.Geocoder();
	/* var addresses = [ "55,indrapuri,sirhind Road,patiala", "sector 50, noida" ]; */
	
	var coordsOfAddress = [];
	var calculateLatLng = function(addressesJsonArray,addressJson) {
		 
		if(addressJson!=null){
		geocoder.geocode({
			'address' : addressJson["address"]
		},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var output = {};
						output.lat = results[0].geometry.location.lat();
						output.lng = results[0].geometry.location.lng();
						output.text = addressJson["text"];
						output.name = addressJson["name"];
						output.address = addressJson["address"];
						output.id=addressJson["id"]
						coordsOfAddress.push(output);
						console.log(coordsOfAddress);
						calculateLatLng(addressesJsonArray,addressesJsonArray[addressesJsonArray
								.indexOf(addressJson) + 1]);
					}
				});
		} else {
			showMarker();
			coordsOfAddress = [];
		}
	}

	var showMarker = function() {
		var myCenter = new google.maps.LatLng('20.59585338718739','78.96616840260504');
		var mapCanvas = document.getElementById("map");
		var mapOptions = {
			center : myCenter,
			zoom : 9
		};
		
		
		var map = new google.maps.Map(mapCanvas, mapOptions);
		var infowindow = new google.maps.InfoWindow({
			content : "as"
		});
		for ( var index in coordsOfAddress) {
			var markerPosition = new google.maps.LatLng(
					coordsOfAddress[index].lat, coordsOfAddress[index].lng);
			var marker = new google.maps.Marker({
				position : markerPosition,
				title : coordsOfAddress[index].text,
				address:coordsOfAddress[index].address,
				name:coordsOfAddress[index].name,
			});
		/*	
		 * 
		 * REMOVED BY SOURABH
		 * google.maps.event.addListener(marker, 'click',

			function() {
				infowindow.setContent(this.title);
				infowindow.open(map, this);
				window.open('https://www.google.com/maps/search/?api=1&query='
						+ encodeURI(this.address) + '&query='
						+ this.position.lat() + ',' + this.position.lng(),
						'_blank');
				// window.open('https://www.google.com/maps/dir/?api=1&destination='+this.position.lat()+','+this.position.lng()+'&destination='+encodeURI(this.title)+'', '_blank');

			});*/
			
			
			google.maps.event.addListener(marker, 'click', function() {
	              infowindow.setContent('<div><strong>' + this.name + '</strong><br>' +
	                   'Place : ' + this.address + '<br></div>');
	                 infowindow.open(map, this);
	            });
			
			
			
			marker.setMap(map);

		}
	
	}

	$scope.openNav=function() {
		    document.getElementById("mySidenav").style.width = "300px";
		    document.getElementById("main").style.marginLeft = "300px";
	}

	$scope.closeNav=function() {
		 document.getElementById("mySidenav").style.width = "0";
		    document.getElementById("main").style.marginLeft= "0";
	}
	
	$scope.findCities=function(localAddressesJsonArray){
		var citySet=new Set();
		for(var i in localAddressesJsonArray){
			if(localAddressesJsonArray[i].city!=null || localAddressesJsonArray[i].city!=""){
				citySet.add(localAddressesJsonArray[i].city);
			}
		}
		$scope.cities=Array.from(citySet);
		$scope.checkedCities=Array.from($scope.cities);
		$scope.$apply();
	}
	
	$scope.checkedCities=[];
	$scope.cityCheckBoxClicked=function(city,value){
		if (value == true) {
			$scope.checkedCities.push(city)
		} else if (value == false) {
			$scope.checkedCities.splice($scope.checkedCities.indexOf(city),1);	
		}
		var filteredAddressJsonArray=[];
		for(var i in $scope.addressesJsonArrayOriginal){
			if($scope.cityFilter($scope.addressesJsonArrayOriginal[i])){
				filteredAddressJsonArray.push($scope.addressesJsonArrayOriginal[i]);
			}
		}
		calculateLatLng(filteredAddressJsonArray,filteredAddressJsonArray[0]);
		filteredAddressJsonArray=[];
	}
	$scope.cityFilter=function(item){
		for(var i in $scope.checkedCities){
			if(item.city==$scope.checkedCities[i]){
				for(var j in $scope.checkedNames){
					if(item.name==$scope.checkedNames[j]){
				       return true;
					}
				}
			}	
		}
		
		return false;
	}
	
	//-added-----------Names-------//
	$scope.findNames=function(localAddressesJsonArray){
		var citySet=new Set();
		for(var i in localAddressesJsonArray){
			if(localAddressesJsonArray[i].name!=null || localAddressesJsonArray[i].name!=""){
				citySet.add(localAddressesJsonArray[i].name);
			}
		}
		$scope.names=Array.from(citySet);
		$scope.checkedNames=Array.from($scope.names);
		$scope.$apply();
	}
	
	$scope.checkedNames=[];
	$scope.nameCheckBoxClicked=function(name,value){
		if (value == true) {
			$scope.checkedNames.push(name)
		} else if (value == false) {
			$scope.checkedNames.splice($scope.checkedNames.indexOf(name),1);	
		}
		var filteredAddressJsonArray=[];
		for(var i in $scope.addressesJsonArrayOriginal){
			if($scope.cityFilter($scope.addressesJsonArrayOriginal[i])){
				filteredAddressJsonArray.push($scope.addressesJsonArrayOriginal[i]);
			}
		}
		calculateLatLng(filteredAddressJsonArray,filteredAddressJsonArray[0]);
		filteredAddressJsonArray=[];
	}
	///////----------------------------------------------------//
	
	/*$scope.nameFilter=function(item){
		for(var i in $scope.checkedNames){
			if(item.name==$scope.checkedNames[i]){
				return true;
			}	
		}
		return false;
	}*/
	
	
});	