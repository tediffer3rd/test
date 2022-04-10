var dayNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
var months = ["Solaris", "Seprensdor", "Fonsoc", "Ganrehm", "Calidum", "Somnercrest", "Aesoc", "Jehmri", "Lunaris", "Autunsveil", "Cadoc", "Nehnma", "Frigus", "Wevnercrest", "Hemoc", "Duhmret"];
var weekdays = ["Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda"];
var seasons = ["Sepren", "Somner", "Autun", "Wevner"];
var easyDays = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twnetieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth','thitieth', 'thirty-first', 'thirty-second'];

var data =  [
	Array.from(dayNums).map(String),
	Array.from(months).map(String),
	Array.from(seasons).map(String),
	Array.from(Array(0).keys()).map(String),
]

function createPieMenu() {
	var pieMenu = document.createElement('div');
	pieMenu.id = "pie-menu"
	pieMenu.classList.add("pie-outer");
	var widthDelta = 100/data.length;
	var widthPercentage = 125;

	for (var i = 0; i < data.length; i ++) {
		var dataItem = data[i];
		var numSegments = dataItem.length;
		var segmentAngle = (Math.PI * 2)/numSegments;
		var skewAngle = (Math.PI/2) - segmentAngle;
		var pie = document.createElement('div');
		var pieRotateAngle = 90*Math.PI/180;
		pie.classList.add("pie");
		console.log(widthPercentage);
		pie.style.width = `${widthPercentage}%`;
		pie.style.background = "conic-gradient(from 337.5deg, #cc0000, #ff8000, #ff8000, #0000ff, #0000ff, #009900, #009900, #cc0000)";
		pie.style.transform = `translate(-50%,-50%) rotate(${pieRotateAngle}rad)`;

		var pieList = document.createElement('ul');

		for (var j = 0; j < dataItem.length; j ++) {
			var rotationAngle = segmentAngle * j;
			var dataContent = dataItem[j];
			//var dataContent = "";
			//var dataContent = Number(dataItem[j])+1;

			var pieListItem = document.createElement('li'); // create a new list item
			pieListItem.id = "liContent";
			var pieItemAnchor = document.createElement('a'); // create a new list item
			pieItemAnchor.appendChild(document.createTextNode(dataContent)); // append the text to the a

			pieListItem.style.transform = `rotate(${rotationAngle}rad) skew(${skewAngle}rad)`;

			var anchorRotate = segmentAngle/2 - Math.PI/2;
			var anchorSkew = segmentAngle - Math.PI/2;
			pieItemAnchor.style.transform = `skew(${anchorSkew}rad) rotate(${anchorRotate}rad)`;

			pieListItem.appendChild(pieItemAnchor);
			pieList.appendChild(pieListItem);
		}
		
	pie.appendChild(pieList);
	pieMenu.appendChild(pie);
	widthPercentage -= widthDelta;
	}

	document.body.appendChild(pieMenu);
}

createPieMenu();


  // check whether the 'saveDate' data item is stored in web Storage
  if(localStorage.getItem('saveDate')) {
    var date = localStorage.getItem('saveDate');
    document.getElementById('input_id').value=date;
	var currentDate = document.getElementById('input_id').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
	document.getElementById('displayDate').innerHTML = 'Press "ENTER" or click "Set date" to set the dial hands';
  }

// set date to what is shown in the input window
function setDate() {
	var currentDate = document.getElementById('input_id').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
	document.getElementById('displayDate').innerHTML = 'The current date is: ' + weekday + ' the ' + easyDays[day-1] + ' day of ' + months[month-1] + ' the season of ' + seasons[season-1];
//    document.getElementById('displayDate').innerHTML = 'The current date is: ' + ("0" + season).slice(-2) + " - " + ("0" + month).slice(-2) + " - " + ("0" + day).slice(-2);
    hour_rotation = (360/4 * season)-((360/4)/2);
	min_rotation = (360/16 * month)-((360/16)/2);
	sec_rotation = (360/32 * day)-((360/32)/2);
    hour.style.transform = `rotate(${hour_rotation}deg)`;
	minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
	localStorage.setItem('saveDate', currentDate);
}

//add a day to the date
function addDay() {
	var currentDate = document.getElementById('input_id').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var day = day + 1;
		if(day == 33) {month += 1, day = 1};
		if(month == 17) {month = 1 , day = 1};
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
    hour_rotation = (360/4 * season)-((360/4)/2);
    min_rotation = (360/16 * month)-((360/16)/2);
	sec_rotation = (360/32 * day)-((360/32)/2);
	hour.style.transform = `rotate(${hour_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
	var newDate = ("0" + month).slice(-2) + ("0" + day).slice(-2);
	document.getElementById('input_id').value = newDate;
    var weekday = weekdays[day-1];
	document.getElementById('displayDate').innerHTML = 'The current date is: ' + weekday + ' the ' + easyDays[day-1] + ' day of ' + months[month-1] + ' the season of ' + seasons[season-1];
//    document.getElementById('displayDate').innerHTML = 'The current date is: ' + ("0" + season).slice(-2) + " - " + ("0" + month).slice(-2) + " - " + ("0" + day).slice(-2);
	localStorage.setItem('saveDate', newDate);
}	

