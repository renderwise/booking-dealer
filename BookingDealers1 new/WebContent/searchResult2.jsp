
 <%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<%@ page import="java.util.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.net.Socket"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.io.DataInputStream"%>
<%@ page import="java.io.DataOutputStream"%>
<%@ page import="java.io.EOFException"%>

<%
  
    Connection con=null;
    Statement s=null;
    ResultSet rs=null;
    ResultSet rsquery=null;
    ResultSet rsquerypin=null;
    ResultSet rsqueryclinic=null;
    
    PreparedStatement pst=null;
    List<List<String>> listDataOriginal=new ArrayList();
    List<List<String>> listDataDr=new ArrayList();
    List<List<String>> listData=new ArrayList();
    List<List<String>> listDataCity=new ArrayList();
    List<List<String>> listDataPin=new ArrayList();
    List<List<String>> listDataClinic=new ArrayList();
 //   List<String> listdrsort=new ArrayList();
    ArrayList<String> listdrsort = new ArrayList<String>(); 
    String listSeprator="##LS##";
    String valueSeprator="##VS##";
    String dbData="";
    String dbDataCity="";
    String dbDataClinic="";
    try{
	    
	    
	    Class.forName("com.mysql.jdbc.Driver").newInstance(); 
	    // con=DriverManager.getConnection("jdbc:mysql://localhost/booking","root","root");
 //con=DriverManager.getConnection("jdbc:mysql://localhost:3306/booking","root","root");
	con=DriverManager.getConnection("jdbc:mysql://localhost:3306/render_digiplan","root","toor");
         
	     s = con.createStatement();

	    String query="SELECT  Id,Address,CITY,DrName,LONGITUDE, LATITUDE,EmailId,phoneNo,Pin,clinicName  FROM boooking_dealer ORDER BY drname ASC ; ";
	    
	    System.out.println(query);
	    	
	    rs = s.executeQuery(query);
	    System.out.println(rs);	    
	    while(rs.next()){
		List<String> data=new ArrayList();
	          data.add(rs.getString("Id"));
	          data.add(rs.getString("Address"));
	          data.add(rs.getString("CITY"));
	          data.add(rs.getString("DrName"));
	          data.add(rs.getString("LONGITUDE"));
	          data.add(rs.getString("LATITUDE"));
	          data.add(rs.getString("EmailId"));
	          data.add(rs.getString("phoneNo"));
	          data.add(rs.getString("Pin"));
	          data.add(rs.getString("clinicName"));
	          
	          
	          dbData=dbData+rs.getString("CITY")+valueSeprator+rs.getString("Address")+valueSeprator+rs.getString("DrName")
	                        +valueSeprator+rs.getString("LONGITUDE")+valueSeprator+rs.getString("LATITUDE")+valueSeprator+
	                        rs.getString("Id")+valueSeprator+rs.getString("EmailId")+valueSeprator+rs.getString("phoneNo")+
	                        valueSeprator+rs.getString("Pin")+valueSeprator+rs.getString("clinicName")+listSeprator;
	          listData.add(data);
	    }
	     listDataOriginal=listData;
	     listDataDr=listData;
	     rs.close();
	     String cityquery="SELECT DISTINCT CITY FROM BOOOKING_DEALER order by city asc";
		    System.out.println(cityquery);
	    	
		    rsquery = s.executeQuery(cityquery);
		    System.out.println(rsquery);
	      while(rsquery.next()){
				List<String> data=new ArrayList();

			          data.add(rsquery.getString("CITY"));

			          
			          
			          dbDataCity=dbDataCity+rsquery.getString("CITY")+listSeprator;
			          
			          
			          
			          
			          listDataCity.add(data);
			    } 
	      rsquery.close();
	      String pinquery="SELECT DISTINCT Pin FROM BOOOKING_DEALER order by pin asc";
		    System.out.println(cityquery);
	    	
		    rsquerypin = s.executeQuery(pinquery);
		    System.out.println(rsquerypin);
		   
	      while(rsquerypin.next()){
				List<String> data=new ArrayList();

			          data.add(rsquerypin.getString("Pin"));

			          
			          
			          dbDataCity=dbDataCity+rsquerypin.getString("Pin")+listSeprator;
			          listDataPin.add(data);
			    }
	      
	      String clinicquery="SELECT DISTINCT clinicName FROM BOOOKING_DEALER order by clinicname asc";
		    System.out.println(clinicquery);
	    	
		    rsqueryclinic = s.executeQuery(clinicquery);
		    System.out.println(rsqueryclinic);
	      while(rsqueryclinic.next()){
				List<String> data=new ArrayList();

			          data.add(rsqueryclinic.getString("clinicName"));

			          
			          
			          dbDataClinic=dbDataCity+rsqueryclinic.getString("clinicName")+listSeprator;
			          
			          
			          
			          
			          listDataClinic.add(data);
			    }
	      
		    }
		    catch(Exception e){
		    	rs.close();
		    	//rsquery.close();
		    	e.printStackTrace();}
		    finally{
			try{
		     
		     s.close();
		     rsquery.close();
		     rsquerypin.close();
		     rsqueryclinic.close();
		     con.close();
			} catch(Exception e){
			    	e.printStackTrace();}
		    }
		    
	    
	    %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta id="Viewport" name="viewport"
	content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

<script type="text/javascript" src="scripts/common.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNfUBpqywXDv4twx19Nmjqccc1l_KZsFo"></script>
<script type="text/javascript" src="scripts/jquery.js"></script>
<script type="text/javascript" src="scripts/angular.min.js"></script>

<link rel="stylesheet" type="text/css" href="CSS/bootstrap.css">
<link rel="stylesheet" type="text/css" href="CSS/sidebar.css">
<link rel="stylesheet" type="text/css" href="CSS/animate.css">
<link rel="stylesheet" type="text/css" href="CSS/style.css">


<style>

.example_d {
color: #20bf6b !important;
text-transform: uppercase;
background: #ffffff;
padding: 20px;
border: 4px solid #20bf6b !important;
border-radius: 6px;
display: inline-block;
}


.example_d:hover {
color: #494949 !important;
border-radius: 50px;
border-color: #494949 !important;
transition: all 0.3s ease 0s;
}


</style>


</head>

<body      onload="onLoadSearch()"><!-- ng-app="app" ng-controller="mapController" --> 

<div class="tablink" style="margin-left:238px"; ><span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>Search Doctors/Clinics</div>
 
 	
<div class="row">
<div class="col-md-5" style="padding-right: 60px">
	<div id="mySidenav" class="col-sm-6 sidenav" >	
    <a href="http://alignwisesmile.com/"  >Home</a>
  
		<div class="filterFrame">


			<div class="col-xs-11" style="margin: 3px; padding: 0; width: 97%">
				<div class="row" style="margin: 0;" >
				<div class="row topHeading" style="margin: 0;">FILTER BY</div>
			    </div>
		<form style="border:none">	
<!-- <div><button   onclick="popupClickClinic()" class="addButton" >Search By Clinic</button></div> -->
<div ><input list="browsersClinic" name="browsersClinic" placeholder="Search Clinic" id="SEARCHCLINICFROMLISTID"  onclick="cleanClinic()"   onChange ="addFilterClinic()" style="width:100%;height: 32px;margin-top: 5px; border-radius: 5px !important;margin-left: 2%;"></div>
		<!-- <div><button   style="width:100px;height:20px"; onclick="addFilterClinic()">Search</button></div>	 -->					





<div class="row" style="margin: 0;">
			<!--  <button   onclick="popupClickDr()" class="addButton" >Search By Doctor</button>
			 --> 
	<input list="browsersDr" name="browsersDr" placeholder="Search Doctor" id="SEARCHDRFROMLISTID"  onclick="cleanClinic()" onChange ="addFilterDr()" style="width:100%;height: 32px; border-radius: 5px !important;margin-left: 2%;  margin-top: 3px; ">
								
		     </div> 
		     
		     
		     <div class="row" style="margin: 0;">
			     <!-- <button   onclick="popupClick()" class="addButton" >Search By City</button> -->
			      <input list="browsers" name="browser" placeholder="Search City" id="SEARCHCITYFROMLISTID" onclick="cleanClinic()" onChange ="addFilter()"  style="width:100%; height: 32px; border-radius: 5px !important;margin-left: 2%;margin-top: 3px;">
				
			     
				  <div  class="customScroll" style="height: 36vh; overflow-x: hidden; padding: 5px;padding-top: 0;display: none; ">
				            <div id="cityListID"><label style="color:white;"></label></div>
				            
				            
				 </div>
			</div>	
			<div>
			<!-- <button   onclick="popupClickPin()" class="addButton" >Search By PIN</button> -->
			 <input list="browsersPin" name="browsersPin" placeholder="Search By PIN" id="SEARCHPINFROMLISTID" onclick="cleanClinic()" onChange ="addFilterPin()" style="width:100%; height: 32px; border-radius: 5px !important;margin-left: 2%;margin-top: 3px;">
								
			</div>
			
			<br/>
			

			<div style="margin-left: 2%" class="button_cont" align="center"><a class="example_d"  onclick="nearme()" target="_blank" rel="nofollow noopener" style="cursor:pointer" >Near Me</a></div>
			<div><select id="mySelect" onchange="nearsearch()">
			<option value="5">Select Range
  <option value="5">5 Kms range
  <option value="10">10 Kms range
  <option value="15">15 Kms range
  <option value="20">20 Kms range
</select>
			
			</div>
			
			</form>	
			<!-- <div><a href="searchResult2.jsp"><button type="button" onclick="">Refresh</button></a></div> -->
				
			                     
		</div>
	</div>
 </div>

<div style="margin-left:160px;color: #ea1d1d;text-align:center;font-size: 25px;border:2px"; >Doctors List</div>
 <div class="customScroll" style="margin-left: 275px; height: 70vh; overflow-x: hidden; padding: 5px;padding-top: 40px;">
				           <div id="nameListID"><label style="color:black;"></label></div>
				    </div>

 </div>
	<div id="main" >
	
	
	<!-- POPUP PANEL City -->
					
					<div id="myModal" class="modal">

							  <!-- Modal content -->
							  <div class="modal-content">
							    <div class="modal-header">
							      <span class="close" onclick="popupCLose()">&times;</span>
							      <h5>Select City</h5>
							    
								</div>
		 <input list="browsers" name="browser" placeholder="Search...." id="SEARCHCITYFROMLISTID"  style="width:60%; border-radius: 5px !important;margin-left: 2%;">
															
								<datalist id="browsers">
							     
								<% for(int i=0;i<listDataCity.size();i++){%>	 
									<option value="<%=listDataCity.get(i).get(0).trim()%>" id="<%=listDataCity.get(i).get(0).trim()%>">
								<% }%>
								
								 </datalist><button   style="width:20%;height:20px"; onclick="getSearchData()">Add</button><br>
								 <br>
								
								
								<div class="row" style="margin: 0;">
								<div class="customScroll" id="SELECTEDLISTID">
							<%-- 	 
								 <input style="margin:5px"; name="CITYLIST"  type="checkbox" 
									id="<%=listDataOriginal.get(i).get(1)+"##VS##"+listDataOriginal.get(i).get(2)+"##VS##"+listDataOriginal.get(i).get(3)+"##VS##"+listDataOriginal.get(i).get(4)+"##VS##"+listDataOriginal.get(i).get(5)%>" >
									<label style="margin:2px";><%=listDataOriginal.get(i).get(2)%></label><br>  --%>
								 
								</div>
								</div>
									
									<button   style="width:100px;height:20px"; onclick="addFilter()">Done</button>
							 
							  </div>
							
						</div>
					
					
					<!--  END POPUP PANEL City -->	
					<!-- Start POPUP PANEL Dr -->
					
					<div id="myModalDr" class="modal">

							  <!-- Modal content -->
							  <div class="modal-content">
							    <div class="modal-header">
							      <span class="close" onclick="popupCLoseDr()">&times;</span>
							      <h5>Select Doctor</h5>
								</div>
								 <input list="browsersDr" name="browsersDr" placeholder="Search...." id="SEARCHDRFROMLISTID"  style="width:60%; border-radius: 5px !important;margin-left: 2%;">
								<datalist id="browsersDr">
								
							
								<% for(int i=0;i<listDataDr.size();i++){%>	 
									<option value="<%=listDataDr.get(i).get(3).trim()%>" id="<%=listDataDr.get(i).get(3).trim()%>">
								<% }%>
								
								 </datalist><button   style="width:20%;height:20px"; onclick="getSearchDataDr()">Add</button><br>
								 <br>
								<div class="row" style="margin: 0;">
								<div class="customScroll" id="SELECTEDLISTIDDr">
								 
								</div>
								</div>
									<button   style="width:100px;height:20px"; onclick="addFilterDr()">Done</button>
							 
							  </div>
							
						</div>
					
					
					<!--  END POPUP PANEL Dr -->	
					<!-- clinic code -->
					
					
					
					
					
					<!-- Start POPUP PANEL Dr -->
					
					<div id="myModalClinic" class="modal">

							  <!-- Modal content -->
							  <div class="modal-content">
							    <div class="modal-header">
							      <span class="close" onclick="popupCLoseClinic()">&times;</span>
							      <h5>Select Clinic</h5>
								</div>
								 <input list="browsersClinic" name="browsersClinic" placeholder="Search...." id="SEARCHCLINICFROMLISTID"  style="width:60%; border-radius: 5px !important;margin-left: 2%;">
								<datalist id="browsersClinic">
								<% for(int i=0;i<listDataClinic.size();i++){%>	 
									<option value="<%=listDataClinic.get(i).get(0).trim()%>" id="<%=listDataClinic.get(i).get(0).trim()%>">
								<% }%>
								
								 </datalist>
								 <!-- <button   style="width:20%;height:20px"; onclick="getSearchDataClinic()">Add</button><br>
								 <br> -->
								<div class="row" style="margin: 0;">
								<div class="customScroll" id="SELECTEDLISTIDClinic">
								 
								</div>
								</div>
									<button   style="width:100px;height:20px"; onclick="addFilterClinic()">Done</button>
							 
							  </div>
							
						</div>
					
					
					<!--  END POPUP PANEL clinic -->	
					
					<!-- Start POPUP PANEL Pin -->
					
					<div id="myModalPin" class="modal">

							  <!-- Modal content -->
							  <div class="modal-content">
							    <div class="modal-header">
							      <span class="close" onclick="popupCLosePin()">&times;</span>
							      <h5>Select PinCode</h5>
							    
								</div>
								 <input list="browsersPin" name="browsersPin" placeholder="Search...." id="SEARCHPINFROMLISTID"  style="width:60%; border-radius: 5px !important;margin-left: 2%;">
															
								<datalist id="browsersPin">
							     
								<% for(int i=0;i<listDataPin.size();i++){%>	 
									<option value="<%=listDataPin.get(i).get(0).trim()%>" id="<%=listDataPin.get(i).get(0).trim()%>">
								<% }%>
								
								 </datalist><button   style="width:20%;height:20px"; onclick="getSearchDataPin()">Add</button><br>
								 <br>
								
								
								<div class="row" style="margin: 0;">
								<div class="customScroll" id="SELECTEDLISTIDPin">
							<%-- 	 
								 <input style="margin:5px"; name="CITYLIST"  type="checkbox" 
									id="<%=listDataOriginal.get(i).get(1)+"##VS##"+listDataOriginal.get(i).get(2)+"##VS##"+listDataOriginal.get(i).get(3)+"##VS##"+listDataOriginal.get(i).get(4)+"##VS##"+listDataOriginal.get(i).get(5)%>" >
									<label style="margin:2px";><%=listDataOriginal.get(i).get(2)%></label><br>  --%>
								 
								</div>
								</div>
									
									<button   style="width:100px;height:20px"; onclick="addFilterPin()">Done</button>
							 
							  </div>
							
						</div>
					
					
					<!--  END POPUP PANEL Dr -->	
</div>

 <div id="map" class="col-md-7" style="height: 110vh; "></div>
</div>
<div>
   
   <input type="hidden"  value="<%=dbData%>"  id="citydataListID" style="width:40%" >
   <input type="hidden"   id="searchListDataID" style="width:40%" >
   <input type="hidden"  value="<%=dbDataCity%>"  id="cityListnotComman" style="width:40%" >
   
 
</div>
</body>
</html>
 