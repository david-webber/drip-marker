// document.body.requestFullscreen();

var activeLines = new Array;

const canvasContainer = document.querySelector('.canvasContainer');
const selects = document.querySelectorAll('select');
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const dripCanvas = document.querySelector('.drips');
const dtx = dripCanvas.getContext("2d");
let count = 0;
let dripSpeed = 5;

const options = {
	penWidth: 10,
	dripTolerance: 2
}




selects.forEach((el)=>{
	el.addEventListener('change', updateOption)
})
function updateOption(e){
	options[this.dataset.change] = this.value;
}




setInterval(function(){
	if(activeLines.length > 0){
		count++;
	}else{
		count = 0;
	}

if(count > options.dripTolerance){
	count = 0;
  drip();
}

},100)


dripCanvas.addEventListener("touchstart", handleStart, false);
dripCanvas.addEventListener("touchend", handleEnd, false);
dripCanvas.addEventListener("touchcancel", handleEnd, false);
dripCanvas.addEventListener("touchleave", handleEnd, false);
dripCanvas.addEventListener("touchmove", handleMove, false);






let height = Math.min(canvasContainer.clientHeight,canvasContainer.clientWidth);
let width = Math.max(canvasContainer.clientWidth,canvasContainer.clientHeight);
resizeCanvas();



var img = new Image();
img.onload = function () {
	ctx.drawImage(img, 0, 0, (width- 10),(height-10));
};
img.src = 'assets/Hello_my_name_is_sticker.svg';



function handleStart(e) {


	var {clientX:x,clientY:y} = e.changedTouches[0];
	activeLines.push({x,y});

	// ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.arc(x,y, (options.penWidth/2), 0, 2 * Math.PI, false);  // a circle at the start
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
		ctx.lineCap = "round";
		ctx.lineWidth = options.penWidth;
		ctx.strokeStyle = colour;
		ctx.stroke();
		activeLines.splice(0,1,{x,y});


		if(count > options.dripTolerance){
			drip();
		}


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
const maxDrip = 200;


let dripAnimationController;


function drip(){

	const {x,y} = activeLines[0];
	const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);
	startDrip(x,y,(y+dripLength),y);
}






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
	dtx.lineWidth =  1;


	dtx.moveTo(x,current);

	current+=dripSpeed;

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
	// count = 0;
  cancelAnimationFrame(dripAnimationController);
}

