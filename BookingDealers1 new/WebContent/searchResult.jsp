<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta id="Viewport" name="viewport"
	content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">


<title>Find Doctors</title>

<script type="text/javascript" src="scripts/common.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNfUBpqywXDv4twx19Nmjqccc1l_KZsFo"></script>
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
	
    <a href="login.jsp">Home</a>
  
		<div class="filterFrame">
		


			<div class="col-xs-11" style="margin: 3px; padding: 0; width: 97%">
				<div class="row" style="margin: 0;" >
				<div class="row topHeading" style="margin: 0;">FILTER BY</div>
			</div>
			
			
			<div class="row" style="margin: 0;">
			     <button   onclick="popupClick()" class="addButton" >Filter by City</button>
			   
					
				  <div class="customScroll" style="height: 36vh; overflow-x: hidden; padding: 5px;padding-top: 0;">
						<div class="col-xs-12 cities animated flipInX"
							ng-repeat="city in cities">
							<label ng-style="!value && {'color':'lightgray'}" >  {{city}}
							</label>
						</div>
					</div>
				</div>
				
				<div class="row" style="margin: 0;">
					  <button class="addButton">Filter by User</button>
				
				  <div class="customScroll" style="height: 36vh; overflow-x: hidden; padding: 5px;padding-top: 0;">
						<div class="col-xs-12 cities animated flipInX"
							ng-repeat="name in names">
							<label ng-style="!value && {'color':'lightgray'}" >  {{name}}
							</label>
						</div>
					</div>
				</div>
				

			</div>

		</div>
		
		

		
		
		
		
		
	</div>

	<!-- <span class="togglebutton" ng-click="openNav()">&#9776;</span>
 -->
 

	<div id="main" >
	
	
	<!-- POPUP PANEL -->
					
					<div id="myModal" class="modal">

							  <!-- Modal content -->
							  <div class="modal-content">
							    <div class="modal-header">
							      <span class="close" onclick="popupCLose()">&times;</span>
							      <h5>Select City</h5>
							    </div>
							    
							    
							   
										<div	ng-repeat="city in cities">
											<label ng-style="!value && {'color':'lightgray'}" > <input type="checkbox"
												onclick="cityCheckBoxClicked(city,value)" ng-init="value=true;"
												ng-model="value"> {{city}}
											</label>
										</div>
									
									
									 <button   style="width:100px;height:20px"; onclick="popupCLose()">Done</button>
							 
							  </div>
							
						</div>
					
					
					<!--  END POPUP PANEL -->
	
	
 <div id="map" style="width: 100%; height: 100vh;"></div>
</div>



</body>
</html>