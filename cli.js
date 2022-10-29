#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";


//var argv = minimist(process.argv.slice(2));
const args = minimist(process.argv.slice(2));

if (args.h) {
  
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
    console.log("-h            Show this help message and exit.")
    console.log("-n, -s        Latitude: N positive; S negative.")
    console.log("-e, -w        Longitude: E positive; W negative.")
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.")
    console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
    console.log("-j            Echo pretty JSON from open-meteo API and exit.")
    process.exit(0);
}

//timezone
const timezoned = args.z || moment.tz.guess();
var latitude = args.n || (args.s *-1);
var longitude = args.e || (args.w * -1);


// Make a request
// 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=' + timezoned);

// Get data from request
const data = await response.json();
//print data
if (args.j) {
    console.log(data);
    process.exit(0);
}

var day = args.d || 1;


//check if there is precipitation for the day
 if (data.daily.precipitation_hours[day] == 0) {
   console.log("No need to wear galoshes");
 } else {
   console.log("Wear your galoshes");
 }


//print precipitation for selected day

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
