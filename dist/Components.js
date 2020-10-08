export var videoBackground = function (src) {
    var el = document.createElement("video");
    el.classList.add("videoBackground");
    el.src = src;
    el.muted = true;
    el.loop = true;
    el.autoplay = true;
    return el;
};
export var imageBackground = function (src) {
    var el = document.createElement("img");
    el.classList.add("imageBackground");
    el.src = src;
    return el;
};
export var afkTitle = function () {
    var el = document.createElement("h1");
    el.classList.add("afkTitle");
    el.textContent = "Cliquer pour commencer";
    return el;
};
export var loader = function () {
    var el = document.createElement("div");
    el.classList.add("lds-dual-ring");
    return el;
};
