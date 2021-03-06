import MashupKiosk from "./dist/main.js";

const medias = [
    "https://w.wallhaven.cc/full/ox/wallhaven-oxzk8m.jpg",
    "https://w.wallhaven.cc/full/j5/wallhaven-j5mz95.png",
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    "https://pm1.narvii.com/6474/072e23ae4aeee784195ce504b86ecf15a3a08167_00.jpg",
];

const kiosk = new MashupKiosk(medias, {
    wsAddress: "ws://localhost:8080",
    backgroundMedia: "https://w.wallhaven.cc/full/83/wallhaven-83kgyo.png",
    container: document.getElementById("player_container"),
    video: {
        loop: true,
        mute: false
    }
});

// "https://w.wallhaven.cc/full/83/wallhaven-83kgyo.png"
