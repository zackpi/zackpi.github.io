
// set up canvas
;(function () {
	let canvas, ctx;

	function init () {
		hidden_canvas = document.getElementById('hidden-canvas');
		hidden_ctx = hidden_canvas.getContext('2d');
		canvas = document.getElementById('portrait-canvas');
		ctx = canvas.getContext('2d');

		var img_silhouette = new Image();
		var img_shirt = new Image();
		var img_collar = new Image();
		var img_neck = new Image();
		var img_head = new Image();
		var img_face = new Image();
		var img_eyes = new Image();

		function randLayer(layer) {
			hidden_ctx.drawImage(layer, 0, 0);
			img = hidden_ctx.getImageData(0, 0, hidden_canvas.width, hidden_canvas.height);
			virtual = ctx.getImageData(0, 0, canvas.width, canvas.height);
			hidden_ctx.clearRect(0, 0, hidden_canvas.width, hidden_canvas.height);
			
			var i;
			var r = 255 * (Math.random() > 0.5);
			var g = 255 * (Math.random() > 0.5);
			var b = 255 * (Math.random() > 0.5);
			var a = 0.3;
			for (i = 0; i < img.data.length; i += 4) {
				img.data[i] = r * a * img.data[i] + virtual.data[i];
				img.data[i+1] = g * a * img.data[i+1] + virtual.data[i+1];
				img.data[i+2] = b * a * img.data[i+2] + virtual.data[i+2];
				img.data[i+3] = 255 * a;
			}

			ctx.putImageData(img, 0, 0);
		}

		img_silhouette.onload = function() { randLayer(img_silhouette); };
		img_shirt.onload = function() { randLayer(img_shirt); };
		img_collar.onload = function() { randLayer(img_collar); };
		img_neck.onload = function() { randLayer(img_neck); };
		img_head.onload = function() { randLayer(img_head); };
		img_face.onload = function() { randLayer(img_face); };
		img_eyes.onload = function() { randLayer(img_eyes); };

		img_silhouette.src = "/assets/img/about/silhouette.png";
		img_shirt.src = "/assets/img/about/shirt.png";
		img_collar.src = "/assets/img/about/collar.png";
		img_neck.src = "/assets/img/about/neck.png";
		img_head.src = "/assets/img/about/head.png";
		img_face.src = "/assets/img/about/face.png";
		img_eyes.src = "/assets/img/about/eyes.png";
	}

	document.addEventListener('DOMContentLoaded', init);

})();	