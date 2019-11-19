<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>MAIN PAGE</title>
</head>
<body id="main" onload="initialize()">

<div class="tablink" ><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>  Add Clinics</div>  
<div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="login.jsp">Dashboard</a>
  <a href="addOrthodontist.jsp">Orthodontist</a>
  <a href="searchResult2.jsp">Search Doctors/Clinics</a>
  <!-- <a href="gmaps.jsp">Search Dealer</a>
  <a href="contactus.jsp">Contact Us</a>
  <a href="searchResult2.jsp">Logout</a>
  <a href="searchResult.jsp">About</a> -->
</div>

<div >
<input type="text"   placeholder="Enter Dr.Name" id="nameID"  required class="inputField">
  <input type="text"   placeholder="Enter Clinic Name" id="clinicID"  required class="inputField">
   <input type="text"   placeholder="Enter Phone Number" id="phoneNoID"  maxlength="10" required class="inputField">
  <input type="text"   placeholder="Enter EmailID" id="mailID"  class="inputField">
</div>

<div>
  <input type="text"    placeholder="Enter Building No" id="buildingID"  required class="inputField">
  <input type="text"    placeholder="Enter Street" id="StreetID"  required class="inputField">
  <input type="text"    placeholder="Enter City" id="CityID"  required class="inputField">
  <input type="text"    placeholder="Enter State" id="StateID"  required class="inputField">
  <input type="text"    placeholder="Enter Country" id="CountryID"  value="India" disabled required class="inputField">
  <input type="text"    placeholder="Enter Pin" id="PinID"  required class="inputField">
   
   
   
</div>

<div>
<button type="submit"  style="width:10%"   onclick="loadMapWITHlOcation();"  >Search Address</button>
 <button type="submit"  style="width:10%"   onclick="sendInfoClinic();"  >Add User</button>
</div>
<div>
 <input type="text"   id="selectedLocationAddressID"  placeholder="Selected Addres" style="width:40% !important;border-radius: 5px !important;height: 30px !important;" disabled="disabled">
 
</div>

<div>
   <input type="hidden"  placeholder="Enter Address" id="addressSearchID"  required class="inputField">
   <input type="hidden"    id="lat" style="width:40%" >
  <input type="hidden"   id="lon"  style="width:40%" >
  <input type="hidden"   id="city"  style="width:40%" >
</div>

<div id="googleMap" style="width:100%;height:400px;"></div>

<style type="text/css">
  <%@include file="CSS/style.css" %>
</style>
<script type="text/javascript"></script>
<script   src="scripts/common.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5txTYz5LZkRHjQwoxNH-0X9733yFkMOU&libraries=places&callback=initAutocomplete"
         async defer></script>
      

      
      
</body>
</html>
