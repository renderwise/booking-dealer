<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<%@ page import="java.util.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.net.Socket"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.io.DataInputStream"%>
<%@ page import="java.io.DataOutputStream"%>
<%@ page import="java.io.EOFException"%>

<%!
public static String executeQuery(String DrName,String clinicName,String phoneNo,String EmailId,String add,String log,String lat,String city,String clinicType,String building,String street,String cityenter,String state,String pin){
    
    
    Connection con=null;
    Statement s=null;
    ResultSet rs=null;
    PreparedStatement pst=null;
     String response=""; 
    
     
    try{
    /*   Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
    con=DriverManager.getConnection("jdbc:sqlserver://172.16.25.16:1433;databaseName=adfuatcab","sa","p@ssw0rd");
    s = con.createStatement(); */
    
        Class.forName("com.mysql.jdbc.Driver").newInstance(); 
// con=DriverManager.getConnection("jdbc:mysql://localhost:3306/booking","root","root");
con=DriverManager.getConnection("jdbc:mysql://localhost:3306/render_digiplan","render_digiplan","Digiplan123#");
  // con=DriverManager.getConnection("jdbc:mysql://localhost/workflow","root","system123#");
   s = con.createStatement();
	//handle 's problem
	String data="";
     data=clinicName;
     String words[]=data.split("\'");
     String clinicNameID="";
     for (int i = 0; i < words.length; i++) {
    	 if(i==0){
    		 clinicNameID=clinicNameID+words[i];
    	 }
    	 else
    	 {
    		 clinicNameID=clinicNameID+"\\'"+words[i];
         	//System.out.println(words[i]);
    	 }
     }
   
   
        // clinics qry
    String clinic="INSERT INTO boooking_dealer(DrName,ClinicName,EmailId,PhoneNo, ADDRESS, LONGITUDE, LATITUDE,CITY,TYPE,Building,Street,Cityenter,State,Pin)   VALUES('"+DrName+"','"+clinicNameID+"','"+EmailId+"','"+phoneNo+"','"+add+"','"+log+"','"+lat+"','"+city+"','"+clinicType+"','"+building+"','"+street+"','"+cityenter+"','"+state+"','"+pin+"'); ";
    
    System.out.println(clinic);	

	    s.execute(clinic);
	    
	    response="Clinic Added Sucessfully"; 
	   
    }
    catch(Exception e){
    e.printStackTrace();
    response="Clinic not Added !";}
    finally{
	try{
    // rs.close();
     s.close();
     con.close();
	} catch(Exception e){
	    	e.printStackTrace();
	    	response="Clinic not Added !";    	
	}
    }
    
    return response;
}


%>
<%
String DrName=request.getParameter("DrName");	
String clinicName=request.getParameter("clinicName");
String phoneNo=request.getParameter("PhoneNo");
String EmailId=request.getParameter("EmailId");
String address=request.getParameter("ADDRESS");
String lng=request.getParameter("LONG");
String lat=request.getParameter("LAT"); 
String city=request.getParameter("CITY"); 
String clinicType=request.getParameter("type");
String building=request.getParameter("building");
String street=request.getParameter("street");
String cityenter=request.getParameter("cityenter"); 
String state=request.getParameter("state"); 
String pin=request.getParameter("pin");
	out.print(executeQuery(DrName,clinicName,phoneNo,EmailId,address,lng,lat,city,clinicType,building,street,cityenter,state,pin)); 
	
	
%>


