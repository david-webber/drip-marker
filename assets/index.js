const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext("2d");
const dripCanvas  = document.querySelector('.drips');
const dtx = dripCanvas.getContext("2d");

let isDrawing = false;
let count = 0;
const minDrip = 2;
const maxDrip = 300;
const dripTolerance = 2;
let dripStarted = false;

resizeCanvas();

var img = new Image();

img.onload = function () {
	ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
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

setInterval(function(){
	if(isDrawing){
		count++;
	}
},100)

function startDrawing(e){
	isDrawing = true;

	ctx.beginPath();
	dtx.beginPath();
	count = 1;
	draw(e)

}

function stopDrawing(){
	isDrawing = false;

	count = 1;
}


function draw({clientX:x,clientY:y}){
	if(!isDrawing) return;
	// console.log('draw',x,y);
	// console.log('is drawing', isDrawing);
	const {colour,width,tip} = penOptions;
	ctx.lineWidth = width;
	ctx.strokeStyle = colour;
	ctx.fillStyle = colour;
	ctx.lineJoin = tip;


		// ctx.moveTo(x,y);
	//	count++;
	ctx.lineTo(x,y);
	ctx.stroke();
	// ctx.beginPath();
	// ctx.moveTo(x,y)
		// ctx.closePath();
		if(count % dripTolerance == 0){
			drip(x,y);
		// if(!dripStarted){
		// 	startDrip(x, y)
		// }
		}

}


let dripEnd = 0;
function startDrip(x,y){

	const {colour,width,tip} = penOptions;
	dtx.strokeStyle = colour;
	dtx.fillStyle = colour;
	dtx.lineJoin = tip;
	dtx.beginPath();
	dtx.linecap = "round"


	let minDripWidth = 0.5;
	let maxDripWidth = (width/8<1)?1:width/8;
	dtx.lineWidth = Math.floor(Math.random()*(maxDripWidth-minDripWidth+1)+minDripWidth);


	dripStarted = true;
	dripEnd = y + maxDrip;
	drawDrip(x,y);
}

function drawDrip(x,dripPosition){




	dtx.moveTo(x,dripPosition);
	dtx.lineTo(x,dripPosition+ 1);
	dtx.stroke();
	dtx.closePath();


	if(dripPosition < dripEnd){
		drawDrip(x,dripPosition+1);
	}else{
		dripStarted = false;
	}



}








function drip(x,y){
	const {colour,width,tip} = penOptions;
	dtx.strokeStyle = colour;
	dtx.fillStyle = colour;
	dtx.lineJoin = tip;
	 dtx.beginPath();
dtx.linecap = "round"


	let minDripWidth = 0.5;
	let maxDripWidth = (width/8<1)?1:width/8;
	dtx.lineWidth = Math.floor(Math.random()*(maxDripWidth-minDripWidth+1)+minDripWidth);


	const dripLength = Math.floor(Math.random()*(maxDrip-minDrip+1)+minDrip);

	dtx.moveTo(x,y);
	dtx.lineTo(x,y+dripLength);
	dtx.stroke();
	dtx.closePath();
}






function resizeCanvas(){
	canvas.height = window.innerHeight - 5;
	canvas.width = window.innerWidth - 5;
	dripCanvas.height = window.innerHeight - 5;
	dripCanvas.width = window.innerWidth - 5;

}