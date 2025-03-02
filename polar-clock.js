/* -----------------------------------------------------------------------------
Polar Clock (polar-clock.js)
Version 2012.08.05.0900
By Fred Eaker <fredeaker@gmail.com>
Licensed under Creative Commons Attribution 3.0 Unported (CC BY 3.0)
http://creativecommons.org/licenses/by/3.0/
----------------------------------------------------------------------------- */

// HTML element should have an id of "polar-clock"
var canvas = document.getElementById('polar-clock');

// Clock will be positioned in the middle of the canvas
// TODO: size size canvas based on viewport

var canvasSize = 500;
canvas.width = canvasSize;
canvas.height = canvasSize;
var middleCoord = canvasSize/2;

// By default, Javascript starts arcs at 180 degrees (0 radians on the unit
// circle). So we'll need to shift our starting point around to 270 degrees to
// represent a standard 12-hour clock.
var startAngle = deg2Rad(270);

// See: http://en.wikipedia.org/wiki/File:Unit_circle_angles_color.svg
// See: http://www.scienceprimer.com/drawing-circles-javascript-html5-canvas-element

// Our arc lineWidth will be based on 1/8 of the canvas size
var lineWidth = canvasSize/8;

// Grab the context
var ctx = canvas.getContext('2d');

// Change the color of the clock here
ctx.strokeStyle = "black";

// Make the initial drawing
drawClock();

// Redraw every second
self.setInterval("drawClock()",1000);

function drawClock()
{
	// Clear the drawing area
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// The arc function requires radians so we must convert hours, minutes,
	// and seconds. In this conversion we must account for our 270 degree
	// starting point buy adding it to the number of degrees that the
	// portion of time represents:
	// 360 degrees / 12 hours = 30 degrees per hour
	// 360 degrees / 60 minutes = 6 degrees per minute

	var hour = _getHour();
	var radHour = deg2Rad(270 + (hour * 30));

	var minute = _getMin();
	var radMin = deg2Rad(270 + (minute * 6));

	var seconds = _getSec();
	var radSec = deg2Rad(270 + (seconds * 6));

	// Instead of drawing an arc that starts at 270 degrees and goes full
	// circle, we can calculate an alternate starting point at the last time
	// frame. This method is currently only applied to seconds to give us a
	// small second-hand but the calculations below facilitate a little bit
	// of customization. To use them, simply replace the "startAngle"
	// parameter with the corresponding radMin* in the drawing functions
	// below (note the use of radSecStart for an example). Using all of
	// this creates a super-minimal clock!

	var radHourStart = deg2Rad(270 + ((hour-1) * 30));
	var radMinStart = deg2Rad(270 + ((minute-1) * 6));
	var radSecStart = deg2Rad(270 + ((seconds-1) * 6));

	// Draw hour
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.arc(middleCoord, middleCoord, lineWidth * 2, startAngle, radHour);
	ctx.stroke();

	// Draw minute
	ctx.beginPath();
	ctx.lineWidth = lineWidth / 2;
	ctx.arc(middleCoord, middleCoord, lineWidth, startAngle, radMin);
	ctx.stroke();

	// Draw second
	ctx.beginPath();
	ctx.lineWidth = lineWidth / 3;
	ctx.arc(middleCoord, middleCoord, lineWidth / 2, radSecStart, radSec);
	ctx.stroke();
}

function deg2Rad(deg) {return deg * (Math.PI/180);}

// Return a 12-hour hour
function _getHour()
{
	var hour = new Date().getHours();
	if (hour > 12) {hour = hour - 12;}
	return hour;
}

function _getMin() {return new Date().getMinutes();}
function _getSec() {return new Date().getSeconds();}
