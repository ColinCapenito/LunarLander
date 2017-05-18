
var gameArea = document.getElementById('gamescreen');
var gameRect = gameArea.getBoundingClientRect();
var gameAreaHeight = Math.round(gameRect.bottom - gameRect.top);
var gameAreaWidth = Math.round(gameRect.right - gameRect.left);




var lander = document.getElementById('Ship');
lander.style.position = "absolute";
lander.style.zIndex = "1";

var target = document.getElementById('Target');
target.style.position = "absolute";
target.style.zIndex = "1";

var flame = document.getElementById('Flame');
flame.style.position = "absolute";
flame.style.zIndex = "0";
flame.style.display = "none";

var damagedShip = document.getElementById('DamagedShip')
damagedShip.style.position = "absolute";
damagedShip.style.zIndex = "1";
damagedShip.style.display = "none";

var landerX = 0;
var landerY = 0;
var landerDX = 0;
var landerDY = 0;
var landerWidth = 110;

var targetX = 0;
var targetY = 0;
var crashed = false;
var moving = false;
var id = setInterval(frame, 40);

var flameX;
var flameY;

function checkForTarget(){
	var didIWin = false;

	if(Math.abs(landerX -targetX) < 15){
		if(((targetY + 5) - (landerY + 80)) < 5){
			if(Math.abs(landerDY) < 5){
				didIWin = true;
			}
		}
	}

	return didIWin;
}

function setFlamePosition(){
	flameX = landerX + 40;
	flameY = landerY + 80;
	flame.style.top = flameY + 'px';
	flame.style.left = flameX + 'px';
}

function showFlame(){
	flame.style.display = "block";
}

function hideFlame(){
	flame.style.display = "none";
}

function setLanderAndTarget(){
	crashed = false;

	lander.style.display = "block";
	damagedShip.style.display = "none";

	landerY = 0;
	landerX = Math.round(gameAreaWidth/2) - Math.round(landerWidth/2);
	lander.style.left = landerX + 'px';
	lander.style.top = landerY + 'px';
	setFlamePosition();
	//landerDY = 6;

	targetY = gameAreaHeight -95;
	targetX = Math.round(Math.random() * (gameAreaWidth - landerWidth));
	target.style.left = targetX + 'px';
	target.style.top = targetY + 'px';
}

var id;


function resetAnimation() {
	//clearInterval(id);
	landerDY = 0;
	landerDX = 0;
	setLanderAndTarget();

}

function startAnimation() {
		//id = setInterval(frame, 41);
		landerDY = 6;
		moving = true;
}

function moveLander(){
	if(moving === true){
		if(checkForTarget() === false){
		landerX += landerDX;
		landerY += landerDY
		landerDY += 1;

			if(landerX <= 0 && landerDX <0){
				landerX = 0;
				landerDX = 0;
			}

			if((landerX > gameAreaWidth - landerWidth) && landerDX > 0){
				landerX = gameAreaWidth - landerWidth;
				landerDX = 0;
			}

			if(landerY >= gameAreaHeight - landerWidth){
				landerY = gameAreaHeight - landerWidth;
				if (landerDY > 4) {
					crashed = true;
					landerDX = 0;
				}
				landerDY = 0;
				landerDX = 0;

			}

				if (crashed === false) {
				lander.style.left = landerX + 'px';
				lander.style.top = landerY + 'px';
				setFlamePosition();
				} else {
					hideFlame();
					lander.style.display = "none";
					damagedShip.style.left = landerX + 'px';
					damagedShip.style.top = landerY + 'px';
					damagedShip.style.display = "block";

				}
				if(checkForTarget() === true){
					moving = false;
					alert("Hey you won");
				}

	} else {
		//moving = false;
		//alert("Hey you won");
	}
	}
}


function frame() {

	moveLander();
}

setLanderAndTarget();
//showFlame();

document.getElementById('resetButton').onclick = resetAnimation;
document.getElementById('startButton').onclick = startAnimation;

document.onkeydown = function(e) {
	//alert("Hey! You pressed" + e.keyCode);


if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	e.preventDefault();
}

switch(e.keyCode){
	case 32:
	//alert("spacebar");
	crashed = false;
	resetAnimation();
	startAnimation();
	
	break;

	case 37:
	//alert("left arrow");
	landerDX += -1;
	showFlame();

	break;

	case 38:
	//alert("up arrow");
	landerDY -=11;
	showFlame();
	
	break;

	case 39:
	//alert("right arrow");
	landerDX += 1;
	showFlame();

	break;

	case 40:
	//alert("down arrow");

	break;
}

};

document.onkeyup = function(e){

	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	e.preventDefault();
}
	
	switch(e.keyCode) {
	case 32:
	
	break;

	case 37:
	//landerDX = 0;
	hideFlame();

	break;

	case 38:
	hideFlame();
	
	break;

	case 39:
	//landerDX = 0;
	hideFlame();

	break;

	case 40:

	break;

	}

};