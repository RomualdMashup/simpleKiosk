import KioskPlayer from "./Player.js";

const medias = [
    "https://w.wallhaven.cc/full/ox/wallhaven-oxzk8m.jpg",
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4",
];

document.body.style.backgroundImage = "url(https://w.wallhaven.cc/full/83/wallhaven-83kgyo.png)";

class Main {
    libOptions: any;
    player: KioskPlayer;
    ws: WebSocket;
    constructor(options?: any) {
        this.libOptions = {
            wsPort: 8080,
        };
        Object.assign(this.libOptions, options);
        this.player = new KioskPlayer(document.getElementById("player_container"));
        this.ws = new WebSocket(`ws://localhost:${this.libOptions.wsPort}`);
        this.handleWS();
        this.setBackground();
    }

    private handleWS() {
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.eventType) {
                case "add":
                    this.player.update(medias[msg.id]);
                    this.player.currentDisplayedMedia = msg.id;
                    break;
                case "remove":
                    if (this.player.currentDisplayedMedia === msg.id) this.player.remove();
                    break;
            }
        };
    }

    setBackground() {
        if (this.libOptions.backgroundImage) {
            document.body.style.backgroundColor = "";
            document.body.style.backgroundImage = `url(${this.libOptions.backgroundImage})`;
            return;
        } 
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "black";
    }
}

export default Main;
