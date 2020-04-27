const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const dripCanvas = document.querySelector('.drips');
const dtx = dripCanvas.getContext("2d");

let isDrawing = false;
let count = 0;
const minDrip = 2;
const maxDrip = 300;
const dripTolerance = 2;
let dripStarted = false;

const height = window.innerHeight/2;
const width = window.innerWidth/2;

resizeCanvas();

var img = new Image();

img.onload = function () {
	ctx.drawImage(img, 0, 0, (width- 10),(height-10));
};

img.src = './assets/Hello_my_name_is_sticker.svg';




//listeners
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', startDrawing);
document.addEventListener('mouseup', stopDrawing);

const penOptions = {
	colour: '#000000',
	width: 30,
	tip: 'bevel' //round,bevel,miter
}

setInterval(function () {
	if (isDrawing) {
		count++;
	}
}, 100)

function startDrawing(e) {
	isDrawing = true;

	ctx.beginPath();
	dtx.beginPath();
	count = 1;
	draw(e)

}

function stopDrawing() {
	isDrawing = false;

	count = 1;
}


function draw({
	clientX: x,
	clientY: y
}) {
	if (!isDrawing) return;
	// console.log('draw',x,y);
	// console.log('is drawing', isDrawing);
	const {
		colour,
		width,
		tip
	} = penOptions;
	ctx.lineWidth = width;
	ctx.strokeStyle = colour;
	ctx.fillStyle = colour;
	ctx.lineJoin = tip;


	// ctx.moveTo(x,y);
	//	count++;
	ctx.lineTo(x, y);
	ctx.stroke();
	// ctx.beginPath();
	// ctx.moveTo(x,y)
	// ctx.closePath();
	if (count % dripTolerance == 0) {
		drip(x, y);
		// if(!dripStarted){
		// 	startDrip(x, y)
		// }
	}

}


let dripEnd = 0;

function startDrip(x, y) {

	const {
		colour,
		width,
		tip
	} = penOptions;
	dtx.strokeStyle = colour;
	dtx.fillStyle = colour;
	dtx.lineJoin = tip;
	dtx.beginPath();
	dtx.linecap = "round"


	let minDripWidth = 0.5;
	let maxDripWidth = (width / 8 < 1) ? 1 : width / 8;
	dtx.lineWidth = Math.floor(Math.random() * (maxDripWidth - minDripWidth + 1) + minDripWidth);


	dripStarted = true;
	dripEnd = y + maxDrip;
	drawDrip(x, y);
}

function drawDrip(x, dripPosition) {

	dtx.moveTo(x, dripPosition);
	dtx.lineTo(x, dripPosition + 1);
	dtx.stroke();
	dtx.closePath();


	if (dripPosition < dripEnd) {
		drawDrip(x, dripPosition + 1);
	} else {
		dripStarted = false;
	}

}


function drip(x, y) {
	const {
		colour,
		width,
		tip
	} = penOptions;
	dtx.strokeStyle = colour;
	dtx.fillStyle = colour;
	dtx.lineJoin = tip;
	dtx.beginPath();
	dtx.linecap = "round"


	let minDripWidth = 0.5;
	let maxDripWidth = (width / 8 < 1) ? 1 : width / 8;
	dtx.lineWidth = Math.floor(Math.random() * (maxDripWidth - minDripWidth + 1) + minDripWidth);


	const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);

	dtx.moveTo(x, y);
	dtx.lineTo(x, y + dripLength);
	dtx.stroke();
	dtx.closePath();
}






function resizeCanvas() {

	canvas.height = height;
	canvas.width = width;
	dripCanvas.height = height;
	dripCanvas.width = width;

}


















var anim = 0;
var animation;

function repeatOften() {
	console.log('repeat');
	if(anim > 100){
		stopAnimation();
		return;
	}
	anim++;

	const {
		colour,
		width,
		tip
	} = penOptions;
	dtx.strokeStyle = colour;
	dtx.fillStyle = colour;
	dtx.lineJoin = tip;
	dtx.beginPath();
	dtx.linecap = "round"
	lineWidth = 2;

	dtx.moveTo(20, anim+40);
	dtx.lineTo((20+lineWidth), anim+40);
	dtx.stroke();
	dtx.closePath();






	animation = requestAnimationFrame(repeatOften);




}

function startAnimation(){
	animation = requestAnimationFrame(repeatOften);
}


function stopAnimation(){
  cancelAnimationFrame(animation);
}



startAnimation();









// (function () {
// 	var lastTime = 0;
// 	var vendors = ['ms', 'moz', 'webkit', 'o'];
// 	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
// 			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
// 			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
// 	}

// 	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
// 			var currTime = new Date().getTime();
// 			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
// 			var id = window.setTimeout(function () {
// 					callback(currTime + timeToCall);
// 			},
// 			timeToCall);
// 			lastTime = currTime + timeToCall;
// 			return id;
// 	};

// 	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
// 			clearTimeout(id);
// 	};
// }());





// // variable to hold how many frames have elapsed in the animation
// var t = 1;

// // define the path to plot
// var vertices = [];
// vertices.push({
// 	x: 0,
// 	y: 0
// });
// vertices.push({
// 	x: 300,
// 	y: 100
// });
// vertices.push({
// 	x: 80,
// 	y: 200
// });
// vertices.push({
// 	x: 10,
// 	y: 100
// });
// vertices.push({
// 	x: 0,
// 	y: 0
// });

// // draw the complete line
// ctx.lineWidth = 1;
// // tell canvas you are beginning a new path
// ctx.beginPath();
// // draw the path with moveTo and multiple lineTo's
// ctx.moveTo(0, 0);
// ctx.lineTo(300, 100);
// ctx.lineTo(80, 200);
// ctx.lineTo(10, 100);
// ctx.lineTo(0, 0);
// // stroke the path
// ctx.stroke();


// // set some style
// ctx.lineWidth = 5;
// ctx.strokeStyle = "blue";
// // calculate incremental points along the path
// var points = calcWaypoints(vertices);
// // extend the line from start to finish with animation
// animate(points);


// // calc waypoints traveling along vertices
// function calcWaypoints(vertices) {
// 	var waypoints = [];
// 	for (var i = 1; i < vertices.length; i++) {
// 			var pt0 = vertices[i - 1];
// 			var pt1 = vertices[i];
// 			var dx = pt1.x - pt0.x;
// 			var dy = pt1.y - pt0.y;
// 			for (var j = 0; j < 100; j++) {
// 					var x = pt0.x + dx * j / 100;
// 					var y = pt0.y + dy * j / 100;
// 					waypoints.push({
// 							x: x,
// 							y: y
// 					});
// 			}
// 	}
// 	return (waypoints);
// }


// function animate() {
// 	if (t < points.length - 1) {
// 			requestAnimationFrame(animate);
// 	}
// 	// draw a line segment from the last waypoint
// 	// to the current waypoint
// 	ctx.beginPath();
// 	ctx.moveTo(points[t - 1].x, points[t - 1].y);
// 	ctx.lineTo(points[t].x, points[t].y);
// 	ctx.stroke();
// 	// increment "t" to get the next waypoint
// 	t++;
// }