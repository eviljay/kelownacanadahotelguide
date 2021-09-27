// Global variables
var isCSS, isW3C, isIE4, isNN4;

// initialize upon load to let all browsers establish content objects
function initKidsCommon() {
    if (document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
    }
}
// set event handler to initialize API
// window.onload = initCommon;

// Seek nested NN4 layer from string name
function seekLayer(doc, name) {
    var theObj;
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            theObj = doc.layers[i];
            break;
        }
        // dive into nested layers if necessary
        if (doc.layers[i].document.layers.length > 0) {
            theObj = seekLayer(document.layers[i].document, name);
        }
    }
    return theObj;
}

// Convert object name string or object reference into a valid element object reference
function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        } else if (isIE4) {
            theObj = document.all(obj);
        } else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
    } else {
        // pass through object reference
        theObj = obj;
    }
    return theObj;
}

// Convert object name string or object reference into a valid style (or NN4 layer) reference
function getObject(obj) {
    var theObj = getRawObject(obj);
    if (theObj && isCSS) {
        theObj = theObj.style;
    }
    return theObj;
}

// Set the visibility of an object to visible
function show(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.display = "block";
    }
}

// Set the visibility of an object to hidden
function hide(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.display = "none";
    }
}

function showkids() {
	if(document.getElementById('otsNumKids1').value=='0') {
		hide('areaKidsAges');
		hide('kids-one');
		hide('kids-two');
		hide('kids-three');
	} else if(document.getElementById('otsNumKids1').value=='1') {
		show('areaKidsAges');
		show('kids-one');
		hide('kids-two');
		hide('kids-three');
	} else if(document.getElementById('otsNumKids1').value=='2') {
		show('areaKidsAges');
		show('kids-one');
		show('kids-two');
		hide('kids-three');
	} else if(document.getElementById('otsNumKids1').value=='3') {
		show('areaKidsAges');
		show('kids-one');
		show('kids-two');
		show('kids-three');
	}
}









 
 
 
 
 
 // USED TO SHOW WHICH AGES SHOULD BE SHOWN/HID
 function showDaKids() {
 	// alert('showDaKids() executed! ' + document.getElementById('otsNumKids').value);
	if(document.getElementById('otsNumKids').value == '0') {
		document.getElementById('areaKidsAges').display = "none";
		document.getElementById('kids-one').display = "none";
		document.getElementById('kids-two').display = "none";
		document.getElementById('kids-three').display = "none";
		document.getElementById('kids-four').display = "none";
		document.getElementById('kids-five').display = "none";
	}
	else if(document.getElementById('otsNumKids').value == '1') {
		document.getElementById('areaKidsAges').display = "block";
		document.getElementById('kids-one').display = "block";
		document.getElementById('kids-two').display = "none";
		document.getElementById('kids-three').display = "none";
		document.getElementById('kids-four').display = "none";
		document.getElementById('kids-five').display = "none";
	}
	else if(document.getElementById('otsNumKids').value == '2') {
		document.getElementById('areaKidsAges').display = "block";
		document.getElementById('kids-one').display = "block";
		document.getElementById('kids-two').display = "block";
		document.getElementById('kids-three').display = "none";
		document.getElementById('kids-four').display = "none";
		document.getElementById('kids-five').display = "none";
	}
	else if(document.getElementById('otsNumKids').value == '3') {
		document.getElementById('areaKidsAges').display = "block";
		document.getElementById('kids-one').display = "block";
		document.getElementById('kids-two').display = "block";
		document.getElementById('kids-three').display = "block";
		document.getElementById('kids-four').display = "none";
		document.getElementById('kids-five').display = "none";
	}
	else if(document.getElementById('otsNumKids').value == '4') {
		document.getElementById('areaKidsAges').display = "block";
		document.getElementById('kids-one').display = "block";
		document.getElementById('kids-two').display = "block";
		document.getElementById('kids-three').display = "block";
		document.getElementById('kids-four').display = "block";
		document.getElementById('kids-five').display = "none";
	}
	else if(document.getElementById('otsNumKids').value == '5') {
		document.getElementById('areaKidsAges').display = "block";
		document.getElementById('kids-one').display = "block";
		document.getElementById('kids-two').display = "block";
		document.getElementById('kids-three').display = "block";
		document.getElementById('kids-four').display = "block";
		document.getElementById('kids-five').display = "block";
	}
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