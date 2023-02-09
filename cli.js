#!/user/bin/env node

import minimist from 'minimist';

import moment from 'moment-timezone';

cont args = minimist(process.argv.slice(2));

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

const timezone = moment.tz.guess();
let latitude;
let longitude;


if (args.z) {
	timezone = args.z
}

if (args.n) {
	latitude = args.n
}

if (args.s) {
	latitude = -args.s
}

if (args.e) {
	longitude = args.e
}

if (args.w) {
	longitude = -args.w
}



















