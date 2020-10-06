export const videoBackground = (src: string): HTMLVideoElement => {
    const videoBg = document.createElement("video");
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
