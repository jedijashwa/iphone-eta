// sets default duration to 30 minutes in the global scope
var etaDuration = 30, onBreak = false, nightMode = false, shapesOn = false,
	secondsOn = true, visibleVisuals = false, roundUp = false;

// function to be called by clicking on buttons for setting
// the duration. Accepts a number of minutes or a string.
function setDuration (minutes) {
	// sets etaDuration to passed in value
	etaDuration = minutes;
	
	var buttons = document.querySelectorAll("button");
 	for (var i = 0; i < buttons.length; i++) {
    	buttons[i].classList.remove('active');
	}
	document.getElementById('button'+minutes).classList.add("active");
}

// function for toggling the "iPhone Repair on Break Text" boolean
function toggleBreak(){
	if (onBreak) {
		onBreak = false;
	} else {
		onBreak = true;
	}
}

// Function for toggling the nightMode boolean
function toggleNight(){
	if (nightMode) {
		nightMode = false;
	} else {
		nightMode = true;
	}
}

// Function for toggling the button shapes boolean
function toggleShapes(){
	if (shapesOn) {
		shapesOn = false;
	} else {
		shapesOn = true;
	}
}

// Function for toggling the show seconds boolean
function toggleSeconds(){
	if (secondsOn) {
		secondsOn = false;
	} else {
		secondsOn = true;
		roundUp = false;
	}
}

// Function for toggling the round up boolean
function toggleRound() {
	if (roundUp) {
		roundUp = false;
	} else {
		roundUp = true;
		secondsOn = false;
	}
}

// Function handling clicking on the setting button and showing the
// settings pane (showVisuals name left from when settings were only
// visual elements)
function showVisuals() {
	if (visibleVisuals) {
		// If settings panel is already on screen, marks that it will
		// no longer be visible and moves the settings panel off screen.
		visibleVisuals = false;
    	$("#visuals").animate({bottom: '-40px'});
    } else {
		// If settings panel is not already on screen, marks that it will
		//  be visible and moves the settings panel on screen.
    	visibleVisuals = true;
	    $("#visuals").animate({bottom: '0px'});
	}
}

// Main function of the page that sets all of the text in the
// ETA Clock
function updateTime(){
	
	// Creates empty variables to be set throughout function
	var etaTime, etaHours, etaString, ampmString, etaMins, etaSecs;
	
	// Makes seconds and minutes fields clickable with expected results
	$("#ETAsec").click(toggleSeconds);
	$("#ETAmin").click(toggleRound);
	
	// Sets etaString if passed in 'done' or 'ask' instead of a number
	// of minutes.
	if (etaDuration == 'done'){

			etaString = "Tomorrow";

	} else if (etaDuration == 'ask'){
		etaString = 'Please ask...'
	} else {
		// If the duration is not "done" or "ask" it sets the
		// string to an empty string
		etaString = '';
	}
	
	// Fills in ETA Clock when not quoting "ask" or "done"
	if (etaString == ''){

		// Sets the etaTime to a date object for the current time plus the
		// currently quoting minutes value
		etaTime = new Date(Date.now() + 60000*etaDuration);
		etaMins = etaTime.getMinutes();
		etaHours = etaTime.getHours();
		
		// Fixes etaMin from showing as 60 when rounding up to the nearest hour
		if (roundUp) {
			if (etaMins > 55) {
				etaHours = etaHours + 1;
				etaMins = 0;
			}
		}
		
		// Sets value of etaHours to the 12 number format of the 
		// hour in the etaTime date object.
		if (etaHours > 12) {
			etaHours = etaHours - 12;
		}
		
		// If the hours is a single digit number, sets the etaHours
		// value to a string with a 0 then the hours already set.
		if (etaHours == 0) {
			etaHours = "12";
		} else if (etaHours < 10) {
			etaHours = "0" + etaHours;
		}
		
		// Sets the AM/PM value by checking to see if the hours in
		// the etaTime date object is greater than 11 (12->23 will
		// be PM)
		if (etaTime.getHours() > 11) {
			ampmString = 'PM';
    	} else {
			ampmString = 'AM';
    	}
		
		// Uses same logic as setting the etaHours value for setting
		// the etaMinutes and the etaSeconds value.
		
		// Rounds etaMin up to the nearest 5 minutes if roundUp is enabled
		if(roundUp) {
			etaMins = Math.ceil(etaMins / 5) * 5;
		}
		
		// Formats single digit minutes as a two digit number
		if (etaMins < 10) {
			etaMins = "0" + etaMins;
		}
		
		// Sets seconds field using the same two digit trick as above
		if (etaTime.getSeconds() < 10) {
			etaSecs = "0" + etaTime.getSeconds();
		} else {
			etaSecs = etaTime.getSeconds();
		}
		
		// Sets the ETAhr, ETAmin, ETAsec, and pm values in the HTML
		document.getElementById("ETAhr").innerHTML = etaHours;		
		document.getElementById("ETAmin").innerHTML = etaMins;
		document.getElementById("ETAsec").innerHTML = etaSecs;
		
		// Sets seconds color to opposite of background when secondsOn 
		// is enabled and to the same color as the background when 
		// secondsOn is disabled. 
		if(secondsOn) {
			if(nightMode){
				document.getElementById("ETAsec").style.color = "white";
			} else {
				document.getElementById("ETAsec").style.color = "black";
			}
		} else {
			if(nightMode){
				document.getElementById("ETAsec").style.color = "black";
			} else {
				document.getElementById("ETAsec").style.color = "white";
			}
		}
		
		// fills the AM/PM field
		document.getElementById("pm").innerHTML = ampmString;
		// Sets the colon section to have a colon in the HTML
		document.getElementById("colon").innerHTML=":";
		// Sets the ETAstring section to be empty
		document.getElementById("ETAstring").innerHTML="";
	
	// Run if there is a string for etaString
	} else {
		// Sets ETAstring value in HTML
		document.getElementById("ETAstring").innerHTML = etaString;
		// Sets all the clock values to be empty in the HTML
		document.getElementById("colon").innerHTML="";
		document.getElementById("ETAmin").innerHTML = "";
		document.getElementById("ETAhr").innerHTML = "";
		document.getElementById("ETAsec").innerHTML="";
		document.getElementById("pm").innerHTML="";
	}
	
	// Sets text for the iphoneRepairBreak section when onBreak returns true.
	if (onBreak) {
		document.getElementById("iphoneRepairBreak").innerHTML = "iPhone Repair on Break";
		document.getElementById('breakButton').classList.add('active');
	} else {
		document.getElementById("iphoneRepairBreak").innerHTML = '';
		document.getElementById('breakButton').classList.remove('active');
	}

	// The following several sections make sure that buttons show as active
	// the feature they enabled is enabled and that they do not show as active
	// when their feature is disabled.	
	if (nightMode){
		document.getElementById('nightButton').classList.add('active');
	} else {
		document.getElementById('nightButton').classList.remove('active');
	}
	if (shapesOn){
		document.getElementById('shapesButton').classList.add('active');
	} else {
		document.getElementById('shapesButton').classList.remove('active');
	}
	if (secondsOn){
		document.getElementById('secondsButton').classList.add('active');
	} else {
		document.getElementById('secondsButton').classList.remove('active');
	}
	if (roundUp){
		document.getElementById('roundButton').classList.add('active');
	} else {
		document.getElementById('roundButton').classList.remove('active');
	}
	
	// Creates two arrays that will be used for formatting buttons properly,
	// one for buttons that appear active and one for ALL buttons
	var activeButtons = document.querySelectorAll(".active");
	var buttons = document.querySelectorAll("button");
		
	// Sets entire page in night mode when nightMode is true.
	if (nightMode) {
		document.body.style.backgroundColor="black";
		document.body.style.color="white";
		for (var i = 0; i < buttons.length; i++){
			buttons[i].style.backgroundColor="white";
		}
		for (var i = 0; i < activeButtons.length; i++){
			activeButtons[i].style.backgroundColor="#ddd";
		}
	} else {
		document.body.style.backgroundColor="white";
		document.body.style.color="black";
		for (var i = 0; i < buttons.length; i++){
			buttons[i].style.backgroundColor="white";
		}
	}
	
	// Turns on button shapes when button shapes is enabled by changing
	// the background buttons to a light grey. Sets the background color
	// back to white if shapesOn is disabled.
	if (shapesOn) {
		for (var i = 0; i < buttons.length; i++){
			buttons[i].style.backgroundColor="#ddd";
		}
	} else {
		for (var i = 0; i < buttons.length; i++){
			buttons[i].style.backgroundColor='white';
		}
	}
	
	// Flashes the colon if show seconds isn't enabled
	if (!secondsOn) {
		if (etaTime.getSeconds() % 2 == 0) {
			if (nightMode) {
				document.getElementById('colon').style.color="black";
			} else {
				document.getElementById('colon').style.color="white";
			}
		} else {
			if (nightMode) {
				document.getElementById('colon').style.color="white";
			} else {
				document.getElementById('colon').style.color="black";
			}
		}
	} else {
		if (nightMode) {
				document.getElementById('colon').style.color="white";
			} else {
				document.getElementById('colon').style.color="black";
			}
	}

}

// Runs the updateTime() function every 100th of a second 
// to refresh the content on the page
var update = setInterval(updateTime, 10);