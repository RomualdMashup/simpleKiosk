export var videoBackground = function (src) {
    var videoBg = document.createElement("video");
    videoBg.setAttribute("muted", "");
    videoBg.setAttribute("loop", "");
    videoBg.setAttribute("autoplay", "");
    videoBg.style.zIndex = "-1";
    videoBg.style.width = "100%";
    videoBg.style.margin = "0";
    videoBg.style.padding = "0";
    videoBg.src = src;
    return videoBg;
};
