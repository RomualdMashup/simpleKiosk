import MashupKiosk from "./dist/main.js";

const kiosk = new MashupKiosk({
    wsAddress: "ws://localhost:8080",
    backgroundMedia: "https://w.wallhaven.cc/full/83/wallhaven-83kgyo.png",
    container: document.getElementById("player_container"),
    video: {
        loop: true,
        mute: false
    }
});

// "https://w.wallhaven.cc/full/83/wallhaven-83kgyo.png"
