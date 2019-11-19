<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<%@ page import="java.util.*" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.net.Socket"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.io.DataInputStream"%>
<%@ page import="java.io.DataOutputStream"%>
<%@ page import="java.io.EOFException"%>

<%!
public static String executeQuery(String name,String add,String log,String lat,String city){
    
    
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
   // con=DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb","root","System123#");
    con=DriverManager.getConnection("jdbc:mysql://localhost:3306/booking","root","root");
     s = con.createStatement();

    String query="INSERT INTO BOOKING_DEALER(NAME, ADDRESS, LONGITUDE, LATITUDE,CITY)   VALUES('"+name+"','"+add+"','"+log+"','"+lat+"','"+city+"'); ";
    
    //otho and clinics qry
  //  String clinics="INSERT INTO booking_clinics(NAME,Email,PhoneNo,ClinicName, ADDRESS, LONGITUDE, LATITUDE,CITY)   VALUES('"+name+"','"+email+"','"+phone+"','"+clinic+"','"+add+"','"+log+"','"+lat+"','"+city+"'); ";
    //String ortho="INSERT INTO BOOOKING_orthodontist(NAME, DrName,Email,PhoneNo,ClinicName,ADDRESS, LONGITUDE, LATITUDE,CITY)   VALUES('"+name+"','"+drname+"','"+email+"','"+phone+"','"+clinic+"','"+add+"','"+log+"','"+lat+"','"+city+"'); ";
    
     
    
    System.out.println(query);
   
	    s.execute(query);
	  
	    response="User Added Sucessfully"; 
    }
    catch(Exception e){
    	e.printStackTrace();}
    finally{
	try{
    // rs.close();
     s.close();
     con.close();
	} catch(Exception e){
	    	e.printStackTrace();}
    }
    
    return response;
}


%>
<%
	
String name=request.getParameter("NAME");
String address=request.getParameter("ADDRESS");
String lng=request.getParameter("LONG");
String lat=request.getParameter("LAT"); 
String city=request.getParameter("CITY"); 

	
	out.print(executeQuery(name,address,lng,lat,city)); 
	
%>















