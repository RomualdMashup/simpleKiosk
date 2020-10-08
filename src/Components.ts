export const videoBackground = (src: string): HTMLVideoElement => {
    const el = document.createElement("video");
    el.classList.add("videoBackground");
    el.src = src;
    el.muted = true;
    el.loop = true;
    el.autoplay = true;
    return el;
};

export const imageBackground = (src: string): HTMLImageElement => {
    const el = document.createElement("img");
    el.classList.add("imageBackground");
    el.src = src;
    return el;
};

export const afkTitle = (): HTMLHeadingElement => {
    const el = document.createElement("h1");
    el.classList.add("afkTitle");
    el.textContent = "Cliquer pour commencer";
    return el;
};

export const loader = (): HTMLDivElement => {
    const el = document.createElement("div");
    el.classList.add("lds-dual-ring");
    return el;
};
