const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const dripCanvas = document.querySelector('.drips');
const dtx = dripCanvas.getContext("2d");

let isDrawing = false;
let count = 0;

const minDrip = 1;
const maxDrip = 400;

let dripAnimationController;

const height = window.innerHeight;
const width = window.innerWidth;

resizeCanvas();

var img = new Image();

img.onload = function () {
	ctx.drawImage(img, 0, 0, (width- 10),(height-10));
};

img.src = '/assets/Hello_my_name_is_sticker.svg';




//listeners
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', startDrawing);
document.addEventListener('mouseup', stopDrawing);

const penOptions = {
	colour: '#000000',
	width: 50,
	dripTolerance: 2,
	tip: 'round' //round,bevel,miter
}

setInterval(function () {
	if (isDrawing) {
		count++;
	}
}, 100)

function startDrawing(e) {
	isDrawing = true;
	// ctx.moveTo(e.clientX,e.clientY)
	ctx.beginPath();
	dtx.beginPath();
	count = 1;
	draw(e)
}

function stopDrawing() {
	isDrawing = false;
	ctx.closePath();
	count = 1;
}


function draw({
	clientX: x,
	clientY: y
}) {
	if (!isDrawing) return;

	const {
		colour,
		width,
		tip, dripTolerance
	} = penOptions;
	ctx.lineWidth = width;
	ctx.strokeStyle = colour;
	ctx.lineJoin = tip;
	ctx.lineTo(x, y);
	ctx.stroke();
	//ctx.closePath();
	if (count % dripTolerance == 0 || dripTolerance == 0) {
		const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);
		startDrip(x,y,(y+dripLength),y);
	}

}




// function drip(x, y) {
// 	const {
// 		colour,
// 		width,
// 		tip
// 	} = penOptions;
// 	dtx.strokeStyle = colour;
// 	dtx.fillStyle = colour;
// 	dtx.lineJoin = tip;
// 	dtx.beginPath();
// 	dtx.linecap = "round"


// 	let minDripWidth = 0.5;
// 	let maxDripWidth = (width / 8 < 1) ? 1 : width / 8;
// 	dtx.lineWidth = Math.floor(Math.random() * (maxDripWidth - minDripWidth + 1) + minDripWidth);


// 	const dripLength = Math.floor(Math.random() * (maxDrip - minDrip + 1) + minDrip);

// 	dtx.moveTo(x, y);
// 	dtx.lineTo(x, y + dripLength);
// 	dtx.stroke();
// 	dtx.closePath();
// }






function resizeCanvas() {

	canvas.height = height;
	canvas.width = width;
	dripCanvas.height = height;
	dripCanvas.width = width;

}



















function drawDrip(x,start,end,current) {

	if(current > end){
		stopAnimation();
		return;
	}

	const {
		colour,
		width,
		tip
	} = penOptions;
	dtx.strokeStyle = colour;
	dtx.fillStyle = colour;
	dtx.lineJoin = tip;
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

