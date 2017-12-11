var config = {
    avatarHeight: 81,
    avatarWidth: 24,
    canvasHeight: 144,
    canvasWidth: 256
};

var scaling = Math.floor(window.innerWidth / config.canvasWidth);

var render = document.getElementById("render");
render.style.height = (config.canvasHeight * scaling) + "px";
render.style.width = (config.canvasWidth * scaling) + "px";

function configureCanvas(canvas) {
    canvas.height = config.canvasHeight;
    canvas.width = config.canvasWidth;
    canvas.style.height = (config.canvasHeight * scaling) + "px";
    canvas.style.width = (config.canvasWidth * scaling) + "px";
}

var canvasAvatar = document.getElementById("avatar");
var canvasBackground = document.getElementById("background");
var contextAvatar = canvasAvatar.getContext("2d");
var contextBackground = canvasBackground.getContext("2d");

configureCanvas(canvasAvatar);
configureCanvas(canvasBackground);

var avatar = new Image();
avatar.onload = function () {
    contextAvatar.drawImage(avatar, 16, config.canvasHeight - config.avatarHeight);
}
avatar.src = 'img/avatar.png';

var image = new Image();
image.onload = function () {
    contextBackground.drawImage(image, 0, 0);
}
image.src = 'img/test-room.png';