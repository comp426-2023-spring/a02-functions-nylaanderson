#!/user/bin/env node

import minimist from 'minimist';

import moment from 'moment-timezone';

import fetch from "node-fetch";

var args = minimist(process.argv.slice(2));

if (args.h) {
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
	console.log("-h            Show this help message and exit.");
	console.log("-n, -s        Latitude: N positive; S negative.");
	console.log("-e, -w        Longitude: E positive; W negative.");
	console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.");
	console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
	console.log(" -j            Echo pretty JSON from open-meteo API and exit.");
	process.exit(0);
}

var timezone = moment.tz.guess();
let latitude;
let longitude;

if (args.z) {
	timezone = args.z
}
else{
	timezone = tz;
}

if (args.n) {
	latitude = args.n
}

if (args.s) {
	latitude = -1 * args.s
}

if (args.e) {
	longitude = args.e
}

if (args.w) {
	longitude = -1 * args.w
}

if (!latitude && !longitude){
	console.log("Values must be in range");
	process.exit(0);
}

//Make a request

var response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+ latitude + '&longitude' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

const data = await response.json();


if (args.j) {
        console.log(data);
        process.exit(0);
}

let days; 

if (args.d == null) {
	days = 1;
} else {
	days = args.d;
}

if (days == 0) {
	console.log("today.");
	if(data.daily.precipitation_hours[0] > 0) {
	 	console.log("You might need your galoshes");	
	}  else{
	console.log("You will not need your galoshes");
	}
}
else if (days > 1) {
	console.log("in " + days + " days.");
	if( data.daily.precipitation_hours[days] > 0) {
		console.log("You might need your galoshes");
	} else{
	console.log("You will not need your galoshes")
	} 	
} else { 
	console.log("tomorrow.");
	console.log(data);
	if(data.daily.precipitation_hours[1] > 0) {
		console.log("You might need your galoshes");
	} else{
		console.log("You will not need your galoshes");
	}
}













