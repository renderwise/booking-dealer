<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>MAIN PAGE</title>
</head>
<body id="main" onload="openNav()">

<div class="tablink" ><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>  Dashboard</div>  
<div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <!--<a href="addDetails.jsp" >Add Dealer</a>-->
  <a href="addOrthodontist.jsp" >Add Orthodontist</a>
  <a href="addClinics.jsp" >Add 32watts Provider Clinic</a>
  <a href="searchResult2.jsp">Search Doctors/Clinics</a>
<!--   <a href="gmaps.jsp">Search Dealer</a>
  <a href="contactus.jsp">Contact Us</a>
  <a href="searchResult2.jsp">Search Dealer 2</a>
  <a href="searchResult.jsp">About</a> -->
</div>



<style type="text/css">
  <%@include file="CSS/style.css" %>
</style>
<script type="text/javascript"></script>
<script   src="scripts/common.js"></script>

</body>
</html>
