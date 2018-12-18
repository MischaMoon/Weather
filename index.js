// Stagger Fade-In
function staggerFade() {
	setTimeout(function() {
		$('.fadein-stagger > *').each(function() {
			$(this).addClass('js-animated');
		})
	}, 30);
}

// Skycons
function skycons() {
	var i,
			icons = new Skycons({
				"color" : "#FFFFFF",
				"resizeClear": true
			}),
			list  = [
				"clear-day",
				"clear-night",
				"partly-cloudy-day",
				"partly-cloudy-night",
				"cloudy",
				"rain",
				"sleet",
				"snow",
				"wind",
				"fog"
			];

	for(i = list.length; i--;) {
		var weatherType = list[i],
				elements    = document.getElementsByClassName( weatherType );

		for (e = elements.length; e--;) {
			icons.set(elements[e], weatherType);
		}
	}

	icons.play();
}

// Temperature Converter

function fToC(fahrenheit) {
	var fTemp  = fahrenheit,
			fToCel = (fTemp - 32) * 5 / 9;  

	return fToCel;
}

// Weather Reporter
function weatherReport(latitude, longitude) {
	var apiKey       = '332b64ff8774be4e94d8442c345d00f4',
			url          = 'https://api.darksky.net/forecast/',
			lati         = latitude,
			longi        = longitude,
			api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";



	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	// hold hourly values for each day of the week
	var sunday    = [],
			monday    = [],
			tuesday   = [],
			wednesday = [],
			thursday  = [],
			friday    = [],
			saturday  = [];
	
	var isCelsiusChecked = $('#celsius:checked').length > 0;

	function hourlyReport(day, selector) {
		for(var i = 0, l = day.length; i < l; i++) {
			$("." + selector + " " + "ul").append('<li>' + Math.round(day[i]) + '</li>');
		}
	}

	$.getJSON(api_call, function(forecast) {
		for(var j = 0, k = forecast.hourly.data.length; j < k; j++) {
			var hourly_date    = new Date(forecast.hourly.data[j].time * 1000),
					hourly_day     = days[hourly_date.getDay()],
					hourly_skicons = forecast.hourly.data[j].icon,
					hourly_time    = forecast.hourly.data[j].time,
					hourly_temp    = forecast.hourly.data[j].temperature;

			if(isCelsiusChecked) {
				hourly_temp = fToC(hourly_temp);
				hourly_temp = Math.round((hourly_temp));
			}

			switch(hourly_day) {
				case 'Sunday':
					sunday.push(hourly_temp);
					break;
				case 'Monday':
					monday.push(hourly_temp);
					break;
				case 'Tuesday':
					tuesday.push(hourly_temp);
					break;
				case 'Wednesday':
					wednesday.push(hourly_temp);
					break;
				case 'Thursday':
					thursday.push(hourly_temp);
					break;
				case 'Friday':
					friday.push(hourly_temp);
					break;
				case 'Saturday':
					saturday.push(hourly_temp);
					break;
				default: console.log(hourly_date.toLocaleTimeString());
					break;
			}
		}
		//past 30 days
        a = new Array();
        timeToday = forecast.daily.data[0].time + 86400;

        for(var i = 0; i < 31; i++) {
            timeToday -=86400;
        api_other = url + apiKey + "/" + lati + "," + longi + "," + timeToday + "?extend=hourly&callback=?";
        $.getJSON(api_other, function(forecast) {
            var dateP = new Date(forecast.daily.data[0].time * 1000),
                dayP = days[dateP.getDay()],
                skiconsP = forecast.daily.data[0].icon,
                timeP = forecast.daily.data[0].time,
                humidityP = forecast.daily.data[0].humidity,
                summaryP = forecast.daily.data[0].summary,
                tempP = Math.round(forecast.hourly.data[0].temperature),
                tempMaxP = Math.round(forecast.daily.data[0].temperatureMax);
            var div = document.getElementById('divCurrent');

            div.innerHTML += '<legend style="color: whitesmoke">Weather of the last 30 days</legend><li class="shade-'+ skiconsP +'" style="list-style-type: none;"><div class="flip-container"><div class="flipper"><div class="front card"><div>' +
                "<div class='graphics'>"+skiconsP + "</div>" +
                "<div><b>Day</b>: " + dateP.toLocaleDateString() + "</div>" +
                "<div><b>Temperature</b>: " + tempP + "</div>" +
                "<div><b>Max Temp.</b>: " + tempMaxP + "</div>" +
                "<div><b>Humidity</b>: " + humidityP + "</div>" +
                '<p class="summary">' + summaryP + '</p>' +
                '</div></div><div class="back card">' +
                '<b>Day</b>: ' + dateP.toLocaleDateString()+'</div></div></div></li>';
        }); }

		for(var i = 0, l = forecast.daily.data.length; i < l - 1; i++) {

			var date     = new Date(forecast.daily.data[i].time * 1000),
					day      = days[date.getDay()],
					skicons  = forecast.daily.data[i].icon,
					time     = forecast.daily.data[i].time,
					humidity = forecast.daily.data[i].humidity,
					summary  = forecast.daily.data[i].summary,
					temp    = Math.round(forecast.hourly.data[i].temperature),
					tempMax = Math.round(forecast.daily.data[i].temperatureMax);
			if(isCelsiusChecked) {
				temp    = fToC(temp);
				tempMax = fToC(tempMax);
				temp = Math.round(temp);
				tempMax = Math.round(tempMax);
			}

            var div = document.getElementById('divPast');

            div.innerHTML += '<legend style="color: whitesmoke">Weather of this week</legend><li class="shade-'+ skicons +'" style="list-style-type: none;"><div class="flip-container" style="list-style-type: none;"><div class="flipper"><div class="front card"><div>' +
					"<div class='graphic'><canvas class=" + skicons + "></canvas></div>" +
					"<div><b>Day</b>: " + date.toLocaleDateString() + "</div>" +
					"<div><b>Temperature</b>: " + temp + "</div>" +
					"<div><b>Max Temp.</b>: " + tempMax + "</div>" +
					"<div><b>Humidity</b>: " + humidity + "</div>" +
					'<p class="summary">' + summary + '</p>' +
					'</div></div><div class="back card">' +
					'<div class="hourly' + ' ' + day + '"><b>24hr Forecast of day :' + date.toLocaleDateString() +'</b><ul class="list-reset"></ul></div></div></div></div></li>';


			switch(day) {
				case 'Sunday':
					hourlyReport(sunday, days[0]);
					break;
				case 'Monday':
					hourlyReport(monday, days[1]);
					break;
				case 'Tuesday':
					hourlyReport(tuesday, days[2]);
					break;
				case 'Wednesday':
					hourlyReport(wednesday, days[3]);
					break;
				case 'Thursday':
					hourlyReport(thursday, days[4]);
					break;
				case 'Friday':
					hourlyReport(friday, days[5]);
					break;
				case 'Saturday':
					hourlyReport(saturday, days[6]);
					break;
			}
		}

		skycons();
		staggerFade();
	});
}

// Get Weather Button Event
$('button').on('click', function(e) {
	var lat       = $('#latitude').val(),
			long      = $('#longitude').val(),
			city_name = $('#city-search').val()

	if(lat && long !== '') {
		e.preventDefault();

        if(lat && long !== '') {
            e.preventDefault();

            $('.app').fadeOut(100, function() {
                $('body').append('<div><button id="back">New Forecast</button><ul class="list-reset fadein-stagger" id="forecast"></ul></div><br><br><br>');
                weatherReport(lat, long);
            });
        }
	}
});

$('body').on('click', '#back', function() {
	window.location.reload(true);
	$(this).fadeOut(100);
})


// Report City & AutoFill Coords

function insertGoogleScript() {
	var google_api = document.createElement('script');
	google_api.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDvTrJlRYQjtX5-sBdU-EcZak63XzCKkpw&callback=initGoogleAPI&libraries=places,geometry";
	document.body.appendChild(google_api);
}

function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

	autocomplete.addListener('places_changed', function() {
		var place = autocomplete.getPlaces()[0];
		document.querySelector("#latitude").value = place.geometry.location.lat();
		document.querySelector("#longitude").value = place.geometry.location.lng();
	});
}

insertGoogleScript();