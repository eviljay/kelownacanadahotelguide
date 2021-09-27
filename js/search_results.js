// SET INITIAL OBJECTS, VARIABLES, ETC
var hl = 0;
var al = 0;

var jsLatLng;
var jsGooMap;
var jsMapBounds;

var mrkrImage;
var mrkrImageShadow;
var mrkrLatLng;
var mrkrMarker = [];
var mrkrInfoWindow = [];




// LOAD INITIAL MAP
function initMap(tempLat, tempLong, tempHotelList, tempAttractionList){
	jsLatLng = new google.maps.LatLng(tempLat, tempLong);
	jsMapBounds = new google.maps.LatLngBounds();
	
	// SETUP MAP
	var jsStyleOptions = [ { "featureType": "poi", "stylers": [ { "visibility": "off" } ] } ];
	var jsGooMapOptions = {
		scrollwheel: false,
		zoom: 11,
		center: jsLatLng,
		styles: jsStyleOptions,
		mapTypeControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		// mapTypeId: google.maps.MapTypeId.SATELLITE
		// mapTypeId: google.maps.MapTypeId.HYBRID
		// mapTypeId: google.maps.MapTypeId.TERRAIN
	}
	jsGooMap = new google.maps.Map(document.getElementById("map_canvas"), jsGooMapOptions);
	
	// CREATE OUR HOTEL MAP MARKERS (hl)
	if (tempHotelList != undefined) {
		for (hl = 0; hl < tempHotelList.length; hl++) {
			if (tempHotelList[hl]) {
				var tempHotelItem = tempHotelList[hl];
				var tempIconNumber = hl + 1;
				createHotelMarker(hl, tempIconNumber, tempHotelItem[0], tempHotelItem[1], tempHotelItem[2], tempHotelItem[3], tempHotelItem[4], tempHotelItem[5], tempHotelItem[6], tempHotelItem[7], tempHotelItem[8]);
			}
		}
	}
	
	// CREATE OUR ATTRACTION(S) MAP MARKERS (al)
	if (tempAttractionList != undefined){
		for (al = 0; al < tempAttractionList.length; al++) {
			if (tempAttractionList[al]) {
				var tempAttractionItem = tempAttractionList[al];
				createAttractionMarker(al, tempAttractionItem[0], tempAttractionItem[1], tempAttractionItem[2]);
			}
		}
	}
	
	// TAKE OUR BOUNDS AND AUTO CENTER AND ZOOM
	jsGooMap.fitBounds(jsMapBounds);
}




function createHotelMarker(mrkrIndex, mrkrIconNumber, mrkrHotelName, mrkrHotelAddress, mrkrStarImage, mrkrStarAlt, mrkrThumb, mrkrPointLat, mrkrPointLng, mrkrLoRate, mrkrLink){	
	// SETUP MARKER ICON
	var mkrkIndex = mrkrIndex;
	var mrkrImage = 'http://' + window.location.host + '/img/map_icons/map_num-' + mrkrIconNumber + '.png';
	var mrkrImageShadow = 'http://' + window.location.host + '/img/map_icons/map_hotel_shadow.png';
	var mrkrLatLng = new google.maps.LatLng(mrkrPointLat, mrkrPointLng);
	var jumpToCount = mrkrIndex + 1;
	
	// SET CONTENT FOR THIS MARKER
	var mrkrContentString = '<div id="gmapInfoWindow">';
		mrkrContentString = mrkrContentString + '<table border="0" cellspacing="2" cellpadding="0">';
			mrkrContentString = mrkrContentString + '<tr>';
				mrkrContentString = mrkrContentString + '<td valign="top">';
					mrkrContentString = mrkrContentString + '<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">';
						mrkrContentString = mrkrContentString + '<tr>';
							mrkrContentString = mrkrContentString + '<td class="hotelName">' + mrkrHotelName + '<br><span>' + mrkrHotelAddress + '</span></td>';
						mrkrContentString = mrkrContentString + '</tr>';
					mrkrContentString = mrkrContentString + '</table>';
					
					mrkrContentString = mrkrContentString + '<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">';
						mrkrContentString = mrkrContentString + '<tr>';
							mrkrContentString = mrkrContentString + '<td><span style="font-size: 85%;">Discount Rates from:</span>&nbsp;&nbsp;<span style="font-weight: bold; font-size: 115%;">$' + mrkrLoRate + '</span></td>';
						mrkrContentString = mrkrContentString + '</tr>';
					mrkrContentString = mrkrContentString + '</table>';
					
					mrkrContentString = mrkrContentString + '<table border="0" cellspacing="0" cellpadding="0">';
						mrkrContentString = mrkrContentString + '<tr>';
							mrkrContentString = mrkrContentString + '<td valign="top" style="padding: 0px 0px 5px 0px;"><a href="' + mrkrLink + '" style="font-size: 85%;">Details &amp; Rates </a></td>';
						mrkrContentString = mrkrContentString + '</tr>';
					mrkrContentString = mrkrContentString + '</table>';
					
					mrkrContentString = mrkrContentString + '<br>';
					
				mrkrContentString = mrkrContentString + '</td>';
			mrkrContentString = mrkrContentString + '</tr>';
		mrkrContentString = mrkrContentString + '</table>';
	mrkrContentString = mrkrContentString + '</div>';
	
	// CREATE THE MARKER
	mrkrMarker[mrkrIndex] = new google.maps.Marker({
	    position: mrkrLatLng,
	    map: jsGooMap,
		shadow: mrkrImageShadow,
		icon: mrkrImage,
		title: mrkrHotelName
	});
	
	// CREATE OUR INFO WINDOW OBJECT FOR THIS MARKER
	mrkrInfoWindow[mrkrIndex] = new google.maps.InfoWindow({
		content: mrkrContentString
	});
		
	// ADD LISTENERS
	google.maps.event.addListener(mrkrMarker[mrkrIndex], 'click', function() {
		for (var il = 0; il < mrkrInfoWindow.length; il++) {
			if (mrkrInfoWindow[il]) {
				mrkrInfoWindow[il].close(jsGooMap, mrkrMarker[il]);
			}
		}
		mrkrInfoWindow[mrkrIndex].open(jsGooMap, mrkrMarker[mrkrIndex]);
		jsGooMap.panTo(mrkrLatLng)
		jsGooMap.setZoom(15);
	});
	google.maps.event.addListener(mrkrInfoWindow[mrkrIndex], 'closeclick', function() {
		mrkrInfoWindow[mrkrIndex].close(jsGooMap, mrkrMarker[mrkrIndex]);
		jsGooMap.fitBounds(jsMapBounds);
		jsGooMap.panToBounds(jsMapBounds);
	});
	
	// EXTEND OUR MAPS BOUNDS
	jsMapBounds.extend(mrkrLatLng);
}




function createAttractionMarker(mrkrIndex, mrkrAttractionName, mrkrPointLat, mrkrPointLng){	
	// SETUP MARKER ICON
	var mrkrImage = 'http://' + window.location.host + '/img/map_icons/map_attractions.png';
	var mrkrImageShadow = 'http://' + window.location.host + '/img/map_icons/map_attractions_shadow.png';
	var mrkrLatLng = new google.maps.LatLng(mrkrPointLat, mrkrPointLng);
	
	// CREATE THE MARKER
	var mrkrMarkerAttraction = new google.maps.Marker({
	    position: mrkrLatLng,
	    map: jsGooMap,
		shadow: mrkrImageShadow,
		icon: mrkrImage,
		title: mrkrAttractionName
	});
	
	// EXTEND OUR MAPS BOUNDS
	jsMapBounds.extend(mrkrLatLng);
}

function popInfoWindow(iWindow){
	google.maps.event.trigger(mrkrMarker[iWindow], "click");
}

// FUNCTION TO OPEN Priceline HOTEL REVIEWS WINDOW
function openReviews(URL){
	var windowprops = "resizable=1,scrollbars=1,menubar=1,location=1,toolbar=1,titlebar=1,width=680,height=510, top=50, left=50";
	newWindow = window.open(URL, 'HBCPop', windowprops);
}

// FUNCTION TO OPEN HOTEL MAP WINDOW
function openHotelMap(tmpURL) {
	jsWinWidth = '492';
	jsWinHeight = '425';
	jsLeftPos = (screen.width) ? (screen.width-jsWinWidth)/2 : 0;
	jsTopPos = (screen.height) ? (screen.height-jsWinHeight)/2 : 0;
	jsWin = window.open(tmpURL, '', 'width='+jsWinWidth+',height='+jsWinHeight+',left='+jsLeftPos+',top='+jsTopPos+',toolbar=0,scrollbars=0,statusbar=0,menubar=0,resizable=0');
}
