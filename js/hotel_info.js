// SET INITIAL OBJECTS, VARIABLES, ETC
var jsWin = null;
var jsWinSettings = null;
var jsWinWidth = 0;
var jsWinHeight = 0;
var jsLeftPos = null;
var jsTopPos = null;

// FUNCTION TO OPEN HOTEL MAP WINDOW
function openHotelMap(tmpURL) {
	jsWinWidth = '510';
	jsWinHeight = '435';
	jsLeftPos = (screen.width) ? (screen.width-jsWinWidth)/2 : 0;
	jsTopPos = (screen.height) ? (screen.height-jsWinHeight)/2 : 0;
	jsWin = window.open(tmpURL, '', 'width='+jsWinWidth+',height='+jsWinHeight+',left='+jsLeftPos+',top='+jsTopPos+',toolbar=0,scrollbars=0,statusbar=0,menubar=0,resizable=0');
}





/*
 * Image preview script 
 * powered by jQuery (http://www.jquery.com)
 * written by Alen Grakalic (http://cssglobe.com)
 * modified by Brent Scott (http://www.usipp.net)
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 */
this.loadImagePreviewer = function(){	
	/* CONFIG */
	// these 2 variable determine popup's distance from the cursor
	// you might want to adjust to get the right result	
	xOffset = 10;
	yOffset = 30;
	/* END CONFIG */

	/* LOGIC */
	$("a.preview").hover(function(e){
		$("body").append("<p id='preview'><img src='"+ this.title +"' alt='Image preview' /></p>");
		$("#preview").css("top",(e.pageY - yOffset) + "px").css("left",(e.pageX + xOffset) + "px").fadeIn("fast");
    },
	function(){	
		$("#preview").remove();
    });
	$("a.preview").mousemove(function(e){
		$("#preview").css("top",(e.pageY - yOffset) + "px").css("left",(e.pageX + xOffset) + "px");
	});
	/* END LOGIC */
};





/*
 * Opens and closes the "full description" link for each room/rate on the HOTEL INFORMATION page
 * written by Brent Scott (http://www.usipp.net)
 */
function toggleRoomDetails(jsRoomID){
	// close cancellation policy div if open
	if ($("#cancellationDetails_" + jsRoomID).length > 0) {
		if ($("#cancellationDetails_" + jsRoomID).is(":visible")) {
			$("#cancellationDetails_" + jsRoomID).hide();
		}
	}
	
	// open/close full description
	if ($("#roomDetails_" + jsRoomID).length > 0) {
		if ($("#roomDetails_" + jsRoomID).is(":visible")) {
			$("#roomDetails_" + jsRoomID).hide();
		}
		else {
			$("#roomDetails_" + jsRoomID).fadeIn("fast");
		}
	}
}





/*
 * Opens and closes the "cancellation policy" link for each room/rate on the HOTEL INFORMATION page
 * written by Brent Scott (http://www.usipp.net)
 */
function toggleCancellationPolicy(jsRoomID){
	// close full description div if open
	if ($("#roomDetails_" + jsRoomID).length > 0) {
		if ($("#roomDetails_" + jsRoomID).is(":visible")) {
			$("#roomDetails_" + jsRoomID).hide();
		}
	}
	if ($("#cancellationDetails_" + jsRoomID).length > 0) {
		if ($("#cancellationDetails_" + jsRoomID).is(":visible")) {
			$("#cancellationDetails_" + jsRoomID).hide();
		}
		else {
			$("#cancellationDetails_" + jsRoomID).fadeIn("fast");
		}
	}
}