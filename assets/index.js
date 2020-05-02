document.body.requestFullscreen();

var activeLines = new Array;

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const dripCanvas = document.querySelector('.drips');
const dtx = dripCanvas.getContext("2d");




dripCanvas.addEventListener("touchstart", handleStart, false);
dripCanvas.addEventListener("touchend", handleEnd, false);
dripCanvas.addEventListener("touchcancel", handleEnd, false);
dripCanvas.addEventListener("touchleave", handleEnd, false);
dripCanvas.addEventListener("touchmove", handleMove, false);






let height = Math.min(window.innerHeight,window.innerWidth);
let width = Math.max(window.innerWidth,window.innerHeight);
resizeCanvas();



var img = new Image();
img.onload = function () {
	ctx.drawImage(img, 0, 0, (width- 10),(height-10));
};
img.src = 'assets/Hello_my_name_is_sticker.svg';



function handleStart(e) {


	var {clientX:x,clientY:y} = e.changedTouches[0];
	activeLines.push({x,y});

	ctx.beginPath();
	ctx.arc(x,y, 4, 0, 2 * Math.PI, false);  // a circle at the start
	ctx.fillStyle = '#000000';
	ctx.fill();



}



	function handleMove(e) {

		var {clientX:x,clientY:y} = e.changedTouches[0];
		e.preventDefault();
		var colour = '#000000';
		ctx.beginPath();
		ctx.moveTo(activeLines[0].x, activeLines[0].y);
		ctx.lineTo(x, y);
		ctx.lineWidth = 8;
		ctx.strokeStyle = colour;
		ctx.stroke();
		activeLines.splice(0,1,{x,y});

		const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);
		startDrip(x,y,(y+dripLength),y);


}
// }
function handleEnd(e) {
	activeLines = [];
}







function resizeCanvas() {


	canvas.height = height;
	canvas.width = width;
	dripCanvas.height = height;
	dripCanvas.width = width;



}













// let isDrawing = false;
// let count = 0;

const minDrip = 1;
const maxDrip = 400;


let dripAnimationController;









// //listeners
// document.addEventListener('mousemove', move);
// document.addEventListener('mousedown', startDrawing);
// document.addEventListener('mouseup', stopDrawing);



















// const penOptions = {
// 	colour: '#000000',
// 	width: 30,
// 	dripTolerance: 2,
// 	tip: 'bevel' //round,bevel,miter
// }

// setInterval(function () {
// 	if (isDrawing) {
// 		count++;
// 	}
// }, 100)

// function startDrawing(e) {
// 	isDrawing = true;
// 	ctx.beginPath();
// 	dtx.beginPath();
// 	count = 1;
// 	draw(e.clientX,e.clientY)
// }

// function stopDrawing() {
// 	isDrawing = false;
// 	ctx.closePath();
// 	count = 1;
// }


// function move({
// 	clientX: x,
// 	clientY: y
// }) {
// 	if (!isDrawing) return;

// 	draw(x,y);

// }


// function draw(x,y){
// 	console.log('draw',x,y);
// 	const {
// 		colour,
// 		width,
// 		tip, dripTolerance
// 	} = penOptions;
// 	ctx.lineWidth = width;
// 	ctx.strokeStyle = colour;
// 	ctx.lineJoin = tip;
// 	ctx.lineTo(x, y);
// 	ctx.stroke();
// 	//ctx.closePath();
// 	if (count % dripTolerance == 0 || dripTolerance == 0) {
// 		const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);
// 		startDrip(x,y,(y+dripLength),y);
// 	}
// }

// // function drip(x, y) {
// // 	const {
// // 		colour,
// // 		width,
// // 		tip
// // 	} = penOptions;
// // 	dtx.strokeStyle = colour;
// // 	dtx.fillStyle = colour;
// // 	dtx.lineJoin = tip;
// // 	dtx.beginPath();
// // 	dtx.linecap = "round"


// // 	let minDripWidth = 0.5;
// // 	let maxDripWidth = (width / 8 < 1) ? 1 : width / 8;
// // 	dtx.lineWidth = Math.floor(Math.random() * (maxDripWidth - minDripWidth + 1) + minDripWidth);


// // 	const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);

// // 	dtx.moveTo(x, y);
// // 	dtx.lineTo(x, y + dripLength);
// // 	dtx.stroke();
// // 	dtx.closePath();
// // }


























function drawDrip(x,start,end,current) {

	if(current > end){
		stopAnimation();
		return;
	}

	// const {
	// 	colour,
	// 	width,
	// 	tip
	// } = penOptions;
	dtx.strokeStyle = '#000000';
	dtx.fillStyle = '#000000';
	// dtx.lineJoin = tip;
	//dtx.beginPath();
	dtx.linecap = "round"
	lineWidth = 4;


	dtx.moveTo(x,current);

	current+=10;

//	dtx.moveTo(x, start);
	dtx.lineTo(x, current);
	dtx.stroke();
	dtx.closePath();


	dripAnimationController = requestAnimationFrame(function(){
		drawDrip(x,start,end,current)
	});
}

function startDrip(x,start,end,current){
	dripAnimationController = requestAnimationFrame(function(){
		drawDrip(x,start,end,current)
	})
}


function stopAnimation(){
  cancelAnimationFrame(dripAnimationController);
}

