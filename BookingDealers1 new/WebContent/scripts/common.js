var map='';
var markers = [];



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

var zipcode;


//MAP CODE-----------------------//
function loadMapWITHlOcation() {
	
	 var address =genearteAutoAddress(); //document.getElementById('addressSearchID').value;
	 var state = document.getElementById('StateID').value;
	 var city = document.getElementById('CityID').value;
	
	 if(address!=null && address!=''){
	 
     geocoder = new google.maps.Geocoder();
     geocoder.geocode({
     'address': address
     }, function(results, status) {   
    	 
    	
         var lat=results[0].geometry.location.lat();    
         var lng=results[0].geometry.location.lng();  
         console.log(lat+' '+lng);
         
         document.getElementById("lat").value =lat;
	     document.getElementById("lon").value = lng;
	     document.getElementById('selectedLocationAddressID').value=address;
         document.getElementById('city').value=city;
         
         var mapOptions = {
        	       center:new google.maps.LatLng(lat, lng), 
        	       zoom:18, 
        	       mapTypeId:google.maps.MapTypeId.ROADMAP
        	    };
        			
         map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
         
         var  marker = new google.maps.Marker({
       	  position: new google.maps.LatLng(lat,lng),
               map: map   });
   
        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + lat + '<br />Longitude: ' + lng
            });
            infoWindow.open(map, marker);
        });
        
         markers.push(marker);
         
         addListenerOnMApp(map);
     });
	 }
	
 }


function initialize() {
	
	
	getautoSearch();
    var myLatlng = new google.maps.LatLng(24.18061975930,79.36565089010);
    var myOptions = {
        zoom:12,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
   
    addListenerOnMApp(map);
    
}


function addListenerOnMApp( map1){
	
	  google.maps.event.addListener(map1, "click", function(event) {
	        // get lat/lon of click
	    	
	    	DeleteMarkers();
	        var clickLat = event.latLng.lat();
	        var clickLon = event.latLng.lng();

	        // show in input box
	        
	        document.getElementById("lat").value = clickLat.toFixed(5);
	        document.getElementById("lon").value = clickLon.toFixed(5);
	        
	        
	         var  marker = new google.maps.Marker({
	        	  position: new google.maps.LatLng(clickLat,clickLon),
	                map: map   });
	    
	         google.maps.event.addListener(marker, "click", function (e) {
	             var infoWindow = new google.maps.InfoWindow({
	                 content: 'Latitude: ' + clickLat + '<br />Longitude: ' + clickLon
	             });
	             infoWindow.open(map, marker);
	         });
	         
	         markers.push(marker);
	         
	        displayLocation(clickLat, clickLon);
	       
	         
	    });	
}

function DeleteMarkers() {
    //Loop through all the markers and remove
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


function displayLocation(latitude,longitude){
    var geocoder;
    var address;
    var state;
    var city='';
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                     address= results[0].formatted_address ;
                     
                     
                     var  value=address.split(",");

                     count=value.length;
                     if(count>=2){
                     var country=value[count-1];
                      state=value[count-2];
                      if(count>=3){
                       city=value[count-3];
                      }
                     }
                    // 
                     
                     
                   document.getElementById('selectedLocationAddressID').value=address;
                   if(city==''){
                	   document.getElementById('city').value=state;
                   }
                   else{
                	   document.getElementById('city').value=city;
                   }
                   
                   // alert(address);
                }
            }
        }
    );
}


function getautoSearch() {
	  var input = document.getElementById('addressSearchID');
	  new google.maps.places.Autocomplete(input);
}

//-----------------------------END------------------------------------------------------//

/*

function callJSp(){
	
	
	alert('Start');
	var url="/Booking/addDBData.jsp?INPUT=OK";
    // window.open(url,"_blank","width=700,height=600"); 
	 window.open(url, '', 'center=yes,resizable=0,scrollbars=1,width=750,height=400,top=200,left=300');
	return true;
	
	
}
*/

function nearsearch(){
	
	
	nearme();
	
}

function nearme(){

	
	
	
	
	
	
	var x,y;
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    var map, infoWindow;

     
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

     x=position.coords.latitude;
     y=position.coords.longitude;
     console.log(x+"ycfvvfgjbgkhg");
     console.log(y);
     finddistance(x,y);
        });
  	  
      }
      else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

  

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

	
}


function finddistance(x,y){
	
	   cities = [];
	    names = [];
	    cityList=[];
	var dataArray;
	var addressArray;
	 var searchListData='';
	var data = document.getElementById("citydataListID").value;
	document.getElementById("searchListDataID").value=data;
	
	dataArray=data.split(listSeprator);
	 for(var k=0;k<dataArray.length-1;k++){
	addressArray=dataArray[k].split(valueSeprator);
	console.log(addressArray[3]);
	console.log(addressArray[4]);
	
	 var x1=nearmedoctor(x,y,addressArray[4],addressArray[3],"K");
	 var dis=document.getElementById("mySelect").value;
	 console.log(x1);
	 	if(x1<dis){
	 		
	 		
	 	   cities.push(addressArray[0]);
	        names.push(addressArray[2]);
	        if(searchListData==''){
	        	 searchListData=dataArray[k];
	        }
	        else{
	        searchListData=searchListData+listSeprator+dataArray[k];
	        }
	 	}
	 	
	 	
	 }
	 if(searchListData==""){
		 
		 alert("No doctor found at this location");
		 location.reload();
		 
	 }
	 console.log(searchListData+"fguygbghkbkui");
	  document.getElementById("searchListDataID").value=searchListData;
		 
	  displayUserName();
	  loadMapOnSearch();
	
	
	}




function nearmedoctor(lat1,lon1,lat2,lon2,unit){
	
	
	
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		
		console.log(Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta));
		return dist;
	}
	
	
	
	
}



function loadnearme(pincode){
	
	
	
	
	

		
		var dataArray;
		var addressArray;
		cities = [];
		  names = [];
		  var searchListData='';
	    var data = document.getElementById("citydataListID").value;
		dataArray=data.split(listSeprator);
		var dataAdded = $("#browsersPin option[value='" + $('#SEARCHPINFROMLISTID').val() + "']").attr('id');
		//var dataAdded =document.getElementById("SELECTEDLISTIDPin").getElementsByTagName("label");
		
		    for(var k=0;k<dataArray.length-1;k++){
				addressArray=dataArray[k].split(valueSeprator);
				var t=dataAdded;
				if(addressArray[8]==pincode){
					
					
					    cities.push(addressArray[0]);
				        names.push(addressArray[2]);
				        if(searchListData==''){
				        	 searchListData=dataArray[k];
				        }
				        else{
				        searchListData=searchListData+listSeprator+dataArray[k];
				        }
				}
			}
			  
		  document.getElementById("searchListDataID").value=searchListData;
		 
		  displayUserName();
		  loadMapOnSearch();
	





}

	
	
	
	
	







function sendInfo()  
{  
 
	 var name=document.getElementById('nameID').value;
	 var address=document.getElementById('selectedLocationAddressID').value;
	 var long=document.getElementById('lon').value;
	 var lat=document.getElementById('lat').value;
	 var city=document.getElementById('city').value;

	 if(name!=null && name!='' && address!=null && address!='' && long!=null && long!='' 
		 && lat!=null && lat!='' && city!=null && city!='' ){
	 var param="?NAME="+name+"&ADDRESS="+address+"&LONG="+long+"&LAT="+lat+"&CITY="+city;
	
		var url="addDBData.jsp"+param;  
		  
		if(window.XMLHttpRequest){  
		request=new XMLHttpRequest();  
		}  
		else if(window.ActiveXObject){  
		request=new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		  
		try{  
		request.onreadystatechange=getInfo;  
		request.open("GET",url,true);  
		request.send();  
		}catch(e){alert("Unable to connect to server");}  
	 }
	 else{
		 alert('Data Missing Enter Name and Select Location');
	 }
}  

//ADD ORTHODONTIS

	function sendInfoOrtho()  
	{  
		var clinicName=document.getElementById('clinicID').value;
		var DrName=document.getElementById('nameID').value;
		 var phoneNo=document.getElementById('phoneNoID').value;
		 var mailId=document.getElementById('mailID').value;
		 var address=document.getElementById('selectedLocationAddressID').value;
		 var long=document.getElementById('lon').value;
		 var lat=document.getElementById('lat').value;
		 var city1=document.getElementById('city').value;
		 var city=city1.trim();
		 var building= document.getElementById("buildingID").value ;
		 var street=document.getElementById("StreetID").value;
		 var cityenter=document.getElementById("CityID").value;
		 var state=	document.getElementById("StateID").value;
		 var pin=	document.getElementById("PinID").value;
		 
		 var type='Orthodonotist';

		// email validation
			var Emailvalidationd=validateCaseSensitiveEmail(mailId);
			 if(!Emailvalidationd)
			 {
			 alert('Please Enter Valid Email');
			 }
			 else if(clinicName!=null && clinicName!=''&& DrName!=null && DrName!='' &&  phoneNo!='' &&  mailId!=''&& address!=null && address!='' && long!=null && long!='' 
			 && lat!=null && lat!='' && pin!=null && pin!=''&& city!=null && city!='' ){
		 var param="?clinicName="+clinicName+"&DrName="+DrName+"&PhoneNo="+phoneNo+"&EmailId="+mailId+"&ADDRESS="+address+"&LONG="+long+"&LAT="+lat+"&CITY="+city+"&type="+type+"&building="+building+"&street="+street+"&cityenter="+cityenter+"&state="+state+"&pin="+pin;
		
			var url="addDBDataOrtho.jsp"+param;  
			  
			if(window.XMLHttpRequest){  
			request=new XMLHttpRequest();  
			}  
			else if(window.ActiveXObject){  
			request=new ActiveXObject("Microsoft.XMLHTTP");  
			}  
			  
			try{  
			request.onreadystatechange=getInfo;  
			request.open("GET",url,true);  
			request.send();  
			}
			catch(e){alert("Unable to connect to server");}  
		 }
		 else{
			 alert('Data Missing Enter Name and Select Location');
		 }
	}  	  
  
function getInfo(){  
	if(request.readyState==4){  
	var val=request.responseText.trim();  
	responseTask(val);
	}  
}  


function responseTask(response){
	
	alert(response);
	document.getElementById("clinicID").value = "";
	document.getElementById("nameID").value = "";
	document.getElementById("phoneNoID").value = "";
	document.getElementById("mailID").value = "";
	document.getElementById("selectedLocationAddressID").value = "";
	document.getElementById("lon").value = "";
	document.getElementById("lat").value = "";
	document.getElementById("city").value = "";
	document.getElementById("buildingID").value = "";
	document.getElementById("StreetID").value = "";
	document.getElementById("CityID").value = "";
	document.getElementById("StateID").value = "";
	document.getElementById("PinID").value = "";
}


function genearteAutoAddress()
{
	
	try{
		 var building = document.getElementById('buildingID').value;
		 var street = document.getElementById('StreetID').value;
		 var city = document.getElementById('CityID').value;
		 var state = document.getElementById('StateID').value;
		 var country = document.getElementById('CountryID').value;
		 var pin=document.getElementById('PinID').value; 
	var address='';
	
	
	if(building!=''){
		address=building;
	}
	if(street!=''){
		if(address!=''){
			address=address+', '+street;
		}
		else{
			address=street;
		}
		
	}
	if(city!=''){
		if(address!=''){
			address=address+', '+city;
		}
		else{
			address=city;
		}
		
	}
	else{
		alert('City is Mandatory');
		return '';
	}
	if(state!=''){
		if(address!=''){
			address=address+', '+state;
		}
		else{
			address=state;
		}
		
	}
	else{
		alert('State is Mandatory');
		return '';
	}
	if(country!=''){
		if(address!=''){
			address=address+', '+country;
		}
		else{
			address=country;
		}
		
		if(pin!=''){
			if(address!=''){
				address=address+' '+pin;
			}
			else{
				address=pin;
			}
			
		}
	}
	else{
		alert('Country is Mandatory');
		return '';
	}
	
	
		
	}catch(e){}
	return address;
}


//add email validation function
function validateCaseSensitiveEmail(email) 
{ 
	
 //var reg = /^[^-\s][a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 if (reg.test(email)){
 return true; 
}
 else{
 return false;
 } 
} 

//add clinics fun
function sendInfoClinic()  
{  
	var clinicName=document.getElementById('clinicID').value;
	var DrName=document.getElementById('nameID').value;
	 var phoneNo=document.getElementById('phoneNoID').value;
	 var mailId=document.getElementById('mailID').value;
	 var address=document.getElementById('selectedLocationAddressID').value;
	 var long=document.getElementById('lon').value;
	 var lat=document.getElementById('lat').value;
	 var city1=document.getElementById('city').value;
	 var city=city1.trim();
	 var type='Clinic';
	 
	 var building= document.getElementById("buildingID").value ;
	 var street=document.getElementById("StreetID").value;
	 var cityenter=document.getElementById("CityID").value;
	 var state=	document.getElementById("StateID").value;
	 var pin=	document.getElementById("PinID").value;
	 
// email validation
	var Emailvalidationd=validateCaseSensitiveEmail(mailId);
	 if(!Emailvalidationd)
	 {
	 alert('Please Enter Valid Email');
	 }
	 else if(clinicName!=null && clinicName!='' &&  phoneNo!='' &&  mailId!=''&& address!=null && address!='' && long!=null && long!='' 
		 && lat!=null && lat!=''&& pin!=null && pin!=''&& city!=null && city!='' ){
	 var param="?clinicName="+clinicName+"&DrName="+DrName+"&PhoneNo="+phoneNo+"&EmailId="+mailId+"&ADDRESS="+address+"&LONG="+long+"&LAT="+lat+"&CITY="+city+"&type="+type+"&building="+building+"&street="+street+"&cityenter="+cityenter+"&state="+state+"&pin="+pin;
	
		var url="addDBDataClinics.jsp"+param;  
		  
		if(window.XMLHttpRequest){  
		request=new XMLHttpRequest();  
		}  
		else if(window.ActiveXObject){  
		request=new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		  
		try{  
		request.onreadystatechange=getInfo;  
		request.open("GET",url,true);  
		request.send();  
		}catch(e){alert("Unable to connect to server");}  
	 }
	 else{
		 alert('Data Missing Enter Name and Select Location');
	 }
}  

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
       // a = li[i].getElementsByTagName("a")[0];
        a=li;
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function popupClick() {
	
	document.getElementById("SELECTEDLISTID").innerHTML ="";
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	
}


function popupCLose() {
	
	 var modal = document.getElementById('myModal');
	 modal.style.display = "none";
	
}

function popupClickDr() {
	
	document.getElementById("SELECTEDLISTIDDr").innerHTML ="";
	var modal = document.getElementById('myModalDr');
	modal.style.display = "block";
	
}

function popupCLoseDr() {
	
	 var modal = document.getElementById('myModalDr');
	 modal.style.display = "none";
	
}


function popupClickClinic() {
	
	document.getElementById("SELECTEDLISTIDClinic").innerHTML ="";
	var modal = document.getElementById('myModalClinic');
	modal.style.display = "block";
	
}

function popupCLoseClinic() {
	
	 var modal = document.getElementById('myModalClinic');
	 modal.style.display = "none";
	
}

function popupClickPin() {
	
	document.getElementById("SELECTEDLISTIDPin").innerHTML ="";
	var modal = document.getElementById('myModalPin');
	modal.style.display = "block";
	
}

function popupCLosePin() {
	
	 var modal = document.getElementById('myModalPin');
	 modal.style.display = "none";
	
}




function onLoadSearch() {
	   addOnLoadData();
	   openNav();
	   loadMapOnSearch();
	
}
//Start City Filter
function addFilter() {
	
	var dataArray;
	var addressArray;
	cities = [];
	  names = [];
	  var searchListData='';
    var data = document.getElementById("citydataListID").value;
	dataArray=data.split(listSeprator);
	var dataAdded = $("#browsers option[value='" + $('#SEARCHCITYFROMLISTID').val() + "']").attr('value');
	//var dataAdded =document.getElementById("SELECTEDLISTID").getElementsByTagName("label");
	//for (var j=0; j<dataAdded.length; j++) {
	//    
	    for(var k=0;k<dataArray.length-1;k++){
			addressArray=dataArray[k].split(valueSeprator);
			var t=dataAdded;
			if(addressArray[0].toLowerCase()==dataAdded.toLowerCase()){
				
				
				    cities.push(addressArray[0]);
			        names.push(addressArray[2]);
			        if(searchListData==''){
			        	 searchListData=dataArray[k];
			        }
			        else{
			        searchListData=searchListData+listSeprator+dataArray[k];
			        }
			}
		}
	//}
		  
	  document.getElementById("searchListDataID").value=searchListData;
	 
	  displayUserName();
	  popupCLose();
	  loadMapOnSearch();
	}
//End City Filter

//Start PInCode Filter
function addFilterPin() {
	
	var dataArray;
	var addressArray;
	cities = [];
	  names = [];
	  var searchListData='';
    var data = document.getElementById("citydataListID").value;
	dataArray=data.split(listSeprator);
	var dataAdded = $("#browsersPin option[value='" + $('#SEARCHPINFROMLISTID').val() + "']").attr('id');
	//var dataAdded =document.getElementById("SELECTEDLISTIDPin").getElementsByTagName("label");
	
	    for(var k=0;k<dataArray.length-1;k++){
			addressArray=dataArray[k].split(valueSeprator);
			var t=dataAdded;
			if(addressArray[8]==dataAdded){
				
				
				    cities.push(addressArray[0]);
			        names.push(addressArray[2]);
			        if(searchListData==''){
			        	 searchListData=dataArray[k];
			        }
			        else{
			        searchListData=searchListData+listSeprator+dataArray[k];
			        }
			}
		}
		  
	  document.getElementById("searchListDataID").value=searchListData;
	 
	  displayUserName();
	  loadMapOnSearch();
	}

//PinCode End Filter



//Dr. Starts Filter
function addFilterDr() {
	
	var dataArray;
	var addressArray;
	cities = [];
	  names = [];
	  var searchListData='';
    var data = document.getElementById("citydataListID").value;
	dataArray=data.split(listSeprator);
	var dataAdded = $("#browsersDr option[value='" + $('#SEARCHDRFROMLISTID').val() + "']").attr('id');
	//var dataAdded =document.getElementById("SELECTEDLISTIDDr").getElementsByTagName("label");
	//for (var j=0; j<dataAdded.length; j++) {
	//    var splitdr=dataAdded[0].textContent.toLowerCase().split('_');
	//    var drtrim='';
	 //   for(i=0;i<splitdr.length;i++)
	//		{
	//	        if(i==0){
	//	        	drtrim=drtrim+splitdr[i];
	//	        }
	//	        else{
	//	        	drtrim=drtrim+' '+splitdr[i];
	//	        }
	//		}
	    for(var k=0;k<dataArray.length-1;k++){
			addressArray=dataArray[k].split(valueSeprator);
			//var t=dataAdded;
			if(addressArray[2].toLowerCase()==dataAdded.toLowerCase()){
				
				
				    cities.push(addressArray[0]);
			        names.push(addressArray[2]);
			        if(searchListData==''){
			        	 searchListData=dataArray[k];
			        }
			        else{
			        searchListData=searchListData+listSeprator+dataArray[k];
			        }
			}
		}
		  
	  document.getElementById("searchListDataID").value=searchListData;
	 
	  displayUserName();

	  loadMapOnSearch();
	}

//clinic code

function addFilterClinic() {
var dataArray;
var addressArray;
document.getElementById("searchListDataID").value='';
cities = [];
  names = [];
  var searchListData='';
  var data="";
  var dataAdded="";
var data = document.getElementById("citydataListID").value;
dataArray=data.split(listSeprator);
//var dataAdded = $("#browsersClinic option[value='" + $('#SEARCHCLINICFROMLISTID').val() + "']").attr('id');

var dataAdded = $('#browsersClinic option[value="' + $('#SEARCHCLINICFROMLISTID').val() + '"]').attr('id');

//var dataAdded = document.getElementById("SELECTEDLISTIDClinic").getElementsByTagName("label");

    for(var k=0;k<dataArray.length-1;k++){
		addressArray=dataArray[k].split(valueSeprator);
		var t=dataAdded;
		if(addressArray[9].toLowerCase()==t.toLowerCase()){
			
			
			    cities.push(addressArray[0]);
		        names.push(addressArray[2]);
		        if(searchListData==''){
		        	 searchListData=dataArray[k];
		        }
		        else{
		        searchListData=searchListData+listSeprator+dataArray[k];
		        }
		}
	}
	  
  document.getElementById("searchListDataID").value=searchListData;
 
  displayUserName();
  popupCLoseClinic();
  loadMapOnSearch();
  }
/*function addFilterClinic() {
	
	var dataArray;
	var addressArray;
	document.getElementById("searchListDataID").value='';
	cities = [];
	  names = [];
	  var searchListData='';
	  var data="";
	  var dataAdded="";
    var data = document.getElementById("citydataListID").value;
	dataArray=data.split(listSeprator);
	var dataAdded = $("#browsersClinic option[value='" + $('#SEARCHCLINICFROMLISTID').val() + "']").attr('id');
	//var dataAdded = document.getElementById("SELECTEDLISTIDClinic").getElementsByTagName("label");
	for (var j=0; j<dataAdded.length; j++) {
	    var splitdr=dataAdded[0].textContent.toLowerCase().split('_');
	    var drtrim='';
	    for(i=0;i<splitdr.length;i++)
			{
		        if(i==0){
		        	drtrim=drtrim+splitdr[i];
		        }
		        else{
		        	drtrim=drtrim+' '+splitdr[i];
		        }
			}
	    for(var k=0;k<dataArray.length-1;k++){
			addressArray=dataArray[k].split(valueSeprator);
			var t=dataAdded[j].textContent;
			if(addressArray[9].toLowerCase()==drtrim.toLowerCase()){
				
				
				    cities.push(addressArray[0]);
			        names.push(addressArray[2]);
			        if(searchListData==''){
			        	 searchListData=dataArray[k];
			        }
			        else{
			        searchListData=searchListData+listSeprator+dataArray[k];
			        }
			}
		}
	}
		  
	  document.getElementById("searchListDataID").value=searchListData;
	 
	  displayUserName();
	  popupCLoseClinic();
	  loadMapOnSearch();
	}*/

//end clinic code
//Dr. end Filter

var cities = [];
var names = [];

var listSeprator="##LS##";
var valueSeprator="##VS##";

function displayUserName()
{
	 document.getElementById("cityListID").children[0].innerHTML ="<label style=\"color:white\";></label>";
	 document.getElementById("nameListID").children[0].innerHTML ="<label style=\"color:black\";></label>";
	for(var j=0;j<cities.length; j++){
	  document.getElementById("cityListID").children[0].innerHTML +="<label id=style=\"color:white\";>"+cities[j]+"</label><br>";
	  document.getElementById("nameListID").children[0].innerHTML +="<label style=\"color:black\";>"+names[j]+"</label><br>";
	}
}



function addOnLoadData() {
	 
	    cities = [];
	    names = [];
	    cityList=[];
	var dataArray;
	var addressArray;
	var data = document.getElementById("citydataListID").value;
	document.getElementById("searchListDataID").value=data;
	
	dataArray=data.split(listSeprator);
	
	for(var i=0;i<dataArray.length-1;i++){
		addressArray=dataArray[i].split(valueSeprator);
		console.log(addressArray[2]);
		cities.push(addressArray[0]);
		names.push(addressArray[2]);
	}
	
	names.sort();
	for(var j=0;j<cities.length; j++){
		
	
		console.log(names[j]);
	}
	
	displayUserName();
	
	 
}



function loadMapOnSearch() {
	
	  var  marker='';
	  var infowindow = new google.maps.InfoWindow();
	  var bounds  =new google.maps.LatLngBounds();
	  var lat=0;
	  var lang=0;
	  var number=0;
	  
	  
	var myLatlng=new google.maps.LatLng('20.59585338718739','78.96616840260504');
	    var data = document.getElementById("searchListDataID").value;
	    dataArray=data.split(listSeprator);
	for(var i=0;i<dataArray.length;i++){
		addressArray=dataArray[i].split(valueSeprator);
		if(addressArray!=''){
		lat=lat+parseFloat(addressArray[4]);
		lang=lang+parseFloat(addressArray[3]);
		number++;
	 }
	}
	if(number!=0){
	   myLatlng=new google.maps.LatLng((lat/number),(lang/number));
	}
	
	var zoom=0;
	 if(number==1){
		 zoom=12;
	  }
	 else{
		 zoom=5;
	 }
	
	
    var myOptions = {
        zoom:zoom,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    
	for(var i=0;i<dataArray.length;i++){
		addressArray=dataArray[i].split(valueSeprator);
		marker= new google.maps.Marker({
			  address:addressArray[1],
			  name:addressArray[2],
			  emailid:addressArray[6],
			  phoneNo:addressArray[7],
			  clinicName:addressArray[9],
		  	  position: new google.maps.LatLng(addressArray[4],addressArray[3]),
	          map: map   });
		
		
		 var loc = new google.maps.LatLng(addressArray[4], addressArray[3]);
		 bounds.extend(loc);
		 
		
		 google.maps.event.addListener(marker, 'click', function() {
			 infowindow.setContent('<div><h3 style=" color:orange;"><strong>' + this.name + '</strong></h3></div>' +'<div><h4 style=" color:Blue;">Clinic : ' + this.clinicName + ' </h4></div>'+
					 '<div "><strong>Place : ' + this.address + '<br></div></strong>'+
					 '<div"><strong>EmailId : ' + this.emailid + '</strong><br></div>'+
					 '<div ><color:red><strong>Phone NO : ' + this.phoneNo + '<br></strong></div>');
			    	   infowindow.open(map, this);
			});


		 google.maps.event.addListener(marker,'mouseover', function() {
			 infowindow.setContent('<div><h3 style=" color:orange;"><strong>' + this.name + '</strong></h3></div>' +'<div><h4 style=" color:Blue;">Clinic : ' + this.clinicName + ' </h4></div>'+
					 '<div "><strong>Place : ' + this.address + '<br></div></strong>'+
					 '<div"><strong>EmailId : ' + this.emailid + '</strong><br></div>'+
					 '<div ><color:red><strong>Phone NO : ' + this.phoneNo + '<br></strong></div>');
			    	   infowindow.open(map, this);
			});

			// assuming you also want to hide the infowindow when user mouses-out
		 google.maps.event.addListener(marker,'mouseout', function() {
			 
			    infowindow.close();
			});
		 marker.setMap(map);
		 markers.push(marker);
	}
	 if(number!=1){
		 map.fitBounds(bounds);
	  }
	    	  
}
//City Search 
function getSearchData(){
	
	var message="";
	 var selectedItemID = $("#browsers option[value='" + $('#SEARCHCITYFROMLISTID').val() + "']").attr('id');
	var dataAdded =document.getElementById("SELECTEDLISTID").getElementsByTagName("label");
	
	if(selectedItemID==undefined){
		message='Select City';
	}
	else{
			for (var j=0; j<dataAdded.length; j++) {
				if(selectedItemID==dataAdded[j].id){
					message="City Already Added";
					break;
				}
			}
	}
	if(message!=""){
		alert(message);
	}
	else{
	        document.getElementById("SELECTEDLISTID").innerHTML +="<label style=\"margin:2px\"; id="+selectedItemID+" >"+document.getElementById("SEARCHCITYFROMLISTID").value+"</label><br>";
	}
	
	addFilter();
}

//Pinode 
function getSearchDataPin(){
	
	var message="";
	 var selectedItemID = $("#browsersPin option[value='" + $('#SEARCHPINFROMLISTID').val() + "']").attr('id');
	var dataAdded =document.getElementById("SELECTEDLISTIDPin").getElementsByTagName("label");
	
	if(selectedItemID==undefined){
		message='Please Select PinCode';
	}
	else{
			for (var j=0; j<dataAdded.length; j++) {
				if(selectedItemID==dataAdded[j].id){
					message="Pincode Already Added";
					break;
				}
			}
	}
	if(message!=""){
		alert(message);
	}
	else{
	        document.getElementById("SELECTEDLISTIDPin").innerHTML +="<label style=\"margin:2px\"; id="+selectedItemID+" >"+document.getElementById("SEARCHPINFROMLISTID").value+"</label><br>";
	}
	
	addFilterPin();
}

 // Dr Search
function getSearchDataDr(){
	
	var message="";
	 var selectedItemID = $("#browsersDr option[value='" + $('#SEARCHDRFROMLISTID').val() + "']").attr('id');
	var dataAdded =document.getElementById("SELECTEDLISTIDDr").getElementsByTagName("label");
	
	if(selectedItemID==undefined){
		message='Select Dr.';
	}
	else{
			for (var j=0; j<dataAdded.length; j++) {
				if(selectedItemID==dataAdded[j].id){
					message="Dr. Already Added";
					break;
				}
			}
	}
	var DrSplit=selectedItemID.split(' ');
	var drtrim='';
	for(i=0;i<DrSplit.length;i++)
		{
	        if(i==0){
	        	drtrim=drtrim+DrSplit[i];
	        }
	        else{
	        	drtrim=drtrim+'_'+DrSplit[i];
	        }
		}		
	if(message!=""){
		alert(message);
	}
	else{
	        document.getElementById("SELECTEDLISTIDDr").innerHTML +="<label style=\"margin:2px\"; id="+drtrim+" >"+document.getElementById("SEARCHDRFROMLISTID").value+"</label><br>";
	}
	
	addFilterDr();
}



/*Clinic search*/






function getSearchDataClinic(){
	
	var message="";
	var dataAdded="";
	var selectedItemID="";
	 var selectedItemID = $("#browsersClinic option[value='" + $('#SEARCHCLINICFROMLISTID').val() + "']").attr('id');
	var dataAdded =document.getElementById("SELECTEDLISTIDClinic").getElementsByTagName("label");
	
	if(selectedItemID==undefined){
		message='Select Clinic.';
	}
	else{
			for (var j=0; j<dataAdded.length; j++) {
				if(selectedItemID==dataAdded[j].id){
					message="Clinic Already Added";
					break;
				}
			}
	}
	var DrSplit=selectedItemID.split(' ');
	var drtrim='';
	for(i=0;i<DrSplit.length;i++)
		{
	        if(i==0){
	        	drtrim=drtrim+DrSplit[i];
	        }
	        else{
	        	drtrim=drtrim+'_'+DrSplit[i];
	        }
		}		
	if(message!=""){
		alert(message);
	}
	else{
	        document.getElementById("SELECTEDLISTIDClinic").innerHTML +="<label style=\"margin:2px\"; id="+drtrim+" >"+document.getElementById("SEARCHCLINICFROMLISTID").value+"</label><br>";
	}

	addFilterClinic();
}



function cleanClinic(){

	document.getElementById("SEARCHCITYFROMLISTID").value= "";
	document.getElementById("SEARCHPINFROMLISTID").value= "";
	document.getElementById("SEARCHDRFROMLISTID").value= "";
	document.getElementById("SEARCHCLINICFROMLISTID").value= "";
		
}