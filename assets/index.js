// document.body.requestFullscreen();
var activeLines = new Array;

//query selectors
const canvasContainer = document.querySelector('.canvasContainer');
const selects = document.querySelectorAll('select');
const canvas = document.querySelector('.canvas');
const dripCanvas = document.querySelector('.drips');
const clearBtn = document.querySelector('.clear');


//initialize canvas
const ctx = canvas.getContext("2d");
const dtx = dripCanvas.getContext("2d");

//set globals
let count = 0;
let dripSpeed = 5;

//set default pen options
const options = {
	penWidth: 10,
	dripTolerance: 2
}
//Event listeners
selects.forEach((el) => {
	//handle change event for dropdowns
	el.addEventListener('change', updateOption)
});

//when clicking the clear button
clearBtn.addEventListener('click', initialize);

dripCanvas.addEventListener("touchstart", handleStart, false);
dripCanvas.addEventListener("touchend", handleEnd, false);
dripCanvas.addEventListener("touchcancel", handleEnd, false);
dripCanvas.addEventListener("touchleave", handleEnd, false);
dripCanvas.addEventListener("touchmove", handleMove, false);
//FNS
//dropdown change event
function updateOption(e) {
	options[this.dataset.change] = this.value;
}


setInterval(function () {
	if (activeLines.length > 0) {
		count++;
	} else {
		count = 0;
	}
	if (count > options.dripTolerance) {
		count = 0;
		drip();
	}
}, 100)





function initialize() {
	activeLines = [];
	let height = Math.min(canvasContainer.clientHeight, canvasContainer.clientWidth);
	let width = Math.max(canvasContainer.clientWidth, canvasContainer.clientHeight);
	resizeCanvas(height, width);
	var img = new Image();
	img.onload = function () {
		ctx.drawImage(img, 0, 0, (width - 10), (height - 10));
	};
	img.src = 'assets/Hello_my_name_is_sticker.svg';
}


function handleStart(e) {
	var {
		clientX: x,
		clientY: y
	} = e.changedTouches[0];
	activeLines.push({
		x,
		y
	});
	// ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.arc(x, y, (options.penWidth / 2), 0, 2 * Math.PI, false); // a circle at the start
	ctx.fillStyle = '#000000';
	ctx.fill();
}

function handleMove(e) {
	var {
		clientX: x,
		clientY: y
	} = e.changedTouches[0];
	e.preventDefault();
	var colour = '#000000';
	ctx.beginPath();
	ctx.moveTo(activeLines[0].x, activeLines[0].y);
	ctx.lineTo(x, y);
	ctx.lineCap = "round";
	ctx.lineWidth = options.penWidth;
	ctx.strokeStyle = colour;
	ctx.stroke();
	activeLines.splice(0, 1, {
		x,
		y
	});
	if (count > options.dripTolerance) {
		drip();
	}
}
// }
function handleEnd(e) {
	activeLines = [];
}

function resizeCanvas(h, w) {
	canvas.height = h;
	canvas.width = w;
	dripCanvas.height = h;
	dripCanvas.width = w;
}
// let isDrawing = false;
// let count = 0;
const minDrip = 1;
const maxDrip = 200;
let dripAnimationController;

function drip() {
	const {
		x,
		y
	} = activeLines[0];
	const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);
	startDrip(x, y, (y + dripLength), y);
}



function drawDrip(x, start, end, current) {
	if (current > end) {
		stopAnimation();
		return;
	}

	dtx.strokeStyle = '#000000';
	dtx.fillStyle = '#000000';
	// dtx.lineJoin = tip;
	//dtx.beginPath();
	dtx.linecap = "round"
	dtx.lineWidth = 1;
	dtx.moveTo(x, current);
	current += dripSpeed;
	//	dtx.moveTo(x, start);
	dtx.lineTo(x, current);
	dtx.stroke();
	dtx.closePath();
	dripAnimationController = requestAnimationFrame(function () {
		drawDrip(x, start, end, current)
	});
}

function startDrip(x, start, end, current) {
	dripAnimationController = requestAnimationFrame(function () {
		drawDrip(x, start, end, current)
	})
}

function stopAnimation() {
	// count = 0;
	cancelAnimationFrame(dripAnimationController);
}





initialize();