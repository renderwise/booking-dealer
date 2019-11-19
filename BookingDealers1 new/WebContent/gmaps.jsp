<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta id="Viewport" name="viewport"
	content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">


<title>Find Doctors</title>

<script type="text/javascript" src="scripts/common.js"></script>
<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNfUBpqywXDv4twx19Nmjqccc1l_KZsFo"></script>
<script type="text/javascript" src="scripts/jquery.js"></script>
<script type="text/javascript" src="scripts/angular.min.js"></script>
<script type="text/javascript" src="scripts/controller.js"></script>
<link rel="stylesheet" type="text/css" href="CSS/bootstrap.css">
<link rel="stylesheet" type="text/css" href="CSS/sidebar.css">
<link rel="stylesheet" type="text/css" href="CSS/animate.css">
<link rel="stylesheet" type="text/css" href="CSS/style.css">

</head>

<body ng-app="app" ng-controller="mapController"  onload="openNav()">

<div class="tablink" style="margin-left:250px" ><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>  Search Dealer</div>
 

	<div id="mySidenav" class="sidenav">
	<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="login.jsp">Home</a>
  
		<div class="row" style="margin: 0;">
		<!-- 	<div class=""
				style="float: right; width: 3%; height: 100vh; background: #333333;"
				ng-click="closeNav()">
				<div class=""
					style="font-size: large; background-color: #fff0f0; width: 25px; margin-top: 47.5vh; border-radius: 15px; text-align: center; color: black;">
					<span>&times;</span>
				</div>
			</div> -->


			<div class="col-xs-11" style="margin: 0; padding: 0; width: 97%">
				<div class="row" style="margin: 0;" >
				<div class="row topHeading" style="margin: 0;">Filters</div>
				</div>
				
				<div class="row" style="margin: 0;">
					<div class="row heading " style="margin: 0;">Select Cities</div>
					<div class="customScroll" style="height: 16vh; overflow-x: hidden; padding: 5px;padding-top: 0;">
						<div class="col-xs-12 cities animated flipInX"
							ng-repeat="city in cities">
							<label ng-style="!value && {'color':'lightgray'}" > <input type="checkbox"
								ng-click="cityCheckBoxClicked(city,value)" ng-init="value=true;"
								ng-model="value"> {{city}}
							</label>
						</div>
					</div>
				</div>
				
				<div class="row" style="margin: 0;">
					<div class="row heading " style="margin: 0;">Select Name</div>
					<div class="customScroll" style="height: 36vh; overflow-x: hidden; padding: 5px;padding-top: 0;">
						<div class="col-xs-12 cities animated flipInX"
							ng-repeat="name in names">
							<label ng-style="!value && {'color':'lightgray'}" > <input type="checkbox"
								ng-click="nameCheckBoxClicked(name,value)" ng-init="value=true;"
								ng-model="value"> {{name}}
							</label>
						</div>
					</div>
				</div>
			
				
				<div class="row" style="margin: 0; margin-top: 2px;">
					<div class="heading" style="">Selected Dealer</div>
					<div class="customScroll" style="height: 33vh; overflow-x: hidden; padding: 5px;padding-top: 0;">
						<div class="row" style="margin: 0;"
							ng-repeat="address in addressesJsonArrayOriginal|filter:cityFilter">
							<div class="col-xs-12 cities animated flipInX">{{address.dealerName}}</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>

	<!-- <span class="togglebutton" ng-click="openNav()">&#9776;</span>
 -->

	<div id="main" >
 <div id="map" style="width: 100%; height: 100vh;"></div>
</div>
  
</body>
</html>