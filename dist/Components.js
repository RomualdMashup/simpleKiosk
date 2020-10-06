export var videoBackground = function (src) {
    var el = document.createElement("video");
    el.style.zIndex = "-1";
    el.style.width = "auto";
    el.style.height = "auto";
    el.style.minWidth = "100%";
    el.style.minHeight = "100%";
    el.style.margin = "0";
    el.style.padding = "0";
    el.style.position = "absolute";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%,-50%)";
    el.src = src;
    el.muted = true;
    el.loop = true;
    el.autoplay = true;
    return el;
};
export var imageBackground = function (src) {
    var el = document.createElement("img");
    el.style.zIndex = "-1";
    el.style.width = "auto";
    el.style.height = "auto";
    el.style.minWidth = "100%";
    el.style.minHeight = "100%";
    el.style.margin = "0";
    el.style.padding = "0";
    el.style.position = "absolute";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%,-50%)";
    el.src = src;
    return el;
};
export var afkTitle = function () {
    var el = document.createElement("h1");
    el.style.textAlign = "center";
    el.style.color = "white";
    el.style.margin = "0";
    el.style.transition = "opacity 0.15s linear";
    el.style.cursor = "default";
    el.textContent = "Cliquer pour commencer";
    el.style.position = "absolute";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%,-50%)";
    return el;
};
