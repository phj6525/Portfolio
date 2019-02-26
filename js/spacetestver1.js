var bg, bg2, spaceship, msl = [], rock = [], score, sa = [];

function start() {
	spaceship = new object.sscomponent(30, 36, "../img/spaceship.png", 200, 350, "image");
	bg = new object.bgcomponent(400, 700, "black", 0, 0, "background");
	bg2 = new object.bg2component(800, 1400, "../img/spacebg.jpg", 0, 0, "background");
	score = new object.scorecomponent("30px", "Dotum", "skyblue", 250, 40, "text");
	area.start();
}

var area = { 
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 400;
		this.canvas.height = 700;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[2]);
		this.frameNo = 0;
		this.interval = setInterval(areaupdate, 20);
		window.addEventListener('keydown', function (e) {
			area.keys = (area.keys || []);
			area.keys[e.keyCode] = true;
		}),
		window.addEventListener('keyup', function (e) {
			area.keys[e.keyCode] = false;
		})
	},
	clear : function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function () {
		clearInterval(this.interval);
	}
}

var object = {
	scorecomponent : function (width, height, color, x, y, type) {
		this.type = type;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		this.update = function () {
			ctx = area.context;
			if (this.type == "text") {
				ctx.font = this.width + " " +this.height;
				ctx.fillStyle = color;
				ctx.fillText(this.text, this.x, this.y);
			} else {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		this.newPos = function () {
			this.x += this.speedX;
			this.y += this.speedY;
		}
		this.sum = function (array) {
			var result = 0;
			for(i = 0; i < array.length; i++) {
				result += array[i];
			}
			return result;
		}
	},

	sscomponent : function(width, height, color, x, y, type) {
		this.type = type;
			if (type == "image") {
				this.image = new Image();
				this.image.src = color;
			}
		this.width = width;
		this.height = height;
		this.angle = 0;
		this.moveAngle = 0;
		this.x = x;
		this.y = y;
		this.update = function () {
			ctx = area.context;
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.fillStyle = color;
			ctx.drawImage(this.image, this.width  / -2, this.height  / -2, this.width, this.height);
			ctx.restore();
		}
		this.newPos = function() {
			this.angle += this.moveAngle * Math.PI / 360;
			document.getElementById('ss').innerHTML = "x =" + this.x + " " + "y =" +this.y;
		}
	},

	mslcomponent: function(width, height, color, x, y, type) {
		this.type = type;
			if (type == "image") {
				this.image = new Image();
				this.image.src = color;
			}
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		this.angle = 0;
		this.moveAngle = 1;
		this.update = function () {
			ctx = area.context;;
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.fillStyle = color;
			ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
			ctx.restore();
		}
		this.newPos = function() {
			var cx, cy, dist, dx, dy;
			cx = area.canvas.width/2;
			cy = area.canvas.height/2;
			dist = (Math.sqrt(Math.pow(cx-this.x, 2)+Math.pow(cy-this.y, 2)));
			dx = 3.5*(cx-this.x) / dist;
			dy = 3.5*(cy-this.y) / dist;
			this.angle = Math.atan2(dy, dx) + Math.PI/2;
			this.x += dx - ( this.speedX  * Math.sin(this.angle) - bg.speedX  * Math.sin(bg.angle));
			this.y += dy - ( this.speedY  * Math.cos(this.angle) - bg.speedY  * Math.cos(bg.angle));
			document.getElementById('msl').innerHTML = "x =" + Math.floor(this.x) + " " + "y =" + Math.floor(this.y);
		}
		this.crash = function (obj) {
			var x, y, ox, oy, ow, oh, m, m2, b, crh;
			crh = false;
			x = this.x;
			y = this.y;
			ox = obj.x;
			oy = obj.y;
			ow = obj.width;
			oh = obj.height;
			m = (oy+(oy-oh/2))/(ox-(ox-ow/2));
			m2 = (oy+(oy-oh/2))/(ox-(ox+ow/2));
			b = area.canvas.height - (m * area.canvas.width);
			if (y+this.height/5 > oy-oh/2 && y-this.height/5 < oy+oh/2) {
				if (x > ox-ow/2 && x < (y - b)/m && x < ox+ow/2 && x > (y - b)/m2) {
					return true;
				}
			}
		}
	},

	bgcomponent : function(width, height, color, x, y, type) {
		this.type = type;
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
		this.angle = 0;
		this.moveAngle = 0;
		this.x = x;
		this.y = y;
		this.update = function() {
			ctx = area.context;
			ctx.save();
			ctx.translate(this.x + this.width/2, this.y + this.height/2);
			ctx.rotate(this.angle);
			ctx.fillStyle = color;
			ctx.fillRect(this.width/-2, this.height/-2, this.width, this.height);
			ctx.restore();
			if (type == "background") {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				if (type == "background") {
					ctx.fillStyle = color;
					ctx.fillRect(this.x + this.width, this.y, this.width, this.height);
					ctx.fillRect(this.x - this.width, this.y, this.width, this.height);
					ctx.fillRect(this.x, this.y + this.height, this.width, this.height);
					ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
					ctx.fillRect(this.x + this.width, this.y - this.height, this.width, this.height);
					ctx.fillRect(this.x + this.width, this.y + this.height, this.width, this.height);
					ctx.fillRect(this.x - this.width, this.y + this.height, this.width, this.height);
					ctx.fillRect(this.x - this.width, this.y - this.height, this.width, this.height);
				}
			} else {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		this.newPos = function() {
			this.angle += this.moveAngle * Math.PI / 360;
			this.x += this.speedX  * Math.sin(this.angle);
			this.y += this.speedY  * Math.cos(this.angle);
			if (this.type == "background") {
				if (this.x == (this.width) || this.x == -(this.width)) {
					this.x = 0;
				}
				if (this.y == (this.height) || this.y == -(this.height)) {
					this.y = 0;
				}
			}
			document.getElementById('bg').innerHTML = "x =" + Math.floor(this.x) + " " + "y =" + Math.floor(this.y);
		}
	},

	bg2component : function(width, height, color, x, y, type) {
		this.type = type;
		if (type == "image" || type == "background") {
			this.image = new Image();
			this.image.src = color;
		}
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
		this.angle = 0;
		this.moveAngle = 0.05;    
		this.x = x;
		this.y = y;    
		this.update = function() {
			ctx = area.context;
			ctx.save();
			ctx.translate(this.x + this.width /4, this.y + this.height/4);
			ctx.rotate(this.angle);
			ctx.fillStyle = color;
			ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
			ctx.restore();
		}
		this.newPos = function() {
			var cx, cy, dist, dx, dy;
			cx = area.canvas.width/2;
			cy = area.canvas.height/2;
			dist = (Math.sqrt(Math.pow(cx-this.x, 2)+Math.pow(cy-this.y, 2)));
			dx = 0*(cx-this.x) / dist;
			dy = 0*(cy-this.y) / dist;
			this.angle += this.moveAngle * Math.PI / 360;
		}
	},

	rockcomponent : function(width, height, color, x, y, type) {
		this.type = type;
			if (type == "image") {
				this.image = new Image();
				this.image.src = color;
			}
		this.width = width;
		this.height = height;
		this.angle = 0;
		this.moveAngle = 1;
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		this.update = function() {
			ctx = area.context;
			ctx.save();
			ctx.translate(this.x + this.width /2, this.y + this.height/2);
			ctx.rotate(this.angle);
			ctx.fillStyle = color;
			ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
			ctx.restore();
		}
		this.newPos = function () {
			var cx, cy, dist, dx, dy;
			cx = area.canvas.width/2;
			cy = area.canvas.height/2;
			dist = (Math.sqrt(Math.pow(cx-this.x, 2)+Math.pow(cy-this.y, 2)));
			dx = 0*(cx-this.x) / dist;
			dy = 0*(cy-this.y) / dist;
			this.angle += this.moveAngle * Math.PI / 360;
			this.x += dx - (this.speedX  * Math.sin(this.angle) - bg.speedX  * Math.sin(bg.angle));
			this.y += dy - (this.speedY  * Math.cos(this.angle) - bg.speedY  * Math.cos(bg.angle));
			
			document.getElementById('rock').innerHTML = "x =" + Math.floor(this.x) + " " + "y =" + Math.floor(this.y);
		}
		this.crash = function (obj) {
			var lt, rt, tp, bt, objlt, objrt, objtp, objbt, crh = false;
			lt = this.x;
			rt = this.x + this.width;
			tp = this.y;
			bt = this.y + this.height;
			objlt = obj.x;
			objrt = obj.x + obj.width;
			objtp = obj.y;
			objbt = obj.y + obj.height;
			if ((lt+this.width/4 < objrt ) && (rt > objlt) && (tp+this.height/4 < objbt) && (bt > objtp)) {
				crh = true;
			} return crh;
		}
	}
}

function everyinterval(n) {
	if ((area.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function areaupdate() {
	var speed = 5;
	for (i = 0; i < msl.length; i++) {
		if (msl[i].crash(spaceship)) {
			area.stop();
		}
		for (j = 0; j < rock.length; j++) {
			if (rock[j].crash(msl[i])) {
				msl.splice(i, 1);
				rock.splice(j, 1); 
				sa.push(500);
			}
		}
		document.getElementById('mn').innerHTML = i+1;

	}
	for (i = 0; i < rock.length; i++) {
		if (rock[i].crash(spaceship)) {
			area.stop();
		}
		document.getElementById('rn').innerHTML = i+1;
	}
		bg.speedX = 0;
		bg.speedY = 0;
		bg.moveAngle = 0;
		bg2.speedX = 0;
		bg2.speedY = 0;
		spaceship.moveAngle = 0;
		if (area.keys && area.keys[37]) {
			bg.moveAngle = -speed;
			spaceship.moveAngle = -speed;
		}
		if (area.keys && area.keys[39]) {
			bg.moveAngle = speed;
			spaceship.moveAngle = speed;
		}
		if (area.keys && area.keys[38]) {
			bg.speedX -= speed;
			bg.speedY += speed;
			bg2.speedX += speed;
			bg2.speedY -= speed;
		}
		if (area.keys && area.keys[40]) { 
			bg.speedX += speed;
			bg.speedY -= speed;
			bg2.speedX -= speed;
			bg2.speedY += speed;
		}
	area.clear();
	area.frameNo++;
	if (area.frameNo == 1 || everyinterval(300)) {
		var x, y, sx, sy, cx, cy, mx, my, mr;
		sx = 100;
		sy = 100;
		cx = spaceship.x;
		cy = spaceship.y;
		x = cx + (Math.random() * cx + 1);
		y = cy + (Math.random() * cy + 1);
		mx = Math.random() * cx + 1;
		my = Math.random() * cy + 1;
		mr = Math.floor(Math.random()*10)+1;
		if (rock.length < 20) {
			if (area.frameNo == 1 || everyinterval(3000)) {
				rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", cx, -cy/3, "image"));
				rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", -cx/3, cy, "image"));
				rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", cx*2, cy, "image"));
				rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", cx, cy*2, "image"));
			}
			if (area.frameNo == 300 || everyinterval(400)) {
				if (mr < 5) {
					rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", cx, -cy/2, "image"));
					rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", cx, cy*2, "image"));
				}
				if (mr > 5) {
					rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", -cx/2, cy, "image"));
					rock.push(new object.rockcomponent(sx, sy, "../img/rock.png", cx*2, cy, "image"));
				}
			}
		}
		if (msl.length < 4) {
			if (mr < 5) {
				msl.push(new object.mslcomponent(14, 30, "../img/missile.png",0, 0, "image"));
				msl.push(new object.mslcomponent(14, 30, "../img/missile.png",400, 700, "image"));
			}
			if (mr > 5) {
				msl.push(new object.mslcomponent(14, 30, "../img/missile.png",400, 0, "image"));
				msl.push(new object.mslcomponent(14, 30, "../img/missile.png",0, 700, "image"));
			}
		}
	}
	bg.newPos();
	bg.update();
	bg2.newPos();
	bg2.update();
	spaceship.newPos();
	spaceship.update();
	for (i = 0; i < msl.length; i++) {
		msl[i].newPos();
		msl[i].update();
	}
	for (i = 0; i < rock.length; i++) {
		rock[i].newPos();
		rock[i].update();
	}
	score.text = score.sum(sa);
	score.update();

}