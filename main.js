

var container, canvas, ctx, w, h, cx, cy, mx, my, fmx, fmy;
var canvas2, ctx2;
var evt_allLettersLoaded;
var mouseDown = false;
var lettersHolder;
var output
var follow

var colorArrays = new Array(
	['#652b2f', '#e3d8ce', '#74a1a0', '#78755e', '#885336'],
	['#666666', '#d02f3e', '#ff993c', '#99d0cb', '#fff2d2'],
	['#e3d8ce', '#74a1a0', '#78755e', '#885336', '#652b2f'],
	['#f29494', '#b85c76', '#fff2cc', '#b8ffde', '#d4ac85'],
	['#fae3c1', '#ca96bc', '#f59f92', '#b95c4d', '#666666'],
	['#d19ea9', '#85a29e', '#f0d442', '#b26e80', '#b2cba3'],
	['#e5dcca', '#d2b817', '#f89135', '#f5653d', '#5f4b25']
	);
//var colorArray = ['#652b2f', '#e3d8ce', '#74a1a0', '#78755e', '#885336'];
var colorArray = ['#666666', '#d02f3e', '#ff993c', '#99d0cb', '#fff2d2'];
//var colorArray = ['#e3d8ce', '#74a1a0', '#78755e', '#885336', '#652b2f'];
//var colorArray = ['#f29494', '#b85c76', '#fff2cc', '#b8ffde', '#d4ac85'];
//var colorArray = ['#fae3c1', '#ca96bc', '#f59f92', '#b95c4d', '#666666'];
//var colorArray = ['#d19ea9', '#85a29e', '#f0d442', '#b26e80', '#b2cba3'];
//var colorArray = ['#e5dcca', '#d2b817', '#f89135', '#f5653d', '#5f4b25'];

var colorArray = ['#114aea', '#114aea', '#114aea', '#114aea', '#114aea'];
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************


// ONLOAD
// ---------------------------
window.onload = function(){
	init();
};
// ---------------------------
// ---------------------------


// INIT
// ---------------------------
init = function(){	

	w = window.innerWidth;
	h = window.innerHeight+10;

	mx = fmx = w * .5;
	my = fmy = h * .5;

	container = document.getElementById("container");
	
	// canvas
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	// canvas2
	canvas2 = document.createElement("canvas");
	canvas2.style.opacity = 1
	ctx2 = canvas2.getContext("2d");
	canvas2.id = 'canvas2'
	container.appendChild(canvas2)

	// set canvas
	canvas.width = ctx.width = canvas2.width = ctx2.width = window.innerWidth;
	canvas.height = ctx.height = canvas2.height = ctx2.height = window.innerHeight;

	// ---
	output = document.createElement("div");
	output.id = 'output'
	container.appendChild(output)
	// ---

	

	createParticles()
	

	// ready
	positionElements();
	requestAnimationFrame(render);

	window.addEventListener('mousemove', mousemove)


};
// ---------------------------
// ---------------------------


mousemove = function(e){
	
	mx = e.pageX;
	my = e.pageY;
	// ---
	if(fmy < 0){
		fmx = mx;
		fmy = my;
	};

};



// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************



// RENDER
// ---------------------------
render = function(){


	fmx += (mx-fmx) *.05;
	fmy += (my-fmy) *.05;


	ctx.clearRect(0,0,w,h);
	// ---

	/*
	ctx.beginPath();
	ctx.fillStyle = '#666'
	ctx.rect(0,0,w,h)
	ctx.fill();
	*/
	
	
	// ---
	renderParticles();
	// ---
	
	// ---
	ctx.strokeStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(fmx, h);
	ctx.lineTo(fmx, h-20);
	//ctx.stroke();
	// ---
	requestAnimationFrame(render);

};
// ---------------------------



// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************



// POSITION ELEMENTS
// ---------------------------
positionElements = function(){
	
	w = window.innerWidth;
	h = window.innerHeight+10;
	cx = w*.5;
	cy = h*.5;
	
	// set canvas 	
	//canvas.style.marginLeft = canvas2.style.marginLeft = ((window.innerWidth - canvas.width)*.5) + 'px';
	//canvas.style.marginTop = canvas2.style.marginTop = ((window.innerHeight - canvas.height)*.5) + 'px';


	canvas.width = w;
	canvas.height = h+1;
	canvas2.width = w;
	canvas2.height = h+1;


	container.style.width = w + 'px'
	container.style.height = h + 'px'

	// center
	ccx = canvas.width*.5
	ccy = canvas.height*.5

	
	var grd = ctx.createLinearGradient(0,0,w,h);
	grd.addColorStop(0, "#ccc");
	grd.addColorStop(1,"#333");
	//ctx2.fillStyle = grd;
	//ctx2.fillRect(0,0,w,h);

	ctx2.beginPath()
	var grd = ctx2.createLinearGradient(0,0,w,10);
	grd.addColorStop(0,colorArray[0]);
	grd.addColorStop(.4,colorArray[1]);
	grd.addColorStop(.5,colorArray[2]);
	grd.addColorStop(.6,colorArray[3]);
	grd.addColorStop(.8,colorArray[4]);
	grd.addColorStop(1,colorArray[0]);
	ctx2.fillStyle = grd;
	ctx2.fillRect(0, h-4, w, 10);

	positionParticles();

};
// ---------------------------
// ---------------------------



// EVENTS
// ---------------------------
// resize
window.onresize = function(){
	positionElements();
};
// ---------------------------
// page hide
$(document).on('pagehide', '#index', function(){ 
	$('[data-role="content"]').empty();
});
// mobile - touch move
$(document).bind('touchmove', function(e){
	e.preventDefault();
	// ---	
	var touch = e.originalEvent.touches[0];	
	mx = touch.pageX;
	my = touch.pageY;
});
// mobile - tap
$(document).bind("tap", function(e){
	mx = e.pageX;
	my = e.pageY;
	// ---
	onstageclicked();
});	




// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************

	
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame       || 
    	window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
        	window.setTimeout(callback, 1000 / 60);
        };
})();

	