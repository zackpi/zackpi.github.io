
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const image_to_load = new Image();
		image_to_load.onload = () => { resolve(image_to_load); };
		image_to_load.onerror = err => { reject(err); }
		image_to_load.src = src;
	});
}


let canvas, ctx;
let hidden_canvas, hidden_ctx;

let img_silhouette;
let img_shirt;
let img_collar;
let img_neck;
let img_head;
let img_face;
let img_eyes;


async function randLayer(layer) {
	hidden_ctx.drawImage(layer, 0, 0);
	img = hidden_ctx.getImageData(0, 0, hidden_canvas.width, hidden_canvas.height);
	virtual = ctx.getImageData(0, 0, canvas.width, canvas.height);
	hidden_ctx.clearRect(0, 0, hidden_canvas.width, hidden_canvas.height);
	
	var i, r = 0, g = 0, b = 0, a = 0.8;
	while (r == 0 && g == 0 && b == 0) { 
		r = 255 * (Math.random() > 0.5);
		g = 255 * (Math.random() > 0.5);
		b = 255 * (Math.random() > 0.5);
	}

	for (i = 0; i < img.data.length; i += 4) {
		img.data[i] = r * a * img.data[i] + a * virtual.data[i];
		img.data[i+1] = g * a * img.data[i+1] + a * virtual.data[i+1];
		img.data[i+2] = b * a * img.data[i+2] + a * virtual.data[i+2];
		img.data[i+3] = 255 * a;
	}

	ctx.putImageData(img, 0, 0);		
	return 1;
}

// randomize face but make sure to do all the layers in order
async function randomizeFace() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	randLayer(img_silhouette);
	randLayer(img_shirt);
	randLayer(img_collar);
	randLayer(img_neck);
	randLayer(img_head);
	randLayer(img_face);
	randLayer(img_eyes);

	return 1;
}

// initialize the canvases and preload all the images
async function init() {
	hidden_canvas = document.getElementById('hidden-canvas');
	hidden_ctx = hidden_canvas.getContext('2d');
	canvas = document.getElementById('portrait-canvas');
	ctx = canvas.getContext('2d');

	image_sources = ["/assets/img/about/silhouette.png", 
									"/assets/img/about/shirt.png",
									"/assets/img/about/collar.png",
									"/assets/img/about/neck.png",
									"/assets/img/about/head.png",
									"/assets/img/about/face.png",
									"/assets/img/about/eyes.png"];

	Promise.all(image_sources.map(i => loadImage(i)))
		.then((images) => {
			img_silhouette = images[0];
			img_shirt = images[1];
			img_collar = images[2];
			img_neck = images[3];
			img_head = images[4];
			img_face = images[5];
			img_eyes = images[6];
			randomizeFace();
		});

	return 1;
}


// set up canvas
document.addEventListener('DOMContentLoaded', init);	